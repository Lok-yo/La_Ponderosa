import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

const CurrencyContext = createContext()

const CACHE_KEY = 'ponderosa_exchange_rate'
const CACHE_DURATION = 1000 * 60 * 60 // 1 hour

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('MXN') // 'MXN' | 'USD'
  const [rate, setRate] = useState(null) // MXN → USD rate
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchExchangeRate = useCallback(async () => {
    // Check cache first
    try {
      const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
      if (cached.rate && cached.timestamp && Date.now() - cached.timestamp < CACHE_DURATION) {
        setRate(cached.rate)
        setLastUpdated(new Date(cached.timestamp))
        return
      }
    } catch {
      // Cache miss, proceed to fetch
    }

    setLoading(true)
    setError(null)

    try {
      // frankfurter.app — 100% free, no API key, open source
      const response = await fetch('https://api.frankfurter.app/latest?from=MXN&to=USD')

      if (!response.ok) {
        throw new Error(`API respondió con status ${response.status}`)
      }

      const data = await response.json()
      const mxnToUsd = data.rates.USD

      setRate(mxnToUsd)
      setLastUpdated(new Date())

      // Cache the result
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          rate: mxnToUsd,
          timestamp: Date.now()
        }))
      } catch {
        // localStorage may be full, ignore
      }
    } catch (err) {
      console.error('Error fetching exchange rate:', err)
      setError(err.message)
      // Fallback rate (approximate)
      setRate(0.049)
      setLastUpdated(null)
    } finally {
      setLoading(false)
    }
  }, [])

  // Fetch only when the visitor actually asks to see USD prices.
  useEffect(() => {
    if (currency === 'USD' && !rate) fetchExchangeRate()
  }, [currency, rate, fetchExchangeRate])

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'MXN' ? 'USD' : 'MXN'))
  }

  /**
   * Formats a price in MXN to the current selected currency.
   * @param {number} priceMXN - Price in Mexican Pesos
   * @param {boolean} showSymbol - Whether to show $ symbol (default true)
   * @returns {string} Formatted price string, e.g. "$360 MXN" or "$17.64 USD"
   */
  const formatPrice = useCallback((priceMXN, showSymbol = true) => {
    if (currency === 'MXN') {
      const formatted = Math.round(priceMXN)
      return showSymbol ? `$${formatted} MXN` : `${formatted} MXN`
    }

    // Convert to USD
    const convertedRate = rate || 0.049 // Fallback
    const usdPrice = (priceMXN * convertedRate).toFixed(2)
    return showSymbol ? `$${usdPrice} USD` : `${usdPrice} USD`
  }, [currency, rate])

  /**
   * Returns just the numeric value in the selected currency.
   * @param {number} priceMXN
   * @returns {number}
   */
  const convertPrice = useCallback((priceMXN) => {
    if (currency === 'MXN') return Math.round(priceMXN)
    const convertedRate = rate || 0.049
    return Number((priceMXN * convertedRate).toFixed(2))
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
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider')
  }
  return context
}
