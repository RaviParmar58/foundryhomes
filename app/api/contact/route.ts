import { NextRequest } from 'next/server'
import { Resend } from 'resend'
import { contactEnquirySchema, type ContactEnquiryInput } from '@/lib/validation'

export const runtime = 'nodejs'

type ContactSuccessResponse = {
  ok: true
  message: string
  emailId?: string
}

type ContactErrorResponse = {
  ok: false
  code: 'INVALID_JSON' | 'VALIDATION_ERROR' | 'RATE_LIMITED' | 'EMAIL_CONFIG_MISSING' | 'EMAIL_SEND_FAILED'
  message: string
  details?: Record<string, string[] | undefined>
}

type ContactResponse = ContactSuccessResponse | ContactErrorResponse

const DEFAULT_FROM = 'Foundry Homes <onboarding@resend.dev>'
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function json(body: ContactResponse, status: number) {
  return Response.json(body, { status })
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const existing = rateLimitStore.get(ip)

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  existing.count += 1
  return existing.count > RATE_LIMIT_MAX
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function formatName(data: ContactEnquiryInput) {
  return [data.firstName, data.lastName].filter(Boolean).join(' ') || 'Not provided'
}

function buildEmail(data: ContactEnquiryInput) {
  const submittedAt = new Intl.DateTimeFormat('en-NZ', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Pacific/Auckland',
  }).format(new Date())
  const fields = [
    ['Name', formatName(data)],
    ['Email', data.email],
    ['Phone', data.phone || 'Not provided'],
    ['Enquiry type', data.enquiryType || 'General enquiry'],
    ['Source', data.source || 'Website contact form'],
    ['Submitted', submittedAt],
  ]

  const text = [
    'New Foundry Homes enquiry',
    '',
    ...fields.map(([label, value]) => `${label}: ${value}`),
    '',
    'Message:',
    data.message,
  ].join('\n')

  const detailRows = fields
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:0 0 12px 0">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
              <tr>
                <td width="150" valign="top" style="padding:14px 16px;border:1px solid #DDE5E2;border-right:0;background:#F6FAF8;color:#5C6A66;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase">
                  ${escapeHtml(label)}
                </td>
                <td valign="top" style="padding:14px 16px;border:1px solid #DDE5E2;background:#FFFFFF;color:#13201D;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.55;font-weight:500">
                  ${label === 'Email' ? `<a href="mailto:${escapeHtml(value)}" style="color:#008080;text-decoration:none;font-weight:700">${escapeHtml(value)}</a>` : escapeHtml(value)}
                </td>
              </tr>
            </table>
          </td>
        </tr>
      `
    )
    .join('')

  const html = `
    <!doctype html>
    <html>
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>New Foundry Homes enquiry</title>
      </head>
      <body style="margin:0;padding:0;background:#EEF3F1;color:#13201D">
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">
          New enquiry from ${escapeHtml(formatName(data))}: ${escapeHtml(data.enquiryType || 'General enquiry')}
        </div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;background:#EEF3F1">
          <tr>
            <td align="center" style="padding:32px 14px">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;max-width:720px;background:#FFFFFF;border:1px solid #DDE5E2">
                <tr>
                  <td style="padding:0;background:#0E1514">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                      <tr>
                        <td style="padding:28px 30px 26px 30px">
                          <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#20A6A1;margin-bottom:12px">
                            Foundry Homes
                          </div>
                          <h1 style="margin:0;color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:30px;line-height:1.15;font-weight:800;letter-spacing:-.02em">
                            New website enquiry
                          </h1>
                          <p style="margin:12px 0 0;color:#B8C4C0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.6">
                            A visitor has submitted the contact form. Reply directly to the sender using the button below.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:28px 30px 8px 30px;background:#FFFFFF">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                      <tr>
                        <td style="padding:0 0 20px 0">
                          <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                            <tr>
                              <td style="padding:8px 12px;background:#E8F5F3;color:#007A78;font-family:Arial,Helvetica,sans-serif;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase">
                                ${escapeHtml(data.enquiryType || 'General enquiry')}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      ${detailRows}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 30px 30px 30px;background:#FFFFFF">
                    <h2 style="margin:0 0 12px;color:#13201D;font-family:Arial,Helvetica,sans-serif;font-size:18px;line-height:1.3;font-weight:800">
                      Message
                    </h2>
                    <div style="padding:20px;border:1px solid #DDE5E2;background:#F9FBFA;color:#263633;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.7;white-space:pre-wrap">
${escapeHtml(data.message)}
                    </div>
                    <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:24px">
                      <tr>
                        <td style="background:#008080">
                          <a href="mailto:${escapeHtml(data.email)}?subject=${encodeURIComponent(`Re: Foundry Homes enquiry - ${formatName(data)}`)}" style="display:inline-block;padding:14px 22px;color:#FFFFFF;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;text-decoration:none">
                            Reply to enquiry
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px 30px;background:#F6FAF8;border-top:1px solid #DDE5E2;color:#73807C;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6">
                    This email was generated automatically from the Foundry Homes website contact form.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  return { text, html }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request)
  if (isRateLimited(ip)) {
    return json(
      {
        ok: false,
        code: 'RATE_LIMITED',
        message: 'Too many enquiries were sent from this connection. Please wait a few minutes and try again.',
      },
      429
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return json(
      {
        ok: false,
        code: 'INVALID_JSON',
        message: 'The enquiry could not be read. Please refresh the page and try again.',
      },
      400
    )
  }

  const parsed = contactEnquirySchema.safeParse(body)
  if (!parsed.success) {
    return json(
      {
        ok: false,
        code: 'VALIDATION_ERROR',
        message: 'Please check the highlighted details and try again.',
        details: parsed.error.flatten().fieldErrors,
      },
      400
    )
  }

  const data = parsed.data
  if (data.company) {
    return json({ ok: true, message: 'Thanks. Your enquiry has been sent.' }, 200)
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.CONTACT_EMAIL_TO
  const from = process.env.CONTACT_EMAIL_FROM || DEFAULT_FROM

  if (!apiKey || !to) {
    console.error('Contact email config missing', {
      hasResendApiKey: Boolean(apiKey),
      hasContactEmailTo: Boolean(to),
    })
    return json(
      {
        ok: false,
        code: 'EMAIL_CONFIG_MISSING',
        message: 'Email is not configured yet. Please contact us directly at hello@foundryhomes.co.nz.',
      },
      500
    )
  }

  const resend = new Resend(apiKey)
  const email = buildEmail(data)

  try {
    const result = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New Foundry Homes enquiry from ${formatName(data)}`,
      text: email.text,
      html: email.html,
    })

    if (result.error) {
      console.error('Resend failed to send contact enquiry', result.error)
      return json(
        {
          ok: false,
          code: 'EMAIL_SEND_FAILED',
          message: 'We could not send your enquiry right now. Please try again or email us directly.',
        },
        502
      )
    }

    return json(
      {
        ok: true,
        message: 'Thanks. Your enquiry has been sent.',
        emailId: result.data?.id,
      },
      200
    )
  } catch (error) {
    console.error('Unexpected contact email error', error)
    return json(
      {
        ok: false,
        code: 'EMAIL_SEND_FAILED',
        message: 'Something went wrong while sending your enquiry. Please try again shortly.',
      },
      500
    )
  }
}
