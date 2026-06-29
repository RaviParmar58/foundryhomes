import Image from 'next/image'
import Link from 'next/link'

export default function Projects() {
  return (
    <section className="projects" id="projects" aria-label="Recent projects">
      <div className="wrap">
        <div className="projects__head">
          <div>
            <p className="eyebrow rv">Selected work</p>
            <h2 className="display rv rv-d1">Recent builds</h2>
          </div>
          <Link href="/contact" className="btn rv rv-d2" data-magnet="">
            <span>Start yours</span>
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </Link>
        </div>
        <div className="masonry">
          <div className="proj rv">
            <Image src="/assets/images/homes/Dual Pavilion House Exterior.jpg" alt="Steel-framed family home, dark cladding" width={1200} height={900} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Family home · Bay of Plenty</span><h3>The Ridgeline</h3></div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d1">
            <Image src="/assets/images/homes/woody-kelly-6R_sDhk4VrQ-unsplash.jpg" alt="Light-filled open plan kitchen and living, Foundry family home" width={1200} height={1500} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Interior · Artist&apos;s impression</span><h3>The Foundry Interior</h3></div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d2">
            <Image src="/assets/images/homes/point3d-commercial-imaging-ltd-sXMmFigM3p4-unsplash.jpg" alt="Modern kitchen with stone bench" width={1200} height={900} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Family home · Waikato</span><h3>The Foundry 90</h3></div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv">
            <Image src="/assets/images/homes/yaryna-bakhovska-gVa3uv7dJoA-unsplash.jpg" alt="Cedar and black granny flat exterior" width={1200} height={900} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Granny flat · Auckland</span><h3>The Cedar 60</h3></div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d1">
            <Image src="/assets/images/homes/cait-QfEk58i-d78-unsplash.jpg" alt="Lounge with floor to ceiling glazing" width={1200} height={900} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Custom build · Tauranga</span><h3>Glasshouse</h3></div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d2">
            <Image src="/assets/images/homes/modern-villa-with-swimming-pool.jpg" alt="Architectural home at dusk with pool" width={1200} height={900} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Custom build · Northland</span><h3>Dusk House</h3></div>
            <div className="proj__plus">+</div>
          </div>
        </div>
      </div>
    </section>
  )
}
