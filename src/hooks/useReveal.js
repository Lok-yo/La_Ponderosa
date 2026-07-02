import { useEffect } from 'react'

/**
 * Hook que observa elementos con la clase `.reveal` y les aplica
 * `.visible` cuando entran en el viewport. Re-ejecuta al cambiar `deps`.
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.02, rootMargin: '0px 0px 100px 0px' }
    )

    const elements = document.querySelectorAll('.reveal:not(.visible)')
    elements.forEach((el) => observer.observe(el))

    // Fallback: Revelar de inmediato si el elemento ya está visible en la ventana
    const timer = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('visible')
        }
      })
    }, 40)

    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, deps)
}
