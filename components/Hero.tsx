export default function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <div className="hero__media" aria-hidden="true">
        <div className="hero__slide hero__slide--1 hero__bg" data-parallax="0.18"></div>
        <div className="hero__slide hero__slide--2 hero__bg" data-parallax="0.18"></div>
        <div className="hero__slide hero__slide--3 hero__bg" data-parallax="0.18"></div>
        <div className="hero__seam"><span></span></div>
        <div className="hero__crosshair"><span></span></div>
        <div className="hero__tag hero__tag--top"><i></i> Steel frame</div>
        <div className="hero__tag hero__tag--bottom"><i></i> NZ engineered</div>
        <div className="hero__dim"><span></span><b>Fixed price</b></div>
      </div>

      <div className="hero__grid-lines" aria-hidden="true">
        <i></i><i></i><i></i><i></i><i></i>
      </div>

      {/* Centered main content */}
      <div className="wrap hero__inner">
        <p className="eyebrow hero__eyebrow rv-line"><span>Steel-framed homes</span></p>

        <h1 className="display">
          <span className="rv-line"><span>Your home,</span></span>
          <span className="rv-line" style={{ transitionDelay: '.12s' }}>
            <span>built <em className="accent">your</em> way</span>
          </span>
        </h1>

        <p className="hero__sub rv rv-d3">
          New Zealand–made steel-framed homes, engineered around the way you actually live — with one fixed price and no surprises.
        </p>

        {/* Trust badges */}
        <div className="hero__trust rv rv-d4">
          <div className="hero__trust-item">
            <b>15+</b>
            <span>Years Experience</span>
          </div>
          <div className="hero__trust-sep" aria-hidden="true"></div>
          <div className="hero__trust-item">
            <b>NZ</b>
            <span>Owned &amp; Operated</span>
          </div>
          <div className="hero__trust-sep" aria-hidden="true"></div>
          <div className="hero__trust-item">
            <b>Master</b>
            <span>Build Partners</span>
          </div>
        </div>
      </div>

      {/* Mouse scroll indicator */}
      <a className="hero__mouse" href="#hero-strip" aria-label="Scroll to next section">
        <span></span>
      </a>
    </section>
  )
}
