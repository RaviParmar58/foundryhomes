'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const suppliers = [
  { name: 'Evolve Architecture', logo: '/assets/logos/suppliers/evolve-architecture.png' },
  { name: 'Green Frame', logo: '/assets/logos/suppliers/greenframe.png' },
  { name: 'NZ Windows', logo: '/assets/logos/suppliers/nz-windows.png' },
  { name: 'Carpet Court', logo: '/assets/logos/suppliers/carpet-court.webp' },
  { name: 'Steel & Tube', logo: '/assets/logos/suppliers/steel-and-tube.webp' },
  { name: 'Mitre 10', logo: '/assets/logos/suppliers/mitre-10.jpg' },
  { name: 'Mico', logo: '/assets/logos/suppliers/mico.png' },
]

const values = [
  {
    title: 'Quality first',
    body: 'We choose suppliers who represent the best New Zealand has to offer in quality, reliability, service and long-term value.',
  },
  {
    title: 'Stable relationships',
    body: 'Our commitment does not change when markets fluctuate or offshore pricing appears attractive.',
  },
  {
    title: 'Built around trust',
    body: 'Every supplier relationship is selected to support better outcomes for the homes our clients live in every day.',
  },
]

export default function SuppliersPage() {
  useFoundryAnimations()

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <Navbar />
      <MobileMenu />

      <main className="suppliers-page" id="top">
        <section className="suppliers-hero" aria-label="Foundry suppliers">
          <div className="wrap suppliers-hero__grid">
            <div className="suppliers-hero__copy rv">
              <p className="eyebrow">Supporting New Zealand</p>
              <h1 className="display">At Foundry Homes loyalty matters</h1>
              <p>
                At Foundry Homes we have made a clear commitment to work alongside trusted New Zealand suppliers.
              </p>
            </div>
            <div className="suppliers-hero__image rv rv-d1">
              <Image
                src="/assets/Foundry Products (houses)/Foundry_Homes_Foundry_52.jpeg"
                alt="Modern Foundry-style home exterior with timber deck"
                width={1300}
                height={900}
                priority
                sizes="(max-width: 920px) 100vw, 56vw"
              />
            </div>
          </div>
        </section>

        <section className="suppliers-statement" aria-label="Supplier commitment">
          <div className="wrap">
            <p className="rv">
              At Foundry Homes we have made a clear commitment to work alongside trusted NZ suppliers. That commitment
              does not change when markets fluctuate or offshore pricing appears attractive. We will not chase cheap at
              the expense of quality.
            </p>
          </div>
        </section>

        <section className="suppliers-feature" aria-label="Why our suppliers matter">
          <div className="suppliers-feature__image rv">
            <Image
              src="/assets/SHOWHOME/Foundry_Homes_Showhome_9.jpg"
              alt="Warm modern interior with timber dining table"
              width={1100}
              height={850}
              sizes="(max-width: 920px) 100vw, 50vw"
            />
          </div>
          <div className="suppliers-feature__copy rv rv-d1">
            <p>
              Our suppliers are carefully chosen, and we are proud that they have agreed to partner with Foundry Homes
              because we believe they represent the very best that New Zealand has to offer in quality, reliability,
              service and long-term value.
            </p>
            <p>
              It is our firm belief any building project you are considering should involve the suppliers below.
            </p>
          </div>
        </section>

        <section className="suppliers-values" aria-label="Supplier values">
          <div className="wrap suppliers-values__grid">
            {values.map((value, index) => (
              <article className="suppliers-value rv" key={value.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2>{value.title}</h2>
                <p>{value.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="suppliers-logos" aria-label="Trusted supplier logos">
          <div className="wrap">
            <div className="suppliers-logos__head">
              <p className="eyebrow rv">Our partners</p>
              <h2 className="display rv rv-d1">Built with trusted New Zealand suppliers</h2>
              <p className="rv rv-d2">
                Every Foundry home is built using proven NZ materials from suppliers we trust - helping keep quality
                consistent, supply reliable, and pricing stable throughout your build.
              </p>
            </div>
            <div className="supplier-logo-grid rv rv-d3">
              {suppliers.map((supplier) => (
                <div className="supplier-logo-card" key={supplier.name}>
                  <Image
                    src={supplier.logo}
                    alt={`${supplier.name} logo`}
                    width={160}
                    height={64}
                    style={{ objectFit: 'contain', width: '100%', height: 'auto', maxHeight: 44 }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="suppliers-page-cta" aria-label="Book a quote">
          <div className="wrap rv">
            <h2 className="display">Ready to start your journey?</h2>
            <p>Book a free quote today.</p>
            <Link className="btn" href="/contact" data-magnet="">
              <span>Book now</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
