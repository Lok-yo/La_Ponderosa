import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Icon } from './Icons'
import { useCart } from '../context/CartContext'
import StoreStatusBadge from './StoreStatusBadge'
import ThemeToggle from './ThemeToggle'
import './Navbar.css'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/cortes', label: 'Cortes' },
  { to: '/calculadora', label: 'Calculadora' },
  { to: '/guia-parrillera', label: 'Guía Parrillera' },
  { to: '/recetas', label: 'Recetas' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { openCart, getCartItemCount } = useCart()
  const itemCount = getCartItemCount()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner container-wide">
        <Link to="/" className="nav__brand" onClick={() => setOpen(false)}>
          <div className="nav__brand-mark">
            <span className="nav__brand-serif">22</span>
          </div>
          <div className="nav__brand-text">
            <span className="nav__brand-name">La Ponderosa</span>
            <span className="nav__brand-sub">Carnicería & Steakhouse</span>
          </div>
        </Link>

        <div className="nav__status-wrapper">
          <StoreStatusBadge />
        </div>

        <ul className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {links.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="nav__actions">
          <ThemeToggle />

          <button
            className="nav__cart-btn"
            onClick={openCart}
            title="Ver tu cotización de pedido"
            aria-label="Abrir carrito"
          >
            <Icon.ShoppingBag size={20} />
            <span className="nav__cart-label">Pedido</span>
            {itemCount > 0 && <span className="nav__cart-badge">{itemCount}</span>}
          </button>

          <button
            className="nav__toggle"
            onClick={() => setOpen(o => !o)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            {open ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>
    </nav>
  )
}
