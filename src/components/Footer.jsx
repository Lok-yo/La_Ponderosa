import { Link } from 'react-router-dom'
import { Icon } from './Icons'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand-col">
            <div className="footer__brand">
              <span className="footer__brand-mark">22</span>
              <div>
                <div className="footer__brand-name">La Ponderosa</div>
                <div className="footer__brand-sub">Carnicería & Steakhouse</div>
              </div>
            </div>
            <p className="footer__desc">
              Cortes de res de calidad sonorense superior. Oficio, servicio de asado gratis
              y herramientas para el parrillero en San Luis Río Colorado.
            </p>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">Navegación</h4>
            <ul className="footer__links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/cortes">Catálogo de Cortes</Link></li>
              <li><Link to="/calculadora">Calculadora de Eventos</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">Contacto & Servicio</h4>
            <ul className="footer__contact">
              <li>
                <Icon.MapPin size={16} />
                <span>Av. Tamaulipas y Calle 22<br/>San Luis Río Colorado, Son.</span>
              </li>
              <li>
                <Icon.Phone size={16} />
                <a href="tel:+526535362121">(653) 536 2121</a>
              </li>
              <li>
                <Icon.Clock size={16} />
                <span>Lun a Dom · 10:00 AM — 7:00 PM</span>
              </li>
              <li>
                <Icon.Flame size={16} />
                <span>Servicio de Asado GRATIS</span>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__title">Síguenos & Pedidos</h4>
            <div className="footer__social">
              <a
                href="https://www.facebook.com/p/La-Ponderosa-22-100057663810878/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Icon.Facebook size={18} />
              </a>
              <a
                href="https://wa.me/5216531324510"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <Icon.Whatsapp size={18} />
              </a>
            </div>
            <p className="footer__note">
              Cotiza y pide directo a WhatsApp con envío a domicilio.
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {year} Carnicería La Ponderosa 22 · San Luis Río Colorado, Sonora</p>
          <p className="footer__small">Cortes finos, calidad sonorense y pasión por las brasas.</p>
        </div>
      </div>
    </footer>
  )
}
