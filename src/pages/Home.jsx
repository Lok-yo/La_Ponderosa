import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { cuts, categories } from '../data/cuts'
import MeatAnatomyMap from '../components/MeatAnatomyMap'
import CutModal from '../components/CutModal'
import StoreStatusBadge from '../components/StoreStatusBadge'
import { useReveal } from '../hooks/useReveal'
import { useCurrency } from '../context/CurrencyContext'
import './Home.css'

const featuredIds = ['rib-eye', 'filete-cabreria', 'diezmillo', 'arrachera-marinada']

const steps = [
  {
    number: '01',
    title: 'Elige tu corte',
    text: 'Explora precios, texturas y recomendaciones para encontrar lo que sí va con tu reunión.'
  },
  {
    number: '02',
    title: 'Dinos cómo',
    text: 'Define kilos, grosor y preparación: fresco, marinado o directo a las brasas.'
  },
  {
    number: '03',
    title: 'Recoge y comparte',
    text: 'Confirmamos por WhatsApp. Pasa por tu pedido crudo o recién asado, listo para la mesa.'
  }
]

export default function Home() {
  useReveal()
  const navigate = useNavigate()
  const { formatPrice } = useCurrency()
  const [selectedCutForModal, setSelectedCutForModal] = useState(null)
  const featuredCuts = featuredIds.map((id) => cuts.find((cut) => cut.id === id)).filter(Boolean)

  return (
    <>
      <CutModal cut={selectedCutForModal} onClose={() => setSelectedCutForModal(null)} />

      <section className="hero">
        <div className="hero__grid container-wide">
          <div className="hero__content">
            <div className="hero__kicker">
              <span>Carnicería de barrio</span>
              <span>San Luis Río Colorado</span>
            </div>

            <h1 className="hero__title">
              Carne de primera.
              <em>El fuego va por la casa.</em>
            </h1>

            <p className="hero__lead">
              Elige tus cortes, dinos el grosor y te los asamos sin costo. Arma tu pedido y
              recógelo listo para compartir en la 22.
            </p>

            <div className="hero__cta">
              <Link to="/cortes" className="btn btn--primary">
                Armar mi pedido
                <Icon.ArrowRight />
              </Link>
              <Link to="/contacto" className="btn btn--outline">
                Cómo llegar
                <Icon.MapPin size={17} />
              </Link>
            </div>

            <div className="hero__proof" aria-label="Datos destacados">
              <div>
                <strong>4.5</strong>
                <span><Icon.Star size={13} /> Reseñas locales</span>
              </div>
              <div>
                <strong>{cuts.length}</strong>
                <span>Opciones en catálogo</span>
              </div>
              <div>
                <strong>$0</strong>
                <span>Servicio de asado</span>
              </div>
            </div>
          </div>

          <div className="hero__visual">
            <div className="hero__image-frame">
              <img
                src="https://images.unsplash.com/photo-1539984760768-e4c519848eea?auto=format&fit=crop&w=1200&q=86"
                srcSet="https://images.unsplash.com/photo-1539984760768-e4c519848eea?auto=format&fit=crop&w=640&q=82 640w, https://images.unsplash.com/photo-1539984760768-e4c519848eea?auto=format&fit=crop&w=960&q=84 960w, https://images.unsplash.com/photo-1539984760768-e4c519848eea?auto=format&fit=crop&w=1400&q=86 1400w"
                sizes="(max-width: 900px) 100vw, 48vw"
                width="1200"
                height="1450"
                fetchPriority="high"
                alt="Carne cocinándose sobre una parrilla encendida"
              />
            </div>

            <div className="hero__stamp" aria-label="Asado gratis">
              <span>Asado</span>
              <strong>$0</strong>
              <small>al momento</small>
            </div>

            <div className="hero__status-card">
              <StoreStatusBadge />
              <span>Av. Tamaulipas y Calle 22</span>
            </div>
          </div>
        </div>

        <div className="hero__ticker" aria-label="Servicios">
          <div>
            <span>Corte al gusto</span><i aria-hidden="true" />
            <span>Asado sin costo</span><i aria-hidden="true" />
            <span>Pedido por WhatsApp</span><i aria-hidden="true" />
            <span>Recoge en sucursal</span><i aria-hidden="true" />
          </div>
        </div>
      </section>

      <section className="process section" id="como-funciona">
        <div className="container">
          <div className="process__heading reveal">
            <span className="eyebrow">Así de fácil</span>
            <h2>Del mostrador a la mesa, <em>sin prender tu asador.</em></h2>
          </div>

          <div className="process__grid">
            {steps.map((step, index) => (
              <article key={step.number} className={`process__step reveal delay-${index + 1}`}>
                <span className="process__number">{step.number}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="house-cuts section">
        <div className="container">
          <div className="house-cuts__head reveal">
            <div>
              <span className="eyebrow">Lo que más sale</span>
              <h2>Favoritos del asador</h2>
            </div>
            <Link to="/cortes" className="house-cuts__all">
              Ver los {cuts.length} productos <Icon.ArrowUpRight size={18} />
            </Link>
          </div>

          <div className="house-cuts__grid">
            {featuredCuts.map((cut, index) => {
              const category = categories.find((item) => item.id === cut.category)
              return (
                <button
                  type="button"
                  key={cut.id}
                  className={`house-cut reveal delay-${index + 1}`}
                  onClick={() => setSelectedCutForModal(cut)}
                  aria-label={`Personalizar ${cut.name}, ${formatPrice(cut.pricePerKg)} por kilo`}
                >
                  <span className="house-cut__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="house-cut__category">{category?.short}</span>
                  <span className="house-cut__name">{cut.name}</span>
                  <span className="house-cut__desc">{cut.description}</span>
                  <span className="house-cut__foot">
                    <strong>{formatPrice(cut.pricePerKg)}</strong>
                    <span>Personalizar <Icon.ArrowRight size={14} /></span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="grill-manifesto">
        <img
          src="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1800&q=84"
          srcSet="https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=800&q=80 800w, https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1400&q=84 1400w, https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=2000&q=86 2000w"
          sizes="100vw"
          width="1800"
          height="1050"
          loading="lazy"
          alt="Corte de carne sellado al fuego"
        />
        <div className="grill-manifesto__veil" />
        <div className="container grill-manifesto__content reveal">
          <span>Todos los días · Dentro del horario de atención</span>
          <h2>La carne la pagas.<br /><em>El asado, no.</em></h2>
          <p>
            Pide tu carne asada al momento y confirma por WhatsApp disponibilidad y hora de recogida.
          </p>
          <a
            className="btn btn--gold"
            href="https://wa.me/5216531324510?text=Hola%2C%20quisiera%20hacer%20un%20pedido%20para%20recoger"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon.Whatsapp size={18} />
            Pedir por WhatsApp
          </a>
        </div>
      </section>

      <section className="anatomy-section section">
        <div className="container">
          <MeatAnatomyMap onSelectCategory={(categoryId) => navigate('/cortes', { state: { categoryId } })} />
        </div>
      </section>

      <section className="planner-callout section">
        <div className="container planner-callout__grid">
          <div className="planner-callout__number reveal" aria-hidden="true">¿?</div>
          <div className="planner-callout__content reveal delay-1">
            <span className="eyebrow">Que no falte. Que no sobre.</span>
            <h2>¿Cuántos vienen?</h2>
            <p>
              Dinos cuántos adultos y niños se sientan a la mesa. Calculamos kilos, mezcla de cortes,
              carbón y presupuesto; luego lo agregas completo a tu pedido.
            </p>
            <Link to="/calculadora" className="btn btn--primary">
              Calcular mi carne asada
              <Icon.Calculator size={18} />
            </Link>
          </div>
          <div className="planner-callout__facts reveal delay-2">
            <div><strong>3</strong><span>mezclas sugeridas</span></div>
            <div><strong>1</strong><span>pedido listo</span></div>
            <div><strong>0</strong><span>adivinanzas</span></div>
          </div>
        </div>
      </section>

      <section className="visit-strip">
        <div className="container visit-strip__inner">
          <div className="visit-strip__mark" aria-hidden="true">22</div>
          <div>
            <span className="eyebrow">Aquí empieza la carne asada</span>
            <h2>Te esperamos en la 22.</h2>
            <p>Av. Tamaulipas y Calle 22 · San Luis Río Colorado, Sonora.</p>
          </div>
          <div className="visit-strip__actions">
            <Link to="/contacto" className="btn btn--outline">Ver horarios y mapa</Link>
            <a href="tel:+526535362121" className="visit-strip__phone">
              <Icon.Phone size={18} /> (653) 536 2121
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
