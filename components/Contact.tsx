'use client'

import { useContactSubmission } from '@/hooks/useContactSubmission'

export default function Contact() {
  const { fieldErrors, sent, submitting, submitContactForm, toast, clearToast } =
    useContactSubmission('Homepage quote form')

  return (
    <section className="contact" id="contact" aria-label="Contact">
      <div className="contact__left">
        <div className="contact__left-bg" data-parallax="0.1"></div>
        <div className="contact__left-inner">
          <p className="eyebrow rv">Get started</p>
          <h2 className="display rv rv-d1">Let&apos;s talk</h2>
          <p className="rv rv-d2">
            Tell us where you are and what you&apos;re thinking. Your local Foundry team will be in touch to discuss
            your project - no pressure, no obligations.
          </p>
        </div>
      </div>
      <div className="contact__right">
        <form className="form rv" id="quoteForm" noValidate onSubmit={submitContactForm}>
          <h3>Get a free quote</h3>
          <p>We reply within one working day.</p>

          {toast && (
            <div className={`form-toast form-toast--${toast.type}`} role="status">
              <span>{toast.message}</span>
              <button type="button" onClick={clearToast} aria-label="Dismiss notification">
                x
              </button>
            </div>
          )}

          <div id="formFields" style={{ display: sent ? 'none' : undefined }}>
            <input
              className="form-honeypot"
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="form__row">
              <div className="field">
                <input type="text" id="homeFirstName" name="firstName" placeholder=" " autoComplete="given-name" />
                <label htmlFor="homeFirstName">First name</label>
              </div>
              <div className="field">
                <input type="text" id="homeLastName" name="lastName" placeholder=" " autoComplete="family-name" />
                <label htmlFor="homeLastName">Last name</label>
              </div>
            </div>
            <div className="form__row">
              <div className="field">
                <input
                  type="email"
                  id="homeEmail"
                  name="email"
                  placeholder=" "
                  required
                  autoComplete="email"
                  aria-invalid={Boolean(fieldErrors.email)}
                />
                <label htmlFor="homeEmail">Email *</label>
              </div>
              <div className="field">
                <input type="tel" id="homePhone" name="phone" placeholder=" " autoComplete="tel" />
                <label htmlFor="homePhone">Phone</label>
              </div>
            </div>
            <div className="field">
              <textarea
                id="homeMessage"
                name="message"
                rows={4}
                placeholder=" "
                required
                aria-invalid={Boolean(fieldErrors.message)}
              ></textarea>
              <label htmlFor="homeMessage">Tell us about your project *</label>
            </div>
            <button type="submit" className="btn btn--solid" data-magnet="" disabled={submitting}>
              <span>{submitting ? 'Sending...' : 'Send enquiry'}</span>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <div className={`form__ok${sent ? ' is-show' : ''}`} id="formOk">
            <b>Enquiry sent</b>
            <p>Thanks - your local Foundry team will be in touch within one working day.</p>
          </div>
        </form>
      </div>
    </section>
  )
}
