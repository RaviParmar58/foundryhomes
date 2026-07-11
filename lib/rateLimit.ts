// In-memory, fixed-window rate limiter/dedupe used by both the Edge
// middleware (login/mutation throttling) and server components (view
// count dedupe). Not durable across cold starts, regions, or instances,
// but that's an acceptable tradeoff: the goal is blocking scripted abuse
// and cutting down obvious refresh/bot inflation, not perfect accounting.
type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()
const MAX_TRACKED_KEYS = 5000

function pruneExpired(now: number) {
  if (buckets.size < MAX_TRACKED_KEYS) return
  buckets.forEach((bucket, key) => {
    if (bucket.resetAt <= now) buckets.delete(key)
  })
}

export function checkRateLimit(key: string, limit: number, windowMs: number): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now()
  const bucket = buckets.get(key)

  if (!bucket || bucket.resetAt <= now) {
    pruneExpired(now)
    buckets.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, retryAfterSeconds: 0 }
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) }
  }

  bucket.count += 1
  return { allowed: true, retryAfterSeconds: 0 }
}

export function getClientIp(input: { headers: { get(name: string): string | null }; ip?: string }): string {
  const xff = input.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return input.ip ?? 'unknown'
}
