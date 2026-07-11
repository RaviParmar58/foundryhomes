'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document === 'undefined') return 'dark'
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'
  })

  useEffect(() => {
    const html = document.documentElement
    const stored = localStorage.getItem('foundry-theme') as Theme | null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      html.setAttribute('data-theme', stored)
      html.style.colorScheme = stored
      return
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const applySystemTheme = () => {
      const savedTheme = localStorage.getItem('foundry-theme')
      if (savedTheme === 'light' || savedTheme === 'dark') return

      const nextTheme = media.matches ? 'dark' : 'light'
      setTheme(nextTheme)
      html.setAttribute('data-theme', nextTheme)
      html.style.colorScheme = nextTheme
    }

    applySystemTheme()
    media.addEventListener('change', applySystemTheme)
    return () => media.removeEventListener('change', applySystemTheme)
  }, [])

  const applyTheme = (nextTheme: Theme, persist: boolean) => {
    const html = document.documentElement
    html.classList.add('is-switching-theme')
    html.setAttribute('data-theme', nextTheme)
    html.style.colorScheme = nextTheme
    setTheme(nextTheme)
    if (persist) localStorage.setItem('foundry-theme', nextTheme)
    window.setTimeout(() => html.classList.remove('is-switching-theme'), 500)
  }

  const toggleTheme = () => {
    applyTheme(theme === 'dark' ? 'light' : 'dark', true)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
