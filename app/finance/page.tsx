'use client'

import Image from 'next/image'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const financeServices = [
  {
    title: 'Home lending',
    body: 'First home, investment property or your next move – guidance through every step of your home loan journey.',
  },
  {
    title: 'Business lending',
    body: 'Grow, expand or capitalise on the next stage of your business with a right-fit financial solution.',
  },
  {
    title: 'Asset finance',
    body: 'Plant, machinery, vehicles and infrastructure – market-leading funding to meet your asset requirements.',
  },
]

const financeHighlights = ['Wide lender panel', '20+ years experience', 'Free in most cases', 'Trusted and local']

export default function FinancePage() {
  useFoundryAnimations()

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <Navbar />
      <MobileMenu />

      <main className="finance-page" id="top">
        <section className="finance-hero" aria-label="Independent finance advice">
          <div className="wrap finance-hero__grid">
            <div className="finance-hero__copy rv">
              <p className="eyebrow">This is Foundry</p>
              <h1 className="display">Independent <span>advice</span></h1>
              <p>
                If you require finance for your Foundry Homes building program, we have an independent, very experienced
                mortgage broker who would love to help.
              </p>
              <p>
                Melanie from Autumn Financial Services is very experienced in all forms of finance and can help you
                anywhere in NZ.
              </p>
              <div className="finance-hero__actions">
                <a className="btn" href="mailto:melanie@autumnfinancial.co.nz" data-magnet="">
                  <span>Email Melanie</span>
                </a>
                <a className="finance-link" href="https://autumnfinancial.co.nz" target="_blank" rel="noreferrer">
                  autumnfinancial.co.nz
                </a>
              </div>
            </div>

            <div className="finance-hero__image rv rv-d1">
              <Image
                src="/assets/Foundry Products (houses)/Foundry_Homes_Foundry_59.webp"
                alt="Modern Foundry-style home exterior with deck"
                width={1300}
                height={900}
                priority
                sizes="(max-width: 920px) 100vw, 56vw"
              />
            </div>
          </div>
        </section>

        <section className="finance-intro" aria-label="Autumn Financial adviser">
          <div className="wrap">
            <a
              href="https://autumnfinancial.co.nz/"
              target="_blank"
              rel="noopener noreferrer"
              className="finance-brand-strip rv"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div>
                <p>Financial growth,</p>
                <p><em>every season.</em></p>
              </div>
              <span>autumn.</span>
            </a>

            <div className="finance-profile">
              <aside className="finance-adviser rv">
                <div className="finance-adviser__portrait">
                  <Image
                    src="/assets/melanie-helsby.jpg"
                    alt="Melanie Helsby - Director & Financial Adviser"
                    width={500}
                    height={750}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    sizes="(max-width: 920px) 100vw, 280px"
                  />
                </div>
                <h2>Melanie Helsby</h2>
                <p>Director &amp; financial adviser</p>
                <small>20 years banking experience</small>
                <div className="finance-rating" aria-label="5.0 Google reviews">
                  <span>5 stars</span>
                  <b>5.0</b>
                  <small>Google Reviews</small>
                </div>
              </aside>

              <div className="finance-profile__copy rv rv-d1">
                <p className="eyebrow">Meet Mel</p>
                <h2>Meet Mel</h2>
                <p>
                  With 20 years of banking experience and a warm, professional approach to finance, Melanie Helsby
                  founded Autumn Financial Group to bring expert, personalised lending advice to Kiwis at every stage of
                  their journey.
                </p>
                <h3>Why work with an adviser?</h3>
                <p>
                  Working with Mel gives you access to a wide range of lending providers, deep expertise, and
                  old-fashioned one-on-one service. In most cases, it is entirely free – the lending providers pay her.
                </p>
                <h3>Maybe it is time to speak to Mel?</h3>
                <p>
                  Whether it is your first home, an investment property, working capital, a fleet upgrade, or that
                  long-awaited renovation – Mel is ready to help make it happen.
                </p>
              </div>
            </div>

            <div className="finance-highlights rv">
              {financeHighlights.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="finance-services" aria-label="Finance services">
          <div className="wrap">
            <p className="eyebrow rv">Our services</p>
            <div className="finance-services__grid">
              {financeServices.map((service, index) => (
                <article className="finance-service rv" key={service.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h2>{service.title}</h2>
                  <p>{service.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="finance-cta" aria-label="Contact Autumn Financial">
          <div className="wrap finance-cta__inner rv">
            <h2>Maybe it is time to give Mel a call.</h2>
            <p>Get in touch</p>
            <div>
              <a href="tel:+64212299664">(021) 229 9664</a>
              <a href="mailto:melanie@autumnfinancial.co.nz">melanie@autumnfinancial.co.nz</a>
              <a href="https://autumnfinancial.co.nz" target="_blank" rel="noreferrer">autumnfinancial.co.nz</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

