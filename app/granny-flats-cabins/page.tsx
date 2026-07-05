// 'use client'

// export { default } from '../granny-flats/page'


'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const lifestyleBenefits = [
  {
    title: 'Multi-generational living',
    body: 'Keep family close while maintaining independence. A private, self-contained space on your own land.',
  },
  {
    title: 'Rental income',
    body: 'Generate passive income from land you already own, with no subdivision or extra development costs.',
  },
  {
    title: 'Downsize',
    body: 'Stay on your land, free up the main home for the next generation, and simplify your life.',
  },
  {
    title: 'Work from home',
    body: 'A dedicated studio or office on your property, separate from the house and potentially tax deductible.',
  },
]

const steps = [
  {
    title: 'Consultation',
    body: 'We visit your site, understand what you need, and assess what is possible. No obligation.',
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
  ['Foundry 36', '1', '1', '36', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_36.jpg', 'foundry-36'],
  ['Foundry 51', '2', '1', '51', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_51.jpeg', 'foundry-51'],
  ['Foundry 52', '2', '1', '52', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_52.jpeg', 'foundry-52'],
  ['Foundry 57', '2', '1', '57', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_57.jpeg', 'foundry-57'],
  ['Foundry 59', '2', '1', '59', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_59.webp', 'foundry-59'],
  ['Foundry 62', '3', '1', '62', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_62.jpeg', 'foundry-62'],
  ['Foundry 69', '3', '1', '69', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_69.png', 'foundry-69'],
  ['Foundry 73', '3', '2', '73', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_73.jpeg', 'foundry-73'],
  ['Foundry 73B', '1', '1', '73', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_73(B).jpg', 'foundry-73b'],
  ['Foundry 80', '3', '2', '80', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_80.png', 'foundry-80'],
  ['Foundry 85', '3', '1', '85', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_85.jpeg', 'foundry-85'],
  ['Foundry 99', '4', '2', '99', '/assets/Foundry Products (houses)/Foundry_Homes_Foundry_99.jpeg', 'foundry-99'],
]

export default function GrannyFlatsHyphenPage() {
  useFoundryAnimations()

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <Navbar />
      <MobileMenu />

      <main className="gf-page" id="top">
        <section className="gf-hero" aria-label="Granny flats and cabins built to last">
          <div className="gf-hero__copy">
            <div className="gf-hero__inner rv">
              <p className="eyebrow">Small dwellings</p>
              <h1 className="display">
                Granny flats &amp; cabins that are <span>built to last</span>
              </h1>
              <p>
                Architecturally designed, steel-framed minor dwellings up to 70m<sup>2</sup>, fully compliant, fixed
                price, and managed from concept to key handover.
              </p>
              <Link className="btn btn--solid" href="/contact" data-magnet="">
                <span>Get a quote</span>
              </Link>
            </div>
          </div>
          <div className="gf-hero__image rv rv-d1">
            <Image
              src="/assets/Stock Imagery/granny_flat_generic_01.jpeg"
              alt="Modern compact granny flat with timber cladding and deck"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 920px) 100vw, 58vw"
            />
          </div>
        </section>

        <section className="gf-lifestyle t-paper" aria-label="Reasons to build a granny flat">
          {lifestyleBenefits.map((benefit) => (
            <article className="gf-lifestyle__item rv" key={benefit.title}>
              <span aria-hidden="true"></span>
              <div>
                <h2>{benefit.title}</h2>
                <p>{benefit.body}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="gf-advice" aria-label="Granny flat legislation support">
          <div className="gf-advice__image rv">
            <Image
              src="/assets/Foundry Products (houses)/Foundry_Homes_Foundry_57.jpeg"
              alt="Compact modern cabin in a landscaped setting"
              width={1300}
              height={900}
              sizes="(max-width: 920px) 100vw, 55vw"
            />
          </div>
          <div className="gf-advice__copy rv rv-d1">
            <p>
              Recent changes in the legislation regarding granny flats or minor dwellings have made building a granny
              flat on your section more accessible.
            </p>
            <p>
              Having said that, in order to comply with council, insurance companies and banks there is still an
              important pathway to follow.
            </p>
            <p>
              Foundry Homes have expert town planning advisers and can help with creating a successful granny flat
              strategy for you that will ensure it is legally compliant and satisfies all insurance companies and banks
              requirements.
            </p>
            <Link className="btn btn--solid" href="/contact" data-magnet="">
              <span>Contact us to learn more</span>
            </Link>
          </div>
        </section>

        <section className="gf-process t-paper" aria-label="Your build step by step">
          <div className="wrap">
            <div className="gf-section-head rv">
              <p className="eyebrow">How it works</p>
              <h2 className="display">Your build, step by step</h2>
              <p>A straightforward, four-step guide designed to walk you through the process with clarity and ease.</p>
            </div>
            <div className="gf-step-grid rv rv-d1">
              {steps.map((step, index) => (
                <article className="gf-step" key={step.title}>
                  <strong>{index + 1}.</strong>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gf-range t-paper" aria-label="Choose your granny flat model">
          <div className="wrap">
            <div className="gf-section-head rv">
              <p className="eyebrow">Our range</p>
              <h2 className="display">Choose your model</h2>
              <p>
                Architecturally designed plans, from a compact studio to a full three-bedroom home. Every model is steel
                framed, council compliant, and available with a clear price contract.
              </p>
            </div>
            <div className="gf-model-grid">
              {models.map(([name, beds, baths, area, image, slug]) => (
                <article className="gf-model rv" key={name}>
                  <div className="gf-model__image">
                    <Image
                      src={image}
                      alt={`${name} granny flat model`}
                      width={900}
                      height={560}
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    />
                    <span>{name}</span>
                  </div>
                  <div className="gf-model__body">
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

        <section className="gf-page-cta" aria-label="Book a quote">
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
