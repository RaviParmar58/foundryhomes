'use client'

import { useEffect, useState } from 'react'

export default function Loader() {
  const [isDone, setIsDone] = useState(false)
  const [shouldRender, setShouldRender] = useState(true)
  const [pageLoaded, setPageLoaded] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)

  useEffect(() => {
    const markPageLoaded = () => setPageLoaded(true)

    if (document.readyState === 'complete') {
      markPageLoaded()
    } else {
      window.addEventListener('load', markPageLoaded, { once: true })
    }

    return () => window.removeEventListener('load', markPageLoaded)
  }, [])

  useEffect(() => {
    const handleAnimationMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if (event.data?.type === 'foundry-preloader-complete') {
        setAnimationComplete(true)
      }
    }

    window.addEventListener('message', handleAnimationMessage)
    return () => {
      window.removeEventListener('message', handleAnimationMessage)
    }
  }, [])

  useEffect(() => {
    if (pageLoaded && animationComplete) setIsDone(true)
  }, [pageLoaded, animationComplete])

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
