import Image from 'next/image'
import Link from 'next/link'

export default function Range() {
  return (
    <section className="range" id="range" aria-label="The Foundry range">
      <div className="range__head">
        <div className="wrap">
          <div>
            <p className="eyebrow rv">The Foundry range</p>
            <h2 className="display rv rv-d1">Built for<br />real life</h2>
          </div>
          <p className="range__hint rv rv-d2">Scroll to explore <i></i></p>
        </div>
      </div>
      <div className="range__outer" id="rangeOuter">
        <div className="range__sticky">
          <div className="range__track" id="rangeTrack">
            <article className="range-card">
              <div className="range-card__img">
                <Image
                  src="/assets/Stock Imagery/granny_flat_02.jpeg"
                  alt=""
                  fill
                  sizes="(max-width: 1080px) 100vw, 42vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              <div className="range-card__body">
                <span className="range-card__idx">Range / 01</span>
                <h3>Granny Flats<br />&amp; Cabins</h3>
                <p className="range-card__meta">1-3 bedroom · Under 70m²</p>
                <p className="range-card__desc">Compact, beautifully resolved steel-framed spaces - for family, guests, or rental income. Fast to consent, faster to love.</p>
                <Link href="/granny-flats-cabins" className="btn btn--sm range-card__link" data-magnet="">
                  <span>Explore the range</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </article>

            <article className="range-card">
              <div className="range-card__img">
                <Image
                  src="/assets/Foundry Products (houses)/Foundry_Homes_Foundry_69.png"
                  alt=""
                  fill
                  sizes="(max-width: 1080px) 100vw, 42vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              <div className="range-card__body">
                <span className="range-card__idx">Range / 02</span>
                <h3>Family<br />Homes</h3>
                <p className="range-card__meta">1-4 bedroom · 70-99m²</p>
                <p className="range-card__desc">Considered plans that work hard for everyday life - light-filled, efficient, and engineered straight from day one.</p>
                <Link href="/foundryhomes" className="btn btn--sm range-card__link" data-magnet="">
                  <span>Explore the range</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </article>

            <article className="range-card">
              <div className="range-card__img">
                <Image
                  src="/assets/Foundry Products (houses)/Foundry_Homes_Foundry_99.jpeg"
                  alt=""
                  fill
                  sizes="(max-width: 1080px) 100vw, 42vw"
                  style={{ objectFit: 'cover', objectPosition: 'center' }}
                />
              </div>
              <div className="range-card__body">
                <span className="range-card__idx">Range / 03</span>
                <h3>Custom<br />Builds</h3>
                <p className="range-card__meta">Your home · Built your way</p>
                <p className="range-card__desc">A blank page and a steel frame. Work with our designers and your local team to build something entirely yours.</p>
                <Link href="/custom-builds" className="btn btn--sm range-card__link" data-magnet="">
                  <span>Start a custom build</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
