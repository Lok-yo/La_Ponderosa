import React, { useEffect, useState } from 'react'
import { Icon } from './Icons'
import './StoreStatusBadge.css'

const OPEN_MINUTES = 10 * 60

function getCloseMinutes(dayOfWeek) {
  if (dayOfWeek === 2) return 16 * 60
  if (dayOfWeek === 0) return 18 * 60
  return 19 * 60
}

function getHermosilloClock() {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Hermosillo',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(new Date())

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  const dayMap = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 }

  return {
    day: dayMap[values.weekday] ?? 1,
    minutes: Number(values.hour) * 60 + Number(values.minute)
  }
}

function readStatus() {
  const { day, minutes } = getHermosilloClock()
  const closeMinutes = getCloseMinutes(day)
  const isOpen = minutes >= OPEN_MINUTES && minutes < closeMinutes
  const closeHour = closeMinutes / 60

  return {
    isOpen,
    detail: isOpen
      ? `hasta ${closeHour > 12 ? closeHour - 12 : closeHour}:00 ${closeHour >= 12 ? 'PM' : 'AM'}`
      : minutes < OPEN_MINUTES
        ? 'abre hoy · 10:00 AM'
        : 'abre mañana · 10:00 AM'
  }
}

export default function StoreStatusBadge() {
  const [status, setStatus] = useState(readStatus)

  useEffect(() => {
    const timer = window.setInterval(() => setStatus(readStatus()), 60_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <div
      className={`store-badge ${status.isOpen ? 'store-badge--open' : 'store-badge--closed'}`}
      role="status"
      aria-live="polite"
      title="Horario de la sucursal en San Luis Río Colorado"
    >
      <span className="store-badge__pulse" aria-hidden="true" />
      <Icon.Clock size={13} aria-hidden="true" />
      <span className="store-badge__text">
        <strong>{status.isOpen ? 'Abierto' : 'Cerrado'}</strong>
        <span> · {status.detail}</span>
      </span>
    </div>
  )
}
