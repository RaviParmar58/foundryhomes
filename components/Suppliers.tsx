import Image from 'next/image'

// Same partner list, logo assets, and card design as the Suppliers page
// "Our partners" section (app/suppliers/page.tsx) so the two stay in sync.
const partnerLogos = [
  { name: 'Evolve Architecture', logo: '/assets/logos/suppliers/evolve-architecture.png' },
  { name: 'Green Frame', logo: '/assets/logos/suppliers/greenframe.png' },
  { name: 'NZ Windows', logo: '/assets/logos/suppliers/nz-windows.png' },
  { name: 'Carpet Court', logo: '/assets/logos/suppliers/carpet-court.webp' },
  { name: 'Steel & Tube', logo: '/assets/logos/suppliers/steel-and-tube.webp' },
  { name: 'Mitre 10', logo: '/assets/logos/suppliers/mitre-10.jpg' },
  { name: 'Mico', logo: '/assets/logos/suppliers/mico.png' },
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
        <div className="supplier-logo-grid home-partner-grid rv rv-d2">
          {partnerLogos.map((partner) => (
            <div className="supplier-logo-card" key={partner.name}>
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                width={160}
                height={64}
                style={{ objectFit: 'contain', width: '100%', height: 'auto', maxHeight: 44 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
