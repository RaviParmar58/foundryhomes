export default function Testimonials() {
  return (
    <section className="testi" aria-label="Client stories">
      <div className="wrap">
        <div className="testi__head">
          <div>
            <p className="eyebrow rv">Client stories</p>
            <h2 className="display rv rv-d1">In their words</h2>
          </div>
          <div className="testi__nav rv rv-d2">
            <button className="testi__btn" id="tPrev" aria-label="Previous testimonial">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M7 1L1 7l6 6M1 7h16" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
            <button className="testi__btn" id="tNext" aria-label="Next testimonial">
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M11 1l6 6-6 6M17 7H1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
        <div className="testi__viewport">
          <div className="testi__track" id="tTrack">
            <article className="t-card rv">
              <div className="t-card__quote">&ldquo;</div>
              <p>From the first meeting, the pricing was completely transparent. What they quoted is what we paid. After hearing horror stories from friends building elsewhere, that alone was worth everything.</p>
              <footer>
                <i>S</i>
                <div>
                  <b>Sarah &amp; Mike T.</b>
                  <span>Family home · Tauranga</span>
                </div>
              </footer>
            </article>
            <article className="t-card rv rv-d1">
              <div className="t-card__quote">&ldquo;</div>
              <p>The steel frame went up in days and everything was perfectly straight. Two years on, not a single crack in the gib. Our local team handled council consent without us lifting a finger.</p>
              <footer>
                <i>J</i>
                <div>
                  <b>James R.</b>
                  <span>Granny flat · Hamilton</span>
                </div>
              </footer>
            </article>
            <article className="t-card rv rv-d2">
              <div className="t-card__quote">&ldquo;</div>
              <p>You can tell they take on fewer builds on purpose. We always knew exactly what was happening and when. It felt like our home actually mattered to them — because it did.</p>
              <footer>
                <i>A</i>
                <div>
                  <b>Aroha &amp; Dan W.</b>
                  <span>Custom build · Whangārei</span>
                </div>
              </footer>
            </article>
            <article className="t-card rv rv-d3">
              <div className="t-card__quote">&ldquo;</div>
              <p>The Master Build guarantee gave us real peace of mind, and the quality of the NZ materials speaks for itself. We&apos;d build with Foundry again without hesitation.</p>
              <footer>
                <i>P</i>
                <div>
                  <b>Priya N.</b>
                  <span>Family home · Auckland</span>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
