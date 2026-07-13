import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

const STORE_PHONE = '5216531324510' // San Luis Río Colorado (WhatsApp Móvil)

let bodyScrollLockCount = 0
let bodyOverflowBeforeLock = ''
const dialogLayers = []

function lockBodyScroll() {
  if (bodyScrollLockCount === 0) {
    bodyOverflowBeforeLock = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }

  bodyScrollLockCount += 1

  let released = false
  return () => {
    if (released) return
    released = true
    bodyScrollLockCount = Math.max(0, bodyScrollLockCount - 1)

    if (bodyScrollLockCount === 0) {
      document.body.style.overflow = bodyOverflowBeforeLock
      bodyOverflowBeforeLock = ''
    }
  }
}

// Keeps overlapping dialogs (cut details + cart) from fighting over Escape or body scroll.
export function registerDialogLayer(onEscape, dialogElement) {
  if (typeof document === 'undefined') return () => {}

  const layer = { onEscape, dialogElement }
  const releaseScrollLock = lockBodyScroll()
  dialogLayers.push(layer)

  const handleKeyDown = (event) => {
    const topLayer = dialogLayers[dialogLayers.length - 1]
    if (topLayer !== layer) return

    if (event.key === 'Escape') {
      event.preventDefault()
      onEscape()
      return
    }

    if (event.key !== 'Tab' || !dialogElement) return

    const focusable = Array.from(dialogElement.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter((element) => !element.hasAttribute('hidden') && element.getClientRects().length > 0)

    if (focusable.length === 0) {
      event.preventDefault()
      dialogElement.focus({ preventScroll: true })
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus({ preventScroll: true })
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus({ preventScroll: true })
    }
  }

  document.addEventListener('keydown', handleKeyDown)

  let unregistered = false
  return () => {
    if (unregistered) return
    unregistered = true

    document.removeEventListener('keydown', handleKeyDown)
    const layerIndex = dialogLayers.indexOf(layer)
    if (layerIndex !== -1) dialogLayers.splice(layerIndex, 1)
    releaseScrollLock()
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ponderosa_cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem('ponderosa_cart', JSON.stringify(cart))
    } catch (err) {
      console.error('Error saving cart to localStorage', err)
    }
  }, [cart])

  const addToCart = (newItem) => {
    // newItem format: { cutId, cutName, weightKg, prepOption, thickness, pricePerKg, notes }
    const normalizedNotes = newItem.notes?.trim() || ''
    const itemId = JSON.stringify([
      newItem.cutId,
      newItem.prepOption,
      newItem.thickness,
      normalizedNotes
    ])
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].weightKg = Number((updated[existingIndex].weightKg + newItem.weightKg).toFixed(2))
        return updated
      } else {
        return [...prev, { ...newItem, notes: normalizedNotes, id: itemId }]
      }
    })
    setIsCartOpen(true)
  }

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateWeight = (id, newWeight) => {
    if (newWeight <= 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, weightKg: Number(newWeight.toFixed(2)) } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.weightKg * (item.pricePerKg || 0), 0)
  }

  const getCartItemCount = () => {
    return cart.length
  }

  const generateWhatsAppUrl = () => {
    if (cart.length === 0) return ''

    let message = '*Hola Carnicería La Ponderosa. Quisiera realizar el siguiente pedido:*\n\n'
    
    cart.forEach((item, index) => {
      let prepText = 'Fresco'
      if (item.prepOption === 'marinado') prepText = 'Marinado especial'
      if (item.prepOption === 'asado') prepText = 'Asado al momento (GRATIS)'

      message += `*${index + 1}. ${item.cutName}*\n`
      message += `• Cantidad: ${item.weightKg} kg\n`
      message += `• Servicio: ${prepText}\n`
      if (item.thickness) message += `• Grosor: ${item.thickness}\n`
      if (item.notes) message += `• Notas: ${item.notes}\n`
      message += '\n'
    })

    message += 'Por favor confirmen disponibilidad, total y hora de recogida. ¡Gracias!'

    return `https://wa.me/${STORE_PHONE}?text=${encodeURIComponent(message)}`
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateWeight,
        clearCart,
        getCartTotal,
        getCartItemCount,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        toggleCart: () => setIsCartOpen((prev) => !prev),
        generateWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
