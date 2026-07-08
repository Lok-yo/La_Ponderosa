import React, { useState, useMemo, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Breadcrumbs from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import { cuts, categories, getCutsByCategory } from '../data/cuts'
import CutModal from '../components/CutModal'
import { useCart } from '../context/CartContext'
import { useReveal } from '../hooks/useReveal'
import './Cortes.css'

export default function Cortes() {
  const { addToCart } = useCart()
  const location = useLocation()
  const [filter, setFilter] = useState(() => location.state?.categoryId || 'all')
  const [textureFilter, setTextureFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedCutForModal, setSelectedCutForModal] = useState(null)
  const [addedCutId, setAddedCutId] = useState(null)

  useEffect(() => {
    if (location.state?.categoryId) {
      setFilter(location.state.categoryId)
    }
  }, [location.state])

  useReveal([filter, textureFilter, search])

  const filtered = useMemo(() => {
    return cuts.filter((c) => {
      const matchesCategory = filter === 'all' || c.category === filter
      const matchesTexture = textureFilter === 'all' || c.texture === textureFilter
      const searchLower = search.toLowerCase().trim()
      const matchesSearch =
        !searchLower ||
        c.name.toLowerCase().includes(searchLower) ||
        c.english.toLowerCase().includes(searchLower) ||
        c.location.toLowerCase().includes(searchLower)
      return matchesCategory && matchesTexture && matchesSearch
    })
  }, [filter, textureFilter, search])

  const totalCuts = cuts.length

  const handleQuickAdd = (e, cut) => {
    e.stopPropagation()
    addToCart({
      cutId: cut.id,
      cutName: cut.name,
      weightKg: 1.0,
      prepOption: 'asado',
      thickness: '1 pulgada',
      pricePerKg: cut.pricePerKg || 280,
      notes: ''
    })
    setAddedCutId(cut.id)
    setTimeout(() => setAddedCutId(null), 1200)
  }

  return (
    <>
      <Breadcrumbs />

      <CutModal
        cut={selectedCutForModal}
        onClose={() => setSelectedCutForModal(null)}
      />

      {/* Page header */}
      <header className="page-header">
        <div className="container-narrow">
          <span className="eyebrow reveal">Catálogo de la Res</span>
          <h1 className="page-header__title reveal">Cortes de Res & Especialidades</h1>
          <p className="page-header__lead reveal">
            Conoce los {totalCuts} cortes que trabajamos diariamente en La Ponderosa 22.
            Compara marmoleo, origen, precios orientativos por kilo y elige tu preparación ideal.
          </p>
        </div>
      </header>

      {/* Filter bar */}
      <section className="filter-bar">
        <div className="container">
          <div className="filter-bar__inner reveal">
            {/* Category Chips */}
            <div className="filter-bar__categories">
              <button
                className={`filter-chip ${filter === 'all' ? 'filter-chip--active' : ''}`}
                onClick={() => setFilter('all')}
              >
                Todos
                <span className="filter-chip__count">{totalCuts}</span>
              </button>
              {categories.map((cat) => {
                const count = getCutsByCategory(cat.id).length
                return (
                  <button
                    key={cat.id}
                    className={`filter-chip ${filter === cat.id ? 'filter-chip--active' : ''}`}
                    onClick={() => setFilter(cat.id)}
                  >
                    {cat.short}
                    <span className="filter-chip__count">{count}</span>
                  </button>
                )
              })}
            </div>

            {/* Search Bar & Texture Dropdown */}
            <div className="filter-bar__controls">
              <div className="filter-bar__search">
                <Icon.Search size={16} className="filter-bar__search-icon" />
                <input
                  type="text"
                  placeholder="Buscar corte por nombre, inglés o zona..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <select
                className="filter-bar__texture-select"
                value={textureFilter}
                onChange={(e) => setTextureFilter(e.target.value)}
              >
                <option value="all">Todas las texturas</option>
                <option value="tierna">Muy tierna</option>
                <option value="intermedia">Semitierna</option>
                <option value="firme">Firme / Cocción lenta</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results count summary */}
      <div className="filter-summary">
        <div className="container">
          <p>
            {filtered.length === totalCuts
              ? `Mostrando los ${totalCuts} cortes de la casa`
              : `Mostrando ${filtered.length} de ${totalCuts} cortes`}
          </p>
        </div>
      </div>

      {/* Cuts Grid */}
      <section className="cuts-grid section">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="cuts-empty">
              <Icon.Info size={40} />
              <h3>No encontramos cortes con ese criterio</h3>
              <p>Intenta buscando con otro término o limpia los filtros.</p>
              <button
                className="btn btn--outline"
                onClick={() => {
                  setFilter('all')
                  setTextureFilter('all')
                  setSearch('')
                }}
              >
                Restablecer Filtros
              </button>
            </div>
          ) : (
            <div className="cuts-grid__inner">
              {filtered.map((cut, idx) => {
                const cat = categories.find((c) => c.id === cut.category)
                const isRecentlyAdded = addedCutId === cut.id
                return (
                  <article
                    key={cut.id}
                    className={`cut-card reveal delay-${(idx % 3) + 1}`}
                    onClick={() => setSelectedCutForModal(cut)}
                  >
                    <div className="cut-card__head">
                      <span className="cut-card__category">{cat?.short}</span>
                      {cut.isRegional && <span className="cut-card__badge-sonora">Sonora</span>}
                      <span className={`cut-card__texture cut-card__texture--${cut.texture}`}>
                        {cut.texture === 'tierna' && 'Muy tierna'}
                        {cut.texture === 'intermedia' && 'Semitierna'}
                        {cut.texture === 'firme' && 'Firme'}
                      </span>
                    </div>

                    <h3 className="cut-card__name">{cut.name}</h3>
                    <p className="cut-card__en">{cut.english}</p>

                    <div className="cut-card__price-line">
                      <strong>${cut.pricePerKg || 280} MXN</strong>
                      <span>/ kg aprox.</span>
                    </div>

                    <div className="cut-card__location">
                      <Icon.MapPin size={13} />
                      <span>{cut.location}</span>
                    </div>

                    <p className="cut-card__desc">{cut.description}</p>

                    <div className="cut-card__methods">
                      <span className="cut-card__methods-label">Ideal para</span>
                      <div className="cut-card__methods-list">
                        {cut.methods.map((m) => (
                          <span key={m} className="cut-card__method">
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="cut-card__foot-actions">
                      <button className="cut-card__inspect-btn">
                        <Icon.Info size={14} />
                        Detalles
                      </button>
                      <button
                        className={`cut-card__add-btn ${isRecentlyAdded ? 'cut-card__add-btn--success' : ''}`}
                        onClick={(e) => handleQuickAdd(e, cut)}
                        title="Agregar 1 kg al carrito"
                      >
                        {isRecentlyAdded ? (
                          <>
                            <Icon.Check size={14} />
                            ¡Agregado!
                          </>
                        ) : (
                          <>
                            <Icon.Plus size={14} />
                            Pedir (1kg)
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Bottom Banner */}
      <section className="cuts-cta section">
        <div className="container-narrow">
          <div className="cuts-cta__inner reveal">
            <span className="eyebrow eyebrow--gold">¿Tienes dudas sobre algún corte?</span>
            <h2>Servicio personal en mostrador y asador</h2>
            <p>
              Te asesoramos en tiempo real por WhatsApp o por llamada directa. Recuerda que te asamos
              tu pedido completamente sin costo extra.
            </p>
            <div className="cuts-cta__buttons">
              <a
                href="https://wa.me/5216531324510?text=Hola%2C%20quisiera%20consultar%20sobre%20los%20cortes%20de%20res"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--primary"
              >
                <Icon.Whatsapp size={18} />
                Consultar por WhatsApp
              </a>
              <a href="tel:+526531324510" className="btn btn--outline">
                <Icon.Phone size={18} />
                Llamar al (653) 132 4510
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
