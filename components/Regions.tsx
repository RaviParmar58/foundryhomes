import Image from 'next/image'

export default function Regions() {
  return (
    <section className="regions" aria-label="Local teams">
      <div className="regions__bg" data-parallax="0.14"></div>
      <div className="wrap regions__wrap">
        <div className="regions__panel rv">
          <p className="eyebrow">Regional teams</p>
          <h2 className="display">Local builders who know your area</h2>
          <p>
            Work with a Foundry team that understands your local council, site conditions and community - helping your
            project move forward with fewer surprises.
          </p>
          <div className="regions__list">
            <span>Auckland</span>
            <span>Waikato</span>
            <span>Bay of Plenty</span>
            <span>Northland</span>
            <span>North Island wide</span>
          </div>
        </div>

        <div className="regions__visual rv rv-d1" aria-hidden="true">
          <div className="regions__image regions__image--main">
            <Image
              src="/assets/images/homes/zac-gudakov-burxaX8eqw0-unsplash.jpg"
              alt=""
              width={1200}
              height={800}
              sizes="(max-width: 920px) 100vw, 52vw"
            />
          </div>
          <div className="regions__image regions__image--small">
            <Image
              src="/assets/images/homes/salman-saqib-93AF-d_y8rI-unsplash.jpg"
              alt=""
              width={900}
              height={700}
              sizes="(max-width: 920px) 46vw, 22vw"
            />
          </div>
          <div className="regions__stat">
            <b>5</b>
            <span>Regional coverage zones</span>
          </div>
        </div>
      </div>
    </section>
  )
}
