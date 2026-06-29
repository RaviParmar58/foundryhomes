import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="footer__logo" aria-label="Foundry Homes home">
              <img src="/logo.svg" alt="Foundry Homes" />
            </Link>
            <p>Steel-framed homes and granny flats, designed and built across the North Island with clear pricing and trusted NZ suppliers.</p>
          </div>
          <div>
            <h5>Our Range</h5>
            <ul>
              <li><Link href="/grannyflats">Granny Flats &amp; Cabins</Link></li>
              <li><Link href="/foundryhomes">Family Homes</Link></li>
              <li><Link href="/custom-builds">Custom Builds</Link></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><Link href="/foundry">Foundry</Link></li>
              <li><Link href="/steel-framing">Steel Framing</Link></li>
              <li><Link href="/suppliers">Suppliers</Link></li>
              <li><Link href="/finance">Finance</Link></li>
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li><Link href="/contact">Get a Quote</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© Foundry Homes 2026 - All rights reserved</span>
        </div>
      </div>
    </footer>
  )
}
