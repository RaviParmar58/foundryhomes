import Image from 'next/image'

export default function Projects() {
  return (
    <section className="projects" id="projects" aria-label="Recent projects">
      <div className="wrap">
        <div className="projects__head">
          <div>
            <p className="eyebrow rv">Selected work</p>
            <h2 className="display rv rv-d1">Recent builds</h2>
          </div>
          <a href="#contact" className="btn rv rv-d2" data-magnet="">
            <span>Start yours</span>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
        <div className="masonry">
          <div className="proj rv">
            <Image
              src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop"
              alt="Steel-framed family home, dark cladding"
              width={1200}
              height={900}
              loading="lazy"
            />
            <div className="proj__info">
              <span>Family home · Bay of Plenty</span>
              <h3>The Ridgeline</h3>
            </div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d1">
            <Image
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop"
              alt="Light-filled open plan kitchen and living, Foundry family home"
              width={1200}
              height={1500}
              loading="lazy"
            />
            <div className="proj__info">
              <span>Interior · Artist&apos;s impression</span>
              <h3>The Foundry Interior</h3>
            </div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d2">
            <Image
              src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop"
              alt="Modern kitchen with stone bench"
              width={1200}
              height={900}
              loading="lazy"
            />
            <div className="proj__info">
              <span>Family home · Waikato</span>
              <h3>The Foundry 90</h3>
            </div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv">
            <Image
              src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1200&auto=format&fit=crop"
              alt="Cedar and black granny flat exterior"
              width={1200}
              height={900}
              loading="lazy"
            />
            <div className="proj__info">
              <span>Granny flat · Auckland</span>
              <h3>The Cedar 60</h3>
            </div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d1">
            <Image
              src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?q=80&w=1200&auto=format&fit=crop"
              alt="Lounge with floor to ceiling glazing"
              width={1200}
              height={900}
              loading="lazy"
            />
            <div className="proj__info">
              <span>Custom build · Tauranga</span>
              <h3>Glasshouse</h3>
            </div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d2">
            <Image
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop"
              alt="Architectural home at dusk with pool"
              width={1200}
              height={900}
              loading="lazy"
            />
            <div className="proj__info">
              <span>Custom build · Northland</span>
              <h3>Dusk House</h3>
            </div>
            <div className="proj__plus">+</div>
          </div>
        </div>
      </div>
    </section>
  )
}
