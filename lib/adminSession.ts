// Signed, stateless admin session tokens - verifiable from both the Node
// route handlers and the Edge middleware without a shared session store.
export const ADMIN_SESSION_COOKIE = 'fh_admin_session'

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000
export const ADMIN_SESSION_MAX_AGE_SECONDS = Math.floor(SESSION_TTL_MS / 1000)

function getSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) throw new Error('ADMIN_SESSION_SECRET environment variable is not set')
  return secret
}

function toBase64Url(bytes: ArrayBuffer): string {
  const arr = new Uint8Array(bytes)
  let str = ''
  for (let i = 0; i < arr.length; i++) str += String.fromCharCode(arr[i])
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function sign(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(getSecret()),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data))
  return toBase64Url(signature)
}

// Constant-time string comparison (avoids leaking length/content via timing).
export function timingSafeEqualStrings(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return result === 0
}

export async function createSessionToken(): Promise<string> {
  const expires = Date.now() + SESSION_TTL_MS
  const signature = await sign(String(expires))
  return `${expires}.${signature}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const [expiresStr, signature] = token.split('.')
  if (!expiresStr || !signature) return false

  const expires = Number(expiresStr)
  if (!Number.isFinite(expires) || Date.now() > expires) return false

  const expected = await sign(expiresStr)
  return timingSafeEqualStrings(signature, expected)
}
