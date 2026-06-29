const stories = [
  {
    initials: 'S',
    name: 'Sarah & Mike T.',
    project: 'Family home',
    place: 'Tauranga',
    quote:
      'From the first meeting, the pricing was completely transparent. What they quoted is what we paid. After hearing horror stories from friends building elsewhere, that alone was worth everything.',
    metric: 'Fixed price',
  },
  {
    initials: 'J',
    name: 'James R.',
    project: 'Granny flat',
    place: 'Hamilton',
    quote:
      'The steel frame went up in days and everything was perfectly straight. Two years on, not a single crack in the gib. Our local team handled council consent without us lifting a finger.',
    metric: 'Steel framed',
  },
  {
    initials: 'A',
    name: 'Aroha & Dan W.',
    project: 'Custom build',
    place: 'Whangarei',
    quote:
      'You can tell they take on fewer builds on purpose. We always knew exactly what was happening and when. It felt like our home actually mattered to them because it did.',
    metric: 'Clear comms',
  },
  {
    initials: 'P',
    name: 'Priya N.',
    project: 'Family home',
    place: 'Auckland',
    quote:
      "The Master Build guarantee gave us real peace of mind, and the quality of the NZ materials speaks for itself. We'd build with Foundry again without hesitation.",
    metric: 'NZ materials',
  },
]

export default function Testimonials() {
  return (
    <section className="testi" aria-label="Client stories">
      <div className="wrap testi__inner">
        <div className="testi__head">
          <div className="testi__title">
            <p className="eyebrow rv">Client stories</p>
            <h2 className="display rv rv-d1">Homes that feel considered from day one.</h2>
          </div>
          <p className="testi__lede rv rv-d2">
            Real feedback from clients who wanted certainty, stronger materials, and a team that stayed close from first conversation to handover.
          </p>
        </div>

        <div className="testi__layout">
          <aside className="testi__feature rv" aria-label="Featured client story">
            <div className="testi__feature-top">
              <span className="testi__kicker">Featured story</span>
              <span className="testi__stars" aria-label="Five star review">★★★★★</span>
            </div>
            <blockquote>
              "We never felt like another job number. Every decision was explained, every cost was clear, and the finished home feels stronger than anything else we looked at."
            </blockquote>
            <div className="testi__feature-footer">
              <div className="testi__avatar">M</div>
              <div>
                <b>Matt & Renee K.</b>
                <span>Steel-framed family home - Bay of Plenty</span>
              </div>
            </div>
            <div className="testi__proof-grid" aria-hidden="true">
              <div>
                <strong>100%</strong>
                <span>clear pricing</span>
              </div>
              <div>
                <strong>1</strong>
                <span>local build team</span>
              </div>
            </div>
          </aside>

          <div className="testi__rail rv rv-d1">
            <div className="testi__viewport">
              <div className="testi__controls">
                <span>Browse stories</span>
                <div className="testi__nav" aria-label="Client story navigation">
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
              <div className="testi__track" id="tTrack">
                {stories.map((story, index) => (
                  <article className={`t-card rv rv-d${Math.min(index, 3)}`} key={story.name}>
                    <div className="t-card__meta">
                      <span>{story.metric}</span>
                      <span>{story.place}</span>
                    </div>
                    <div className="t-card__quote" aria-hidden="true">"</div>
                    <p>{story.quote}</p>
                    <footer>
                      <i>{story.initials}</i>
                      <div>
                        <b>{story.name}</b>
                        <span>{story.project} - {story.place}</span>
                      </div>
                    </footer>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
