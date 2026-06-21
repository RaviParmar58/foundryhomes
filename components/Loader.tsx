'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [isDone, setIsDone] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    const minVisibleMs = 3600
    const start = performance.now()
    let timeoutId: number | undefined

    const finish = () => {
      const elapsed = performance.now() - start
      const delay = Math.max(0, minVisibleMs - elapsed)
      timeoutId = window.setTimeout(() => setIsDone(true), delay)
    }

    if (document.readyState === 'complete') {
      finish()
    } else {
      window.addEventListener('load', finish, { once: true })
    }

    return () => {
      window.removeEventListener('load', finish)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (!isDone) return
    const removeId = window.setTimeout(() => setShouldRender(false), 800)
    return () => window.clearTimeout(removeId)
  }, [isDone])

  if (!shouldRender) return null

  return (
    <div className={`loader${isDone ? ' is-done' : ''}`} id="loader" aria-hidden={isDone}>
      <div className="loader__animation" role="img" aria-label="Foundry home build animation">
        <iframe
          src="/assets/preloader/foundry-ranch-build.html"
          title="Foundry home build animation"
          className="loader__frame"
          loading="eager"
        />
      </div>
      <div className="loader__bar"></div>
      <div className="loader__tag">Steel-framed homes - New Zealand</div>
    </div>
  )
}
