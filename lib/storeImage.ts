import { put } from '@vercel/blob'
import sharp from 'sharp'
import crypto from 'crypto'
import path from 'path'
import { mkdir, writeFile } from 'fs/promises'

export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5MB

const EXT_BY_FORMAT: Record<string, string> = {
  jpeg: '.jpg',
  png: '.png',
  webp: '.webp',
  gif: '.gif',
}

// Thrown for problems with the supplied image itself (not the storage
// backend) - callers surface the message as a 400.
export class ImageValidationError extends Error {}

// Validates, re-encodes, and stores raw image bytes; returns the public URL.
// Shared by /api/upload (file uploads) and /api/upload/import (pasted
// external images) so both paths apply identical checks and storage rules.
export async function processAndStoreImage(buffer: Buffer): Promise<string> {
  if (buffer.byteLength > MAX_IMAGE_SIZE) {
    throw new ImageValidationError('File too large (max 5MB).')
  }

  // Don't trust the claimed MIME type - verify the actual file
  // signature/contents with sharp before treating it as an image.
  let format: string | undefined
  try {
    const metadata = await sharp(buffer).metadata()
    format = metadata.format
  } catch {
    throw new ImageValidationError('File is not a valid image.')
  }

  const ext = format ? EXT_BY_FORMAT[format] : undefined
  if (!ext || !format) {
    throw new ImageValidationError('Unsupported file type. Use JPEG, PNG, WEBP, or GIF.')
  }

  // Re-encode to strip any embedded payload/metadata riding along with the
  // pixel data. Falls back to the validated original bytes if re-encoding
  // a particular format isn't supported by the local libvips build.
  let outputBuffer: Buffer = buffer
  try {
    const pipeline = sharp(buffer, { animated: format === 'gif' })
    if (format === 'jpeg') outputBuffer = await pipeline.jpeg().toBuffer()
    else if (format === 'png') outputBuffer = await pipeline.png().toBuffer()
    else if (format === 'webp') outputBuffer = await pipeline.webp().toBuffer()
    else if (format === 'gif') outputBuffer = await pipeline.gif().toBuffer()
  } catch (err) {
    console.warn('Image re-encode failed, storing validated original bytes', err)
  }

  const filename = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`

  // Vercel Blob when credentials exist (auto-populated on Vercel deploys;
  // set BLOB_READ_WRITE_TOKEN locally to use the real store from dev).
  if (process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL) {
    const blob = await put(`uploads/${filename}`, outputBuffer, {
      access: 'public',
      contentType: `image/${format}`,
    })
    return blob.url
  }

  if (process.env.NODE_ENV === 'production') {
    console.error('BLOB_READ_WRITE_TOKEN is not set; refusing local-disk fallback in production')
    throw new Error('Image storage is not configured on the server (BLOB_READ_WRITE_TOKEN missing).')
  }

  // Local development fallback: no blob store configured, so persist to
  // public/assets/uploads. The /assets/ prefix is what the featured-image
  // validation accepts, and Next serves it like any other static asset.
  const localDir = path.join(process.cwd(), 'public', 'assets', 'uploads')
  await mkdir(localDir, { recursive: true })
  await writeFile(path.join(localDir, filename), outputBuffer)
  return `/assets/uploads/${filename}`
}
