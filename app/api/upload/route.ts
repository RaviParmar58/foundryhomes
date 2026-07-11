import { NextRequest } from 'next/server'
import { put } from '@vercel/blob'
import sharp from 'sharp'
import crypto from 'crypto'
import path from 'path'
import { mkdir, writeFile } from 'fs/promises'

export const runtime = 'nodejs'

const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const EXT_BY_FORMAT: Record<string, string> = {
  jpeg: '.jpg',
  png: '.png',
  webp: '.webp',
  gif: '.gif',
}
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return Response.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const file = formData.get('file')
  if (!file || !(file instanceof File)) {
    return Response.json({ error: 'No file provided' }, { status: 400 })
  }

  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return Response.json({ error: 'Unsupported file type. Use JPEG, PNG, WEBP, or GIF.' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return Response.json({ error: 'File too large (max 5MB).' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  // Don't trust the client-supplied MIME type - verify the actual file
  // signature/contents with sharp before treating it as an image.
  let format: string | undefined
  try {
    const metadata = await sharp(buffer).metadata()
    format = metadata.format
  } catch {
    return Response.json({ error: 'File is not a valid image.' }, { status: 400 })
  }

  const ext = format ? EXT_BY_FORMAT[format] : undefined
  if (!ext || !format) {
    return Response.json({ error: 'Unsupported file type. Use JPEG, PNG, WEBP, or GIF.' }, { status: 400 })
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

  try {
    // Vercel Blob when credentials exist (auto-populated on Vercel deploys;
    // set BLOB_READ_WRITE_TOKEN locally to use the real store from dev).
    if (process.env.BLOB_READ_WRITE_TOKEN || process.env.VERCEL) {
      const blob = await put(`uploads/${filename}`, outputBuffer, {
        access: 'public',
        contentType: `image/${format}`,
      })
      return Response.json({ url: blob.url }, { status: 201 })
    }

    if (process.env.NODE_ENV === 'production') {
      console.error('BLOB_READ_WRITE_TOKEN is not set; refusing local-disk fallback in production')
      return Response.json(
        { error: 'Image storage is not configured on the server (BLOB_READ_WRITE_TOKEN missing).' },
        { status: 500 }
      )
    }

    // Local development fallback: no blob store configured, so persist to
    // public/assets/uploads. The /assets/ prefix is what the featured-image
    // validation accepts, and Next serves it like any other static asset.
    const localDir = path.join(process.cwd(), 'public', 'assets', 'uploads')
    await mkdir(localDir, { recursive: true })
    await writeFile(path.join(localDir, filename), outputBuffer)
    return Response.json({ url: `/assets/uploads/${filename}` }, { status: 201 })
  } catch (err) {
    console.error('Failed to upload file', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
