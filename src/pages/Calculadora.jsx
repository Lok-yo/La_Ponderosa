import React, { useMemo, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'
import './Calculadora.css'

const PORTION_PROFILES = [
  {
    id: 'guarniciones',
    name: 'Muchas guarniciones',
    gramsPerAdult: 275,
    reference: '250–300 g',
    description: 'Cuando habrá frijoles, quesadillas, guacamole y otros acompañamientos.'
  },
  {
    id: 'estandar',
    name: 'Estándar / moderado',
    gramsPerAdult: 375,
    reference: '350–400 g',
    description: 'Una porción equilibrada para la mayoría de las reuniones.'
  },
  {
    id: 'pura-carne',
    name: 'Pura carne / buen diente',
    gramsPerAdult: 500,
    reference: '500 g o más',
    description: 'Para una mesa con pocos acompañamientos o comensales de muy buen apetito.'
  }
]

function roundUp(value, step) {
  return Math.ceil(value / step) * step
}

function formatKg(value) {
  return new Intl.NumberFormat('es-MX', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2
  }).format(value)
}

function Counter({ id, label, value, min, max, onChange, helper, singular, plural }) {
  return (
    <fieldset className="calc-counter-card">
      <legend id={`${id}-label`}>{label}</legend>
      <div className="calc-counter" aria-labelledby={`${id}-label`}>
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Disminuir ${label.toLowerCase()}`}
        >
          <Icon.Minus size={17} aria-hidden="true" />
        </button>
        <output className="calc-counter__value" aria-live="polite">
          <strong>{value}</strong>
          <span>{value === 1 ? singular : plural}</span>
        </output>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Aumentar ${label.toLowerCase()}`}
        >
          <Icon.Plus size={17} aria-hidden="true" />
        </button>
      </div>
      <small>{helper}</small>
    </fieldset>
  )
}

export default function Calculadora() {
  useReveal()

  const [adults, setAdults] = useState(6)
  const [childrenCount, setChildrenCount] = useState(2)
  const [profileId, setProfileId] = useState('estandar')

  const selectedProfile = PORTION_PROFILES.find((profile) => profile.id === profileId)
    || PORTION_PROFILES[1]

  const calculation = useMemo(() => {
    const adultGrams = selectedProfile.gramsPerAdult
    const childGrams = Math.round(adultGrams * 0.6 / 5) * 5
    const adultsKg = adults * adultGrams / 1000
    const childrenKg = childrenCount * childGrams / 1000
    const exactKg = adultsKg + childrenKg
    const totalKg = roundUp(exactKg, 0.1)
    const adultEquivalents = adults + childrenCount * 0.6
    const salsaLiters = Math.max(0.2, roundUp(adultEquivalents * 0.1, 0.1))
    const charcoalKg = Math.max(1, roundUp(totalKg * 0.6, 0.5))

    return {
      adultGrams,
      childGrams,
      adultsKg,
      childrenKg,
      totalKg,
      salsaLiters,
      charcoalKg
    }
  }, [adults, childrenCount, selectedProfile])

  const guestCount = adults + childrenCount

  return (
    <>
      <Breadcrumbs />

      <header className="calc-hero">
        <div className="calc-hero__sun" aria-hidden="true" />
        <div className="container calc-hero__inner">
          <span className="calc-kicker reveal">
            <Icon.Flame size={18} aria-hidden="true" />
            Planeador para tu carne asada
          </span>
          <h1 className="reveal delay-1">La cantidad justa para compartir.</h1>
          <p className="calc-hero__lead reveal delay-2">
            Dinos cuántas personas se sentarán a la mesa y cómo será el asado. Calculamos
            la cantidad de carne sin decidir productos por ti.
          </p>
          <div className="calc-hero__summary reveal delay-3" aria-label="Resumen de la reunión">
            <span><strong>{guestCount}</strong> {guestCount === 1 ? 'invitado' : 'invitados'}</span>
            <i aria-hidden="true" />
            <span><strong>{formatKg(calculation.totalKg)}</strong> kg de carne</span>
            <i aria-hidden="true" />
            <span><strong>{calculation.adultGrams}</strong> g por adulto</span>
          </div>
        </div>
      </header>

      <section className="calc-workbench" aria-labelledby="calc-planner-title">
        <div className="container">
          <div className="calc-grid">
            <div className="calc-planner">
              <section className="calc-card reveal">
                <div className="calc-section-title">
                  <span className="calc-step" aria-hidden="true">01</span>
                  <div>
                    <p>Primero, la mesa</p>
                    <h2 id="calc-planner-title">¿Quién viene a la carne asada?</h2>
                  </div>
                </div>

                <div className="calc-people-grid">
                  <Counter
                    id="adultos"
                    label="Adultos"
                    value={adults}
                    min={1}
                    max={80}
                    onChange={setAdults}
                    helper={`${calculation.adultGrams} g por adulto`}
                    singular="adulto"
                    plural="adultos"
                  />
                  <Counter
                    id="ninos"
                    label="Niños"
                    value={childrenCount}
                    min={0}
                    max={40}
                    onChange={setChildrenCount}
                    helper={`${calculation.childGrams} g por niño`}
                    singular="niño"
                    plural="niños"
                  />
                </div>

                <p className="calc-child-note">
                  <Icon.Info size={15} aria-hidden="true" />
                  Para niños usamos el 60% de una porción adulta y redondeamos el total hacia arriba.
                </p>
              </section>

              <section className="calc-card reveal delay-1" aria-labelledby="portion-title">
                <div className="calc-section-title">
                  <span className="calc-step" aria-hidden="true">02</span>
                  <div>
                    <p>Ahora, el tipo de asado</p>
                    <h2 id="portion-title">¿Cuánto protagonismo tendrá la carne?</h2>
                  </div>
                </div>

                <fieldset className="calc-fieldset">
                  <legend className="calc-sr-only">Selecciona el tipo de asado</legend>
                  <div className="calc-appetite">
                    {PORTION_PROFILES.map((profile, index) => (
                      <button
                        key={profile.id}
                        type="button"
                        className={`calc-appetite__option ${profileId === profile.id ? 'is-active' : ''}`}
                        onClick={() => setProfileId(profile.id)}
                        aria-pressed={profileId === profile.id}
                      >
                        <span className="calc-appetite__mark" aria-hidden="true">0{index + 1}</span>
                        <span className="calc-appetite__copy">
                          <strong>{profile.name}</strong>
                          <small>{profile.description}</small>
                        </span>
                        <span className="calc-appetite__grams">
                          <strong>{profile.gramsPerAdult} g</strong>
                          <small>Referencia: {profile.reference}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <p className="calc-reference-note">
                  Usamos el punto medio de cada rango y 500 g como base para el asado de pura carne,
                  así el cálculo se mantiene claro y fácil de ajustar.
                </p>
              </section>
            </div>

            <aside className="calc-result reveal delay-2" aria-labelledby="result-title">
              <p className="calc-sr-only" aria-live="polite" aria-atomic="true">
                Cálculo actual: {formatKg(calculation.totalKg)} kilogramos de carne para {guestCount}
                {guestCount === 1 ? ' persona' : ' personas'}.
              </p>

              <div className="calc-result__eyebrow">
                <span><Icon.Sparkle size={16} aria-hidden="true" /> Tu cálculo</span>
                <small>{selectedProfile.name}</small>
              </div>

              <div className="calc-result__heading">
                <div>
                  <p>Cantidad total</p>
                  <h2 id="result-title">Carne para la reunión</h2>
                </div>
                <div className="calc-weight-seal" aria-label={`${formatKg(calculation.totalKg)} kilogramos de carne`}>
                  <strong>{formatKg(calculation.totalKg)}</strong>
                  <span>kg</span>
                </div>
              </div>

              <div className="calc-breakdown">
                <div className="calc-breakdown__head">
                  <h3>Así se calculó</h3>
                  <span>Redondeado a 100 g</span>
                </div>

                <dl className="calc-portion-list">
                  <div>
                    <dt>
                      <strong>Adultos</strong>
                      <small>{adults} × {calculation.adultGrams} g</small>
                    </dt>
                    <dd>{formatKg(calculation.adultsKg)} kg</dd>
                  </div>
                  <div>
                    <dt>
                      <strong>Niños</strong>
                      <small>{childrenCount} × {calculation.childGrams} g</small>
                    </dt>
                    <dd>{formatKg(calculation.childrenKg)} kg</dd>
                  </div>
                </dl>
              </div>

              <div className="calc-planning" aria-label="Cantidades complementarias orientativas">
                <article>
                  <span className="calc-planning__icon" aria-hidden="true"><Icon.Sparkle size={17} /></span>
                  <div>
                    <h3>Acompañamientos</h3>
                    <strong>{guestCount} {guestCount === 1 ? 'porción' : 'porciones'}</strong>
                    <p>Una por persona; como punto de partida, {formatKg(calculation.salsaLiters)} L de salsa.</p>
                  </div>
                </article>
                <article>
                  <span className="calc-planning__icon" aria-hidden="true"><Icon.Flame size={17} /></span>
                  <div>
                    <h3>Carbón</h3>
                    <strong>{formatKg(calculation.charcoalKg)} kg aprox.</strong>
                    <p>Calculado a 600 g por cada kilo de carne y redondeado a medio kilo.</p>
                  </div>
                </article>
              </div>

              <p className="calc-disclaimer">
                <Icon.Info size={14} aria-hidden="true" />
                Esta es una guía orientativa. Ajusta un poco si conoces el apetito particular de tus invitados.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
