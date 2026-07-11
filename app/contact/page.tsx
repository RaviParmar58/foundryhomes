'use client'

import Image from 'next/image'
import { useFoundryAnimations } from '@/hooks/useFoundryAnimations'
import { useContactSubmission } from '@/hooks/useContactSubmission'
import Navbar from '@/components/Navbar'
import MobileMenu from '@/components/MobileMenu'
import Footer from '@/components/Footer'

const enquiryTypes = [
  "I'd like a free quote",
  'Foundry Granny Flats & Cabins',
  'Foundry Homes',
  'Foundry Custom Build',
  'Steel framing',
  'Other',
]

const contactCards = [
  ['Response time', 'Within one working day'],
  ['Service area', 'North Island and growing NZ network'],
  ['Best first step', 'Tell us your site, budget and timeline'],
]

export default function ContactPage() {
  useFoundryAnimations()
  const { fieldErrors, sent, submitting, submitContactForm, toast, clearToast } =
    useContactSubmission('Contact page form')

  return (
    <>
      <div className="cursor-dot" aria-hidden="true"></div>
      <div className="cursor-ring" aria-hidden="true"></div>
      <Navbar />
      <MobileMenu />

      <main className="contact-page" id="top">
        <section className="contact-hero" aria-label="Contact Foundry Homes">
          <div className="contact-hero__copy">
            <div className="contact-hero__inner rv">
              <p className="eyebrow">Steel framed homes</p>
              <h1 className="display">
                Your home, <span>built your way</span>
              </h1>
              <p>
                Ready to discuss your project? Whether you are curious about the benefits of steel framing or ready to
                request a quote, we are here to help. Fill out the form below, and our team will get back to you.
              </p>
              <div className="contact-hero__actions">
                <a className="btn btn--solid" href="#contactForm" data-magnet="">
                  <span>Start enquiry</span>
                </a>
                <a className="contact-page-link" href="mailto:hello@foundryhomes.co.nz">
                  hello@foundryhomes.co.nz
                </a>
              </div>
            </div>
          </div>
          <div className="contact-hero__image rv rv-d1">
            <Image
              src="/assets/SHOWHOME/Foundry_Homes_Showhome_10.jpg"
              alt="Modern steel-framed Foundry home with warm timber cladding"
              width={1600}
              height={900}
              priority
              sizes="(max-width: 920px) 100vw, 58vw"
            />
          </div>
        </section>

        <section className="contact-lead t-paper" id="contactForm" aria-label="Contact form">
          <div className="wrap contact-lead__grid">
            <aside className="contact-details rv">
              <p className="eyebrow">Talk to Foundry</p>
              <h2 className="display">Let us shape the next step.</h2>
              <p>
                Share a few details and we will connect you with the right Foundry team member for your build, quote or
                steel-framing question.
              </p>
              <div className="contact-detail-list">
                <a href="mailto:hello@foundryhomes.co.nz">
                  <span>Email</span>
                  hello@foundryhomes.co.nz
                </a>
                <a href="tel:+6400000000">
                  <span>Phone</span>
                  0800 FOUNDRY
                </a>
                <div>
                  <span>Hours</span>
                  Monday to Friday, 8:30am-5:00pm
                </div>
              </div>
              <div className="contact-card-grid">
                {contactCards.map(([label, value]) => (
                  <div className="contact-info-card" key={label}>
                    <span>{label}</span>
                    <b>{value}</b>
                  </div>
                ))}
              </div>
            </aside>

            <form className="contact-page-form rv rv-d1" id="quoteForm" noValidate onSubmit={submitContactForm}>
              <h2 className="display">Contact us</h2>
              <p>Tell us what you are planning. Required fields are marked with an asterisk.</p>
              {toast && (
                <div className={`form-toast form-toast--${toast.type}`} role="status">
                  <span>{toast.message}</span>
                  <button type="button" onClick={clearToast} aria-label="Dismiss notification">x</button>
                </div>
              )}
              <div id="formFields" style={{ display: sent ? 'none' : undefined }}>
                <input className="form-honeypot" type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <div className="contact-form-row">
                  <label>
                    <span>First name</span>
                    <input type="text" id="contactFirstName" name="firstName" placeholder="First name" autoComplete="given-name" />
                  </label>
                  <label>
                    <span>Last name</span>
                    <input type="text" id="contactLastName" name="lastName" placeholder="Last name" autoComplete="family-name" />
                  </label>
                </div>
                <div className="contact-form-row">
                  <label>
                    <span>Email *</span>
                    <input
                      type="email"
                      id="contactEmail"
                      name="email"
                      placeholder="Email"
                      required
                      autoComplete="email"
                      aria-invalid={Boolean(fieldErrors.email)}
                    />
                  </label>
                  <label>
                    <span>Phone</span>
                    <input type="tel" id="contactPhone" name="phone" placeholder="Phone" autoComplete="tel" />
                  </label>
                </div>
                <fieldset className="contact-options">
                  <legend>Please select how we can help</legend>
                  {enquiryTypes.map((type) => (
                    <label key={type}>
                      <input type="radio" name="enquiryType" value={type} />
                      <span>{type}</span>
                    </label>
                  ))}
                </fieldset>
                <label className="contact-message">
                  <span>Message *</span>
                  <textarea
                    id="contactMessage"
                    name="message"
                    rows={5}
                    placeholder="Message"
                    required
                    aria-invalid={Boolean(fieldErrors.message)}
                  ></textarea>
                </label>
                <button type="submit" className="btn btn--solid" data-magnet="" disabled={submitting}>
                  <span>{submitting ? 'Sending...' : 'Submit enquiry'}</span>
                </button>
              </div>
              <div className={`form__ok${sent ? ' is-show' : ''}`} id="formOk">
                <b>Enquiry sent</b>
                <p>Thanks. Your local Foundry team will be in touch within one working day.</p>
              </div>
            </form>
          </div>
        </section>

        <section className="contact-map" aria-label="Foundry Homes locations">
          <div className="wrap contact-map__grid">
            <div className="contact-map__visual rv" aria-hidden="true">
              <Image
                className="contact-map__image"
                src="/assets/Stock Imagery/bay-of-plenty-view-from-mount-maunganui-2026-01-07-05-32-33-utc.jpg"
                alt=""
                fill
                sizes="(max-width: 920px) 100vw, 50vw"
              />
            </div>
            <div className="contact-map__copy rv rv-d1">
              <p className="eyebrow">Where we build</p>
              <h2 className="display">Local teams. One Foundry standard.</h2>
              <p>
                Foundry Homes works through a growing New Zealand network with shared systems, trusted suppliers and the
                same steel-framed building standard.
              </p>
              <a className="btn btn--solid" href="#contactForm" data-magnet="">
                <span>Ask about your area</span>
              </a>
            </div>
          </div>
        </section>

        <section className="contact-page-cta" aria-label="Book a quote">
          <div className="wrap rv">
            <h2 className="display">Ready to start your journey?</h2>
            <p>Book a free quote today</p>
            <a className="btn" href="#contactForm" data-magnet="">
              <span>Get started</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
