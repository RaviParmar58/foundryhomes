'use client'

import { useEffect } from 'react'
import Image from 'next/image'

export type LightboxImage = {
  src: string
  alt: string
  /** Small mono caption shown bottom-left of the stage (optional). */
  caption?: string
}

/**
 * Shared fullscreen image lightbox — the same design and interaction as the
 * model-page "Indicative imagery" gallery (dark blur backdrop, round close and
 * prev/next controls, caption + counter, Esc / arrow keys, scroll lock).
 * Render only while open; the parent owns the active index.
 */
export default function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: LightboxImage[]
  index: number
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}) {
  const showPrev = () => onNavigate((index - 1 + images.length) % images.length)
  const showNext = () => onNavigate((index + 1) % images.length)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [index, images.length, onClose, onNavigate])

  const image = images[index]
  if (!image) return null

  return (
    <div className="model-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={onClose}>
      <button className="model-lightbox__close" onClick={onClose} type="button" aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <button
        className="model-lightbox__nav model-lightbox__nav--prev"
        onClick={(e) => { e.stopPropagation(); showPrev() }}
        type="button"
        aria-label="Previous image"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>

      <div className="model-lightbox__stage" onClick={(e) => e.stopPropagation()}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="90vw"
          style={{ objectFit: 'contain' }}
          priority
        />
        {image.caption && <span className="model-lightbox__caption">{image.caption}</span>}
        <span className="model-lightbox__counter">{index + 1} / {images.length}</span>
      </div>

      <button
        className="model-lightbox__nav model-lightbox__nav--next"
        onClick={(e) => { e.stopPropagation(); showNext() }}
        type="button"
        aria-label="Next image"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  )
}
