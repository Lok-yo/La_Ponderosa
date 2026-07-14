import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container-wide">
        <div className="footer__masthead">
          <div className="footer__brand">
            <img
              src="/brand/la-ponderosa-logo.webp"
              width="960"
              height="610"
              alt="Carnicería La Ponderosa 22"
            />
          </div>
          <p>Carne de primera.<br /><em>El fuego va por la casa.</em></p>
        </div>

        <div className="footer__grid">
          <div className="footer__intro">
            <span className="footer__label">La 22</span>
            <p>
              Elige tus cortes, personaliza el pedido y recógelo fresco o asado al momento.
              Precio, peso y disponibilidad se confirman por WhatsApp.
            </p>
            <a
              href="https://wa.me/5216531324510?text=Hola%2C%20quisiera%20hacer%20un%20pedido"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__wa"
            >
              <Icon.Whatsapp size={18} />
              Hacer un pedido
              <Icon.ArrowUpRight size={16} />
            </a>
          </div>

          <nav className="footer__col" aria-label="Navegación del pie">
            <h2 className="footer__title">Explora</h2>
            <ul className="footer__links">
              <li><Link to="/cortes">Cortes y precios</Link></li>
              <li><Link to="/calculadora">Calculadora</Link></li>
              <li><Link to="/nosotros">La casa</Link></li>
              <li><Link to="/contacto">Horarios y mapa</Link></li>
            </ul>
          </nav>

          <div className="footer__col">
            <h2 className="footer__title">Visítanos</h2>
            <ul className="footer__contact">
              <li>
                <Icon.MapPin size={16} />
                <span>Av. Tamaulipas y Calle 22<br />San Luis Río Colorado, Sonora</span>
              </li>
              <li>
                <Icon.Phone size={16} />
                <a href="tel:+526535362121">(653) 536 2121</a>
              </li>
              <li>
                <Icon.Clock size={16} />
                <span>Lun y mié–sáb · 10 AM–7 PM<br />Martes · 10 AM–4 PM · Domingo · 10 AM–6 PM</span>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h2 className="footer__title">Síguenos</h2>
            <div className="footer__social">
              <a
                href="https://www.facebook.com/p/La-Ponderosa-22-100057663810878/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="La Ponderosa 22 en Facebook"
              >
                <Icon.Facebook size={19} />
              </a>
              <a
                href="https://wa.me/5216531324510"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pedir por WhatsApp"
              >
                <Icon.Whatsapp size={19} />
              </a>
            </div>
            <p className="footer__pickup">Pedidos para recoger en sucursal.</p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} Carnicería La Ponderosa 22</p>
          <p>Hecho para la carne asada de frontera.</p>
        </div>
      </div>
    </footer>
  )
}
