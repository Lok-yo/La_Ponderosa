import { Link, useLocation } from 'react-router-dom'
import { Icon } from './Icons'
import './Breadcrumbs.css'

/**
 * Breadcrumbs para navegación jerárquica.
 *
 * Props:
 * - items: array opcional de { label, to } (sin contar Home).
 *          Si se omite, se infiere a partir de la ruta actual.
 */
export default function Breadcrumbs({ items }) {
  const location = useLocation()

  // Build default trail based on path
  const trails = {
    '/': [],
    '/cortes': [{ label: 'Cortes' }],
    '/calculadora': [{ label: 'Calculadora' }],
    '/nosotros': [{ label: 'Nosotros' }],
    '/contacto': [{ label: 'Contacto' }]
  }

  const trail = items !== undefined ? items : (trails[location.pathname] || [])

  return (
    <nav className="breadcrumbs" aria-label="Migas de pan">
      <div className="container-wide breadcrumbs__inner">
        <ol className="breadcrumbs__list">
          <li className="breadcrumbs__item">
            <Link to="/" className="breadcrumbs__link breadcrumbs__link--home">
              <Icon.Home size={14} />
              <span>Inicio</span>
            </Link>
          </li>
          {trail.map((item, idx) => {
            const isLast = idx === trail.length - 1
            return (
              <li key={idx} className="breadcrumbs__item">
                <Icon.ChevronRight size={12} className="breadcrumbs__sep" />
                {isLast || !item.to ? (
                  <span className="breadcrumbs__current" aria-current="page">{item.label}</span>
                ) : (
                  <Link to={item.to} className="breadcrumbs__link">{item.label}</Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
