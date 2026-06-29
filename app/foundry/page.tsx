'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const promises = [
  'Certainty in quality of product in their home',
  'Stable pricing',
  'Reliable supply chains',
  'Homes built specifically for NZ weather and compliance standards',
]

const pillars = [
  {
    title: 'Every plan is architecturally designed',
    image: '/assets/images/homes/archidea-x-CgGdE-BB9Jw-unsplash.jpg',
  },
  {
    title: 'Steel frame. Every home. No exceptions',
    image: '/assets/images/homes/laura-cleffmann-NuxSQPE-X90-unsplash.jpg',
  },
  {
    title: 'Loyal New Zealand supply chain',
    image: '/assets/images/homes/Dual Pavilion House Exterior.jpg',
  },
]

export default function FoundryPage() {
  useFoundryAnimations()

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <Navbar />
      <MobileMenu />

      <main className="foundry-page" id="top">
        <section className="foundry-hero" aria-label="This is Foundry">
          <div className="foundry-hero__copy">
            <div className="foundry-hero__inner rv">
              <p className="eyebrow">This is Foundry</p>
              <h1 className="display">
                Fewer homes. <span>Built better.</span>
              </h1>
              <p>
                We are not the biggest home builder in New Zealand. That is a choice, not a limitation. Every home we
                build gets the attention it deserves.
              </p>
              <Link className="btn btn--solid" href="/contact" data-magnet="">
                <span>Start your project</span>
              </Link>
            </div>
          </div>
          <div className="foundry-hero__image rv rv-d1">
            <Image
              src="/assets/images/homes/3d-rendering-wooden-house.jpg"
              alt="Compact modern Foundry-style home on a timber deck"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 920px) 100vw, 58vw"
            />
          </div>
        </section>

        <section className="foundry-confidence t-paper" aria-label="Build with confidence">
          <div className="wrap">
            <div className="foundry-section-head rv">
              <p className="eyebrow">Confidence from day one</p>
              <h2 className="display">When you build with Foundry Homes you build with confidence</h2>
              <p>
                Foundry Homes is a NZ owned building company committed to quality, integrity and long-term performance.
                We do not compete by cutting costs or sourcing cheap offshore materials. Instead, we maintain
                long-standing partnerships with leading NZ suppliers who consistently deliver reliable products, service
                and support for a fair agreed price.
              </p>
            </div>
            <div className="foundry-promise-grid rv rv-d1">
              {promises.map((promise) => (
                <div className="foundry-promise" key={promise}>
                  <span>{promise}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="foundry-gallery t-paper" aria-label="Foundry home details">
          <div className="wrap foundry-gallery__grid">
            <div className="foundry-gallery__image rv">
              <Image
                src="/assets/images/homes/woody-kelly-6R_sDhk4VrQ-unsplash.jpg"
                alt="Modern compact timber-clad home with covered outdoor living"
                width={1300}
                height={900}
                sizes="(max-width: 920px) 100vw, 50vw"
              />
            </div>
            <div className="foundry-gallery__image rv rv-d1">
              <Image
                src="/assets/images/homes/Dual Pavilion House Exterior.jpg"
                alt="Foundry-style dual pavilion home at dusk"
                width={900}
                height={600}
                sizes="(max-width: 920px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        <section className="foundry-statement" aria-label="Different business different result">
          <div className="wrap rv">
            <p>
              Most builders want to build as many homes as possible. <span>We want to build as many as we can do
              properly.</span> That is a different business, and it leads to a different result.
            </p>
          </div>
        </section>

        <section className="foundry-story" aria-label="The Foundry story">
          <div className="foundry-story__image rv">
            <Image
              src="/assets/images/homes/cait-QfEk58i-d78-unsplash.jpg"
              alt="Premium modern home connected to outdoor living"
              width={1400}
              height={1000}
              sizes="(max-width: 920px) 100vw, 55vw"
            />
          </div>
          <div className="foundry-story__copy rv rv-d1">
            <p className="eyebrow">The Foundry story</p>
            <h2 className="display">
              Built from <span>experience</span>
            </h2>
            <p>
              Foundry Homes was born out of frustration with the way residential construction works in New Zealand. Too
              many homes are built to a budget. Too many clients are left managing the process themselves. Too many
              builders disappear when things get complicated.
            </p>
            <p>
              We built Foundry around a different idea. One team. One contract. Steel frame as standard. A price that
              means something. And a process that treats clients like adults, with straight answers and no surprises.
            </p>
            <p>
              Today we operate across NZ through a network of licensees who share the same system, the same suppliers
              and the same values. The network is growing, but the standards are not moving.
            </p>
          </div>
        </section>

        <section className="foundry-steel t-paper" aria-label="Every Foundry home is steel framed">
          <div className="wrap rv">
            <p className="eyebrow">Built different</p>
            <h2 className="display">Every Foundry home is steel framed.</h2>
            <p>
              Cold-formed steel framing is stronger, straighter and more durable than timber. It does not warp, twist or
              attract pests. It is not an upgrade. It is how we build every home, every time.
            </p>
            <Link className="btn btn--dark" href="/steel-framing" data-magnet="">
              <span>Learn about our steel framing</span>
            </Link>
          </div>
        </section>

        <section className="foundry-pillars rv" aria-label="Foundry commitments">
          {pillars.map((pillar, index) => (
            <article className={`foundry-pillar rv-d${index + 1}`} key={pillar.title}>
              {pillar.image ? (
                <Image
                  src={pillar.image}
                  alt=""
                  width={900}
                  height={900}
                  sizes="(max-width: 920px) 100vw, 33vw"
                />
              ) : (
                <div className="foundry-pillar__steel" aria-hidden="true">
                  <i></i><i></i><i></i><i></i>
                </div>
              )}
              <h2 className="display">{pillar.title}</h2>
            </article>
          ))}
        </section>

        <section className="foundry-page-cta" aria-label="Book a quote">
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
