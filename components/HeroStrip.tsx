'use client'

import { useEffect, useState } from 'react'

const steps = [
  {
    num: '01',
    label: 'Design',
    title: 'Shaped to your site',
    desc: 'Plans built around your land, lifestyle, and budget - no off-the-shelf layouts.',
  },
  {
    num: '02',
    label: 'Quote',
    title: 'A fixed price',
    desc: 'Every line costed up front. No surprises, no variations, no excuses mid-build.',
  },
  {
    num: '03',
    label: 'Build',
    title: 'Steel frame up fast',
    desc: 'Weathertight sooner with less on-site time and a cleaner, stronger structure.',
  },
  {
    num: '04',
    label: 'Move In',
    title: 'Finished & signed off',
    desc: 'Handed over complete, code-compliant, and ready to live in from day one.',
  },
]

export default function HeroStrip() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="hero-strip" id="hero-strip" aria-label="How it works">
      {steps.map((s, i) => (
        <div
          key={s.num}
          className={`hero-strip__item${active === i ? ' hero-strip__item--active' : ''}`}
          style={{ animationDelay: `${i * 0.1}s` }}
          onClick={() => setActive(i)}
        >
          {/* <div className="hero-strip__line" aria-hidden="true"></div> */}
          <span className="hero-strip__num">{s.num} / {s.label}</span>
          <h3 className="hero-strip__title">{s.title}</h3>
          <p className="hero-strip__desc">{s.desc}</p>
        </div>
      ))}
    </div>
  )
}
