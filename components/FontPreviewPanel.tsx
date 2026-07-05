'use client'

import { useEffect, useState } from 'react'
import {
  FONT_PREVIEW_STORAGE_KEY,
  findFontPreviewPairing,
  fontPreviewPairings,
  type FontPreviewPairing,
} from '@/lib/fontPreviewDemo'

function applyPairing(pairing: FontPreviewPairing) {
  const root = document.documentElement
  root.setAttribute('data-font-preview-active', 'true')
  root.setAttribute('data-font-preview-pairing', pairing.id)
  root.style.setProperty('--display', pairing.heading.stack)
  root.style.setProperty('--body', pairing.body.stack)
  root.style.setProperty('--mono', pairing.ui.stack)
  root.style.setProperty('--font-heading', pairing.heading.stack)
  root.style.setProperty('--font-paragraph', pairing.body.stack)
  root.style.setProperty('--font-span', pairing.body.stack)
  root.style.setProperty('--font-button', pairing.ui.stack)
  root.style.setProperty('--font-mono', pairing.ui.stack)
}

export default function FontPreviewPanel() {
  const [selectedPairingId, setSelectedPairingId] = useState<string | null>(null)

  useEffect(() => {
    const storedPairingId = localStorage.getItem(FONT_PREVIEW_STORAGE_KEY)
    const storedPairing = findFontPreviewPairing(storedPairingId)
    if (!storedPairing) return

    applyPairing(storedPairing)
    setSelectedPairingId(storedPairing.id)
  }, [])

  const selectPairing = (pairing: FontPreviewPairing) => {
    applyPairing(pairing)
    localStorage.setItem(FONT_PREVIEW_STORAGE_KEY, pairing.id)
    setSelectedPairingId(pairing.id)
  }

  const clearFont = () => {
    localStorage.removeItem(FONT_PREVIEW_STORAGE_KEY)
    window.location.reload()
  }

  return (
    <section className="font-preview" aria-label="Temporary font preview panel">
      <div className="font-preview__panel">
        <div className="font-preview__head">
          <span>Temporary Demo</span>
          <h1>Font Pairing Preview</h1>
          <p>Select a curated font pairing to apply heading, body, and UI fonts across the website.</p>
        </div>

        <div className="font-preview__buttons" aria-label="Font pairing options">
          {fontPreviewPairings.map((pairing) => (
            <button
              className={selectedPairingId === pairing.id ? 'is-active' : undefined}
              key={pairing.id}
              onClick={() => selectPairing(pairing)}
              type="button"
            >
              <span className="font-preview__option-title" style={{ fontFamily: pairing.heading.stack }}>
                {pairing.label}
              </span>
              <span className="font-preview__option-copy" style={{ fontFamily: pairing.body.stack }}>
                {pairing.description}
              </span>
              <span className="font-preview__option-meta" style={{ fontFamily: pairing.ui.stack }}>
                H: {pairing.heading.label} / B: {pairing.body.label} / UI: {pairing.ui.label}
              </span>
            </button>
          ))}
        </div>

        <div className="font-preview__actions">
          <a href="/" className="btn btn--solid">
            <span>View homepage</span>
          </a>
          <button type="button" className="font-preview__clear" onClick={clearFont}>
            Clear preview
          </button>
        </div>
      </div>

      <div className="font-preview__sample" aria-label="Font sample">
        <p className="eyebrow">Foundry Homes</p>
        <h2 className="display">Your home, built your way</h2>
        <p>
          New Zealand-made steel-framed homes, engineered around the way people actually live, with clear pricing and a
          process designed to feel steady from first conversation to final handover.
        </p>
        <div>
          <span>Quote ready</span>
          <strong>15+ years experience</strong>
        </div>
      </div>
    </section>
  )
}
