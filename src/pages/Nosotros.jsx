import React from 'react'
import { Link } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'
import './Nosotros.css'

const principles = [
  {
    number: '01',
    icon: <Icon.Knife size={25} />,
    title: 'Cortar con intención',
    text: 'El grosor, la fibra y el uso importan. Preguntamos qué vas a cocinar antes de recomendar.'
  },
  {
    number: '02',
    icon: <Icon.Flame size={25} />,
    title: 'Resolverte el fuego',
    text: 'Si no quieres prender el asador, cocinamos tu compra al momento sin cobrar el servicio.'
  },
  {
    number: '03',
    icon: <Icon.Check size={25} />,
    title: 'Hablar claro',
    text: 'Peso, precio, preparación y tiempo se confirman antes de que pases por tu pedido.'
  }
]

export default function Nosotros() {
  useReveal()

  return (
    <>
      <Breadcrumbs />

      <header className="page-header about-header">
        <div className="container-narrow">
          <span className="eyebrow reveal">La casa</span>
          <h1 className="page-header__title reveal">Oficio sin poses.</h1>
          <p className="page-header__lead reveal">
            Somos una carnicería de barrio hecha para algo muy serio en esta frontera:
            reunir a la gente alrededor de una buena carne asada.
          </p>
        </div>
      </header>

      <section className="about-story section">
        <div className="container about-story__grid">
          <figure className="about-story__media reveal">
            <img
              src="https://images.unsplash.com/photo-1560166444-217f42fb54f5?auto=format&fit=crop&w=1100&q=84"
              srcSet="https://images.unsplash.com/photo-1560166444-217f42fb54f5?auto=format&fit=crop&w=640&q=80 640w, https://images.unsplash.com/photo-1560166444-217f42fb54f5?auto=format&fit=crop&w=1100&q=84 1100w"
              sizes="(max-width: 850px) 100vw, 48vw"
              width="1100"
              height="1250"
              loading="lazy"
              alt="Preparación cuidadosa de carne fresca en carnicería"
            />
            <figcaption>Corte, preparación y atención de mostrador.</figcaption>
          </figure>

          <div className="about-story__content reveal delay-1">
            <span className="eyebrow">De la 22 para tu mesa</span>
            <h2>La carne asada empieza mucho antes del carbón.</h2>
            <p>
              Empieza cuando alguien te escucha: cuántos van a comer, cuánto quieres gastar y
              si buscas algo rendidor, suave o con buen marmoleo. Ahí entra el oficio.
            </p>
            <p>
              En La Ponderosa 22 puedes comparar los cortes, pedir el grosor que necesitas y
              decidir si lo llevas fresco, marinado o listo para comer. Sin complicarlo de más.
            </p>

            <blockquote>
              <Icon.Flame size={25} />
              <p>“La carne es el centro. La reunión es el verdadero motivo.”</p>
            </blockquote>

            <Link to="/cortes" className="about-story__link">
              Ver cortes y precios <Icon.ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="principles section">
        <div className="container">
          <div className="principles__head reveal">
            <span className="eyebrow">Nuestra manera de trabajar</span>
            <h2>Simple, directa y al punto.</h2>
          </div>

          <div className="principles__grid">
            {principles.map((principle, index) => (
              <article key={principle.number} className={`principle reveal delay-${index + 1}`}>
                <div className="principle__top">
                  <span>{principle.number}</span>
                  {principle.icon}
                </div>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container about-cta__inner reveal">
          <span>¿Ya sabes cuántos vienen?</span>
          <h2>Arma el asado completo.</h2>
          <p>La calculadora te recomienda kilos y una mezcla de cortes según tu reunión.</p>
          <Link to="/calculadora" className="btn btn--gold">
            Calcular mi pedido <Icon.Calculator size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
