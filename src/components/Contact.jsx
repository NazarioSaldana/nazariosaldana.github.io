import { useState } from 'react'
import { profile } from '../data'

function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <footer id="contact" className="contact">
      <div className="wrap reveal">
        <p className="kicker">07 · contact</p>
        <h2>
          Let's build something <span className="name-gradient">together</span>.
        </h2>
        <p className="contact__sub">
          I'm looking for opportunities in embedded systems and firmware development. Whether you have a question, a
          project, or just want to talk Barça, my inbox is open.
        </p>
        <div className="contact__actions">
          <button className="btn btn--primary" onClick={copyEmail}>
            {copied ? '✓ Copied!' : `✉️ ${profile.email}`}
          </button>
          <a className="btn btn--ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a className="btn btn--ghost" href={profile.resume} target="_blank" rel="noreferrer">
            Resume ↗
          </a>
        </div>
        <p className="contact__foot">
          © {new Date().getFullYear()} {profile.name} · Built with React &amp; a lot of coffee ☕ · Hecho en Texas
        </p>
      </div>
    </footer>
  )
}

export default Contact
