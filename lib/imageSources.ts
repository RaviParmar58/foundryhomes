// Client-safe predicates for image URLs we manage. Kept free of server-only
// imports (@vercel/blob, fs) so the admin editor can share the same logic
// the server uses when sanitizing/validating.

export const isVercelBlobUrl = (val: string): boolean =>
  /^https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\//.test(val)

// Uploads (Vercel Blob or the local-dev /assets/uploads fallback) and bundled
// site assets. Anything else is an external hotlink we don't control.
export const isManagedImageSrc = (src: string): boolean =>
  src.startsWith('/assets/') || isVercelBlobUrl(src)
