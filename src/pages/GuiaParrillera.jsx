import React, { useState, useEffect } from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import { Icon } from '../components/Icons'
import { useReveal } from '../hooks/useReveal'
import './GuiaParrillera.css'

const DONENESS_LEVELS = [
  {
    id: 'azul',
    name: 'Azul / Rare',
    tempC: '48°C – 50°C',
    tempF: '120°F – 125°F',
    color: '#3498DB',
    timeSecondsPerSide: 150, // 2.5 min
    desc: 'Centro rojo y muy jugoso, tibio. Superficie bien sellada.',
    restTime: '3 min'
  },
  {
    id: 'medio',
    name: 'Término Medio / Medium Rare',
    tempC: '54°C – 57°C',
    tempF: '130°F – 135°F',
    color: '#E74C3C',
    timeSecondsPerSide: 240, // 4 min
    desc: 'El término recomendado por maestros parrilleros. Centro rosado intenso y gran jugosidad.',
    restTime: '5 min'
  },
  {
    id: 'tres-cuartos',
    name: 'Tres Cuartos / Medium Well',
    tempC: '60°C – 63°C',
    tempF: '140°F – 145°F',
    color: '#E67E22',
    timeSecondsPerSide: 330, // 5.5 min
    desc: 'Centro rosado sutil. Mayor firmeza y dorado exterior pronunciado.',
    restTime: '5 min'
  },
  {
    id: 'bien-cocido',
    name: 'Bien Cocido / Well Done',
    tempC: '68°C – 72°C',
    tempF: '155°F – 160°F',
    color: '#7F8C8D',
    timeSecondsPerSide: 420, // 7 min
    desc: 'Sin rastro de centro rosado. Textura muy firme.',
    restTime: '3 min'
  }
]

const CUT_PRESETS = [
  { id: 'cabreria', name: 'Cabrería Sonorense', defaultThickness: '1 1/4 pulgada' },
  { id: 'chuleton', name: 'Ribeye / Chuletón', defaultThickness: '1 pulgada' },
  { id: 'tomahawk', name: 'Tomahawk Steak', defaultThickness: '2 pulgadas' },
  { id: 'arrachera', name: 'Arrachera Marinada', defaultThickness: 'Delgado (1/2")' },
  { id: 'solomillo', name: 'Solomillo / Filete', defaultThickness: '1 1/2 pulgada' }
]

export default function GuiaParrillera() {
  useReveal()

  const [selectedCut, setSelectedCut] = useState(CUT_PRESETS[0])
  const [selectedDoneness, setSelectedDoneness] = useState(DONENESS_LEVELS[1])

  // Timer state
  const [timeLeft, setTimeLeft] = useState(DONENESS_LEVELS[1].timeSecondsPerSide)
  const [isRunning, setIsRunning] = useState(false)
  const [isDone, setIsDone] = useState(false)

  // Update timer when doneness changes
  useEffect(() => {
    setTimeLeft(selectedDoneness.timeSecondsPerSide)
    setIsRunning(false)
    setIsDone(false)
  }, [selectedDoneness])

  // Timer countdown effect
  useEffect(() => {
    let interval = null
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false)
      setIsDone(true)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const toggleTimer = () => {
    if (isDone) {
      resetTimer()
    } else {
      setIsRunning((prev) => !prev)
    }
  }

  const resetTimer = () => {
    setIsRunning(false)
    setIsDone(false)
    setTimeLeft(selectedDoneness.timeSecondsPerSide)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  return (
    <>
      <Breadcrumbs />

      <header className="page-header">
        <div className="container-narrow">
          <span className="eyebrow reveal">Maestría en la Parrilla</span>
          <h1 className="page-header__title reveal">Guía & Temporizador de Cocción</h1>
          <p className="page-header__lead reveal">
            Domina el término perfecto en tu asador. Elige tu corte, ajusta el término
            y usa nuestro temporizador en vivo para lograr cortes jugosos en su punto exacto.
          </p>
        </div>
      </header>

      <section className="section guia-section">
        <div className="container">
          <div className="guia-grid">
            {/* Left Selector Controls */}
            <div className="guia-controls reveal">
              {/* Step 1: Select Cut */}
              <div className="control-card">
                <h3>1. Selecciona el Corte:</h3>
                <div className="cut-presets-grid">
                  {CUT_PRESETS.map((c) => (
                    <button
                      key={c.id}
                      className={`preset-btn ${selectedCut.id === c.id ? 'preset-btn--active' : ''}`}
                      onClick={() => setSelectedCut(c)}
                    >
                      <Icon.Knife size={16} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Doneness */}
              <div className="control-card">
                <h3>2. Selecciona el Término Deseado:</h3>
                <div className="doneness-list">
                  {DONENESS_LEVELS.map((level) => {
                    const isSelected = selectedDoneness.id === level.id
                    return (
                      <button
                        key={level.id}
                        className={`doneness-card ${isSelected ? 'doneness-card--active' : ''}`}
                        onClick={() => setSelectedDoneness(level)}
                      >
                        <div
                          className="doneness-indicator"
                          style={{ backgroundColor: level.color }}
                        />
                        <div className="doneness-info">
                          <strong>{level.name}</strong>
                          <span className="doneness-temps">
                            {level.tempC} ({level.tempF})
                          </span>
                          <p>{level.desc}</p>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Timer & Master Specs */}
            <div className="guia-timer-card reveal delay-1">
              <div className="timer-header">
                <span className="eyebrow eyebrow--gold">Temporizador de Asador</span>
                <h2>{selectedCut.name}</h2>
                <div
                  className="doneness-pill"
                  style={{ backgroundColor: selectedDoneness.color }}
                >
                  {selectedDoneness.name}
                </div>
              </div>

              {/* Live Digital Display */}
              <div className={`digital-timer ${isDone ? 'digital-timer--done' : ''}`}>
                <span className="timer-digits">{formatTime(timeLeft)}</span>
                <span className="timer-label">
                  {isDone
                    ? '¡TIEMPO DE VOLTEAR O RETIRAR! 🔥'
                    : isRunning
                    ? 'Cocinando a la brasa...'
                    : 'Tiempo sugerido por lado'}
                </span>
              </div>

              {/* Timer Controls */}
              <div className="timer-controls">
                <button className="btn btn--gold timer-btn" onClick={toggleTimer}>
                  <Icon.Timer size={20} />
                  {isDone ? 'Reiniciar' : isRunning ? 'Pausar Temporizador' : 'Iniciar Temporizador'}
                </button>
                <button className="btn btn--outline timer-btn-reset" onClick={resetTimer}>
                  Reset
                </button>
              </div>

              {/* Master Butchery Tips */}
              <div className="master-tips">
                <h4>Reglas de Oro del Maestro Carnicero:</h4>
                <ul>
                  <li>
                    <Icon.Check size={14} />
                    <strong>Temperatura Interna:</strong> El punto ideal para {selectedCut.name} en término{' '}
                    {selectedDoneness.name} es {selectedDoneness.tempC}.
                  </li>
                  <li>
                    <Icon.Check size={14} />
                    <strong>Reposo vital:</strong> Deja reposar {selectedDoneness.restTime} sobre tabla de madera
                    cubierta flojamente antes de tranchar.
                  </li>
                  <li>
                    <Icon.Check size={14} />
                    <strong>Sazón de sal:</strong> Coloca la sal de grano justo 1 minuto antes de subir el corte al calor.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
