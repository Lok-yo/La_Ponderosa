import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

import Home from './pages/Home'
import Cortes from './pages/Cortes'
import Calculadora from './pages/Calculadora'
import GuiaParrillera from './pages/GuiaParrillera'
import Recetas from './pages/Recetas'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <CartProvider>
      <ScrollToTop />
      <Navbar />
      <CartDrawer />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cortes" element={<Cortes />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/guia-parrillera" element={<GuiaParrillera />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </CartProvider>
  )
}
