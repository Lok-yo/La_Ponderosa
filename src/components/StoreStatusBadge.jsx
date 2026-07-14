import React, { useEffect, useState } from 'react'
import { Icon } from './Icons'
import './StoreStatusBadge.css'

const HERMOSILLO_TIME_ZONE = 'America/Hermosillo'
const TIME_API_URL = `https://timeapi.io/api/time/current/zone?timeZone=${encodeURIComponent(HERMOSILLO_TIME_ZONE)}`
const TIME_CACHE_KEY = 'ponderosa_hermosillo_time'
const TIME_CACHE_DURATION = 1000 * 60 * 60 * 6
const RETRY_AFTER_FAILURE = 1000 * 60 * 30
const REQUEST_TIMEOUT = 4_000
const OPEN_MINUTES = 10 * 60
let nextTimeApiAttempt = 0

const dayMap = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6
}

function getCloseMinutes(dayOfWeek) {
  if (dayOfWeek === 2) return 16 * 60
  if (dayOfWeek === 0) return 18 * 60
  return 19 * 60
}

function clockFromDate(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: HERMOSILLO_TIME_ZONE,
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23'
  }).formatToParts(date)

  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))

  return {
    day: dayMap[values.weekday] ?? 1,
    minutes: Number(values.hour) * 60 + Number(values.minute)
  }
}

function readCachedServerTime() {
  try {
    const cached = JSON.parse(localStorage.getItem(TIME_CACHE_KEY) || '{}')
    const age = Date.now() - cached.savedAt

    if (Number.isFinite(cached.serverTime) && age >= 0 && age < TIME_CACHE_DURATION) {
      return new Date(cached.serverTime + age)
    }
  } catch {
    // localStorage is optional; Intl below remains the reliable local fallback.
  }

  return null
}

function cacheServerTime(date) {
  try {
    localStorage.setItem(TIME_CACHE_KEY, JSON.stringify({
      serverTime: date.getTime(),
      savedAt: Date.now()
    }))
  } catch {
    // The clock still works when storage is unavailable.
  }
}

/**
 * Async function #1: obtains Hermosillo time through a Promise-based request.
 * It uses a six-hour cache and always falls back to the browser clock formatted
 * in America/Hermosillo, so an unavailable API never breaks the store status.
 */
async function getHermosilloClock() {
  const cachedDate = readCachedServerTime()
  if (cachedDate) return clockFromDate(cachedDate)

  // A failed service is retried after 30 minutes, never on every badge update.
  if (Date.now() < nextTimeApiAttempt) return clockFromDate(new Date())

  const controller = new AbortController()
  const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT)

  try {
    const response = await fetch(TIME_API_URL, { signal: controller.signal })
    if (!response.ok) throw new Error(`Time API responded with ${response.status}`)

    const data = await response.json()
    const apiDateTime = data.datetime
      ?? (data.dateTime ? `${data.dateTime}-07:00` : null)
    const serverDate = Number.isFinite(data.unixtime)
      ? new Date(data.unixtime * 1000)
      : apiDateTime ? new Date(apiDateTime) : new Date(Number.NaN)

    if (Number.isNaN(serverDate.getTime())) throw new Error('Time API returned an invalid date')

    cacheServerTime(serverDate)
    return clockFromDate(serverDate)
  } catch {
    nextTimeApiAttempt = Date.now() + RETRY_AFTER_FAILURE
    return clockFromDate(new Date())
  } finally {
    window.clearTimeout(timeout)
  }
}

function getStatus({ day, minutes }) {
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
  const [status, setStatus] = useState(() => getStatus(clockFromDate(new Date())))

  useEffect(() => {
    let isMounted = true

    const refreshStatus = async () => {
      const clock = await getHermosilloClock()
      if (isMounted) setStatus(getStatus(clock))
    }

    refreshStatus()
    const timer = window.setInterval(refreshStatus, 60_000)

    return () => {
      isMounted = false
      window.clearInterval(timer)
    }
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
