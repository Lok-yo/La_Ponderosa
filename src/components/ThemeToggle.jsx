import React, { useState, useEffect } from 'react'
import { Icon } from './Icons'

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('ponderosa_theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('ponderosa_theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo steakhouse oscuro'}
      aria-label="Alternar tema de la página"
    >
      {theme === 'dark' ? <Icon.Sun size={18} /> : <Icon.Moon size={18} />}
    </button>
  )
}
