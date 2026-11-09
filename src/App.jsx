import { useState } from 'react'
import { business } from './config'
import './App.css'

const paths = {
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  alert: 'M12 3l10 18H2zM12 10v5M12 18v.01',
  flame: 'M12 3c1 4 5 6 5 11a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-6 1-10z',
  bath: 'M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0',
  drop: 'M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.4 2.4-2.6-.6-.6-2.6z',
  shield: 'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z',
  check: 'M5 12l5 5 9-10',
  bolt: 'M13 2L4 14h7l-1 8 9-12h-7z',
  bulb: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z',
  plug: 'M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4',
  home: 'M3 11l9-8 9 8M5 10v10h14V10',
}

function Icon({ name, size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}

function Stars() {
  return (
    <div className="stars" aria-label="5 out of 5 stars">
      {'★★★★★'}
    </div>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('sending')
    const data = new FormData(e.target)
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('sent')
      e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="form-success">
        <Icon name="check" size={32} />
        <h3>Thanks, message sent!</h3>
        <p>We'll get back to you as soon as we can, usually within a couple of hours.</p>
      </div>
    )
  }

  return (
    <form name="contact" method="POST" onSubmit={handleSubmit} className="form">
      <input type="hidden" name="form-name" value="contact" />
      <label>
        Name
        <input type="text" name="name" required placeholder="Your name" />
      </label>
      <label>
        Phone
        <input type="tel" name="phone" required placeholder="Your phone number" />
      </label>
      <label>
        How can we help?
        <textarea name="message" rows="4" required placeholder="Tell us about the job" />
      </label>
      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Get a free quote'}
      </button>
      {status === 'error' && (
        <p className="form-error">Something went wrong. Please call us instead.</p>
      )}
    </form>
  )
}

function App() {
  const b = business
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site" style={{ '--accent': b.accent }}>
      {/* NAV */}
      <header className="nav">
        <div className="container nav-inner">
          <a href="#top" className="logo">{b.name}</a>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#reviews" onClick={closeMenu}>Reviews</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
          </nav>
          <a href={`tel:${b.phoneLink}`} className="btn btn-primary btn-sm nav-call">
            <Icon name="phone" size={16} /> {b.phone}
          </a>
          <button
            type="button"
            className="menu-btn"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="container hero-inner">
          {b.badge && <span className="badge">{b.badge}</span>}
          <h1>{b.tagline}</h1>
          <p className="hero-sub">{b.intro}</p>
          <div className="hero-actions">
            <a href={`tel:${b.phoneLink}`} className="btn btn-primary">
              <Icon name="phone" size={18} /> Call {b.phone}
            </a>
            <a href="#contact" className="btn btn-ghost">Get a free quote</a>
          </div>
          <p className="hero-area">Covering {b.area}</p>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="container stats-grid">
          {b.stats.map((s) => (
            <div key={s.label} className="stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <h2>What we do</h2>
          <p className="section-sub">From emergency repairs to full installations.</p>
          <div className="grid grid-3">
            {b.services.map((s) => (
              <div key={s.title} className="card">
                <div className="card-icon"><Icon name={s.icon} /></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section section-alt">
        <div className="container why">
          <div>
            <h2>Why choose us</h2>
            <p className="section-sub left">
              No jargon, no hidden costs, just quality work done properly.
            </p>
          </div>
          <ul className="why-list">
            {b.why.map((w) => (
              <li key={w}>
                <span className="tick"><Icon name="check" size={16} /></span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section" id="reviews">
        <div className="container">
          <h2>What customers say</h2>
          <p className="section-sub">Don't just take our word for it.</p>
          <div className="grid grid-3">
            {b.reviews.map((r) => (
              <figure key={r.name} className="card review">
                <Stars />
                <blockquote>{r.text}</blockquote>
                <figcaption>{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="section section-alt">
        <div className="container">
          <h2>Areas we cover</h2>
          <div className="chips">
            {b.areas.map((a) => (
              <span key={a} className="chip">{a}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section" id="contact">
        <div className="container contact">
          <div>
            <h2>Get in touch</h2>
            <p className="section-sub left">
              Tell us what you need and we'll give you a free, no-obligation quote.
            </p>
            <ul className="contact-list">
              <li><strong>Call</strong><a href={`tel:${b.phoneLink}`}>{b.phone}</a></li>
              <li><strong>Email</strong><a href={`mailto:${b.email}`}>{b.email}</a></li>
              <li><strong>Hours</strong><span>{b.hours}</span></li>
            </ul>
          </div>
          <div className="card form-card">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {b.name}</span>
          <span className="demo-note">Demo website</span>
        </div>
      </footer>

      {/* MOBILE CALL BAR */}
      <a href={`tel:${b.phoneLink}`} className="call-bar">
        <Icon name="phone" size={18} /> Call now
      </a>
    </div>
  )
}

export default App