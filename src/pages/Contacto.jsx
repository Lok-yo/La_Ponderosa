import React, { useState } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import StoreStatusBadge from '../components/StoreStatusBadge'
import { useReveal } from '../hooks/useReveal'
import './Contacto.css'

const faqs = [
  {
    question: '¿El servicio de asado gratis tiene algún costo escondido?',
    answer: 'Ninguno. Compras la carne de tu preferencia en mostrador o por WhatsApp y te la asamos gratis al momento en nuestras parrillas con carbón vegetal.'
  },
  {
    question: '¿Cómo funciona el pedido por WhatsApp?',
    answer: 'Armas tu cotización en nuestro sitio web o nos envías un mensaje directo. Te confirmamos el total y la hora estimada para que sólo pases a recoger tu carne o la enviemos.'
  },
  {
    question: '¿Hacen entregas a domicilio en San Luis Río Colorado?',
    answer: 'No. No contamos con entras a domicilio todo se entrega personalmente en nuestro local'
  },
  {
    question: '¿Con cuánto tiempo debo pedir para un evento o carne asada grande?',
    answer: 'Puedes hacer tu pedido cuando quieras!.'
  }
]

export default function Contacto() {
  useReveal()

  const [openFaq, setOpenFaq] = useState(0)

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? -1 : idx)
  }

  return (
    <>
      <Breadcrumbs />

      <header className="page-header">
        <div className="container-narrow">
          <span className="eyebrow reveal">Estamos para Atenderte</span>
          <h1 className="page-header__title reveal">Contacto & Ubicación</h1>
          <p className="page-header__lead reveal">
            Visítanos en nuestra sucursal de San Luis Río Colorado o haz tu pedido directo
            por WhatsApp para tener tu carne lista y calentita.
          </p>
        </div>
      </header>

      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Card */}
            <div className="contact-info-card reveal">
              <StoreStatusBadge />

              <h2 className="contact-info__title">Sucursal La Ponderosa 22</h2>

              <div className="contact-info__list">
                <div className="info-item">
                  <Icon.MapPin size={20} />
                  <div>
                    <strong>Dirección:</strong>
                    <p>Av. Tamaulipas y Calle 22, San Luis Río Colorado, Sonora, México.</p>
                  </div>
                </div>

                <div className="info-item">
                  <Icon.Phone size={20} />
                  <div>
                    <strong>Teléfono Directo:</strong>
                    <p>(653) 536 2121</p>
                  </div>
                </div>

                <div className="info-item">
                  <Icon.Clock size={20} />
                  <div>
                    <strong>Horario de Atención:</strong>
                    <p>Lunes a Sábado: 10:00 AM – 7:00 PM</p>
                    <p style={{ fontSize: '0.9em', opacity: 0.75, marginTop: '0.2rem' }}>
                      Martes: cierra a las 4:00 PM · Domingos: cierra a las 6:00 PM
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-info__actions">
                <a
                  href="https://wa.me/5216531324510?text=Hola%2C%20quisiera%20hacer%20una%20consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  <Icon.Whatsapp size={18} />
                  Escribir por WhatsApp
                </a>
                <a
                  href="https://www.google.com/maps/place/La+Ponderosa+22+-+Carnicer%C3%ADa/@32.4581798,-114.7621103,17.87z/data=!4m6!3m5!1s0x80d64e4ccd82d84d:0xeacf93dcf22c5748!8m2!3d32.4581798!4d-114.7621103!16s%2Fg%2F11b7d_8f_r?entry=ttu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                >
                  <Icon.MapPin size={18} />
                  Abrir en Google Maps
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Accordion FAQs */}
      <section className="section faq-section">
        <div className="container-narrow">
          <div className="section-head reveal">
            <span className="eyebrow">Resuelve tus Dudas</span>
            <h2>Preguntas Frecuentes</h2>
          </div>

          <div className="faq-accordion reveal">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}>
                  <button className="faq-item__question" onClick={() => toggleFaq(idx)}>
                    <span>{faq.question}</span>
                    <Icon.ChevronDown size={18} className="faq-icon" />
                  </button>
                  {isOpen && (
                    <div className="faq-item__answer">
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
