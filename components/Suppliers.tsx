const partnerLogos = [
  {
    name: "Evolve Architecture",
    src: "/assets/images/partner_logo/Evolve_logo.webp",
  },
  {
    name: "Greenframe",
    src: "/assets/images/partner_logo/Greenframe_Logo_White.webp",
    className: "logo-cell--greenframe",
  },
  {
    name: "NZ Windows",
    src: "/assets/images/partner_logo/NZ-windows-logo-1.png.webp",
  },
  {
    name: "Carpet Court",
    src: "/assets/images/partner_logo/carpet-court.png",
  },
  {
    name: "Steel & Tube",
    src: "/assets/images/partner_logo/S&T-Logo-Master-Red-1.jpg",
  },
  {
    name: "Mitre 10",
    src: "/assets/images/partner_logo/mitre_10_logo.svg",
  },
  {
    name: "Mico",
    src: "/assets/images/partner_logo/mico_logo_black.svg",
  },
]

export default function Suppliers() {
  return (
    <section className="suppliers" id="suppliers" aria-label="Our partners">
      <div className="wrap">
        <p className="eyebrow rv">Our partners</p>
        <h2 className="display rv rv-d1">Built with trusted New Zealand suppliers</h2>
        <p className="lede rv rv-d2">
          Your home is built using proven NZ materials from suppliers we trust - helping ensure consistent quality, reliable supply and stable pricing throughout your build.
        </p>
        <div className="logo-wall rv rv-d2">
          {partnerLogos.map((logo) => (
            <div className={`logo-cell ${logo.className ?? ""}`} key={logo.name}>
              <img src={logo.src} alt={`${logo.name} logo`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
