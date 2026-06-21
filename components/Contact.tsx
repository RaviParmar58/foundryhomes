export default function Contact() {
  return (
    <section className="contact" id="contact" aria-label="Contact">
      <div className="contact__left">
        <div className="contact__left-bg" data-parallax="0.1"></div>
        <div className="contact__left-inner">
          <p className="eyebrow rv">Get started</p>
          <h2 className="display rv rv-d1">Let&apos;s talk</h2>
          <p className="rv rv-d2">
            Tell us where you are and what you&apos;re thinking. Your local Foundry team will be in touch to discuss your project — no pressure, no obligations.
          </p>
        </div>
      </div>
      <div className="contact__right">
        <form className="form rv" id="quoteForm" noValidate>
          <h3>Get a free quote</h3>
          <p>We reply within one working day.</p>
          <div id="formFields">
            <div className="form__row">
              <div className="field">
                <input type="text" id="fName" placeholder=" " autoComplete="given-name" />
                <label htmlFor="fName">First name</label>
              </div>
              <div className="field">
                <input type="text" id="lName" placeholder=" " autoComplete="family-name" />
                <label htmlFor="lName">Last name</label>
              </div>
            </div>
            <div className="form__row">
              <div className="field">
                <input type="email" id="email" placeholder=" " required autoComplete="email" />
                <label htmlFor="email">Email *</label>
              </div>
              <div className="field">
                <input type="tel" id="phone" placeholder=" " autoComplete="tel" />
                <label htmlFor="phone">Phone</label>
              </div>
            </div>
            <div className="field">
              <textarea id="msg" rows={4} placeholder=" " required></textarea>
              <label htmlFor="msg">Tell us about your project *</label>
            </div>
            <button type="submit" className="btn btn--solid" data-magnet="">
              <span>Send enquiry</span>
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M10 1l5 5-5 5M15 6H1" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <div className="form__ok" id="formOk">
            <b>Enquiry sent</b>
            <p>Thanks — your local Foundry team will be in touch within one working day.</p>
          </div>
        </form>
      </div>
    </section>
  )
}
