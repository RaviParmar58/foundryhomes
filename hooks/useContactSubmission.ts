'use client'

import { FormEvent, useState } from 'react'

type ContactToast = {
  type: 'success' | 'error'
  message: string
}

type ContactApiResponse =
  | { ok: true; message: string; emailId?: string }
  | { ok: false; message: string; code: string; details?: Record<string, string[] | undefined> }

const defaultError = 'We could not send your enquiry right now. Please try again.'

function firstError(details?: Record<string, string[] | undefined>) {
  if (!details) return null
  for (const messages of Object.values(details)) {
    if (messages?.[0]) return messages[0]
  }
  return null
}

export function useContactSubmission(source: string) {
  const [toast, setToast] = useState<ContactToast | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({})
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  const submitContactForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    setSubmitting(true)
    setToast(null)
    setFieldErrors({})

    const payload = {
      firstName: String(formData.get('firstName') || ''),
      lastName: String(formData.get('lastName') || ''),
      email: String(formData.get('email') || ''),
      phone: String(formData.get('phone') || ''),
      enquiryType: String(formData.get('enquiryType') || 'General enquiry'),
      message: String(formData.get('message') || ''),
      company: String(formData.get('company') || ''),
      source,
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = (await response.json().catch(() => null)) as ContactApiResponse | null

      if (!response.ok || !result?.ok) {
        const details = result && !result.ok ? result.details : undefined
        const message = firstError(details) || result?.message || defaultError
        if (details) setFieldErrors(details)
        setToast({ type: 'error', message })
        return
      }

      form.reset()
      setSent(true)
      setToast({ type: 'success', message: result.message || 'Thanks. Your enquiry has been sent.' })
    } catch {
      setToast({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return {
    fieldErrors,
    sent,
    submitting,
    submitContactForm,
    toast,
    clearToast: () => setToast(null),
  }
}
