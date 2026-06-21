import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  return (
    <header className="nav" id="nav">
      <a href="/" className="nav__logo">
        <img src="/logo.svg" alt="Foundry Homes" className="nav__logo-img" />
      </a>
      <div className="nav__pill">
        <nav aria-label="Primary">
          <ul className="nav__links">
            <li className="nav__item nav__item--has-drop">
              <a href="/#range" data-magnet="">Our Range <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></a>
              <ul className="nav__drop">
                <li><a href="/granny-flats">Granny Flats &amp; Cabins</a></li>
                <li><a href="/foundryhomes">Family Homes</a></li>
                <li><a href="/custom-builds">Custom Builds</a></li>
              </ul>
            </li>
            <li><a href="/granny-flats" data-magnet="">Granny Flats</a></li>
            <li><a href="/foundry" data-magnet="">Foundry</a></li>
            <li><a href="/steel-framing" data-magnet="">Steel Framing</a></li>
            <li><a href="/suppliers" data-magnet="">Suppliers</a></li>
            <li><a href="/finance" data-magnet="">Finance</a></li>
            <li><a href="/blog" data-magnet="">Journal</a></li>
          </ul>
        </nav>
      </div>
      <a href="/contact" className="btn btn--sm nav__cta" data-magnet=""><span>Get a Quote</span></a>
      <div className="nav__end">
        <ThemeToggle />
        <button className="burger" id="burger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
