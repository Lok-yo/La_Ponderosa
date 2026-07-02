import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

const STORE_PHONE = '526535362121' // San Luis Río Colorado

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
    const itemId = `${newItem.cutId}_${newItem.prepOption}_${newItem.thickness}`
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].weightKg = Number((updated[existingIndex].weightKg + newItem.weightKg).toFixed(2))
        return updated
      } else {
        return [...prev, { ...newItem, id: itemId }]
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

    let message = `*🔥 ¡Hola Carnicería La Ponderosa 22! Quisiera realizar el siguiente pedido:*%0A%0A`
    
    cart.forEach((item, index) => {
      const itemSubtotal = Math.round(item.weightKg * (item.pricePerKg || 0))
      let prepText = '🥩 Fresco'
      if (item.prepOption === 'marinado') prepText = '🧂 Marinado especial'
      if (item.prepOption === 'asado') prepText = '🔥 Asado al momento (GRATIS)'

      message += `*${index + 1}. ${item.cutName}*%0A`
      message += `   • Cantidad: ${item.weightKg} kg%0A`
      message += `   • Servicio: ${prepText}%0A`
      if (item.thickness) message += `   • Grosor: ${item.thickness}%0A`
      if (item.notes) message += `   • Notas: ${item.notes}%0A`
      message += `   • Est. Subtotal: $${itemSubtotal} MXN%0A%0A`
    })

    const total = Math.round(getCartTotal())
    message += `-----------------------------------%0A`
    message += `*💰 TOTAL ESTIMADO: $${total} MXN*%0A`
    message += `📍 *Entrega:* Pasar a la sucursal de San Luis Río Colorado%0A`
    message += `Por favor confirmen disponibilidad y tiempo de entrega. ¡Gracias!`

    return `https://wa.me/${STORE_PHONE}?text=${message}`
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
