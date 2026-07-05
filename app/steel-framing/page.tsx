'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const benefits = [
  {
    title: 'Superior structural strength',
    body: 'Cold-formed steel creates a stronger, straighter frame for long-term residential performance.',
  },
  {
    title: 'Precision-engineered framing',
    body: 'Frames are manufactured to plan, helping every wall, opening, and junction align cleanly on site.',
  },
  {
    title: 'Reduced movement',
    body: 'Steel resists the warping, twisting, and shrinkage that can affect traditional timber framing.',
  },
  {
    title: 'Consistent build accuracy',
    body: 'A repeatable frame system helps trades work faster and keeps the finished home sharper.',
  },
  {
    title: 'Environmental friendliness',
    body: 'Steel is recyclable, durable, and reduces material waste through accurate manufacture.',
  },
  {
    title: 'Time and cost efficiency',
    body: 'Cleaner assembly and fewer movement issues can help reduce delays, rework, and hidden costs.',
  },
]

const stats = [
  ['100%', 'Accurate, every single time'],
  ['0%', 'Warp, twist, or shrinkage over time'],
  ['100%', 'Recyclable'],
  ['100%', 'Pest resistant'],
]

const proofPoints = [
  {
    title: 'Stronger structure',
    body: 'Cold-formed steel creates straight, stable framing with excellent structural integrity.',
    image: '/assets/Steel imagery/Foundry_Homes_Steel_framing_2.jpg',
  },
  {
    title: 'Cleaner assembly',
    body: 'Engineered members arrive ready to fit, helping reduce waste and speed up site work.',
    image: '/assets/Steel imagery/Foundry_Homes_Steel_framing_4.jpg',
  },
]

const advantages = [
  {
    title: 'Dimensional stability',
    body: 'Stays exactly where it is put. No seasonal movement. No shrinkage.',
  },
  {
    title: 'Pest resistant',
    body: 'Steel is not a food source, so it removes one of the common risks associated with traditional timber framing.',
  },
  {
    title: 'Non-combustible',
    body: 'Cold-formed steel framing adds a non-combustible structural system inside the building envelope.',
  },
  {
    title: 'Precision manufactured',
    body: 'Frames are engineered and manufactured to plan, helping each build stay straight, accurate and repeatable.',
  },
  {
    title: 'Long service life',
    body: 'Steel delivers durable performance for decades with strength that does not depend on seasonal moisture movement.',
  },
]

export default function SteelFramingPage() {
  useFoundryAnimations()
  const [openAdvantage, setOpenAdvantage] = useState(0)

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <Navbar />
      <MobileMenu />

      <main className="steel-page" id="top">
        <section className="steel-hero" aria-label="Steel framing built to last">
          <div className="steel-hero__copy">
            <div className="steel-hero__copy-inner rv">
              <p className="eyebrow">How we build</p>
              <h1 className="display">
                Steel framing. <span>Built to last.</span>
              </h1>
              <p>
                Every Foundry home, granny flat, cabin and bespoke build is built on a cold-formed steel frame. It is
                not an upgrade. It is the standard.
              </p>
              <div className="steel-hero__actions">
                <Link className="btn btn--solid" href="/contact" data-magnet="">
                  <span>Get a quote</span>
                </Link>
                <a className="steel-text-link" href="#advantages">
                  Explore benefits
                </a>
              </div>
            </div>
          </div>
          <div className="steel-hero__media steel-frame-graphic rv rv-d1">
            <Image
              src="/assets/Steel imagery/Foundry_Homes_Steel_framing.jpg"
              alt="Cold-formed steel frame under construction"
              width={1400}
              height={900}
              priority
              sizes="(max-width: 920px) 100vw, 58vw"
            />
          </div>
        </section>

        <section className="steel-benefits t-paper" aria-label="Why steel framing matters">
          <div className="wrap">
            <div className="steel-section-head rv">
              <p className="eyebrow">Future-ready construction</p>
              <h2 className="display">Steel framing is the future of residential construction in NZ</h2>
              <p>
                Steel provides straighter walls, immense structural integrity and improved long-term performance
                compared to traditional timber framing. For a stronger alternative, our steel-framed homes offer:
              </p>
            </div>
            <div className="steel-benefits__grid rv rv-d1">
              {benefits.map((benefit) => (
                <div className="steel-benefit" key={benefit.title}>
                  <span>{benefit.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="steel-proof t-paper" aria-label="Steel frame proof">
          <div className="wrap steel-proof__grid">
            {proofPoints.map((point, index) => (
              <article className="steel-proof-card rv" key={point.title}>
                <Image
                  className="steel-proof-card__image"
                  src={point.image}
                  alt=""
                  width={1200}
                  height={760}
                  sizes="(max-width: 920px) 100vw, 50vw"
                />
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h2 className="display">{point.title}</h2>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="steel-statement" aria-label="Steel is standard">
          <div className="wrap rv">
            <p>
              We do not offer steel as an upgrade. <span>It is simply how we build.</span> Because once you understand
              what it gives you, there is no reason to build any other way.
            </p>
          </div>
        </section>

        <section className="steel-performance" aria-label="Performance that lasts decades">
          <div className="steel-performance__panel steel-frame-graphic rv">
            <Image
              src="/assets/Steel imagery/Foundry_Homes_Steel_framing_5.jpg"
              alt="Steel framing structure being assembled on site"
              width={1300}
              height={900}
              sizes="(max-width: 920px) 100vw, 56vw"
            />
          </div>
          <div className="steel-performance__copy rv rv-d1">
            <p className="eyebrow">Why steel</p>
            <h2 className="display">
              Performance that <span>lasts decades</span>
            </h2>
            <p>
              Cold-formed steel framing has been used in commercial construction for decades. Foundry brings it to
              residential builds because the benefits are too significant to ignore: straighter walls, stronger
              structure and a frame that performs exactly the same in 30 years as it does on day one.
            </p>
          </div>
        </section>

        <section className="steel-stats" aria-label="Steel framing performance statistics">
          {stats.map(([number, label]) => (
            <div className="steel-stat rv" key={label}>
              <strong>{number}</strong>
              <span>{label}</span>
            </div>
          ))}
        </section>

        <section className="steel-advantages t-paper" id="advantages" aria-label="Advantages of steel">
          <div className="wrap">
            <div className="steel-section-head rv">
              <p className="eyebrow">Built-in advantages</p>
              <h2 className="display">
                The advantages <span>of steel</span>
              </h2>
            </div>
            <div className="steel-accordion rv rv-d1">
              {advantages.map((item, index) => {
                const isOpen = openAdvantage === index
                return (
                  <div className={`steel-accordion__item${isOpen ? ' is-open' : ''}`} key={item.title}>
                    <button
                      type="button"
                      className="steel-accordion__trigger"
                      aria-expanded={isOpen}
                      onClick={() => setOpenAdvantage(isOpen ? -1 : index)}
                    >
                      <span className="steel-accordion__num">{String(index + 1).padStart(2, '0')}</span>
                      <span className="steel-accordion__title">{item.title}</span>
                      <span className="steel-accordion__icon" aria-hidden="true">
                        <span className="steel-accordion__icon-line steel-accordion__icon-line--h" />
                        <span className="steel-accordion__icon-line steel-accordion__icon-line--v" />
                      </span>
                    </button>
                    <div className="steel-accordion__panel">
                      <div className="steel-accordion__panel-inner">
                        <p>{item.body}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="steel-assembly" aria-label="Manufactured off-site assembled on yours">
          <div className="steel-assembly__panel rv">
            <Image
              src="/assets/Foundry Products (houses)/Foundry_Homes_Foundry_62.jpeg"
              alt="Steel frame wall panels assembled on site"
              width={1300}
              height={900}
              sizes="(max-width: 920px) 100vw, 56vw"
            />
          </div>
          <div className="steel-assembly__copy rv rv-d1">
            <p className="eyebrow">How it works</p>
            <h2 className="display">
              Manufactured off-site. <span>Assembled on yours.</span>
            </h2>
            <p>
              Cold-formed steel members are manufactured to your plan&apos;s exact specification. They arrive on site
              ready to assemble, faster than timber framing and with close to zero waste. The result is a structure that
              is perfectly true from the first day.
            </p>
            <Link className="btn btn--solid" href="/#range" data-magnet="">
              <span>See our homes</span>
            </Link>
          </div>
        </section>

        <section className="steel-page-cta" aria-label="Book a quote">
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
