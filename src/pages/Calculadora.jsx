import React, { useState, useMemo } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import { useCart } from '../context/CartContext'
import { useReveal } from '../hooks/useReveal'
import './Calculadora.css'

export default function Calculadora() {
  useReveal()

  const [adults, setAdults] = useState(6)
  const [childrenCount, setChildrenCount] = useState(2)
  const [appetite, setAppetite] = useState('parrillero') // moderado | parrillero | tragon
  const [hasSides, setHasSides] = useState(true) // quesadillas, guacamole, etc.

  // Calculations
  const calculation = useMemo(() => {
    // Base grams per adult according to appetite
    let adultGrams = 450
    if (appetite === 'moderado') adultGrams = 350
    if (appetite === 'tragon') adultGrams = 650

    const childGrams = 200

    let totalGrams = (adults * adultGrams) + (childrenCount * childGrams)

    // If there are rich sides (guacamole, quesadillas, frijoles maneados), reduce by 15%
    if (hasSides) {
      totalGrams = totalGrams * 0.85
    }

    const totalKg = Number((totalGrams / 1000).toFixed(1))

    // Charcoal & extras
    const charcoalBags = Math.max(1, Math.ceil(totalKg / 3.5))
    const salsaLiters = Number((totalKg * 0.2).toFixed(1))

    return {
      totalKg,
      charcoalBags,
      salsaLiters
    }
  }, [adults, childrenCount, appetite, hasSides])

  return (
    <>
      <Breadcrumbs />

      <header className="page-header">
        <div className="container-narrow">
          <span className="eyebrow reveal">Herramienta Parrillera</span>
          <h1 className="page-header__title reveal">Calculadora de Carne Asada</h1>
          <p className="page-header__lead reveal">
            Calcula exactamente cuántos kilos de carne, bolsas de carbón y salsas necesitas
            para tu reunión o evento sin que te falte ni te sobre.
          </p>
        </div>
      </header>

      <section className="section calc-section">
        <div className="container">
          <div className="calc-grid">
            {/* Input Form */}
            <div className="calc-card reveal">
              <h2 className="calc-card__title">
                <Icon.Calculator size={24} />
                Detalles del Evento
              </h2>

              {/* Adults */}
              <div className="calc-field">
                <label>Adultos invitados:</label>
                <div className="calc-counter">
                  <button onClick={() => setAdults(Math.max(1, adults - 1))}>
                    <Icon.Minus size={16} />
                  </button>
                  <span>{adults} adultos</span>
                  <button onClick={() => setAdults(adults + 1)}>
                    <Icon.Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="calc-field">
                <label>Niños invitados:</label>
                <div className="calc-counter">
                  <button onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}>
                    <Icon.Minus size={16} />
                  </button>
                  <span>{childrenCount} niños</span>
                  <button onClick={() => setChildrenCount(childrenCount + 1)}>
                    <Icon.Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Appetite level */}
              <div className="calc-field">
                <label>Nivel de apetito del grupo:</label>
                <div className="calc-radios">
                  <button
                    className={`radio-btn ${appetite === 'moderado' ? 'radio-btn--active' : ''}`}
                    onClick={() => setAppetite('moderado')}
                  >
                    <strong>Moderado</strong>
                    <span>~350g por persona</span>
                  </button>
                  <button
                    className={`radio-btn ${appetite === 'parrillero' ? 'radio-btn--active' : ''}`}
                    onClick={() => setAppetite('parrillero')}
                  >
                    <strong>Parrillero estándar</strong>
                    <span>~450g por persona</span>
                  </button>
                  <button
                    className={`radio-btn ${appetite === 'tragon' ? 'radio-btn--active' : ''}`}
                    onClick={() => setAppetite('tragon')}
                  >
                    <strong>Tragón norteño 🔥</strong>
                    <span>~650g por persona</span>
                  </button>
                </div>
              </div>

              {/* Has Sides */}
              <div className="calc-field">
                <label className="calc-checkbox-label">
                  <input
                    type="checkbox"
                    checked={hasSides}
                    onChange={(e) => setHasSides(e.target.checked)}
                  />
                  <span>¿Incluirás guarniciones? (Quesadillas, guacamole, frijoles)</span>
                </label>
              </div>
            </div>

            {/* Output Summary */}
            <div className="calc-result reveal delay-1">
              <div className="calc-result__head">
                <span className="eyebrow eyebrow--gold">Resultado Sugerido</span>
                <h3>Cálculo para {adults + childrenCount} Personas</h3>
                <div className="calc-total-badge">
                  <strong>{calculation.totalKg} KG</strong>
                  <span>Carne Total Necesaria</span>
                </div>
              </div>

              <div className="calc-extras" style={{ marginTop: '2rem' }}>
                <div className="extra-chip">
                  <Icon.Flame size={16} />
                  <span>{calculation.charcoalBags} bolsa(s) de carbón</span>
                </div>
                <div className="extra-chip">
                  <Icon.Sparkle size={16} />
                  <span>~{calculation.salsaLiters} L de salsa molcajeteada</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
