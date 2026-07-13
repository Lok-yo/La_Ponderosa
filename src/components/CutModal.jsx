import React, { useState, useEffect, useRef } from 'react'
import { registerDialogLayer, useCart } from '../context/CartContext'
import { useCurrency } from '../context/CurrencyContext'
import { Icon } from './Icons'
import './CutModal.css'

export default function CutModal({ cut, onClose }) {
  const { addToCart } = useCart()
  const { formatPrice } = useCurrency()

  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const onCloseRef = useRef(onClose)

  const [weightKg, setWeightKg] = useState('1.0')
  const [prepOption, setPrepOption] = useState('asado') // Default to popular free grill service
  const [thickness, setThickness] = useState('1 pulgada')
  const [notes, setNotes] = useState('')
  const [addedSuccess, setAddedSuccess] = useState(false)
  const [errorFeedback, setErrorFeedback] = useState('')

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (cut) {
      setPrepOption(cut.canGrill === false ? 'fresco' : 'asado')
      setThickness('1 pulgada')
      setWeightKg('1.0')
      setNotes('')
      setAddedSuccess(false)
      setErrorFeedback('')
    }
  }, [cut])

  useEffect(() => {
    if (!cut) return undefined

    const returnFocusElement = document.activeElement
    const dialogElement = dialogRef.current
    const unregisterDialog = registerDialogLayer(() => onCloseRef.current(), dialogElement)

    closeButtonRef.current?.focus({ preventScroll: true })

    return () => {
      unregisterDialog()

      const activeElement = document.activeElement
      const focusWasInDialog =
        activeElement === document.body || dialogElement?.contains(activeElement)

      if (
        focusWasInDialog &&
        returnFocusElement instanceof HTMLElement &&
        returnFocusElement !== document.body &&
        returnFocusElement.isConnected
      ) {
        returnFocusElement.focus({ preventScroll: true })
      }
    }
  }, [cut])

  if (!cut) return null

  const canGrill = cut.canGrill !== false
  const allowThickness = cut.allowThickness !== false

  const parsedWeight = parseFloat(weightKg)
  const subtotalMXN = Math.round((isNaN(parsedWeight) ? 0 : parsedWeight) * (cut.pricePerKg || 0))

  const handleWeightChange = (e) => {
    const val = e.target.value
    setWeightKg(val)

    const parsed = parseFloat(val)
    if (!isNaN(parsed) && parsed < 0.2) {
      setErrorFeedback('La cantidad menor permitida es 0.2 kg')
    } else {
      setErrorFeedback('')
    }
  }

  const handleWeightBlur = () => {
    const parsed = parseFloat(weightKg)
    if (isNaN(parsed) || parsed < 0.2) {
      setWeightKg(0.2)
      setErrorFeedback('La cantidad menor permitida es 0.2 kg')
      setTimeout(() => setErrorFeedback(''), 3000)
    } else {
      setErrorFeedback('')
    }
  }

  const handleWeightAdjust = (amount) => {
    const current = parseFloat(weightKg) || 0
    const nextVal = Number((current + amount).toFixed(2))
    if (nextVal < 0.2) {
      setWeightKg(0.2)
      setErrorFeedback('La cantidad menor permitida es 0.2 kg')
      setTimeout(() => setErrorFeedback(''), 3000)
    } else {
      setWeightKg(nextVal)
      setErrorFeedback('')
    }
  }

  const handleAddToCart = () => {
    const finalWeight = parseFloat(weightKg)
    if (isNaN(finalWeight) || finalWeight < 0.2) {
      setWeightKg(0.2)
      setErrorFeedback('La cantidad menor permitida es 0.2 kg')
      setTimeout(() => setErrorFeedback(''), 3000)
      return
    }

    addToCart({
      cutId: cut.id,
      cutName: cut.name,
      weightKg: finalWeight,
      prepOption,
      thickness: allowThickness ? thickness : '',
      pricePerKg: cut.pricePerKg || 0,
      notes: notes.trim()
    })
    setAddedSuccess(true)
    setTimeout(() => {
      setAddedSuccess(false)
      onClose()
    }, 800)
  }

  return (
    <div className="cut-modal-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        className="cut-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalles de ${cut.name}`}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="cut-modal__header">
          <div className="cut-modal__badge-group">
            {cut.isRegional && <span className="badge badge--gold">Favorito de la casa</span>}
            <span className="badge badge--dark">{cut.category}</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="cut-modal__close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            <Icon.Close size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="cut-modal__body">
          <h2 className="cut-modal__name">{cut.name}</h2>
          <p className="cut-modal__english">{cut.english}</p>

          <div className="cut-modal__price-tag">
            <span className="cut-modal__price">{formatPrice(cut.pricePerKg || 280)}</span>
            <span className="cut-modal__unit">por kilo · estimado</span>
          </div>

          <p className="cut-modal__desc">{cut.description}</p>

          {/* Quick Specs */}
          <div className="cut-modal__specs">
            <div className="spec-item">
              <Icon.MapPin size={16} />
              <div>
              <strong>Tipo / origen:</strong>
                <span>{cut.location}</span>
              </div>
            </div>

            <div className="spec-item">
              <Icon.Flame size={16} />
              <div>
                <strong>Marmoleo:</strong>
                <span>{cut.marbling || 'Excelente'}</span>
              </div>
            </div>

            <div className="spec-item">
              <Icon.Knife size={16} />
              <div>
                <strong>Textura:</strong>
                <span>
                  {cut.texture === 'tierna' && 'Muy tierna'}
                  {cut.texture === 'intermedia' && 'Semitierna'}
                  {cut.texture === 'firme' && 'Firme / Para cocción'}
                </span>
              </div>
            </div>
          </div>

          {/* Methods */}
          <div className="cut-modal__methods">
            <label>Métodos recomendados de cocción:</label>
            <div className="cut-modal__methods-chips">
              {cut.methods.map((m) => (
                <span key={m} className="method-chip">
                  <Icon.Check size={12} />
                  {m}
                </span>
              ))}
            </div>
          </div>

          <hr className="cut-modal__divider" />

          {/* Order Customizer Form */}
          <div className="cut-modal__customizer">
            <h3>Hazlo a tu manera.</h3>

            {/* Preparation Option */}
            <div className="form-group">
              <label>Servicio de preparación:</label>
              <div className="prep-options" role="group" aria-label="Servicio de preparación">
                {canGrill && (
                  <button
                    type="button"
                    className={`prep-btn ${prepOption === 'asado' ? 'prep-btn--active' : ''}`}
                    onClick={() => setPrepOption('asado')}
                    aria-pressed={prepOption === 'asado'}
                  >
                    <Icon.Flame size={16} />
                    <span>Asado al momento (GRATIS)</span>
                  </button>
                )}
                {cut.canMarinate !== false && (
                  <button
                    type="button"
                    className={`prep-btn ${prepOption === 'marinado' ? 'prep-btn--active' : ''}`}
                    onClick={() => setPrepOption('marinado')}
                    aria-pressed={prepOption === 'marinado'}
                  >
                    <span>Marinado especial</span>
                  </button>
                )}
                <button
                  type="button"
                  className={`prep-btn ${prepOption === 'fresco' ? 'prep-btn--active' : ''}`}
                  onClick={() => setPrepOption('fresco')}
                  aria-pressed={prepOption === 'fresco'}
                >
                  <span>Fresco (sin asar)</span>
                </button>
              </div>
            </div>

            {/* Weight selector */}
            <div className="form-row">
              <div className="form-group">
                <label>Cantidad (Kilos):</label>
                <div className="weight-input-group">
                  <button
                    type="button"
                    onClick={() => handleWeightAdjust(-0.5)}
                    aria-label="Restar 0.5 kilos"
                  >
                    <Icon.Minus size={14} />
                  </button>
                  <input
                    type="number"
                    min="0.2"
                    step="0.1"
                    value={weightKg}
                    onChange={handleWeightChange}
                    onBlur={handleWeightBlur}
                    aria-label="Cantidad en kilos"
                  />
                  <button
                    type="button"
                    onClick={() => handleWeightAdjust(0.5)}
                    aria-label="Sumar 0.5 kilos"
                  >
                    <Icon.Plus size={14} />
                  </button>
                </div>
                {errorFeedback && (
                  <div role="alert" style={{ color: '#9f2918', fontSize: '0.78rem', marginTop: '0.3rem', fontWeight: '700' }}>
                    {errorFeedback}
                  </div>
                )}
              </div>

              {allowThickness && (
                <div className="form-group">
                  <label>Grosor de corte:</label>
                  <select value={thickness} onChange={(e) => setThickness(e.target.value)} aria-label="Grosor del corte">
                    <option value="Delgado (1/2 pulgada)">Delgado (1/2")</option>
                    <option value="Estándar (3/4 pulgada)">Estándar (3/4")</option>
                    <option value="1 pulgada">1 pulgada (Parrillero)</option>
                    <option value="Corte grueso (1 1/2 pulgada)">Corte grueso (1 1/2")</option>
                    <option value="Pieza entera sin cortar">Pieza entera sin cortar</option>
                  </select>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="form-group">
              <label>Instrucciones o notas adicionales (opcional):</label>
              <input
                type="text"
                placeholder="Ej. Poca sal, empacado en bolsas separadas..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                aria-label="Instrucciones o notas adicionales"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="cut-modal__footer">
          <div className="cut-modal__subtotal">
            <span>Subtotal estimado:</span>
            <strong>{formatPrice(subtotalMXN)}</strong>
          </div>
          <button
            className={`btn btn--primary cut-modal__add-btn ${addedSuccess ? 'btn--success' : ''}`}
            onClick={handleAddToCart}
          >
            {addedSuccess ? (
              <>
                <Icon.Check size={18} />
                ¡Agregado al Pedido!
              </>
            ) : (
              <>
                <Icon.ShoppingBag size={18} />
                Agregar al pedido
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
