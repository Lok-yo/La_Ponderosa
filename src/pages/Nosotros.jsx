import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'
import './Nosotros.css'

export default function Nosotros() {
  useReveal()

  return (
    <>
      <Breadcrumbs />

      <header className="page-header">
        <div className="container-narrow">
          <span className="eyebrow reveal">Nuestra Historia</span>
          <h1 className="page-header__title reveal">Oficio, Calidad y Tradición</h1>
          <p className="page-header__lead reveal">
            Conoce los orígenes de Carnicería La Ponderosa 22 y por qué nos hemos
            convertido en la opción predilecta para los amantes de la carne asada en San Luis Río Colorado.
          </p>
        </div>
      </header>

      {/* Story section */}
      <section className="section story-section">
        <div className="container">
          <div className="story-grid">
            <div className="story-media reveal">
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80"
                alt="Maestros carniceros trabajando"
              />
            </div>
            <div className="story-content reveal delay-1">
              <span className="eyebrow eyebrow--gold">Desde San Luis Río Colorado</span>
              <h2>22 Años Ofreciendo lo Mejor de Sonora</h2>
              <p>
                La Ponderosa 22 nació con una convicción clara: devolverle a la carnicería de barrio
                la dignidad del oficio artesanal. Para nosotros, cortar carne no es una tarea en serie;
                es entender el veteado de grasa, el ángulo de la fibra y la ternura de cada canal.
              </p>
              <p>
                Trabajamos de la mano con engordadores certificados del estado de Sonora. Recibimos
                producto fresco a diario para garantizar que cada Cabrería, Diezmillo o Ribeye que
                llegas a poner en tus brasas sea una obra maestra.
              </p>
              
              <div className="story-quote">
                <Icon.Flame size={24} />
                <p>
                  "No vendemos simplemente carne. Entregamos el motivo central para que las familias
                  se reúnan alrededor del fuego."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section pillars-section">
        <div className="container">
          <div className="section-head reveal">
            <span className="eyebrow">Nuestros Pilares</span>
            <h2>La Promesa La Ponderosa 22</h2>
          </div>

          <div className="pillars-grid">
            <div className="pillar-card reveal">
              <div className="pillar-icon"><Icon.Award size={28} /></div>
              <h3>Ganado 100% Sonorense</h3>
              <p>
                Seleccionamos exclusivamente reses de engorda con marmoleo superior. Nada de carne congelada por meses ni inyectada con salmueras.
              </p>
            </div>

            <div className="pillar-card reveal delay-1">
              <div className="pillar-icon"><Icon.Flame size={28} /></div>
              <h3>Servicio de Asado Sin Costo</h3>
              <p>
                Creemos que el cliente debe disfrutar. Si lo pides, te asamos la carne al momento con carbón vegetal y sazón de la casa gratis.
              </p>
            </div>

            <div className="pillar-card reveal delay-2">
              <div className="pillar-icon"><Icon.Knife size={28} /></div>
              <h3>Corte Personalizado</h3>
              <p>
                Tú decides el grosor en pulgadas y la preparación (fresco, marinado o en medallones). Nos adaptamos a tu asador.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
