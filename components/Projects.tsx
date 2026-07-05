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
            <Image src="/assets/Foundry Products (houses)/Foundry_Homes_Foundry_80.png" alt="Steel-framed family home, dark cladding" width={1200} height={900} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Family home · Bay of Plenty</span><h3>The Ridgeline</h3></div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d1">
            <Image src="/assets/Internal Renders/25-4731-Foundry-Homes-Standard-Range---73-IR01---Living.jpg" alt="Light-filled open plan kitchen and living, Foundry family home" width={1200} height={1500} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Interior · Artist&apos;s impression</span><h3>The Foundry Interior</h3></div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d2">
            <Image src="/assets/Internal Renders/25-4721-Foundry-Homes-Standard-Range---51-IR01---Living.jpg" alt="Modern kitchen with stone bench" width={1200} height={900} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Family home · Waikato</span><h3>The Foundry 90</h3></div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv">
            <Image src="/assets/Stock Imagery/granny_flat_01.jpeg" alt="Cedar and black granny flat exterior" width={1200} height={900} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Granny flat · Auckland</span><h3>The Cedar 60</h3></div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d1">
            <Image src="/assets/Internal Renders/25-4731-Foundry-Homes-Standard-Range---73-IR02---Living.jpg" alt="Lounge with floor to ceiling glazing" width={1200} height={900} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Custom build · Tauranga</span><h3>Glasshouse</h3></div>
            <div className="proj__plus">+</div>
          </div>
          <div className="proj rv rv-d2">
            <Image src="/assets/Foundry Products (houses)/custom_design_01.jpeg" alt="Architectural home at dusk with pool" width={1200} height={900} loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw" />
            <div className="proj__info"><span>Custom build · Northland</span><h3>Dusk House</h3></div>
            <div className="proj__plus">+</div>
          </div>
        </div>
      </div>
    </section>
  )
}
