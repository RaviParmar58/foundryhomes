export default function Process() {
  return (
    <section className="process" id="process" aria-label="The build process">
      <div className="wrap">
        <div className="process__head">
          <div>
            <p className="eyebrow rv">How it works</p>
            <h2 className="display rv rv-d1">A process you can rely on</h2>
          </div>
          <p className="lede rv rv-d2" style={{ maxWidth: '38ch' }}>
            From the first conversation to the day you get the keys - five clear stages, one local team.
          </p>
        </div>
        <div className="process__rail rv" id="processRail">
          <div className="process__line" aria-hidden="true"></div>
          <div className="step">
            <span className="step__num">Stage 01</span>
            <h3>Talk</h3>
            <p>Tell us where you are and what you&apos;re thinking. Your local Foundry team discusses your project - no pressure, no obligations.</p>
          </div>
          <div className="step">
            <span className="step__num">Stage 02</span>
            <h3>Design</h3>
            <p>Choose from the Foundry range or design a custom build. Clear specs and clear pricing from day one.</p>
          </div>
          <div className="step">
            <span className="step__num">Stage 03</span>
            <h3>Consent</h3>
            <p>A team that understands your local council and site conditions, helping your project move forward with fewer surprises.</p>
          </div>
          <div className="step">
            <span className="step__num">Stage 04</span>
            <h3>Build</h3>
            <p>Precision steel framing goes up - engineered for NZ conditions, backed by a Master Build or Certified Builder contract.</p>
          </div>
          <div className="step">
            <span className="step__num">Stage 05</span>
            <h3>Move in</h3>
            <p>Your home, built your way, finished with care. Strong materials, careful attention to every detail.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
