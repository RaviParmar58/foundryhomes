import Link from 'next/link'

export default function CTA() {
  return (
    <section className="cta" aria-label="Get started">
      <div className="cta__beams" aria-hidden="true">
        <i></i><i></i><i></i><i></i>
      </div>
      <div className="wrap">
        <h2 className="display">
          <span className="rv-line"><span>Ready to build</span></span>
          <span className="rv-line" style={{ transitionDelay: '.12s' }}><span className="accent">together?</span></span>
        </h2>
        <p className="rv rv-d2">
          Book a free quote today. Your local Foundry team will be in touch to discuss your project - no pressure, no obligations.
        </p>
        <div className="cta__row rv rv-d3">
          <Link href="/contact" className="btn btn--solid" data-magnet="">
            <span>Book a free quote</span>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
          <Link href="/#range" className="btn" data-magnet=""><span>Explore the range</span></Link>
        </div>
      </div>
    </section>
  )
}
