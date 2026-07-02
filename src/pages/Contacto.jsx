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
    answer: 'Sí, contamos con servicio de entrega en la zona urbana de San Luis Río Colorado para pedidos programados.'
  },
  {
    question: '¿Con cuánto tiempo debo pedir para un evento o carne asada grande?',
    answer: 'Te recomendamos hacer tu pedido con al menos 2 a 4 horas de anticipación para garantizar que tus cortes estén perfectamente marinados y asados a tiempo.'
  },
  {
    question: '¿Cómo conservar la carne si no la voy a asar hoy mismo?',
    answer: 'Si la vas a asar mañana, mantenla en el refrigerador entre 0°C y 4°C en su empaque original sin abrir. Si es para días posteriores, puedes congelarla.'
  }
]

export default function Contacto() {
  useReveal()

  const [openFaq, setOpenFaq] = useState(0)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    peopleCount: '8',
    message: ''
  })

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? -1 : idx)
  }

  const handleSubmitWhatsApp = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) return

    const text = `*🔥 Consulta desde la Web - La Ponderosa 22*%0A%0A` +
      `• *Nombre:* ${formData.name}%0A` +
      `• *Teléfono:* ${formData.phone}%0A` +
      `• *Invitados estimados:* ${formData.peopleCount} personas%0A` +
      `• *Mensaje / Pedido:* ${formData.message || 'Sin mensaje adicional'}`

    window.open(`https://wa.me/526535362121?text=${text}`, '_blank')
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
                    <p>Av. Nuevo León y Calle 22, San Luis Río Colorado, Sonora, México.</p>
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
                    <p>Lunes a Domingo: 10:00 AM – 7:00 PM (Horario Continuo)</p>
                  </div>
                </div>
              </div>

              <div className="contact-info__actions">
                <a
                  href="https://wa.me/526535362121?text=Hola%2C%20quisiera%20hacer%20una%20consulta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--primary"
                >
                  <Icon.Whatsapp size={18} />
                  Escribir por WhatsApp
                </a>
                <a
                  href="https://maps.google.com/?q=San+Luis+Rio+Colorado+Sonora"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                >
                  <Icon.MapPin size={18} />
                  Abrir en Google Maps
                </a>
              </div>
            </div>

            {/* Direct Form */}
            <div className="contact-form-card reveal delay-1">
              <h3>Envíanos un Mensaje Directo</h3>
              <p>Completa este formulario y te responderemos de inmediato por WhatsApp.</p>

              <form onSubmit={handleSubmitWhatsApp} className="contact-form">
                <div className="form-group">
                  <label>Tu Nombre Completo *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Roberto Rodríguez"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Número de Teléfono / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="Ej. (653) 123 4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>¿Para cuántas personas es tu carne asada?</label>
                  <select
                    value={formData.peopleCount}
                    onChange={(e) => setFormData({ ...formData, peopleCount: e.target.value })}
                  >
                    <option value="2-4">2 a 4 personas (Familiar chico)</option>
                    <option value="5-8">5 a 8 personas</option>
                    <option value="10-15">10 a 15 personas (Reunión)</option>
                    <option value="20+">Más de 20 personas (Evento grande)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Detalles o cortes de interés (Opcional)</label>
                  <textarea
                    rows="3"
                    placeholder="Ej. Quisiera 2 kg de Cabrería y 1 kg de Mollejas asadas..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn btn--gold form-submit-btn">
                  <Icon.Whatsapp size={18} />
                  Enviar Mensaje por WhatsApp
                </button>
              </form>
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
