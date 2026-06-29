'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const benefits = [
  {
    title: 'Family living, elevated',
    body: 'More space to grow, gather, and live comfortably, designed for full-time living with room for everyone.',
  },
  {
    title: 'Long-term investment',
    body: 'A substantial addition to your property that increases value and creates flexibility for the future.',
  },
  {
    title: 'Flexible living options',
    body: 'Ideal for extended family, guests, or evolving lifestyles, with space to adapt as your needs change.',
  },
  {
    title: 'Built for comfort',
    body: 'Clever layouts with large living zones for enhanced functionality, designed for real living.',
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
  ['Foundry 80', '3', '2', '80', '/assets/images/homes/salman-saqib-93AF-d_y8rI-unsplash.jpg'],
  ['Foundry 85', '3', '1', '85', '/assets/images/homes/modern-suburban-family-home-with-landscaped-yard.jpg'],
  ['Foundry 99', '4', '2', '99', '/assets/images/homes/Dual Pavilion House Exterior.jpg'],
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
              src="/assets/images/homes/salman-saqib-93AF-d_y8rI-unsplash.jpg"
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
              <span aria-hidden="true"></span>
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
              {models.map(([name, beds, baths, area, image]) => (
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
                    <Link className="btn btn--sm btn--solid" href="/contact" data-magnet="">
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
