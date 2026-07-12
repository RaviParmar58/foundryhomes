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
    title: 'Capturing everything that you want',
    body: 'We can accommodate everything you want in your home in line with your budget.',
    icon: (
      <>
        <path d="M13 5h8" />
        <path d="M13 12h8" />
        <path d="M13 19h8" />
        <path d="m3 17 2 2 4-4" />
        <path d="m3 7 2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Architecturally designed',
    body: 'Foundry Homes Custom homes are architecturally designed without excessive architectural design costs due to our partnership with Evolve.',
    icon: (
      <>
        <path d="M13 7 8.7 2.7a2.41 2.41 0 0 0-3.4 0L2.7 5.3a2.41 2.41 0 0 0 0 3.4L7 13" />
        <path d="m8 6 2-2" />
        <path d="m18 16 2-2" />
        <path d="m17 11 4.3 4.3c.94.94.94 2.46 0 3.4l-2.6 2.6c-.94.94-2.46.94-3.4 0L11 17" />
        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
        <path d="m15 5 4 4" />
      </>
    ),
  },
  {
    title: 'A premium sale price',
    body: 'Your Foundry Homes Custom home will be a masterpiece in your chosen subdivision commanding a premium sale price.',
    icon: (
      <>
        <path d="M10.5 3 8 9l4 13 4-13-2.5-6" />
        <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
        <path d="M2 9h20" />
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
              <p className="eyebrow">Brochure</p>
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
