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
    body: 'Our town planning service ensures full compliance for your granny flat.',
  },
  {
    title: 'Architectural plans',
    body: 'Architecturally designed plans tailored to your project requirements.',
  },
  {
    title: 'Steel construction',
    body: 'Superior steel construction built for lasting strength and durability.',
  },
  {
    title: 'Local trades',
    body: 'Experienced local trades delivering quality workmanship throughout.',
  },
  {
    title: 'Transparent pricing',
    body: 'Transparent and consistent pricing with no hidden surprises.',
  },
  {
    title: 'Hassle-free delivery',
    body: 'Hassle-free delivery from planning through to project completion.',
  },
]

// Outline icons from Lucide (lucide.dev, ISC license), inlined so they
// inherit the teal stroke and need no extra dependency.
const rules = [
  {
    title: 'Single Storey',
    body: 'Simple, practical dwellings designed for efficient living on one level.',
    icon: (
      <>
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </>
    ),
  },
  {
    title: 'Code Compliant Construction',
    body: 'Built correctly from the start, with the right construction pathway managed.',
    icon: (
      <>
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Licensed Professionals Required',
    body: 'Handled by experienced professionals who understand the compliance process.',
    icon: (
      <>
        <path d="M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5" />
        <path d="M14 6a6 6 0 0 1 6 6v3" />
        <path d="M4 15v-3a6 6 0 0 1 6-6" />
        <rect x="2" y="15" width="20" height="4" rx="1" />
      </>
    ),
  },
  {
    title: 'Council Notification Managed',
    body: 'We manage the council notification details so the process stays clear.',
    icon: (
      <>
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <path d="m9 14 2 2 4-4" />
      </>
    ),
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
            <div className="num-list rv rv-d1">
              {reasons.map((reason, index) => (
                <div className="num-item" key={reason.title}>
                  <span className="num-item__number" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3>{reason.title}</h3>
                    <p>{reason.body}</p>
                  </div>
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
                      {rule.icon}
                    </svg>
                  </span>
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
