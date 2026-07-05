'use client'

import { useRef, useState } from 'react'

export function ImageUpload({
  value,
  onChange,
}: {
  value: string | null
  onChange: (path: string | null) => void
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (file: File) => {
    setUploading(true)
    setError(null)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Upload failed')
      onChange(data.url)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setUploading(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  return (
    <div className="admin-meta-section">
      <h4 className="admin-meta-title">Featured Image</h4>
      {value && (
        <div className="admin-feat-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={value} alt="Featured" />
          <button
            type="button"
            className="admin-feat-img__remove"
            onClick={() => onChange(null)}
            aria-label="Remove featured image"
          >
            ×
          </button>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
        aria-label="Upload featured image"
      />
      <button
        type="button"
        className="admin-btn admin-btn--xs"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading ? 'Uploading…' : value ? 'Replace image' : 'Upload image'}
      </button>
      {error && <span className="admin-meta-hint admin-meta-hint--warn">{error}</span>}
    </div>
  )
}
