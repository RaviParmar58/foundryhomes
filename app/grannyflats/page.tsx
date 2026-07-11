'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const reasons = [
  {
    title: 'Town planning handled',
    body: 'Our town planning service ensures your granny flat is compliant in all areas.',
  },
  {
    title: 'Architectural plans',
    body: 'Architecturally designed plans.',
  },
  {
    title: 'Steel construction',
    body: 'Superior steel construction.',
  },
  {
    title: 'Local trades',
    body: 'Local trades.',
  },
  {
    title: 'Transparent pricing',
    body: 'Transparent pricing.',
  },
  {
    title: 'Hassle-free delivery',
    body: 'Hassle free delivery from start to finish.',
  },
]

const rules = [
  {
    title: 'Single Storey',
    body: 'Simple, practical dwellings designed for efficient living on one level.',
  },
  {
    title: 'Code Compliant Construction',
    body: 'Built correctly from the start, with the right construction pathway managed.',
  },
  {
    title: 'Licensed Professionals Required',
    body: 'Handled by experienced professionals who understand the compliance process.',
  },
  {
    title: 'Council Notification Managed',
    body: 'We manage the council notification details so the process stays clear.',
  },
]

// Step copy matches the shared wording used on /granny-flats-cabins,
// /foundryhomes and /custom-builds so the circle sections stay consistent
// and the text fits inside the round mask at every breakpoint.
const steps = [
  {
    title: 'Consultation',
    body: "We meet on-site to confirm feasibility and discuss your vision and budget. No obligation.",
  },
  {
    title: 'Design & feasibility',
    body: 'We present the best option for your site, layout, orientation, access and compliance.',
  },
  {
    title: 'Pricing & specification',
    body: 'A fixed price contract and a very clear specification, so there are no surprises.',
  },
  {
    title: 'Construction',
    body: 'We handle all construction and compliance from the beginning until you move in.',
  },
]

export default function GrannyFlatsPage() {
  useFoundryAnimations()

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <Navbar />
      <MobileMenu />

      <main className="granny-page" id="top">
        <section className="granny-hero" aria-label="Granny flats new 70 square metre opportunity">
          <div className="granny-hero__copy">
            <div className="granny-hero__inner rv">
              <p className="eyebrow">New legislation</p>
              <h1 className="display">
                Granny flats
                <span>The new</span>
                <span>
                  70m<sup>2</sup>
                </span>
                <span>opportunity</span>
              </h1>
              <p>
                Granny flats are changing how Kiwis live, by creating flexible housing solutions without the hassle of
                subdividing your land.
              </p>
            </div>
          </div>
          <div className="granny-hero__media rv rv-d1">
            <Image
              src="/assets/Stock Imagery/granny_flat_03.jpeg"
              alt="Modern granny flat exterior with timber cladding and a deck"
              width={1600}
              height={1000}
              priority
              sizes="(max-width: 920px) 100vw, 58vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </section>

        <section className="granny-real t-paper" aria-label="Building real homes">
          <div className="wrap">
            <div className="granny-section-head rv">
              <h2 className="display">Building real homes</h2>
              <p>
                At Foundry Homes we build real homes not temporary units or converted shipping containers. We design all
                our own homes with intelligence and focus on quality materials and construction that will deliver
                long-term inherent value to your investment. Why you should choose Foundry Homes to build your Granny
                Flat
              </p>
            </div>
            <div className="granny-feature-grid rv rv-d1">
              {reasons.map((reason) => (
                <div className="granny-feature" key={reason.title}>
                  <span>{reason.body}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="granny-why" aria-label="Why build a granny flat">
          <div className="granny-why__media rv">
            <Image
              src="/assets/Internal Renders/25-4731-Foundry-Homes-Standard-Range---73-IR01---Living_B.jpg"
              alt="Open plan granny flat kitchen and living room"
              width={1400}
              height={1000}
              sizes="(max-width: 920px) 100vw, 55vw"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div className="granny-why__copy rv rv-d1">
            <p className="eyebrow">The Foundry difference</p>
            <h2 className="display">
              Why build a <span>granny flat?</span>
            </h2>
            <p>
              Building a granny flat represents a single build that unlocks multiple opportunities for homeowners, from
              supporting multi-generational living to generating passive rental income without the burden of subdivision
              costs. It serves as a practical solution for those looking to downsize while remaining on their land - an
              especially relevant option for farming families - or for professionals seeking a tax-deductible, dedicated
              studio or office space for working from home.
            </p>
            <p>
              Beyond personal utility, a granny flat makes significant investment sense by increasing the
              income-producing use of a property and boosting its overall resale value, all while avoiding the typical
              expenses associated with development subdivisions or additional council fees.
            </p>
            <Link className="btn btn--solid" href="/granny-flats-cabins" data-magnet="">
              <span>Take a look at our granny flats &amp; cabins</span>
            </Link>
          </div>
        </section>

        <section className="granny-rules t-paper" aria-label="The new 70 square metre opportunity">
          <div className="wrap">
            <div className="granny-section-head rv">
              <h2 className="display">
                The new 70m<sup>2</sup> opportunity
              </h2>
              <p>What the new rules mean.</p>
              <p>
                Standalone dwellings up to 70m<sup>2</sup> (internal measurement) qualify for simplified approval when
                built correctly. Compliance from beginning to end is still required and this matters at Foundry Homes and
                we will manage the entire process for you.
              </p>
            </div>
            <div className="granny-rule-grid rv rv-d1">
              {rules.map((rule) => (
                <article className="granny-rule" key={rule.title}>
                  <span aria-hidden="true"></span>
                  <h3>{rule.title}</h3>
                  <p>{rule.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="granny-wide-placeholder" aria-label="Modern granny flat exterior">
          <Image
            src="/assets/Stock Imagery/granny_flat_action.jpeg"
            alt="Wide modern granny flat exterior with outdoor living area"
            width={1800}
            height={900}
            sizes="100vw"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </section>

        <section className="granny-process t-paper" aria-label="Your build step by step">
          <div className="wrap">
            <div className="granny-section-head rv">
              <p className="eyebrow">How it works</p>
              <h2 className="display">Your build, step by step</h2>
              <p>A straightforward, four-step guide designed to walk you through the process with clarity and ease.</p>
            </div>
            <div className="granny-step-grid rv rv-d1">
              {steps.map((step, index) => (
                <article className="granny-step" key={step.title}>
                  <strong>{index + 1}.</strong>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="granny-page-cta" aria-label="Granny flat and cabin options">
          <div className="wrap rv">
            <h2 className="display">Ready to start your journey?</h2>
            <p>Take a look at our granny flat &amp; cabin options</p>
            <Link className="btn" href="/granny-flats-cabins" data-magnet="">
              <span>Take a look at granny flats &amp; cabins</span>
            </Link>
          </div>
        </section>

        <section className="granny-brochure" aria-label="Download the granny flat brochure">
          <div className="wrap granny-brochure__inner rv">
            <div>
              <h2 className="display">Download the granny flat brochure</h2>
              <p>Full specs, floor plans and process overview - all in one PDF.</p>
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
