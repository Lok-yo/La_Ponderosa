import React, { useState, useEffect } from 'react'
import { Icon } from './Icons'
import './StoreStatusBadge.css'

export default function StoreStatusBadge() {
  const [isOpen, setIsOpen] = useState(true)
  const [nextChangeText, setNextChangeText] = useState('')

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date()
      // SLRC / Sonora Timezone (America/Hermosillo)
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'America/Hermosillo',
        hour: 'numeric',
        hour12: false
      })
      const hours = parseInt(formatter.format(now), 10)
      if (hours >= 10 && hours < 19) {
        setIsOpen(true)
        const closeHour = 19 - hours
        setNextChangeText(`Cierra a las 7:00 PM (en ~${closeHour}h)`)
      } else {
        setIsOpen(false)
        setNextChangeText('Abre a las 10:00 AM')
      }
    }

    checkStatus()
    const timer = setInterval(checkStatus, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={`store-badge ${isOpen ? 'store-badge--open' : 'store-badge--closed'}`}>
      <span className="store-badge__pulse" />
      <Icon.Clock size={14} />
      <div className="store-badge__text">
        <strong>{isOpen ? 'Abierto ahora' : 'Cerrado ahora'}</strong>
        <span className="store-badge__sub">• {nextChangeText}</span>
      </div>
    </div>
  )
}
