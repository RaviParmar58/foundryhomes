import { NextRequest } from 'next/server'
import { lookup } from 'dns/promises'
import net from 'net'
import { z } from 'zod'
import { processAndStoreImage, ImageValidationError, MAX_IMAGE_SIZE } from '@/lib/storeImage'
import { isManagedImageSrc } from '@/lib/imageSources'

export const runtime = 'nodejs'

const FETCH_TIMEOUT_MS = 15_000

const bodySchema = z.object({
  url: z.string().min(1, 'Missing url').max(2000),
})

// SSRF guard: the admin pastes arbitrary HTML, so the image URLs we fetch
// server-side must never reach loopback/private/link-local addresses where
// internal services (or cloud metadata endpoints) live.
const isPrivateIp = (ip: string): boolean => {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number)
    return (
      a === 0 || a === 10 || a === 127 ||
      (a === 100 && b >= 64 && b <= 127) || // CGNAT
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168)
    )
  }
  const lower = ip.toLowerCase()
  if (lower === '::' || lower === '::1') return true
  if (lower.startsWith('::ffff:')) return isPrivateIp(lower.slice(7)) // IPv4-mapped
  return /^(fc|fd|fe[89ab])/.test(lower) // ULA + link-local
}

async function resolvesToPublicAddress(hostname: string): Promise<boolean> {
  const literal = hostname.replace(/^\[|\]$/g, '') // bracketed IPv6 literals
  if (net.isIP(literal)) return !isPrivateIp(literal)
  if (hostname === 'localhost' || hostname.endsWith('.localhost') || hostname.endsWith('.internal')) return false
  try {
    const addresses = await lookup(hostname, { all: true })
    return addresses.length > 0 && addresses.every((addr) => !isPrivateIp(addr.address))
  } catch {
    return false
  }
}

export async function POST(request: NextRequest) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const parsed = bodySchema.safeParse(json)
  if (!parsed.success) {
    return Response.json({ error: 'A valid image URL is required.' }, { status: 400 })
  }

  const rawUrl = parsed.data.url

  // Already one of ours - nothing to import.
  if (isManagedImageSrc(rawUrl)) {
    return Response.json({ url: rawUrl }, { status: 200 })
  }

  let target: URL
  try {
    target = new URL(rawUrl)
  } catch {
    return Response.json({ error: 'A valid image URL is required.' }, { status: 400 })
  }

  if (target.protocol !== 'https:' && target.protocol !== 'http:') {
    return Response.json({ error: 'Only http(s) image URLs can be imported.' }, { status: 400 })
  }

  if (!(await resolvesToPublicAddress(target.hostname))) {
    return Response.json({ error: 'That image URL is not reachable.' }, { status: 400 })
  }

  let response: globalThis.Response
  try {
    // redirect: 'error' so a public URL can't bounce us to an internal
    // address after the DNS check above.
    response = await fetch(target, {
      redirect: 'error',
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: { Accept: 'image/*' },
    })
  } catch {
    return Response.json({ error: 'Could not download the image from its source.' }, { status: 400 })
  }

  if (!response.ok) {
    return Response.json({ error: 'Could not download the image from its source.' }, { status: 400 })
  }

  const contentLength = Number(response.headers.get('content-length'))
  if (Number.isFinite(contentLength) && contentLength > MAX_IMAGE_SIZE) {
    return Response.json({ error: 'Image is too large to import (max 5MB).' }, { status: 400 })
  }

  let buffer: Buffer
  try {
    buffer = Buffer.from(await response.arrayBuffer())
  } catch {
    return Response.json({ error: 'Could not download the image from its source.' }, { status: 400 })
  }

  if (buffer.byteLength > MAX_IMAGE_SIZE) {
    return Response.json({ error: 'Image is too large to import (max 5MB).' }, { status: 400 })
  }

  try {
    const url = await processAndStoreImage(buffer)
    return Response.json({ url }, { status: 201 })
  } catch (err) {
    if (err instanceof ImageValidationError) {
      return Response.json({ error: err.message }, { status: 400 })
    }
    console.error('Failed to import image', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
