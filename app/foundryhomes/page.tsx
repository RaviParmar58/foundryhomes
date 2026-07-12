'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

// Outline icons from Lucide (lucide.dev, ISC license), inlined so they
// inherit the teal stroke and need no extra dependency.
const benefits = [
  {
    title: 'Family living, elevated',
    body: 'More space to grow, gather, and live comfortably, designed for full-time living with room for everyone.',
    icon: (
      <>
        <path d="M8.62 13.8A2.25 2.25 0 1 1 12 10.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </>
    ),
  },
  {
    title: 'Long-term investment',
    body: 'A substantial addition to your property that increases value and creates flexibility for the future.',
    icon: (
      <>
        <path d="M16 7h6v6" />
        <path d="m22 7-8.5 8.5-5-5L2 17" />
      </>
    ),
  },
  {
    title: 'Flexible living options',
    body: 'Ideal for extended family, guests, or evolving lifestyles, with space to adapt as your needs change.',
    icon: (
      <>
        <path d="M10 5H3" />
        <path d="M12 19H3" />
        <path d="M14 3v4" />
        <path d="M16 17v4" />
        <path d="M21 12h-9" />
        <path d="M21 19h-5" />
        <path d="M21 5h-7" />
        <path d="M8 10v4" />
        <path d="M8 12H3" />
      </>
    ),
  },
  {
    title: 'Built for comfort',
    body: 'Clever layouts with large living zones for enhanced functionality, designed for real living.',
    icon: (
      <>
        <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
        <path d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z" />
        <path d="M4 18v2" />
        <path d="M20 18v2" />
        <path d="M12 4v9" />
      </>
    ),
  },
]

const steps = [
  {
    title: 'Consultation',
    body: "We visit your site, understand what you need, and assess what's possible. No obligation.",
  },
  {
    title: 'Design & feasibility',
    body: 'We present the best option for your site, layout, orientation, access and compliance.',
  },
  {
    title: 'Pricing & specification',
    body: 'Master Build or Certified Builder contracts with a clear specification. No surprises, no vague allowances.',
  },
  {
    title: 'Construction',
    body: 'We handle all construction and compliance through to handover. You get the keys.',
  },
]

const models = [
  ['Foundry 80', '3', '2', '80', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_80_new.jpg', 'foundry-80'],
  ['Foundry 85', '3', '1', '85', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_85.jpeg', 'foundry-85'],
  ['Foundry 99', '4', '2', '99', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_99.jpeg', 'foundry-99'],
]

export default function FoundryHomesPage() {
  useFoundryAnimations()

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <Navbar />
      <MobileMenu />

      <main className="fh-page" id="top">
        <section className="fh-hero" aria-label="Foundry family homes">
          <div className="fh-hero__copy">
            <div className="fh-hero__inner rv">
              <p className="eyebrow">Foundry Homes</p>
              <h1 className="display">
                Where strength <span>meets design</span>
              </h1>
              <p>
                Architecturally designed, steel-framed homes from 70m<sup>2</sup>, fully compliant, fixed price, and
                managed from concept to key handover.
              </p>
              <Link className="btn btn--solid" href="/contact" data-magnet="">
                <span>Get a quote</span>
              </Link>
            </div>
          </div>
          <div className="fh-hero__image rv rv-d1">
            <Image
              src="/assets/Foundry Products (houses)/Foundry_Homes_Foundry_99.jpeg"
              alt="Modern Foundry family home with timber cladding and deck"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 920px) 100vw, 58vw"
            />
          </div>
        </section>

        <section className="fh-benefits t-paper" aria-label="Family home benefits">
          {benefits.map((benefit) => (
            <article className="fh-benefit rv" key={benefit.title}>
              <span aria-hidden="true">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {benefit.icon}
                </svg>
              </span>
              <div>
                <h2>{benefit.title}</h2>
                <p>{benefit.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="fh-process t-paper" aria-label="Your build step by step">
          <div className="wrap">
            <div className="fh-section-head rv">
              <p className="eyebrow">How it works</p>
              <h2 className="display">Your build, step by step</h2>
              <p>A straightforward, four-step guide designed to walk you through the process with clarity and ease.</p>
            </div>
            <div className="fh-step-grid rv rv-d1">
              {steps.map((step, index) => (
                <article className="fh-step" key={step.title}>
                  <strong>{index + 1}.</strong>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fh-range t-paper" aria-label="Choose your family home model">
          <div className="wrap">
            <div className="fh-section-head rv">
              <p className="eyebrow">Our range</p>
              <h2 className="display">Choose your model</h2>
              <p>
                Six architecturally designed plans, from a compact studio to a full three-bedroom home. Every model is
                steel framed, council compliant, and available with a clear price contract.
              </p>
            </div>
            <div className="fh-model-grid">
              {models.map(([name, beds, baths, area, image, slug]) => (
                <article className="fh-model rv" key={name}>
                  <div className="fh-model__image">
                    <Image
                      src={image}
                      alt={`${name} family home model`}
                      width={900}
                      height={560}
                      sizes="(max-width: 760px) 100vw, 33vw"
                    />
                    <span>{name}</span>
                  </div>
                  <div className="fh-model__body">
                    <p>
                      <b>{beds}</b> bed <i></i> <b>{baths}</b> bath <i></i> <b>{area}</b> m<sup>2</sup>
                    </p>
                    <h3>P.O.A</h3>
                    <Link className="btn btn--sm btn--solid" href={`/granny-flat-models/${slug}`} data-magnet="">
                      <span>View plan</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="fh-page-cta" aria-label="Book a quote">
          <div className="wrap rv">
            <h2 className="display">Ready to start your journey?</h2>
            <p>Book a free quote today</p>
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
