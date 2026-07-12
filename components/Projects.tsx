'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from '@/components/Lightbox'

const projects = [
  {
    src: '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_80_new.jpg',
    alt: 'Steel-framed family home, dark cladding',
    width: 1200,
    height: 900,
    label: 'Family home · Bay of Plenty',
    title: 'The Ridgeline',
  },
  {
    src: '/assets/Internal Renders/25-4731-Foundry-Homes-Standard-Range---73-IR01---Living.jpg',
    alt: "Light-filled open plan kitchen and living, Foundry family home",
    width: 1200,
    height: 1500,
    label: "Interior · Artist's impression",
    title: 'The Foundry Interior',
  },
  {
    src: '/assets/Internal Renders/25-4721-Foundry-Homes-Standard-Range---51-IR01---Living.jpg',
    alt: 'Modern kitchen with stone bench',
    width: 1200,
    height: 900,
    label: 'Family home · Waikato',
    title: 'The Foundry 90',
  },
  {
    src: '/assets/Stock Imagery/granny_flat_01.jpeg',
    alt: 'Cedar and black granny flat exterior',
    width: 1200,
    height: 900,
    label: 'Granny flat · Auckland',
    title: 'The Cedar 60',
  },
  {
    src: '/assets/Internal Renders/25-4731-Foundry-Homes-Standard-Range---73-IR02---Living.jpg',
    alt: 'Lounge with floor to ceiling glazing',
    width: 1200,
    height: 900,
    label: 'Custom build · Tauranga',
    title: 'Glasshouse',
  },
  {
    src: '/assets/Foundry Products (houses)/custom_design_01.jpeg',
    alt: 'Architectural home at dusk with pool',
    width: 1200,
    height: 900,
    label: 'Custom build · Northland',
    title: 'Dusk House',
  },
]

const revealDelay = ['', ' rv-d1', ' rv-d2']

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="projects" id="projects" aria-label="Recent projects">
      <div className="wrap">
        <div className="projects__head">
          <div>
            <p className="eyebrow rv">Selected work</p>
            <h2 className="display rv rv-d1">Recent builds</h2>
          </div>
          <Link href="/contact" className="btn rv rv-d2" data-magnet="">
            <span>Start yours</span>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
        <div className="masonry">
          {projects.map((project, i) => (
            <button
              type="button"
              className={`proj rv${revealDelay[i % 3]}`}
              key={project.src}
              onClick={() => setActiveIndex(i)}
              aria-label={`Open image: ${project.title} — ${project.label}`}
            >
              <Image
                src={project.src}
                alt={project.alt}
                width={project.width}
                height={project.height}
                loading="lazy"
                sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
              />
            </button>
          ))}
        </div>
      </div>

      {activeIndex !== null && (
        <Lightbox
          images={projects.map((project) => ({
            src: project.src,
            alt: project.alt,
            caption: `${project.title} · ${project.label}`,
          }))}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  )
}
