'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export function ModelGallery({ images, modelName }: { images: string[]; modelName: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = () => setActiveIndex(null)
  const showPrev = () => setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  const showNext = () => setActiveIndex((i) => (i === null ? null : (i + 1) % images.length))

  useEffect(() => {
    if (activeIndex === null) return
    document.body.style.overflow = 'hidden'
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  return (
    <>
      <div className="model-gallery-grid">
        {images.map((src, i) => (
          <button
            type="button"
            className="model-gallery__image"
            key={src}
            onClick={() => setActiveIndex(i)}
            aria-label={`Open image ${i + 1} of ${images.length}`}
          >
            <Image
              src={src}
              alt={`${modelName} indicative styling ${i + 1}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1080px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
            />
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div className="model-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={close}>
          <button className="model-lightbox__close" onClick={close} type="button" aria-label="Close">
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
              src={images[activeIndex]}
              alt={`${modelName} indicative styling ${activeIndex + 1}`}
              fill
              sizes="90vw"
              style={{ objectFit: 'contain' }}
              priority
            />
            <span className="model-lightbox__caption">Indicative imagery only</span>
            <span className="model-lightbox__counter">{activeIndex + 1} / {images.length}</span>
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
      )}
    </>
  )
}
