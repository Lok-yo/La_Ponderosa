import React, { useState, useEffect } from 'react'
import { Icon } from './Icons'
import './StoreStatusBadge.css'

export default function StoreStatusBadge() {
  const [isOpen, setIsOpen] = useState(true)
  const [nextChangeText, setNextChangeText] = useState('')

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date()
      // Local time check: store opens at 10 (10:00) and closes at 19 (19:00 / 7:00 PM)
      const hours = now.getHours()
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
