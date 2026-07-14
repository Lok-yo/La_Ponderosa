import React, { useEffect, useState } from 'react'
import { Icon } from './Icons'

const STORAGE_KEY = 'ponderosa_theme'
const THEME_COLORS = {
  light: '#f7efc6',
  dark: '#0b0908'
}

function readInitialTheme() {
  const current = document.documentElement.dataset.theme
  if (current === 'light' || current === 'dark') return current

  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // System preference below remains available when storage is disabled.
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(readInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', THEME_COLORS[theme])

    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // The selected theme still applies for the current visit.
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="theme-toggle-btn"
      title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
      aria-pressed={theme === 'dark'}
    >
      {theme === 'dark'
        ? <Icon.Sun size={18} aria-hidden="true" />
        : <Icon.Moon size={18} aria-hidden="true" />}
    </button>
  )
}
