import Link from 'next/link'

export default function MobileMenu() {
  return (
    <div className="mobile-menu" id="mobileMenu">
      <p className="mobile-menu__tag">Foundry Homes - Menu</p>
      <Link href="/#range">Our Range</Link>
      <Link href="/grannyflats">Granny Flats</Link>
      <Link href="/foundryhomes">Family Homes</Link>
      <Link href="/custom-builds">Custom Builds</Link>
      <Link href="/foundry">Foundry</Link>
      <Link href="/steel-framing">Steel Framing</Link>
      <Link href="/suppliers">Suppliers</Link>
      <Link href="/finance">Finance</Link>
      <Link href="/blog">Journal</Link>
      <Link href="/contact">Get a Quote</Link>
    </div>
  )
}
