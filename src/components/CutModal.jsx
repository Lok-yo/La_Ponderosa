import React, { useState } from 'react'
import { useCart } from '../context/CartContext'
import { Icon } from './Icons'
import './CutModal.css'

export default function CutModal({ cut, onClose }) {
  const { addToCart } = useCart()

  const [weightKg, setWeightKg] = useState(1.0)
  const [prepOption, setPrepOption] = useState('asado') // Default to popular free grill service
  const [thickness, setThickness] = useState('1 pulgada')
  const [notes, setNotes] = useState('')
  const [addedSuccess, setAddedSuccess] = useState(false)

  if (!cut) return null

  const subtotal = Math.round(weightKg * (cut.pricePerKg || 0))

  const handleAddToCart = () => {
    addToCart({
      cutId: cut.id,
      cutName: cut.name,
      weightKg: Number(weightKg),
      prepOption,
      thickness,
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
        className="cut-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={`Detalles de ${cut.name}`}
      >
        {/* Header */}
        <div className="cut-modal__header">
          <div className="cut-modal__badge-group">
            {cut.isRegional && <span className="badge badge--gold">⭐️ Especial Sonorense</span>}
            <span className="badge badge--dark">{cut.category}</span>
          </div>
          <button className="cut-modal__close" onClick={onClose} aria-label="Cerrar modal">
            <Icon.Close size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="cut-modal__body">
          <h2 className="cut-modal__name">{cut.name}</h2>
          <p className="cut-modal__english">{cut.english}</p>

          <div className="cut-modal__price-tag">
            <span className="cut-modal__price">${cut.pricePerKg || 280} MXN</span>
            <span className="cut-modal__unit">/ Kilo aproximado</span>
          </div>

          <p className="cut-modal__desc">{cut.description}</p>

          {/* Quick Specs */}
          <div className="cut-modal__specs">
            <div className="spec-item">
              <Icon.MapPin size={16} />
              <div>
                <strong>Ubicación:</strong>
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
            <h3>Personalizar para tu Pedido:</h3>

            {/* Preparation Option */}
            <div className="form-group">
              <label>Servicio de preparación:</label>
              <div className="prep-options">
                <button
                  className={`prep-btn ${prepOption === 'asado' ? 'prep-btn--active' : ''}`}
                  onClick={() => setPrepOption('asado')}
                >
                  <Icon.Flame size={16} />
                  <span>🔥 Asado al momento (GRATIS)</span>
                </button>
                <button
                  className={`prep-btn ${prepOption === 'marinado' ? 'prep-btn--active' : ''}`}
                  onClick={() => setPrepOption('marinado')}
                >
                  <span>🧂 Marinado especial</span>
                </button>
                <button
                  className={`prep-btn ${prepOption === 'fresco' ? 'prep-btn--active' : ''}`}
                  onClick={() => setPrepOption('fresco')}
                >
                  <span>🥩 Fresco (sin asar)</span>
                </button>
              </div>
            </div>

            {/* Weight selector */}
            <div className="form-row">
              <div className="form-group">
                <label>Cantidad (Kilos):</label>
                <div className="weight-input-group">
                  <button onClick={() => setWeightKg(Math.max(0.5, Number((weightKg - 0.5).toFixed(1))))}>
                    <Icon.Minus size={14} />
                  </button>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  />
                  <button onClick={() => setWeightKg(Number((weightKg + 0.5).toFixed(1)))}>
                    <Icon.Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Grosor de corte:</label>
                <select value={thickness} onChange={(e) => setThickness(e.target.value)}>
                  <option value="Delgado (1/2 pulgada)">Delgado (1/2")</option>
                  <option value="Estándar (3/4 pulgada)">Estándar (3/4")</option>
                  <option value="1 pulgada">1 pulgada (Parrillero)</option>
                  <option value="Corte grueso (1 1/2 pulgada)">Corte grueso (1 1/2")</option>
                  <option value="Pieza entera sin cortar">Pieza entera sin cortar</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label>Instrucciones o notas adicionales (opcional):</label>
              <input
                type="text"
                placeholder="Ej. Poca sal, empacado en bolsas separadas..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="cut-modal__footer">
          <div className="cut-modal__subtotal">
            <span>Subtotal estimado:</span>
            <strong>${subtotal} MXN</strong>
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
                Agregar al Carrito
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
