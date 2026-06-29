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
                  src="/assets/images/homes/photorealistic-wooden-house-with-timber-structure.jpg"
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
                <Link href="/grannyflats" className="range-card__link">Explore the range →</Link>
              </div>
            </article>

            <article className="range-card">
              <div className="range-card__img">
                <Image
                  src="/assets/images/homes/salman-saqib-93AF-d_y8rI-unsplash.jpg"
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
                <Link href="/foundryhomes" className="range-card__link">Explore the range →</Link>
              </div>
            </article>

            <article className="range-card">
              <div className="range-card__img">
                <Image
                  src="/assets/images/homes/modern-luxury-house-with-swimming-pool.jpg"
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
                <Link href="/custom-builds" className="range-card__link">Start a custom build →</Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
