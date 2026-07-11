import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, verifySessionToken } from '@/lib/adminSession'
import { checkRateLimit, getClientIp } from '@/lib/rateLimit'

export const config = {
  matcher: ['/admin/:path*', '/api/posts', '/api/posts/:path*', '/api/upload', '/api/admin/login'],
}

const MUTATING_METHODS = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

const LOGIN_LIMIT = { limit: 5, windowMs: 15 * 60 * 1000 } // 5 attempts / 15 min / IP
const MUTATION_LIMIT = { limit: 120, windowMs: 5 * 60 * 1000 } // 120 requests / 5 min / IP

function tooManyRequests(retryAfterSeconds: number) {
  return NextResponse.json(
    { error: 'Too many requests. Please try again later.' },
    { status: 429, headers: { 'Retry-After': String(retryAfterSeconds) } }
  )
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const ip = getClientIp(request)

  if (pathname === '/api/admin/login' && request.method === 'POST') {
    const { allowed, retryAfterSeconds } = checkRateLimit(`login:${ip}`, LOGIN_LIMIT.limit, LOGIN_LIMIT.windowMs)
    if (!allowed) return tooManyRequests(retryAfterSeconds)
    return NextResponse.next()
  }

  if (pathname === '/admin/login') return NextResponse.next()

  const isAdminPage = pathname.startsWith('/admin')
  const isProtectedApi =
    (pathname.startsWith('/api/posts') && MUTATING_METHODS.has(request.method)) ||
    (pathname === '/api/upload' && request.method === 'POST')

  if (!isAdminPage && !isProtectedApi) return NextResponse.next()

  if (isProtectedApi) {
    const { allowed, retryAfterSeconds } = checkRateLimit(`mutate:${ip}`, MUTATION_LIMIT.limit, MUTATION_LIMIT.windowMs)
    if (!allowed) return tooManyRequests(retryAfterSeconds)
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const authenticated = await verifySessionToken(token)

  if (authenticated) return NextResponse.next()

  if (isAdminPage) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
