export default function Why() {
  return (
    <section className="why t-paper" id="why" aria-label="The Foundry difference">
      <div className="wrap why__grid">
        <div className="why__left">
          <p className="eyebrow rv">The Foundry difference</p>
          <h2 className="display rv rv-d1">A better way <span className="accent">to build</span></h2>
          <p className="lede rv rv-d2">
            Instead of rushing through high volumes of builds, we focus on delivering homes with strong materials, clear communication and careful attention to every detail.
          </p>
          <svg className="frame-svg" viewBox="0 0 430 300" aria-label="Steel frame diagram">
            <path className="fs-d1" d="M30 270 L30 110 L215 20 L400 110 L400 270 Z" />
            <line className="fs-d2" x1="30" y1="110" x2="400" y2="110" />
            <line className="fs-d2" x1="105" y1="110" x2="105" y2="270" />
            <line className="fs-d2" x1="180" y1="110" x2="180" y2="270" />
            <line className="fs-d2" x1="255" y1="110" x2="255" y2="270" />
            <line className="fs-d2" x1="330" y1="110" x2="330" y2="270" />
            <line className="fs-d3" x1="30" y1="110" x2="105" y2="270" />
            <line className="fs-d3" x1="180" y1="110" x2="255" y2="270" />
            <line className="fs-d3 fs-teal" x1="330" y1="110" x2="400" y2="270" />
            <line className="fs-d4 fs-teal" x1="30" y1="270" x2="400" y2="270" />
            <path className="fs-d4 fs-teal" d="M120 65 L215 20 L310 65" />
          </svg>
          <button className="frame-replay" type="button" data-frame-replay>
            <span>Rebuild</span> frame
          </button>
        </div>
        <div>
          <div className="why__item rv">
            <b>01</b>
            <div>
              <h3>Steel framing, by choice</h3>
              <p>Superior strength, precision-engineered for NZ conditions. Steel doesn&apos;t warp, twist, or shrink - your walls stay straight and your doors keep closing, year after year.</p>
            </div>
          </div>
          <div className="why__item rv">
            <b>02</b>
            <div>
              <h3>Loyal NZ supply chain</h3>
              <p>We don&apos;t chase cheap. We partner with the best New Zealand suppliers - for consistent quality, reliable supply and stable pricing throughout your build.</p>
            </div>
          </div>
          <div className="why__item rv">
            <b>03</b>
            <div>
              <h3>Transparent from day one</h3>
              <p>Clear pricing, clear specs, no surprises. Every project runs on a Master Build or Certified Builder contract, so you always know exactly where you stand.</p>
            </div>
          </div>
          <div className="why__item rv">
            <b>04</b>
            <div>
              <h3>Quality over volume</h3>
              <p>Your build gets our full attention, every time. We deliberately take on fewer projects so each one is finished with the care it deserves.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
