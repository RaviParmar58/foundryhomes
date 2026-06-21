export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="/" className="nav__logo">FOUNDRY <small>HOMES</small></a>
            <p>Steel-framed homes and granny flats, designed and built across the North Island with clear pricing and trusted NZ suppliers.</p>
          </div>
          <div>
            <h5>Our Range</h5>
            <ul>
              <li><a href="/granny-flats">Granny Flats &amp; Cabins</a></li>
              <li><a href="/foundryhomes">Family Homes</a></li>
              <li><a href="/custom-builds">Custom Builds</a></li>
            </ul>
          </div>
          <div>
            <h5>Company</h5>
            <ul>
              <li><a href="/foundry">Foundry</a></li>
              <li><a href="/steel-framing">Steel Framing</a></li>
              <li><a href="/suppliers">Suppliers</a></li>
              <li><a href="/finance">Finance</a></li>
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li><a href="/contact">Get a Quote</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© Foundry Homes 2026 — All rights reserved</span>
          <span>Website crafted by <a href="/">Inkdrop</a></span>
        </div>
      </div>
    </footer>
  )
}
