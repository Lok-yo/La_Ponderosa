import React, { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import StoreStatusBadge from '../components/StoreStatusBadge'
import { useReveal } from '../hooks/useReveal'
import './Contacto.css'

const MAPS_URL = 'https://www.google.com/maps/place/La+Ponderosa+22+-+Carnicer%C3%ADa/@32.4581798,-114.7621103,17.87z/data=!4m6!3m5!1s0x80d64e4ccd82d84d:0xeacf93dcf22c5748!8m2!3d32.4581798!4d-114.7621103!16s%2Fg%2F11b7d_8f_r?entry=ttu'

const faqs = [
  {
    question: '¿El servicio de asado tiene costo extra?',
    answer: 'No. Compras la carne en La Ponderosa 22 y, si lo pides, la asamos al momento sin cobrarte el servicio.'
  },
  {
    question: '¿Cómo funciona el pedido por WhatsApp?',
    answer: 'Arma una cotización desde el catálogo o escríbenos directo. Confirmamos disponibilidad, peso final, total y hora para recoger.'
  },
  {
    question: '¿Tienen entrega a domicilio?',
    answer: 'Por ahora los pedidos se entregan personalmente en la sucursal. Puedes pedirlos frescos, marinados o asados y pasar a recoger.'
  },
  {
    question: '¿Con cuánto tiempo debo pedir para una reunión grande?',
    answer: 'Puedes escribirnos cuando quieras. Para pedidos grandes conviene contactarnos con anticipación para confirmar producto y tiempo de preparación.'
  },
  {
    question: '¿El precio del sitio es el total definitivo?',
    answer: 'Es una estimación por kilo. El total se confirma con el peso exacto, la disponibilidad y la preparación solicitada.'
  }
]

export default function Contacto() {
  useReveal()
  const [openFaq, setOpenFaq] = useState(0)

  return (
    <>
      <Breadcrumbs />

      <header className="page-header contact-header">
        <div className="container-narrow">
          <span className="eyebrow reveal">La Ponderosa 22</span>
          <h1 className="page-header__title reveal">Nos vemos en la 22.</h1>
          <p className="page-header__lead reveal">
            Visítanos en San Luis Río Colorado o envía tu pedido por WhatsApp para confirmar
            disponibilidad y recogerlo fresco o recién asado.
          </p>
        </div>
      </header>

      <section className="contact-section section">
        <div className="container contact-grid">
          <div className="contact-card reveal">
            <div className="contact-card__status">
              <StoreStatusBadge />
            </div>

            <span className="eyebrow">Sucursal</span>
            <h2>La Ponderosa 22</h2>

            <div className="contact-card__list">
              <div className="contact-detail">
                <span className="contact-detail__icon"><Icon.MapPin size={20} /></span>
                <div>
                  <strong>Dirección</strong>
                  <p>Av. Tamaulipas y Calle 22 #2201<br />San Luis Río Colorado, Sonora.</p>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-detail__icon"><Icon.Phone size={20} /></span>
                <div>
                  <strong>Teléfono</strong>
                  <p><a href="tel:+526535362121">(653) 536 2121</a></p>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-detail__icon"><Icon.Clock size={20} /></span>
                <div>
                  <strong>Horario</strong>
                  <p>Lunes y miércoles a sábado · 10 AM–7 PM</p>
                  <p>Martes · 10 AM–4 PM</p>
                  <p>Domingo · 10 AM–6 PM</p>
                </div>
              </div>
            </div>

            <div className="contact-card__actions">
              <a
                href="https://wa.me/5216531324510?text=Hola%2C%20quisiera%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                <Icon.Whatsapp size={18} />
                Escribir por WhatsApp
              </a>
              <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
                <Icon.MapPin size={18} />
                Abrir indicaciones
              </a>
            </div>
          </div>

          <div className="contact-map reveal delay-1">
            <iframe
              title="Mapa de La Ponderosa 22"
              src="https://www.google.com/maps?q=32.4581798,-114.7621103&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="contact-map__label">
              <span>32.4582° N · 114.7621° W</span>
              <strong>San Luis Río Colorado</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section section">
        <div className="container faq-layout">
          <div className="faq-layout__head reveal">
            <span className="eyebrow">Antes de pedir</span>
            <h2>Preguntas frecuentes.</h2>
            <p>Si falta algo, escríbenos. Te respondemos directamente desde la sucursal.</p>
          </div>

          <div className="faq-accordion reveal delay-1">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              const answerId = `faq-answer-${index}`

              return (
                <div key={faq.question} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                  <button
                    className="faq-item__question"
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                  >
                    <span className="faq-item__number">{String(index + 1).padStart(2, '0')}</span>
                    <span>{faq.question}</span>
                    <Icon.Plus size={18} className="faq-icon" />
                  </button>
                  {isOpen && (
                    <div className="faq-item__answer" id={answerId} role="region">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
