'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const benefits = [
  {
    title: 'Capturing everything that you want',
    body: 'We can accommodate everything you want in your home in line with your budget.',
  },
  {
    title: 'Architecturally designed',
    body: 'Foundry Homes Custom homes are architecturally designed without excessive architectural design costs due to our partnership with Evolve.',
  },
  {
    title: 'A premium sale price',
    body: 'Your Foundry Homes Custom home will be a masterpiece in your chosen subdivision commanding a premium sale price.',
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

export default function CustomBuildsPage() {
  useFoundryAnimations()

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <Navbar />
      <MobileMenu />

      <main className="cb-page" id="top">
        <section className="cb-hero" aria-label="Foundry custom builds">
          <div className="cb-hero__copy">
            <div className="cb-hero__inner rv">
              <p className="eyebrow">Foundry Custom Builds</p>
              <h1 className="display">
                Crafting your <span>forever home</span>
              </h1>
              <p>
                Foundry Homes offers a custom design and build service to clients who cannot find a plan in the Foundry
                Homes plan range that suits their needs or section. This service involves a detailed site visit with
                Foundry Homes and a design brief to encompass your needs. A full design service is provided by Foundry
                Homes design partner Evolve Architecture, a leading NZ design company. This service is more expensive
                than a selection from the Foundry Homes plan range but ensures you will get a unique design and build
                family home which is truly personalised.
              </p>
              <Link className="btn btn--solid" href="/contact" data-magnet="">
                <span>Start your brief</span>
              </Link>
            </div>
          </div>
          <div className="cb-hero__image rv rv-d1">
            <Image
              src="/assets/Foundry Products (houses)/custom_design_01.jpeg"
              alt="Modern custom Foundry-style family home exterior"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 920px) 100vw, 58vw"
            />
          </div>
        </section>

        <section className="cb-benefits t-paper" aria-label="Custom build advantages">
          {benefits.map((benefit) => (
            <article className="cb-benefit rv" key={benefit.title}>
              <span aria-hidden="true"></span>
              <div>
                <h2>{benefit.title}</h2>
                <p>{benefit.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="cb-feature-image" aria-label="Custom build interior">
          <Image
            src="/assets/Internal Renders/25-4731-Foundry-Homes-Standard-Range---73-IR03---Living.jpg"
            alt="Light-filled custom home living and kitchen space"
            width={1600}
            height={900}
            sizes="100vw"
          />
        </section>

        <section className="cb-process t-paper" aria-label="Your build step by step">
          <div className="wrap">
            <div className="cb-section-head rv">
              <p className="eyebrow">How it works</p>
              <h2 className="display">Your build, step by step</h2>
              <p>A straightforward, four-step guide designed to walk you through the process with clarity and ease.</p>
            </div>
            <div className="cb-step-grid rv rv-d1">
              {steps.map((step, index) => (
                <article className="cb-step" key={step.title}>
                  <strong>{index + 1}.</strong>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="cb-page-cta" aria-label="Book a quote">
          <div className="wrap rv">
            <h2 className="display">Ready to start your journey?</h2>
            <p>Book a free quote today</p>
            <Link className="btn" href="/contact" data-magnet="">
              <span>Book now</span>
            </Link>
          </div>
        </section>

        <section className="cb-brochure" aria-label="Download the Foundry custom build brochure">
          <div className="wrap cb-brochure__inner rv">
            <div>
              <p className="eyebrow">Download the Foundry custom build brochure</p>
              <h2 className="display">Download the Foundry custom build brochure</h2>
              <p>Full specs, floor plans and process overview, all in one PDF.</p>
            </div>
            <Link className="btn" href="/contact" data-magnet="">
              <span>Download free</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
