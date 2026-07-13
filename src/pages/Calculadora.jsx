import React, { useMemo, useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import { useCart } from '../context/CartContext'
import { useCurrency } from '../context/CurrencyContext'
import { cuts } from '../data/cuts'
import { useReveal } from '../hooks/useReveal'
import './Calculadora.css'

const MIXES = [
  {
    id: 'rendidora',
    name: 'La Rendidora',
    tag: 'Gran valor',
    description: 'Sabrosa, noble y pensada para servir muchos tacos sin sacrificar la brasa.',
    items: [
      { cutId: 'aguja-asar', share: 0.5, thickness: '1/2 pulgada' },
      { cutId: 'diezmillo', share: 0.3, thickness: '3/4 pulgada' },
      { cutId: 'costilla-rib-eye', share: 0.2, thickness: '3/4 pulgada' }
    ]
  },
  {
    id: 'nortena',
    name: 'La Norteña',
    tag: 'Favorita de la casa',
    description: 'El balance sonorense: marmoleo, marinado y costilla para compartir al centro.',
    items: [
      { cutId: 'diezmillo', share: 0.45, thickness: '3/4 pulgada' },
      { cutId: 'arrachera-marinada', share: 0.3, thickness: '1/2 pulgada' },
      { cutId: 'costilla-rib-eye', share: 0.25, thickness: '3/4 pulgada' }
    ]
  },
  {
    id: 'especial',
    name: 'La Especial',
    tag: 'Cortes premium',
    description: 'Una selección de celebración con suavidad, marmoleo y sabor profundo.',
    items: [
      { cutId: 'rib-eye', share: 0.4, thickness: '1 pulgada' },
      { cutId: 'filete-cabreria', share: 0.35, thickness: '1 1/4 pulgadas' },
      { cutId: 'rib-fingers', share: 0.25, thickness: 'Tiras de 2 cm' }
    ]
  }
]

const CUTS_BY_ID = new Map(cuts.map((cut) => [cut.id, cut]))

function Counter({ id, label, value, min, max, onChange, helper }) {
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
          <span>{value === 1 ? 'persona' : 'personas'}</span>
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

  const { addToCart, openCart } = useCart()
  const { formatPrice } = useCurrency()
  const [adults, setAdults] = useState(6)
  const [childrenCount, setChildrenCount] = useState(2)
  const [appetite, setAppetite] = useState('parrillero')
  const [hasSides, setHasSides] = useState(true)
  const [selectedMixId, setSelectedMixId] = useState('nortena')

  const calculation = useMemo(() => {
    const adultGrams = appetite === 'moderado' ? 350 : appetite === 'tragon' ? 650 : 450
    const childGrams = 200
    const sideFactor = hasSides ? 0.85 : 1
    const totalGrams = (adults * adultGrams + childrenCount * childGrams) * sideFactor
    const totalKg = Math.max(1, Number((totalGrams / 1000).toFixed(1)))

    return {
      adultGrams,
      totalKg,
      charcoalBags: Math.max(1, Math.ceil(totalKg / 3.5)),
      salsaLiters: Number((totalKg * 0.2).toFixed(1))
    }
  }, [adults, childrenCount, appetite, hasSides])

  const selectedMix = MIXES.find((mix) => mix.id === selectedMixId) || MIXES[1]

  const recommendation = useMemo(() => {
    let assignedWeight = 0

    const items = selectedMix.items.map((item, index) => {
      const cut = CUTS_BY_ID.get(item.cutId)
      const isLast = index === selectedMix.items.length - 1
      const weightKg = isLast
        ? Number((calculation.totalKg - assignedWeight).toFixed(2))
        : Number((calculation.totalKg * item.share).toFixed(2))

      assignedWeight = Number((assignedWeight + weightKg).toFixed(2))

      return {
        ...item,
        cut,
        weightKg,
        subtotal: weightKg * cut.pricePerKg
      }
    })

    return {
      items,
      total: items.reduce((sum, item) => sum + item.subtotal, 0)
    }
  }, [calculation.totalKg, selectedMix])

  const handleAddRecommendation = () => {
    recommendation.items.forEach(({ cut, weightKg, thickness }) => {
      addToCart({
        cutId: cut.id,
        cutName: cut.name,
        weightKg,
        prepOption: 'asado',
        thickness,
        pricePerKg: cut.pricePerKg,
        notes: 'Sugerencia generada por la calculadora del evento'
      })
    })

    openCart()
  }

  const guestCount = adults + childrenCount

  return (
    <>
      <Breadcrumbs />

      <header className="calc-hero">
        <div className="calc-hero__sun" aria-hidden="true" />
        <div className="container calc-hero__inner">
          <span className="calc-kicker reveal">
            <Icon.Flame size={18} aria-hidden="true" />
            Fuego de frontera · Planeador parrillero
          </span>
          <h1 className="reveal delay-1">La medida exacta de una gran carne asada.</h1>
          <p className="calc-hero__lead reveal delay-2">
            Dinos cuántos se sientan a la mesa. Nosotros calculamos la carne y armamos
            una mezcla del mostrador lista para mandar al asador.
          </p>
          <div className="calc-hero__summary reveal delay-3" aria-label="Resumen inicial de la reunión">
            <span><strong>{guestCount}</strong> invitados</span>
            <i aria-hidden="true" />
            <span><strong>{calculation.totalKg}</strong> kg sugeridos</span>
            <i aria-hidden="true" />
            <span>Asado <strong>gratis</strong></span>
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
                    <h2 id="calc-planner-title">¿Quién viene a la carnita?</h2>
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
                  />
                  <Counter
                    id="ninos"
                    label="Niños"
                    value={childrenCount}
                    min={0}
                    max={40}
                    onChange={setChildrenCount}
                    helper="200 g por niño"
                  />
                </div>

                <fieldset className="calc-fieldset">
                  <legend id="appetite-label">¿Qué tanta hambre traen?</legend>
                  <div className="calc-appetite" role="group" aria-labelledby="appetite-label">
                    {[
                      { id: 'moderado', name: 'Tranquila', detail: '350 g', symbol: 'I' },
                      { id: 'parrillero', name: 'Parrillera', detail: '450 g', symbol: 'II' },
                      { id: 'tragon', name: 'Norteña', detail: '650 g', symbol: 'III' }
                    ].map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        className={`calc-appetite__option ${appetite === option.id ? 'is-active' : ''}`}
                        onClick={() => setAppetite(option.id)}
                        aria-pressed={appetite === option.id}
                      >
                        <span className="calc-appetite__mark" aria-hidden="true">{option.symbol}</span>
                        <strong>{option.name}</strong>
                        <small>{option.detail} / adulto</small>
                      </button>
                    ))}
                  </div>
                </fieldset>

                <label className="calc-sides">
                  <input
                    type="checkbox"
                    checked={hasSides}
                    onChange={(event) => setHasSides(event.target.checked)}
                  />
                  <span className="calc-sides__check" aria-hidden="true"><Icon.Check size={16} /></span>
                  <span>
                    <strong>Habrá buena guarnición</strong>
                    <small>Quesadillas, frijoles, guacamole y demás. Ajustamos la carne 15%.</small>
                  </span>
                </label>
              </section>

              <section className="calc-card calc-mixes reveal delay-1" aria-labelledby="mix-title">
                <div className="calc-section-title">
                  <span className="calc-step" aria-hidden="true">02</span>
                  <div>
                    <p>Ahora, el antojo</p>
                    <h2 id="mix-title">Escoge tu mezcla de la casa</h2>
                  </div>
                </div>

                <div className="calc-mix-options" role="group" aria-labelledby="mix-title">
                  {MIXES.map((mix) => {
                    const estimatedPrice = calculation.totalKg * mix.items.reduce((sum, item) => {
                      return sum + CUTS_BY_ID.get(item.cutId).pricePerKg * item.share
                    }, 0)

                    return (
                      <button
                        key={mix.id}
                        type="button"
                        className={`calc-mix ${selectedMixId === mix.id ? 'is-active' : ''}`}
                        onClick={() => setSelectedMixId(mix.id)}
                        aria-pressed={selectedMixId === mix.id}
                      >
                        <span className="calc-mix__topline">
                          <small>{mix.tag}</small>
                          <span className="calc-mix__check" aria-hidden="true"><Icon.Check size={13} /></span>
                        </span>
                        <strong>{mix.name}</strong>
                        <span className="calc-mix__description">{mix.description}</span>
                        <span className="calc-mix__price">Aprox. {formatPrice(estimatedPrice)}</span>
                      </button>
                    )
                  })}
                </div>
              </section>
            </div>

            <aside className="calc-result reveal delay-2" aria-labelledby="result-title">
              <p className="calc-sr-only" aria-live="polite" aria-atomic="true">
                Recomendación actual: {calculation.totalKg} kilos de {selectedMix.name}, con un total estimado de {formatPrice(recommendation.total)}.
              </p>

              <div className="calc-result__eyebrow">
                <span><Icon.Sparkle size={16} aria-hidden="true" /> Tu recomendación</span>
                <small>{selectedMix.tag}</small>
              </div>

              <div className="calc-result__heading">
                <div>
                  <p>Mezcla seleccionada</p>
                  <h2 id="result-title">{selectedMix.name}</h2>
                </div>
                <div className="calc-weight-seal" aria-label={`${calculation.totalKg} kilogramos de carne`}>
                  <strong>{calculation.totalKg}</strong>
                  <span>kg</span>
                </div>
              </div>

              <div className="calc-breakdown">
                <div className="calc-breakdown__head">
                  <h3>La orden, corte por corte</h3>
                  <span>{recommendation.items.length} cortes</span>
                </div>

                <ol>
                  {recommendation.items.map(({ cut, share, weightKg, subtotal, thickness }) => (
                    <li key={cut.id} className="calc-cut-row">
                      <div className="calc-cut-row__index" aria-hidden="true">
                        {String(Math.round(share * 100)).padStart(2, '0')}
                        <span>%</span>
                      </div>
                      <div className="calc-cut-row__body">
                        <div className="calc-cut-row__name">
                          <div>
                            <strong>{cut.name}</strong>
                            <small>{thickness} · {formatPrice(cut.pricePerKg)}/kg</small>
                          </div>
                          <div>
                            <strong>{weightKg} kg</strong>
                            <small>{formatPrice(subtotal)}</small>
                          </div>
                        </div>
                        <div className="calc-cut-row__bar" aria-hidden="true">
                          <span style={{ width: `${share * 100}%` }} />
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="calc-extras" aria-label="Complementos recomendados">
                <div>
                  <Icon.Flame size={17} aria-hidden="true" />
                  <span><strong>{calculation.charcoalBags}</strong> {calculation.charcoalBags === 1 ? 'bolsa' : 'bolsas'} de carbón</span>
                </div>
                <div>
                  <Icon.Sparkle size={17} aria-hidden="true" />
                  <span><strong>{calculation.salsaLiters} L</strong> de salsa</span>
                </div>
              </div>

              <div className="calc-receipt">
                <div>
                  <span>Total estimado</span>
                  <small>Precio de mostrador · asado incluido</small>
                </div>
                <strong>{formatPrice(recommendation.total)}</strong>
              </div>

              <button
                type="button"
                className="calc-add-button"
                onClick={handleAddRecommendation}
                aria-label={`Agregar la mezcla ${selectedMix.name} completa al carrito por ${formatPrice(recommendation.total)}`}
              >
                <Icon.ShoppingBag size={19} aria-hidden="true" />
                Agregar mezcla completa
                <Icon.ArrowRight size={17} aria-hidden="true" />
              </button>

              <p className="calc-disclaimer">
                <Icon.Info size={14} aria-hidden="true" />
                Estimación orientativa. El total final depende del pesaje exacto en báscula.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
