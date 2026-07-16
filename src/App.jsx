import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { CurrencyProvider } from './context/CurrencyContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'

import Home from './pages/Home'
import Cortes from './pages/Cortes'
import Calculadora from './pages/Calculadora'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'

const routeMetadata = {
  '/': {
    title: 'La Ponderosa 22 | Carnicería y asado gratis en San Luis Río Colorado',
    description: 'Elige cortes y kilos, personaliza el grosor y recoge tu pedido fresco, marinado o asado sin costo en La Ponderosa 22.'
  },
  '/cortes': {
    title: 'Cortes y precios | La Ponderosa 22',
    description: 'Compara cortes, precios por kilo y preparaciones. Personaliza tu pedido y envíalo para confirmar por WhatsApp.'
  },
  '/calculadora': {
    title: 'Calculadora de carne asada | La Ponderosa 22',
    description: 'Calcula kilos, mezcla de cortes y presupuesto para tu reunión, y agrega la recomendación completa a tu pedido.'
  },
  '/nosotros': {
    title: 'La casa | La Ponderosa 22',
    description: 'Conoce la manera de trabajar de La Ponderosa 22: corte al gusto, atención directa y asado al momento.'
  },
  '/contacto': {
    title: 'Horarios, mapa y contacto | La Ponderosa 22',
    description: 'Encuentra La Ponderosa 22 en Av. Tamaulipas y Calle 22, San Luis Río Colorado. Consulta horarios, teléfono y mapa.'
  }
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function RouteMetadata() {
  const { pathname } = useLocation()

  useEffect(() => {
    const metadata = routeMetadata[pathname] || {
      title: 'Página no encontrada | La Ponderosa 22',
      description: 'Vuelve al inicio de La Ponderosa 22 para consultar cortes, armar tu asado o encontrar la sucursal.'
    }
    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
  }, [pathname])

  return null
}

export default function App() {
  return (
    <CurrencyProvider>
      <CartProvider>
        <ScrollToTop />
        <RouteMetadata />
        <a className="skip-link" href="#main-content">Saltar al contenido</a>
        <Navbar />
        <CartDrawer />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cortes" element={<Cortes />} />
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </CurrencyProvider>
  )
}

