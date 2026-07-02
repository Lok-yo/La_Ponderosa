import React, { useState } from 'react'
import { Icon } from './Icons'
import './MeatAnatomyMap.css'

const ANATOMY_ZONES = [
  {
    id: 'nobles',
    name: 'Lomo & Costillar',
    tagline: 'Cortes Nobles & Tiernos',
    cuts: ['Solomillo', 'Lomo (New York)', 'Chuletón Ribeye', 'T-Bone', 'Tomahawk', 'Cabrería'],
    desc: 'Ubicado en la parte dorsal superior de la res. Son músculos con menor movimiento muscular, lo que los convierte en los cortes más suaves, marmoleados y cotizados.'
  },
  {
    id: 'sonorenses',
    name: 'Zona Especial Sonorense',
    tagline: 'Cortes Tradicionales del Norte',
    cuts: ['Cabrería Sonorense', 'Diezmillo', 'Ribeye Cowboy', 'Aguja Norteña'],
    desc: 'Selección exclusiva del norte de México. Mezcla perfecta de grasa infiltrada y hueso sazonador para cocción a la parrilla de leña o carbón.'
  },
  {
    id: 'trasero',
    name: 'Cuarto Trasero (Pierna & Cadera)',
    tagline: 'Magros & Rendidores',
    cuts: ['Cuarto Trasero', 'Babilla', 'Contra', 'Cadera', 'Peceto'],
    desc: 'De la pierna y cadera de la res. Piezas magras de sabor definido, óptimas para medallones, bistec de diario, milanesa o rostizado entero.'
  },
  {
    id: 'delantero',
    name: 'Cuarto Delantero (Paleta & Pecho)',
    tagline: 'Intenso Sabor & Barbacoa',
    cuts: ['Espaldilla', 'Aguja', 'Paleta', 'Pescuezo', 'Pecho (Brisket)'],
    desc: 'Zona de los hombros y pecho de la res. Excelente marmoleo y contenido de colágeno, ideales para guisados largos, birria, estofados y ahumados slow & low.'
  },
  {
    id: 'coccion-lenta',
    name: 'Zona de Cocción Lenta & Caldos',
    tagline: 'Colágeno & Tuétano',
    cuts: ['Chambarete con Tuétano', 'Morrón', 'Falda de Res', 'Costilla de Carga'],
    desc: 'Cortes con hueso rico en tuétano y fibras largas. Al cocerse a fuego lento desprenden una gelatina natural que imparte una textura melosa a caldos y guisos.'
  },
  {
    id: 'casqueria',
    name: 'Casquería & Vísceras',
    tagline: 'Tradición & Alta Delicatesen',
    cuts: ['Mollejas', 'Lengua', 'Tripa de Leche', 'Rabo', 'Hígado', 'Corazón'],
    desc: 'Cortes tradicionales de vísceras y órganos apreciados por sibaritas. Requieren oficio en su limpieza y cocción precisa para resaltar sus sabores únicos.'
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
        <span className="eyebrow eyebrow--gold">Explora el Animal</span>
        <h2>Anatomía del Corte de Res</h2>
        <p>Selecciona una zona anatómica para descubrir su origen, textura y cortes estrella.</p>
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
            <span className="anatomy-card__badge">Zona Seleccionada</span>
            <h3>{activeZone.name}</h3>
            <span className="anatomy-card__tagline">{activeZone.tagline}</span>
          </div>

          <p className="anatomy-card__desc">{activeZone.desc}</p>

          <div className="anatomy-card__cuts-section">
            <h4>Cortes principales de esta zona:</h4>
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
              Ver cortes de {activeZone.name} en el catálogo
              <Icon.ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
