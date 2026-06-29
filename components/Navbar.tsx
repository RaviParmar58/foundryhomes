'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href
  const isRangeActive = ['/grannyflats', '/granny-flats', '/foundryhomes', '/custom-builds'].includes(pathname)

  return (
    <header className="nav" id="nav">
      <Link href="/" className="nav__logo">
        <img src="/logo.svg" alt="Foundry Homes" className="nav__logo-img" />
      </Link>
      <div className="nav__pill">
        <nav aria-label="Primary">
          <ul className="nav__links">
            <li className="nav__item nav__item--has-drop">
              <Link href="/#range" className={isRangeActive ? 'is-active' : undefined} data-magnet="" aria-current={isRangeActive ? 'page' : undefined}>
                Our Range <svg className="nav__chevron" width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <ul className="nav__drop">
                <li><Link href="/grannyflats" className={isActive('/grannyflats') ? 'is-active' : undefined} aria-current={isActive('/grannyflats') ? 'page' : undefined}>Granny Flats &amp; Cabins</Link></li>
                <li><Link href="/foundryhomes" className={isActive('/foundryhomes') ? 'is-active' : undefined} aria-current={isActive('/foundryhomes') ? 'page' : undefined}>Family Homes</Link></li>
                <li><Link href="/custom-builds" className={isActive('/custom-builds') ? 'is-active' : undefined} aria-current={isActive('/custom-builds') ? 'page' : undefined}>Custom Builds</Link></li>
              </ul>
            </li>
            <li><Link href="/grannyflats" className={isActive('/grannyflats') ? 'is-active' : undefined} data-magnet="" aria-current={isActive('/grannyflats') ? 'page' : undefined}>Granny Flats</Link></li>
            <li><Link href="/foundry" className={isActive('/foundry') ? 'is-active' : undefined} data-magnet="" aria-current={isActive('/foundry') ? 'page' : undefined}>Foundry</Link></li>
            <li><Link href="/steel-framing" className={isActive('/steel-framing') ? 'is-active' : undefined} data-magnet="" aria-current={isActive('/steel-framing') ? 'page' : undefined}>Steel Framing</Link></li>
            <li><Link href="/suppliers" className={isActive('/suppliers') ? 'is-active' : undefined} data-magnet="" aria-current={isActive('/suppliers') ? 'page' : undefined}>Suppliers</Link></li>
            <li><Link href="/finance" className={isActive('/finance') ? 'is-active' : undefined} data-magnet="" aria-current={isActive('/finance') ? 'page' : undefined}>Finance</Link></li>
            <li><Link href="/blog" className={isActive('/blog') ? 'is-active' : undefined} data-magnet="" aria-current={isActive('/blog') ? 'page' : undefined}>Journal</Link></li>
          </ul>
        </nav>
      </div>
      <Link href="/contact" className="btn btn--sm nav__cta" data-magnet=""><span>Get a Quote</span></Link>
      <div className="nav__end">
        <ThemeToggle />
        <button className="burger" id="burger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  )
}
