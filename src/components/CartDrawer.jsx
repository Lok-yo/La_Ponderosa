import React, { useEffect } from 'react'
import { useCart } from '../context/CartContext'
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

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isCartOpen])

  if (!isCartOpen) return null

  const total = Math.round(getCartTotal())
  const whatsappUrl = generateWhatsAppUrl()

  return (
    <div className="cart-drawer-overlay" onClick={closeCart}>
      <div
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Carrito de Pedidos"
      >
        {/* Header */}
        <div className="cart-drawer__header">
          <div className="cart-drawer__title-group">
            <Icon.ShoppingBag size={22} className="cart-drawer__icon" />
            <h2>Tu Cotización de Pedido</h2>
          </div>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Cerrar carrito">
            <Icon.Close size={20} />
          </button>
        </div>

        {/* Free grill service callout */}
        <div className="cart-drawer__banner">
          <Icon.Flame size={18} />
          <span>¡Recuerda que te asamos la carne <strong>GRATIS</strong> al momento!</span>
        </div>

        {/* Body */}
        <div className="cart-drawer__body">
          {cart.length === 0 ? (
            <div className="cart-drawer__empty">
              <Icon.ShoppingBag size={48} />
              <p>Tu carrito está vacío</p>
              <span>Explora nuestro catálogo y agrega los cortes que deseas para tu carne asada.</span>
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
                        className="cart-item__remove"
                        onClick={() => removeFromCart(item.id)}
                        title="Eliminar corte"
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
                          onClick={() => updateWeight(item.id, item.weightKg - 0.5)}
                          title="Restar 0.5 kg"
                        >
                          <Icon.Minus size={14} />
                        </button>
                        <span className="cart-item__weight">{item.weightKg} kg</span>
                        <button
                          onClick={() => updateWeight(item.id, item.weightKg + 0.5)}
                          title="Sumar 0.5 kg"
                        >
                          <Icon.Plus size={14} />
                        </button>
                      </div>
                      <div className="cart-item__price">${subtotal} MXN</div>
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
                <strong className="cart-drawer__total">${total} MXN</strong>
              </div>
              <p className="cart-drawer__disclaimer">
                *Precios orientativos sujetas a pesaje exacto en báscula.
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
                Enviar Pedido por WhatsApp
              </a>
              <button className="cart-drawer__btn-clear" onClick={clearCart}>
                Vaciar Carrito
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
