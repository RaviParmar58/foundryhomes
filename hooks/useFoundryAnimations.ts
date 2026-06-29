'use client'

import { useEffect } from 'react'

export function useFoundryAnimations() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    /* ---------- Loader ---------- */
    const loader = document.getElementById('loader')
    let heroRevealed = false

    function revealHero() {
      if (heroRevealed) return
      heroRevealed = true
      document.querySelectorAll<HTMLElement>('.hero .rv-line, .hero .rv').forEach((el) => {
        el.classList.add('is-in')
      })
    }

    function doneLoader() {
      if (loader) loader.classList.add('is-done')
      revealHero()
    }

    const loadHandler = () => {
      setTimeout(doneLoader, prefersReduced ? 100 : 1700)
    }
    window.addEventListener('load', loadHandler)
    const safetyTimer = setTimeout(doneLoader, 3200)

    /* ---------- Custom cursor ---------- */
    const dot = document.querySelector<HTMLElement>('.cursor-dot')
    const ring = document.querySelector<HTMLElement>('.cursor-ring')
    let mouseMoveHandler: ((e: MouseEvent) => void) | null = null
    let rafId: number | null = null

    if (window.matchMedia('(hover:hover) and (pointer:fine)').matches && !prefersReduced && dot && ring) {
      let mx = 0, my = 0, rx = 0, ry = 0

      mouseMoveHandler = (e: MouseEvent) => {
        mx = e.clientX
        my = e.clientY
        dot.style.left = mx + 'px'
        dot.style.top = my + 'px'
      }
      window.addEventListener('mousemove', mouseMoveHandler)

      const loop = () => {
        rx += (mx - rx) * 0.16
        ry += (my - ry) * 0.16
        ring.style.left = rx + 'px'
        ring.style.top = ry + 'px'
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)

      document.querySelectorAll<HTMLElement>('a,button,.proj,.range-card,.logo-cell').forEach((el) => {
        el.addEventListener('mouseenter', () => ring.classList.add('is-hover'))
        el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'))
      })
    }

    /* ---------- Nav scroll state ---------- */
    const nav = document.getElementById('nav')
    function onScrollNav() {
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 30)
    }
    window.addEventListener('scroll', onScrollNav, { passive: true })
    onScrollNav()

    /* ---------- Mobile menu ---------- */
    const burger = document.getElementById('burger')
    const mm = document.getElementById('mobileMenu')

    function burgerClickHandler() {
      if (!mm || !burger) return
      const open = mm.classList.toggle('is-open')
      burger.classList.toggle('is-open', open)
      burger.setAttribute('aria-expanded', String(open))
      document.body.style.overflow = open ? 'hidden' : ''
    }

    if (burger) burger.addEventListener('click', burgerClickHandler)

    if (mm) {
      mm.querySelectorAll<HTMLAnchorElement>('a').forEach((a) => {
        a.addEventListener('click', () => {
          mm.classList.remove('is-open')
          if (burger) {
            burger.classList.remove('is-open')
            burger.setAttribute('aria-expanded', 'false')
          }
          document.body.style.overflow = ''
        })
      })
    }

    /* ---------- Reveal on scroll ---------- */
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('is-in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    document.querySelectorAll('.rv:not(#processRail), .rv-line').forEach((el) => {
      io.observe(el)
    })

    const frameEls = Array.from(document.querySelectorAll<HTMLElement>('.frame-svg'))
    const frameReplayButtons = Array.from(document.querySelectorAll<HTMLButtonElement>('[data-frame-replay]'))
    const frameReplayCleanups: (() => void)[] = []
    let frameIo: IntersectionObserver | null = null
    const replayFrame = (el: HTMLElement) => {
      el.classList.remove('is-in')
      el.classList.add('is-reset')
      void el.offsetWidth
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.remove('is-reset')
          el.classList.add('is-in')
        })
      })
    }

    if (prefersReduced) {
      frameEls.forEach((el) => el.classList.add('is-in'))
    } else if (frameEls.length) {
      const isFrameVisible = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect()
        return rect.bottom > 0 && rect.top < window.innerHeight * 0.88
      }

      frameIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            const el = en.target as HTMLElement
            if (en.isIntersecting) {
              replayFrame(el)
              frameIo?.unobserve(el)
            }
          })
        },
        { threshold: 0.25, rootMargin: '0px 0px -12% 0px' }
      )
      frameEls.forEach((el) => frameIo?.observe(el))
      requestAnimationFrame(() => {
        frameEls.forEach((el) => {
          if (isFrameVisible(el)) {
            replayFrame(el)
            frameIo?.unobserve(el)
          }
        })
      })
    }

    frameReplayButtons.forEach((button) => {
      const handler = () => {
        frameEls.forEach((el) => replayFrame(el))
      }
      button.addEventListener('click', handler)
      frameReplayCleanups.push(() => button.removeEventListener('click', handler))
    })

    const processRail = document.getElementById('processRail')
    let processIo: IntersectionObserver | null = null

    if (prefersReduced) {
      processRail?.classList.add('is-in')
    } else if (processRail) {
      const replayProcess = (el: HTMLElement) => {
        el.classList.remove('is-in')
        void el.offsetWidth
        requestAnimationFrame(() => {
          el.classList.add('is-in')
        })
      }

      const isProcessVisible = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect()
        return rect.bottom > 0 && rect.top < window.innerHeight * 0.88
      }

      processIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            const el = en.target as HTMLElement
            if (en.isIntersecting) {
              replayProcess(el)
            } else {
              el.classList.remove('is-in')
            }
          })
        },
        { threshold: 0.2, rootMargin: '0px 0px -12% 0px' }
      )
      processIo.observe(processRail)
      requestAnimationFrame(() => {
        if (isProcessVisible(processRail)) replayProcess(processRail)
      })
    }

    /* ---------- Counters ---------- */
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return
          const el = en.target as HTMLElement
          const target = +(el.dataset.count || 0)
          const dur = 1600
          let t0: number | null = null
          cio.unobserve(el)
          if (prefersReduced) {
            el.textContent = String(target)
            return
          }
          requestAnimationFrame(function tick(t) {
            if (!t0) t0 = t
            const p = Math.min((t - t0) / dur, 1)
            const e = 1 - Math.pow(1 - p, 4)
            el.textContent = String(Math.round(target * e))
            if (p < 1) requestAnimationFrame(tick)
          })
        })
      },
      { threshold: 0.5 }
    )
    document.querySelectorAll('[data-count]').forEach((el) => {
      cio.observe(el)
    })

    /* ---------- Parallax backgrounds ---------- */
    const pEls = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
    let parallaxTicking = false
    let parallaxScrollHandler: (() => void) | null = null

    if (!prefersReduced && pEls.length) {
      const parallax = () => {
        pEls.forEach((el) => {
          const r = el.parentElement!.getBoundingClientRect()
          if (r.bottom < 0 || r.top > window.innerHeight) return
          const sp = +(el.dataset.parallax || 0)
          const y = (r.top + r.height / 2 - window.innerHeight / 2) * sp
          el.style.transform =
            'translateY(' +
            y.toFixed(1) +
            'px)' +
            (el.classList.contains('hero__bg') ? ' scale(1.06)' : '')
        })
        parallaxTicking = false
      }

      parallaxScrollHandler = () => {
        if (!parallaxTicking) {
          requestAnimationFrame(parallax)
          parallaxTicking = true
        }
      }
      window.addEventListener('scroll', parallaxScrollHandler, { passive: true })
    }

    /* ---------- Horizontal range scroll ---------- */
    const outer = document.getElementById('rangeOuter')
    const track = document.getElementById('rangeTrack')
    let hTick = false
    let hScrollHandler: (() => void) | null = null
    let hResizeHandler: (() => void) | null = null

    if (!prefersReduced && outer && track) {
      const hScroll = () => {
        if (!outer || !track) return
        const r = outer.getBoundingClientRect()
        const total = r.height - window.innerHeight
        const p = Math.min(Math.max(-r.top / total, 0), 1)
        const max = track.scrollWidth - (track.parentElement?.clientWidth || 0) + 40
        if (max > 0) track.style.transform = 'translateX(' + (-p * max).toFixed(1) + 'px)'
        hTick = false
      }

      hScrollHandler = () => {
        if (!hTick) {
          requestAnimationFrame(hScroll)
          hTick = true
        }
      }
      hResizeHandler = hScroll

      window.addEventListener('scroll', hScrollHandler, { passive: true })
      window.addEventListener('resize', hResizeHandler)
      hScroll()
    }

    /* ---------- Testimonial carousel ---------- */
    const tTrack = document.getElementById('tTrack')
    let tIdx = 0

    function tStep(): number {
      if (!tTrack || !tTrack.children[0]) return 0
      const c = tTrack.children[0] as HTMLElement
      const gap = parseFloat(getComputedStyle(tTrack).gap) || 24
      return c.offsetWidth + gap
    }

    function tMax(): number {
      if (!tTrack) return 0
      return Math.max(
        0,
        tTrack.children.length - Math.max(1, Math.floor((tTrack.parentElement?.offsetWidth || 0) / tStep()))
      )
    }

    function tGo(d: number) {
      if (!tTrack) return
      tIdx = Math.min(Math.max(tIdx + d, 0), tMax())
      tTrack.style.transform = 'translateX(' + -tIdx * tStep() + 'px)'
    }

    const tPrevBtn = document.getElementById('tPrev')
    const tNextBtn = document.getElementById('tNext')
    const tPrevHandler = () => tGo(-1)
    const tNextHandler = () => tGo(1)
    const tResizeHandler = () => {
      tIdx = Math.min(tIdx, tMax())
      tGo(0)
    }

    if (tPrevBtn) tPrevBtn.addEventListener('click', tPrevHandler)
    if (tNextBtn) tNextBtn.addEventListener('click', tNextHandler)
    window.addEventListener('resize', tResizeHandler)

    /* ---------- Magnetic buttons (disabled) ---------- */
    const magnetCleanups: (() => void)[] = []

    /* ---------- Form ---------- */
    const quoteForm = document.getElementById('quoteForm') as HTMLFormElement | null
    let formSubmitHandler: ((e: Event) => void) | null = null

    if (quoteForm) {
      formSubmitHandler = (e: Event) => {
        e.preventDefault()
        const emailField = document.getElementById('email') as HTMLInputElement | null
        const msgField = document.getElementById('msg') as HTMLTextAreaElement | null
        let ok = true

        if (emailField) {
          const bad =
            !emailField.value.trim() ||
            !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(emailField.value)
          emailField.style.borderColor = bad ? '#d05a5a' : ''
          if (bad) ok = false
        }
        if (msgField) {
          const bad = !msgField.value.trim()
          msgField.style.borderColor = bad ? '#d05a5a' : ''
          if (bad) ok = false
        }

        if (!ok) return

        const formFields = document.getElementById('formFields')
        const formOk = document.getElementById('formOk')
        if (formFields) formFields.style.display = 'none'
        if (formOk) formOk.classList.add('is-show')
      }
      quoteForm.addEventListener('submit', formSubmitHandler)
    }

    /* ---------- Cleanup ---------- */
    return () => {
      window.removeEventListener('load', loadHandler)
      clearTimeout(safetyTimer)
      if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler)
      if (rafId !== null) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScrollNav)
      if (burger) burger.removeEventListener('click', burgerClickHandler)
      io.disconnect()
      if (frameIo) frameIo.disconnect()
      frameReplayCleanups.forEach((fn) => fn())
      if (processIo) processIo.disconnect()
      cio.disconnect()
      if (parallaxScrollHandler) window.removeEventListener('scroll', parallaxScrollHandler)
      if (hScrollHandler) window.removeEventListener('scroll', hScrollHandler)
      if (hResizeHandler) window.removeEventListener('resize', hResizeHandler)
      if (tPrevBtn) tPrevBtn.removeEventListener('click', tPrevHandler)
      if (tNextBtn) tNextBtn.removeEventListener('click', tNextHandler)
      window.removeEventListener('resize', tResizeHandler)
      magnetCleanups.forEach((fn) => fn())
      if (quoteForm && formSubmitHandler) quoteForm.removeEventListener('submit', formSubmitHandler)
    }
  }, [])
}
