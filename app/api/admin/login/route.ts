import { NextRequest, NextResponse } from 'next/server'
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  timingSafeEqualStrings,
} from '@/lib/adminSession'

export async function POST(request: NextRequest) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const password = typeof (json as { password?: unknown })?.password === 'string'
    ? (json as { password: string }).password
    : ''

  const expected = process.env.ADMIN_PASSWORD
  if (!expected) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return NextResponse.json({ error: 'Admin login is not configured' }, { status: 500 })
  }

  if (!password || !timingSafeEqualStrings(password, expected)) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  const token = await createSessionToken()
  const res = NextResponse.json({ success: true })
  res.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  })
  return res
}
