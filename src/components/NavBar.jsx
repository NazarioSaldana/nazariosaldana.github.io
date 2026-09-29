import { useEffect, useState } from 'react'
import { profile } from '../data'

const links = [
  { id: 'about', label: 'About' },
  { id: 'now', label: 'Now' },
  { id: 'projects', label: 'Projects' },
  { id: 'arcade', label: 'Arcade' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
]

function getTheme() {
  return document.documentElement.getAttribute('data-theme') || 'light'
}

function NavBar() {
  const [active, setActive] = useState('')
  const [theme, setTheme] = useState(getTheme)
  const [scrolled, setScrolled] = useState(false)

  // Highlight whichever section is in the middle of the screen
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    try {
      localStorage.setItem('theme', next)
    } catch {
      // storage unavailable; theme just won't persist
    }
    setTheme(next)
  }

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#top" className="nav__logo" aria-label="Back to top">
          NS<span className="nav__cursor">_</span>
        </a>
        <nav className="nav__links">
          {links.map(({ id, label }) => (
            <a key={id} href={`#${id}`} className={active === id ? 'active' : ''}>
              {label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <a className="nav__resume" href={profile.resume} target="_blank" rel="noreferrer">
            Resume
          </a>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default NavBar
