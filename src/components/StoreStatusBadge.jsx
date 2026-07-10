import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from './Icons'
import './StoreStatusBadge.css'

const TIME_API_URL = 'https://worldtimeapi.org/api/timezone/America/Hermosillo'

/**
 * Horarios de cierre por día:
 *  - Martes (2): cierra a las 4:00 PM
 *  - Domingos (0): cierra a las 6:00 PM
 *  - Resto: cierra a las 7:00 PM
 */
function getCloseHour(dayOfWeek) {
  if (dayOfWeek === 2) return 16  // Martes → 4 PM
  if (dayOfWeek === 0) return 18  // Domingo → 6 PM
  return 19                        // Lunes, Mié–Sáb → 7 PM
}

/**
 * Fetches the real current time from WorldTimeAPI for America/Hermosillo.
 * Returns { hour, dayOfWeek } or throws on failure.
 */
async function fetchHermosilloTime() {
  const response = await fetch(TIME_API_URL)
  if (!response.ok) {
    throw new Error(`WorldTimeAPI responded with ${response.status}`)
  }
  const data = await response.json()
  // data.datetime example: "2026-07-09T17:45:12.345678-07:00"
  const dt = new Date(data.datetime)
  return { hour: dt.getHours(), dayOfWeek: dt.getDay() }
}

/**
 * Fallback: calculates the hour using the browser's Intl API.
 */
function getLocalHermosilloTime() {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Hermosillo',
    hour: 'numeric',
    hour12: false,
    weekday: 'short'
  })
  // Get hour separately
  const hourFormatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Hermosillo',
    hour: 'numeric',
    hour12: false
  })
  const hour = parseInt(hourFormatter.format(now), 10)
  // Get day-of-week from a date adjusted to Hermosillo
  const dayStr = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Hermosillo',
    weekday: 'long'
  }).format(now)
  const dayMap = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }
  const dayOfWeek = dayMap[dayStr] ?? now.getDay()
  return { hour, dayOfWeek }
}

export default function StoreStatusBadge() {
  const [isOpen, setIsOpen] = useState(true)
  const [nextChangeText, setNextChangeText] = useState('')
  const [source, setSource] = useState('local') // 'api' | 'local'
  const [loading, setLoading] = useState(true)

  const updateStatus = useCallback((hour, dayOfWeek, sourceLabel) => {
    const closeHour = getCloseHour(dayOfWeek)
    if (hour >= 10 && hour < closeHour) {
      setIsOpen(true)
      const remaining = closeHour - hour
      const closeLabel = closeHour === 16 ? '4:00 PM' : closeHour === 18 ? '6:00 PM' : '7:00 PM'
      setNextChangeText(`Cierra a las ${closeLabel} (en ~${remaining}h)`)
    } else {
      setIsOpen(false)
      setNextChangeText('Abre a las 10:00 AM')
    }
    setSource(sourceLabel)
  }, [])

  const checkStatusAsync = useCallback(async () => {
    try {
      const { hour, dayOfWeek } = await fetchHermosilloTime()
      updateStatus(hour, dayOfWeek, 'api')
    } catch (err) {
      console.warn('WorldTimeAPI falló, usando hora local como respaldo:', err.message)
      const { hour, dayOfWeek } = getLocalHermosilloTime()
      updateStatus(hour, dayOfWeek, 'local')
    } finally {
      setLoading(false)
    }
  }, [updateStatus])

  useEffect(() => {
    // Initial async fetch
    checkStatusAsync()

    // Re-check every 60 seconds — alternate between API and local fallback
    const timer = setInterval(() => {
      checkStatusAsync()
    }, 60000)

    return () => clearInterval(timer)
  }, [checkStatusAsync])

  return (
    <div
      className={`store-badge ${loading ? 'store-badge--loading' : isOpen ? 'store-badge--open' : 'store-badge--closed'}`}
      title={source === 'api' ? 'Hora verificada con servidor externo' : 'Hora basada en tu dispositivo'}
    >
      <span className="store-badge__pulse" />
      <Icon.Clock size={14} />
      <div className="store-badge__text">
        {loading ? (
          <strong>Verificando horario…</strong>
        ) : (
          <>
            <strong>{isOpen ? 'Abierto ahora' : 'Cerrado ahora'}</strong>
            <span className="store-badge__sub">• {nextChangeText}</span>
          </>
        )}
      </div>
    </div>
  )
}
