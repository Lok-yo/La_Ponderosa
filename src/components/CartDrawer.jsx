import React, { useEffect, useRef } from 'react'
import { registerDialogLayer, useCart } from '../context/CartContext'
import { useCurrency } from '../context/CurrencyContext'
import { Icon } from './Icons'
import './CartDrawer.css'

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateWeight,
    getCartTotal,
    clearCart,
    generateWhatsAppUrl
  } = useCart()
  const { formatPrice } = useCurrency()

  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const closeCartRef = useRef(closeCart)

  useEffect(() => {
    closeCartRef.current = closeCart
  }, [closeCart])

  useEffect(() => {
    if (!isCartOpen) return undefined

    const returnFocusElement = document.activeElement
    const dialogElement = dialogRef.current
    const unregisterDialog = registerDialogLayer(() => closeCartRef.current(), dialogElement)

    closeButtonRef.current?.focus({ preventScroll: true })

    return () => {
      unregisterDialog()

      const activeElement = document.activeElement
      const focusWasInDialog =
        activeElement === document.body || dialogElement?.contains(activeElement)

      if (!focusWasInDialog) return

      const fallbackFocusElement = document.querySelector('.nav__cart-btn')
      const elementToFocus =
        returnFocusElement instanceof HTMLElement &&
        returnFocusElement !== document.body &&
        returnFocusElement.isConnected
          ? returnFocusElement
          : fallbackFocusElement

      if (elementToFocus instanceof HTMLElement && elementToFocus.isConnected) {
        elementToFocus.focus({ preventScroll: true })
      }
    }
  }, [isCartOpen])

  if (!isCartOpen) return null

  const total = Math.round(getCartTotal())
  const whatsappUrl = generateWhatsAppUrl()

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <div
        ref={dialogRef}
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Tu pedido"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title-group">
            <Icon.ShoppingBag size={22} className="cart-drawer__icon" />
            <h2>Tu pedido</h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="cart-drawer__close"
            onClick={closeCart}
            aria-label="Cerrar carrito"
          >
            <Icon.Close size={20} />
          </button>
        </div>

        {/* Free grill service callout */}
        <div className="cart-drawer__banner">
          <Icon.Flame size={18} />
          <span>La carne la pagas. El asado, <strong>no</strong>.</span>
        </div>

        {/* Body */}
        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <Icon.ShoppingBag size={48} />
              <p>Todavía no hay nada sobre el asador.</p>
              <span>Explora el catálogo y agrega los cortes que quieres llevar.</span>
            </div>
          ) : (
            <div className="cart-drawer__list">
              {cart.map((item) => {
                const subtotal = Math.round(item.weightKg * (item.pricePerKg || 0))
                return (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item__head">
                      <h3 className="cart-item__title">{item.cutName}</h3>
                      <button
                        type="button"
                        className="cart-item__remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Eliminar ${item.cutName} del pedido`}
                      >
                        <Icon.Trash size={16} />
                      </button>
                    </div>

                    <div className="cart-item__details">
                      <span className="cart-item__prep-badge">
                        {item.prepOption === 'fresco' && 'Fresco'}
                        {item.prepOption === 'marinado' && 'Marinado especial'}
                        {item.prepOption === 'asado' && 'Asado gratis'}
                      </span>
                      {item.thickness && <span className="cart-item__meta">Grosor: {item.thickness}</span>}
                    </div>

                    {item.notes && <p className="cart-item__notes">Nota: "{item.notes}"</p>}

                    <div className="cart-item__foot">
                      <div className="cart-item__weight-control">
                        <button
                          type="button"
                          onClick={() => updateWeight(item.id, item.weightKg - 0.5)}
                          aria-label={`Restar 0.5 kilos de ${item.cutName}`}
                        >
                          <Icon.Minus size={14} />
                        </button>
                        <span className="cart-item__weight">{item.weightKg} kg</span>
                        <button
                          type="button"
                          onClick={() => updateWeight(item.id, item.weightKg + 0.5)}
                          aria-label={`Sumar 0.5 kilos de ${item.cutName}`}
                        >
                          <Icon.Plus size={14} />
                        </button>
                      </div>
                      <div className="cart-item__price">{formatPrice(subtotal)}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__summary">
              <div className="cart-drawer__summary-row">
                <span>Total Estimado ({cart.length} cortes):</span>
                <strong className="cart-drawer__total">{formatPrice(total)}</strong>
              </div>
              <p className="cart-drawer__disclaimer">
                Precio estimado. Confirmamos peso, disponibilidad y hora por WhatsApp.
              </p>
            </div>

            <div className="cart-drawer__actions">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary cart-drawer__btn-wa"
              >
                <Icon.Whatsapp size={20} />
                Enviar para confirmar
              </a>
              <button type="button" className="cart-drawer__btn-clear" onClick={clearCart}>
                Vaciar pedido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
