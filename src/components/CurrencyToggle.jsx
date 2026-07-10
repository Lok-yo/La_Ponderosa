import React from 'react'
import { useCurrency } from '../context/CurrencyContext'
import './CurrencyToggle.css'

export default function CurrencyToggle() {
  const { currency, toggleCurrency, loading, rate, lastUpdated, error } = useCurrency()

  const tooltipText = loading
    ? 'Obteniendo tipo de cambio...'
    : error
      ? `Usando tasa aproximada (sin conexión)`
      : lastUpdated
        ? `Tipo de cambio: 1 USD ≈ $${rate ? (1 / rate).toFixed(2) : '—'} MXN`
        : 'Cambiar moneda'

  return (
    <button
      className={`currency-toggle ${loading ? 'currency-toggle--loading' : ''}`}
      onClick={toggleCurrency}
      title={tooltipText}
      aria-label={`Moneda actual: ${currency}. Clic para cambiar a ${currency === 'MXN' ? 'USD' : 'MXN'}`}
    >
      <span className={`currency-toggle__option ${currency === 'MXN' ? 'currency-toggle__option--active' : ''}`}>
        MXN
      </span>
      <span className="currency-toggle__divider">/</span>
      <span className={`currency-toggle__option ${currency === 'USD' ? 'currency-toggle__option--active' : ''}`}>
        USD
      </span>
    </button>
  )
}
