'use client'

import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Hero from '@/components/Hero'
import HeroStrip from '@/components/HeroStrip'
import Marquee from '@/components/Marquee'
import Trust from '@/components/Trust'
import Range from '@/components/Range'
import Why from '@/components/Why'
import Process from '@/components/Process'
import Projects from '@/components/Projects'
import Regions from '@/components/Regions'
import Testimonials from '@/components/Testimonials'
import Suppliers from '@/components/Suppliers'
import CTA from '@/components/CTA'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  useFoundryAnimations()

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>

      <Navbar />
      <MobileMenu />

      <main id="top">
        <Hero />
        <HeroStrip />
        <Marquee />
        <Trust />
        <Range />
        <Why />
        <Process />
        <Projects />
        <Regions />
        <Testimonials />
        <Suppliers />
        <CTA />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
