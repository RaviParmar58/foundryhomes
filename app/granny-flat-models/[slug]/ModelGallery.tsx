'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox'

export function ModelGallery({ images, modelName }: { images: string[]; modelName: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <>
      <div className="model-gallery-grid rv">
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
        <Lightbox
          images={images.map((src, i) => ({
            src,
            alt: `${modelName} indicative styling ${i + 1}`,
            caption: 'Indicative imagery only',
          }))}
          index={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </>
  )
}
