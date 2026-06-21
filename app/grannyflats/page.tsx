'use client'

import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const buildFeatures = [
  'Our town planning service ensures your granny flat is compliant in all areas',
  'Architecturally designed plans',
  'Superior steel construction',
  'Local trades',
  'Transparent pricing',
  'Hassle free delivery from start to finish',
]

const rules = [
  ['Single storey', 'Designed as a standalone, self-contained dwelling.'],
  ['Code compliant construction', 'Built properly from the start, with compliance handled early.'],
  ['No subdivision required', 'Create independent living without carving up your land.'],
  ['Council notification managed', 'We guide the process so the admin does not land on you.'],
]

const steps = [
  {
    title: 'Consultation',
    body: 'To move forward, let us meet on-site to confirm feasibility and discuss your vision and budget.',
  },
  {
    title: 'Design & feasibility',
    body: 'Based on your goals and budget, we will present what we consider to be your best option for your site.',
  },
  {
    title: 'Pricing & specification',
    body: 'We will prepare a fixed price contract and a very clear specification for you to ensure there are no surprises.',
  },
  {
    title: 'Construction',
    body: 'Once you agree and pay the deposit, we will handle all construction and compliance from the beginning until you move in.',
  },
]

function ImageBox({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className={dark ? 'granny-image-box granny-image-box--dark' : 'granny-image-box'} aria-label={label}>
      <span>{label}</span>
    </div>
  )
}

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
                Granny flats the new <span>70m² opportunity</span>
              </h1>
              <p>
                Granny flats are changing how Kiwis live, by creating flexible housing solutions without the hassle of
                subdividing your land.
              </p>
              <a className="btn btn--solid" href="/#contact" data-magnet="">
                <span>Start your project</span>
              </a>
            </div>
          </div>
          <div className="granny-hero__media rv rv-d1">
            <ImageBox label="Hero exterior image" dark />
          </div>
        </section>

        <section className="granny-real t-paper" aria-label="Building real homes">
          <div className="wrap">
            <div className="granny-section-head rv">
              <p className="eyebrow">Building real homes</p>
              <h2 className="display">Building real homes</h2>
              <p>
                At Foundry Homes we build real homes, not temporary units or converted shipping containers. We design
                all our own homes with intelligence and focus on quality materials and construction that will deliver
                long-term value to your investment. Why you should choose Foundry Homes to build your granny flat:
              </p>
            </div>
            <div className="granny-feature-grid rv rv-d1">
              {buildFeatures.map((feature) => (
                <div className="granny-feature" key={feature}>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="granny-why" aria-label="Why build a granny flat">
          <div className="granny-why__media rv">
            <ImageBox label="Interior living image" />
          </div>
          <div className="granny-why__copy rv rv-d1">
            <p className="eyebrow">The Foundry difference</p>
            <h2 className="display">
              Why build a <span>granny flat?</span>
            </h2>
            <p>
              Building a granny flat represents a single build that unlocks multiple opportunities for homeowners, from
              supporting multi-generational living to generating passive rental income without the burden of subdivision
              costs. It serves as a practical solution for those looking to downsize while remaining on their land, an
              especially relevant option for farming families, or for professionals seeking a tax-deductible, dedicated
              studio or office space for working from home.
            </p>
            <p>
              Beyond personal utility, a granny flat makes the investment even stronger by increasing the income
              producing use of a property and boosting its overall resale value, all while avoiding the typical expenses
              associated with development subdivisions or additional council fees.
            </p>
            <a className="btn btn--solid" href="/#range" data-magnet="">
              <span>Take a look at our granny flats &amp; cabins</span>
            </a>
          </div>
        </section>

        <section className="granny-rules t-paper" aria-label="The new 70 square metre opportunity">
          <div className="wrap">
            <div className="granny-section-head rv">
              <p className="eyebrow">The new 70m² opportunity</p>
              <h2 className="display">The new 70m² opportunity</h2>
              <p>
                Standalone dwellings up to 70m² internal measurement qualify for simplified approval when built
                correctly. Compliance from beginning to end is still required and this matters at Foundry Homes.
              </p>
            </div>
            <div className="granny-rule-grid rv rv-d1">
              {rules.map(([title, body]) => (
                <article className="granny-rule" key={title}>
                  <span></span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="granny-wide-placeholder" aria-label="Granny flat exterior image placeholder">
          <ImageBox label="Wide exterior image" dark />
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

        <section className="granny-page-cta" aria-label="Granny flat options">
          <div className="wrap rv">
            <h2 className="display">Ready to start your journey?</h2>
            <p>Take a look at our granny flat &amp; cabin options</p>
            <a className="btn" href="/#range" data-magnet="">
              <span>Take a look at granny flats &amp; cabins</span>
            </a>
          </div>
        </section>

        <section className="granny-brochure" aria-label="Download the granny flat brochure">
          <div className="wrap granny-brochure__inner rv">
            <div>
              <p className="eyebrow">Download the granny flat brochure</p>
              <h2 className="display">Download the granny flat brochure</h2>
              <p>Full specs, floor plans and process overview, all in one PDF.</p>
            </div>
            <a className="btn" href="/#contact" data-magnet="">
              <span>Download free</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
