import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

const CurrencyContext = createContext()

const EXCHANGE_API_URL = 'https://api.frankfurter.dev/v1/latest?base=MXN&symbols=USD'
const CACHE_KEY = 'ponderosa_exchange_rate'
const CACHE_DURATION = 1000 * 60 * 60
const REQUEST_TIMEOUT = 5_000
const FALLBACK_MXN_TO_USD_RATE = 0.055

function readCachedRate() {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
    const age = Date.now() - cached.timestamp

    if (Number.isFinite(cached.rate) && cached.rate > 0 && age >= 0 && age < CACHE_DURATION) {
      return { rate: cached.rate, timestamp: cached.timestamp }
    }
  } catch {
    // An unavailable cache should never prevent conversion.
  }

  return null
}

function cacheRate(rate, timestamp) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ rate, timestamp }))
  } catch {
    // The live result remains usable even when localStorage is unavailable.
  }
}

/**
 * Async function #2: resolves the current MXN → USD rate through fetch Promises.
 * It reads a one-hour cache first and returns a documented fallback when the
 * service or connection is unavailable.
 */
async function getMxnToUsdRate() {
  const cached = readCachedRate()
  if (cached) return { ...cached, source: 'cache' }

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(EXCHANGE_API_URL, { signal: controller.signal })
    if (!response.ok) throw new Error(`Exchange API responded with ${response.status}`)

    const data = await response.json()
    const liveRate = Number(data?.rates?.USD)
    if (!Number.isFinite(liveRate) || liveRate <= 0) {
      throw new Error('Exchange API returned an invalid rate')
    }

    const timestamp = Date.now()
    cacheRate(liveRate, timestamp)
    return { rate: liveRate, timestamp, source: 'live' }
  } catch (error) {
    return {
      rate: FALLBACK_MXN_TO_USD_RATE,
      timestamp: null,
      source: 'fallback',
      error
    }
  } finally {
    window.clearTimeout(timeout)
  }
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('MXN')
  const [rate, setRate] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchExchangeRate = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getMxnToUsdRate()
      setRate(result.rate)
      setLastUpdated(result.timestamp ? new Date(result.timestamp) : null)

      if (result.source === 'fallback') {
        setError('No se pudo actualizar la tasa; se muestra una conversión aproximada.')
        console.error('Error fetching exchange rate:', result.error)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // The API Promise runs only when the visitor requests USD prices.
  useEffect(() => {
    if (currency === 'USD' && !rate) fetchExchangeRate()
  }, [currency, rate, fetchExchangeRate])

  const toggleCurrency = () => {
    setCurrency((previous) => (previous === 'MXN' ? 'USD' : 'MXN'))
  }

  const formatPrice = useCallback((priceMXN, showSymbol = true) => {
    if (currency === 'MXN') {
      const formatted = Math.round(priceMXN)
      return showSymbol ? `$${formatted} MXN` : `${formatted} MXN`
    }

    const usdPrice = (priceMXN * (rate || FALLBACK_MXN_TO_USD_RATE)).toFixed(2)
    return showSymbol ? `$${usdPrice} USD` : `${usdPrice} USD`
  }, [currency, rate])

  const convertPrice = useCallback((priceMXN) => {
    if (currency === 'MXN') return Math.round(priceMXN)
    return Number((priceMXN * (rate || FALLBACK_MXN_TO_USD_RATE)).toFixed(2))
  }, [currency, rate])

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        rate,
        loading,
        error,
        lastUpdated,
        toggleCurrency,
        formatPrice,
        convertPrice,
        refetchRate: fetchExchangeRate,
        currencySymbol: currency === 'MXN' ? 'MXN' : 'USD'
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider')
  return context
}
