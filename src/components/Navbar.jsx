import React, { useEffect, useRef, useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Icon } from './Icons'
import { registerDialogLayer, useCart } from '../context/CartContext'
import StoreStatusBadge from './StoreStatusBadge'
import CurrencyToggle from './CurrencyToggle'
import './Navbar.css'

const links = [
  { to: '/cortes', label: 'Cortes' },
  { to: '/calculadora', label: 'Arma tu asado' },
  { to: '/nosotros', label: 'La casa' },
  { to: '/contacto', label: 'Visítanos' }
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  const location = useLocation()
  const { openCart, getCartItemCount } = useCart()
  const itemCount = getCartItemCount()

  useEffect(() => {
    const handler = () => {
      const isScrolled = window.scrollY > 24
      setScrolled(isScrolled)
      document.documentElement.style.setProperty('--nav-height', isScrolled ? '70px' : '78px')
    }

    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined

    const menuElement = menuRef.current
    const returnFocusElement = document.activeElement
    const unregisterDialog = registerDialogLayer(() => setOpen(false), menuElement)
    menuElement?.querySelector('a')?.focus({ preventScroll: true })

    return () => {
      unregisterDialog()
      const focusTarget =
        returnFocusElement instanceof HTMLElement &&
        returnFocusElement.isConnected
          ? returnFocusElement
          : toggleRef.current
      focusTarget?.focus({ preventScroll: true })
    }
  }, [open])

  return (
    <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`} aria-label="Navegación principal">
      <div className="nav__inner container-wide">
        <Link to="/" className="nav__brand" aria-label="La Ponderosa 22, inicio">
          <span className="nav__brand-mark" aria-hidden="true">
            <strong>LP</strong>
            <small>22</small>
          </span>
          <span className="nav__brand-text">
            <span className="nav__brand-name">La Ponderosa</span>
            <span className="nav__brand-sub">Carnicería · SLRC</span>
          </span>
        </Link>

        <div className="nav__status-wrapper">
          <StoreStatusBadge />
        </div>

        <ul ref={menuRef} id="main-menu" className={`nav__links ${open ? 'nav__links--open' : ''}`}>
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="nav__mobile-service">
            <span>La carne la pagas.</span>
            <strong>El asado, no.</strong>
          </li>
        </ul>

        <div className="nav__actions">
          <CurrencyToggle />

          <button
            className="nav__cart-btn"
            onClick={openCart}
            aria-label={`Abrir pedido${itemCount ? `, ${itemCount} productos` : ''}`}
          >
            <Icon.ShoppingBag size={18} />
            <span className="nav__cart-label">Mi pedido</span>
            {itemCount > 0 && <span className="nav__cart-badge">{itemCount}</span>}
          </button>

          <button
            ref={toggleRef}
            className="nav__toggle"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="main-menu"
          >
            {open ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>
    </nav>
  )
}
