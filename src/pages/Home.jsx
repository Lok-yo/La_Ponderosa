import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '../components/Icons'
import { cuts, categories } from '../data/cuts'
import MeatAnatomyMap from '../components/MeatAnatomyMap'
import CutModal from '../components/CutModal'
import { useReveal } from '../hooks/useReveal'
import './Home.css'

const featuredIds = ['cabreria', 'chuleton', 'arrachera', 'diezmillo', 'tomahawk', 'ribeye-sonora']

const values = [
  {
    icon: <Icon.Award size={32} />,
    title: 'Calidad certificada de Sonora',
    text: 'Ganado de engorda seleccionado de los mejores ranchos sonorenses. Veteado de marmoleo y ternura garantizada.'
  },
  {
    icon: <Icon.Flame size={32} />,
    title: 'Asado gratis al momento',
    text: 'Elige la carne en el mostrador y te la asamos sin costo adicional. Lista para pasar directo a tu mesa.'
  },
  {
    icon: <Icon.Knife size={32} />,
    title: 'Cortes a medida exacta',
    text: '¿Buscas 1 pulgada, 2 pulgadas o marinado especial? Te preparamos el grosor exacto para tu asador.'
  },
  {
    icon: <Icon.Leaf size={32} />,
    title: 'Rotación y frescura diaria',
    text: 'Recibimos canal fresco todos los días. Sin envejecimiento indeseado en mostrador: frescura real 7 días a la semana.'
  }
]

const reviews = [
  {
    author: 'Carlos Mendoza',
    city: 'San Luis Río Colorado',
    text: 'La Cabrería y el Diezmillo Norteño de La Ponderosa no tienen competencia. Además, que te asen la carne gratis te salva la vuelta el fin de semana.',
    stars: 5,
    tag: 'Cliente Frecuente'
  },
  {
    author: 'Ing. Fernando Gastélum',
    city: 'San Luis Río Colorado',
    text: 'Pedimos para una carne asada de 20 personas usando la calculadora de la página. El cálculo fue exacto y la arrachera venía súper suave.',
    stars: 5,
    tag: 'Evento Familiar'
  },
  {
    author: 'Mariana Ruiz',
    city: 'San Luis Río Colorado',
    text: 'Excelente servicio por WhatsApp. Hice mi pedido en la mañana, escogí servicio de asado y a las 2 PM pasé por mi carne calentita.',
    stars: 5,
    tag: 'Pedido WhatsApp'
  }
]

export default function Home() {
  useReveal()
  const navigate = useNavigate()
  const [selectedCutForModal, setSelectedCutForModal] = useState(null)

  return (
    <>
      <CutModal
        cut={selectedCutForModal}
        onClose={() => setSelectedCutForModal(null)}
      />

      {/* ============== HERO ============== */}
      <section className="hero">
        <div className="hero__media">
          <img
            src="https://images.unsplash.com/photo-1558030006-450675393462?w=1920&q=80"
            alt="Carnicería La Ponderosa 22"
          />
          <div className="hero__overlay" />
        </div>

        <div className="container hero__inner">
          <div className="hero__content">
            <span className="hero__eyebrow">Carnicería & Steakhouse · San Luis Río Colorado</span>
            <h1 className="hero__title">
              Cortes de res sonorenses<br />
              <em className="hero__title-em">seleccionados</em> para tu asador
            </h1>
            <p className="hero__lead">
              Tradición de 22 años, frescura diaria y servicio de oficio.
              Compras tu carne y te la <strong>asamos gratis al momento</strong>.
            </p>

            <div className="hero__cta">
              <Link to="/cortes" className="btn btn--primary">
                Explorar Catálogo de Cortes
                <Icon.ArrowRight />
              </Link>
              <Link to="/calculadora" className="btn btn--gold">
                <Icon.Calculator size={18} />
                Calculadora para Eventos
              </Link>
            </div>

            <div className="hero__meta">
              <div className="hero__meta-item">
                <strong>28+</strong>
                <span>Cortes de Res & Vísceras</span>
              </div>
              <div className="hero__meta-divider" />
              <div className="hero__meta-item">
                <strong>100%</strong>
                <span>Calidad Sonora</span>
              </div>
              <div className="hero__meta-divider" />
              <div className="hero__meta-item">
                <strong>$0</strong>
                <span>Servicio de Asado Gratis</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__scroll">
          <span>Desliza para explorar los cortes</span>
          <Icon.ChevronDown size={18} />
        </div>
      </section>

      {/* ============== INTRO ============== */}
      <section className="intro section">
        <div className="container-narrow intro__inner">
          <span className="eyebrow reveal">Tradición Carnicera</span>
          <h2 className="intro__title reveal">
            El verdadero sabor norteño en San Luis Río Colorado.
          </h2>
          <p className="intro__lead reveal">
            En La Ponderosa 22 creemos que una carne asada inolvidable comienza en el mostrador.
            Seleccionamos pieza por pieza, cuidamos el corte y respetamos las fibras de la carne
            para que lleves a tu casa la textura perfecta.
          </p>
          <div className="intro__actions reveal">
            <Link to="/nosotros" className="btn btn--outline">
              Conoce nuestra historia y valores
              <Icon.ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== MEAT ANATOMY MAP ============== */}
      <section className="anatomy-section section">
        <div className="container">
          <MeatAnatomyMap onSelectCategory={(categoryId) => navigate('/cortes', { state: { categoryId } })} />
        </div>
      </section>

      {/* ============== FEATURED CUTS ============== */}
      <section className="featured section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Selección de la Casa</span>
            <h2>Cortes Estrella y Sonorenses</h2>
            <p>
              Nuestros cortes más aclamados para la parrilla. Haz clic en cualquier corte para
              personalizar kilos, grosor y agregarlo a tu pedido.
            </p>
          </div>

          <div className="featured__grid">
            {featuredIds.map((id, idx) => {
              const cut = cuts.find((c) => c.id === id)
              if (!cut) return null
              const cat = categories.find((c) => c.id === cut.category)
              return (
                <div
                  key={cut.id}
                  className={`featured__card reveal delay-${(idx % 3) + 1}`}
                  onClick={() => setSelectedCutForModal(cut)}
                >
                  <div className="featured__card-head">
                    <span className="featured__card-category">{cat?.short}</span>
                    {cut.isRegional && <span className="featured__card-badge">Sonora</span>}
                  </div>

                  <h3 className="featured__card-name">{cut.name}</h3>
                  <p className="featured__card-en">{cut.english}</p>
                  
                  <div className="featured__card-price">
                    <strong>${cut.pricePerKg} MXN</strong>
                    <span>/ kg aprox.</span>
                  </div>

                  <p className="featured__card-loc">{cut.location}</p>

                  <div className="featured__card-actions">
                    <span className="featured__card-link">
                      Personalizar & Pedir
                      <Icon.ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="featured__cta reveal">
            <Link to="/cortes" className="btn btn--primary">
              Ver el Catálogo Completo (28 Cortes)
              <Icon.ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ============== SPECIAL BANNER ============== */}
      <section className="special">
        <div className="container-narrow special__inner reveal">
          <div className="special__eyebrow">Servicio Exclusivo Incluido</div>
          <h2 className="special__title">
            Te <em>asamos</em> la carne
            <br />
            <span>completamente gratis</span>
          </h2>
          <p className="special__lead">
            Elige tus cortes en mostrador o encárgalos por WhatsApp. Nosotros encendemos las brasas,
            sellamos tu carne al término exacto y te la entregamos lista para servir.
          </p>
          <div className="special__rules">
            <span>🔥 Válido todos los días dentro del horario de atención</span>
          </div>
        </div>
      </section>

      {/* ============== VALUES ============== */}
      <section className="values section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Por Qué Elegirnos</span>
            <h2>La diferencia de un trabajo de oficio</h2>
            <p>
              Compromiso absoluto con la calidad, la higiene y la satisfacción de tu familia.
            </p>
          </div>
          <div className="values__grid">
            {values.map((v, idx) => (
              <div key={idx} className={`values__card reveal delay-${idx + 1}`}>
                <div className="values__icon">{v.icon}</div>
                <h3 className="values__title">{v.title}</h3>
                <p className="values__text">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============== TESTIMONIALS ============== */}
      <section className="testimonials section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Reseñas de Clientes</span>
            <h2>Lo que dicen en San Luis Río Colorado</h2>
          </div>
          <div className="testimonials__grid">
            {reviews.map((r, idx) => (
              <div key={idx} className="testimonial-card reveal">
                <div className="testimonial-card__stars">
                  {[...Array(r.stars)].map((_, i) => (
                    <Icon.Star key={i} size={16} />
                  ))}
                </div>
                <p className="testimonial-card__text">"{r.text}"</p>
                <div className="testimonial-card__author">
                  <strong>{r.author}</strong>
                  <span>{r.city} • {r.tag}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
