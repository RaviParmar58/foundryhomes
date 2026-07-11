'use client'

import { useLayoutEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { IconLock } from '../icons'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Match the dashboard's persisted theme so login doesn't flash the
  // opposite scheme (key shared with app/admin/page.tsx).
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem('fh_admin_theme')
      if (stored === 'dark' || stored === 'light') {
        setTheme(stored)
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark')
      }
    } catch {
      /* localStorage unavailable - keep default light theme */
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Incorrect password')
        return
      }
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="admin" data-admin-theme={theme} suppressHydrationWarning>
      <div className="admin-login">
        <form className="admin-login__card" onSubmit={handleSubmit}>
          <div className="admin-login__icon"><IconLock /></div>
          <h1 className="admin-login__title">Foundry Homes Admin</h1>
          <p className="admin-login__subtitle">Sign in to manage blog posts.</p>

          <label className="admin-login__label" htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            className="admin-login__input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            autoComplete="current-password"
            required
          />

          {error && <p className="admin-login__error" role="alert">{error}</p>}

          <button className="admin-btn admin-btn--primary admin-login__submit" type="submit" disabled={submitting || !password}>
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}
