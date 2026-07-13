import React, { useState } from 'react'
import { Icon } from './Icons'
import './MeatAnatomyMap.css'

const ANATOMY_ZONES = [
  {
    id: 'especiales',
    name: 'Lomo & Costillar',
    tagline: 'Suaves & Marmoleados',
    cuts: ['Filete de Cabrería', 'Rib-Eye', 'Rib Fingers'],
    desc: 'De esta zona provienen algunos de los productos más suaves y jugosos del catálogo, ideales para parrilla o brasa.'
  },
  {
    id: 'parrilla',
    name: 'Paleta, Lomo & Pierna',
    tagline: 'Favoritos para Asar',
    cuts: ['Aguja para Asar', 'Diezmillo', 'Lomo Plano', 'Punta de Lomo', 'Palomilla Sirloin', 'Pulpa Paleta', 'Pulpa Bola'],
    desc: 'Una selección de cortes versátiles y rendidores para bistec, tacos y la carne asada de todos los días.'
  },
  {
    id: 'preparados',
    name: 'Marinados & Preparados',
    tagline: 'Listos para Cocinar',
    cuts: ['Arrachera Marinada', 'Costilla Marinada', 'Tripa Cocida'],
    desc: 'Productos preparados para ahorrar tiempo: sólo elige tu forma de cocción y disfruta.'
  },
  {
    id: 'complementos',
    name: 'Pollo & Complementos',
    tagline: 'Para Completar la Mesa',
    cuts: ['Pechuga Natural', 'Queso Fresco Panela'],
    desc: 'Opciones frescas para sumar variedad a la parrilla y acompañar tu comida.'
  }
]

export default function MeatAnatomyMap({ onSelectCategory }) {
  const [activeZone, setActiveZone] = useState(ANATOMY_ZONES[0])

  const handleZoneClick = (zone) => {
    setActiveZone(zone)
    if (onSelectCategory) {
      onSelectCategory(zone.id)
    }
  }

  return (
    <div className="anatomy-map">
      <div className="anatomy-map__header">
        <span className="eyebrow eyebrow--gold">Explora el Catálogo</span>
        <h2>Encuentra lo Ideal para tu Comida</h2>
        <p>Selecciona un grupo para conocer los productos que tenemos disponibles.</p>
      </div>

      <div className="anatomy-map__content">
        {/* Interactive Zones Grid */}
        <div className="anatomy-map__zones">
          {ANATOMY_ZONES.map((zone) => {
            const isActive = activeZone.id === zone.id
            return (
              <button
                key={zone.id}
                className={`anatomy-zone-btn ${isActive ? 'anatomy-zone-btn--active' : ''}`}
                onClick={() => handleZoneClick(zone)}
              >
                <div className="anatomy-zone-btn__icon">
                  <Icon.Flame size={18} />
                </div>
                <div className="anatomy-zone-btn__info">
                  <strong>{zone.name}</strong>
                  <span>{zone.tagline}</span>
                </div>
                <Icon.ChevronRight size={16} className="anatomy-zone-btn__arrow" />
              </button>
            )
          })}
        </div>

        {/* Selected Zone Detail Card */}
        <div className="anatomy-map__card">
          <div className="anatomy-card__head">
            <span className="anatomy-card__badge">Grupo Seleccionado</span>
            <h3>{activeZone.name}</h3>
            <span className="anatomy-card__tagline">{activeZone.tagline}</span>
          </div>

          <p className="anatomy-card__desc">{activeZone.desc}</p>

          <div className="anatomy-card__cuts-section">
            <h4>Productos de este grupo:</h4>
            <div className="anatomy-card__cuts-tags">
              {activeZone.cuts.map((c) => (
                <span key={c} className="anatomy-cut-tag">
                  <Icon.Knife size={12} />
                  {c}
                </span>
              ))}
            </div>
          </div>

          {onSelectCategory && (
            <button
              className="btn btn--primary anatomy-card__action"
              onClick={() => onSelectCategory(activeZone.id)}
            >
              Ver {activeZone.name} en el catálogo
              <Icon.ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
