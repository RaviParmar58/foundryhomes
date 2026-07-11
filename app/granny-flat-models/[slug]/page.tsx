import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'
import PageFx from '@/components/PageFx'
import { ModelGallery } from './ModelGallery'
import {
  grannyFlatModels,
  getModelBySlug,
  STANDARD_INCLUSIONS,
  SERVICE_INCLUSIONS,
  FLOOR_PLAN_NOTE,
} from '@/lib/grannyFlatModels'

export function generateStaticParams() {
  return grannyFlatModels.map((m) => ({ slug: m.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const model = getModelBySlug(slug)
  if (!model) return {}

  return {
    title: `${model.name} - Granny Flat Model | Foundry Homes`,
    description: model.tagline,
  }
}

export default async function ModelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const model = getModelBySlug(slug)
  if (!model) notFound()

  return (
    <>
      <PageFx />
      <Navbar />
      <MobileMenu />

      <main className="model-page" id="top">
        <section className="model-hero" aria-label={`${model.name} overview`}>
          <div className="model-hero__copy rv">
            <p className="eyebrow">Granny flat model</p>
            <h1 className="display">{model.name}</h1>
            <p className="model-hero__tagline">{model.tagline}</p>
            <div className="model-hero__facts">
              <div>
                <b>{model.bedrooms}</b>
                <span>Bedroom{model.bedrooms > 1 ? 's' : ''}</span>
              </div>
              <div>
                <b>{model.bathrooms}</b>
                <span>Bathroom{model.bathrooms > 1 ? 's' : ''}</span>
              </div>
              <div>
                <b>{model.internalArea}m²</b>
                <span>Internal</span>
              </div>
              <div>
                <b>{model.externalArea}m²</b>
                <span>External</span>
              </div>
            </div>
            <div className="model-pricing-row">
              <div className="model-pricing-box">
                <span>Pricing from</span>
                <b>P.O.A</b>
              </div>
              <a
                className="model-pricing-box model-pricing-box--btn"
                href={model.brochurePdf}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Download</span>
                <b>Brochure</b>
              </a>
            </div>
          </div>
          <div className="model-hero__image rv rv-d1">
            <Image
              src={model.heroImage}
              alt={`${model.name} exterior`}
              fill
              sizes="(max-width: 920px) 100vw, 55vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </section>

        <section className="model-specs t-paper" aria-label="Specifications">
          <div className="wrap">
            <div className="model-section-head rv">
              <p className="eyebrow">Specifications</p>
              <h2 className="display">What's included as standard</h2>
              <p>Every {model.name} is built to the same steel-framed specification, backed by our 10-year builder's guarantee.</p>
            </div>
            <ul className="model-inclusion-grid rv rv-d1">
              {STANDARD_INCLUSIONS.map((item) => (
                <li key={item} className="model-inclusion">
                  <span aria-hidden="true">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <p>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="model-floorplan" aria-label="Floor plan">
          <div className="wrap">
            <div className="model-section-head rv">
              <p className="eyebrow">Floor plan</p>
              <h2 className="display">Concept layout</h2>
            </div>
            {model.floorPlanImage ? (
              <div className="model-floorplan__image">
                <Image
                  src={model.floorPlanImage}
                  alt={`${model.name} floor plan`}
                  width={1600}
                  height={900}
                  sizes="(max-width: 1080px) 100vw, 1000px"
                />
              </div>
            ) : (
              <div className="model-floorplan__copy">
                <p>{FLOOR_PLAN_NOTE}</p>
                <Link className="btn btn--solid" href="/contact" data-magnet="">
                  <span>Request the full floor plan</span>
                </Link>
              </div>
            )}
          </div>
        </section>

        <section className="model-service t-paper" aria-label="What's included with every build">
          <div className="wrap">
            <div className="model-section-head rv">
              <p className="eyebrow">Every Foundry home includes</p>
              <h2 className="display">A fully managed build</h2>
            </div>
            <div className="granny-feature-grid rv rv-d1">
              {SERVICE_INCLUSIONS.map((item) => (
                <div className="granny-feature" key={item}>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="model-gallery" aria-label="Gallery">
          <div className="wrap">
            <div className="model-section-head rv">
              <p className="eyebrow">Gallery</p>
              <h2 className="display">Indicative imagery</h2>
              <p>Photos shown are indicative only and do not depict the finished {model.name}.</p>
            </div>
            <ModelGallery images={model.galleryImages} modelName={model.name} />
          </div>
        </section>

        <section className="model-cta" aria-label="Get a quote">
          <div className="wrap">
            <h2 className="display">Ready to build your {model.name}?</h2>
            <p>Book a free, no-obligation consultation with our team.</p>
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
