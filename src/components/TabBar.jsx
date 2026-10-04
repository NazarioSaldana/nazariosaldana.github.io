import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { profile } from '../data'
import { tabs } from '../tabs'

function TabBar() {
  const [open, setOpen] = useState(false)
  const menuBtn = useRef(null)
  const panel = useRef(null)

  // While the menu is open: Esc closes it, and focus starts on the first item
  useEffect(() => {
    if (!open) return
    panel.current?.querySelector('a')?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtn.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className="tabbar">
      <div className="tabbar__inner">
        <NavLink to="/" className="tabbar__logo" onClick={close} aria-label={`${profile.name}, home`}>
          NS<span className="tabbar__cursor">_</span>
        </NavLink>

        <button
          ref={menuBtn}
          className="tabbar__menu-btn px-btn"
          aria-expanded={open}
          aria-controls="tab-menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? 'CLOSE' : 'MENU'}
        </button>

        <nav
          id="tab-menu"
          ref={panel}
          className={`tabbar__menu ${open ? 'is-open' : ''}`}
          aria-label="Main"
        >
          <ul>
            {tabs.map((t) => (
              <li key={t.path}>
                <NavLink to={t.path} end={t.path === '/'} className="tabbar__tab" onClick={close}>
                  {t.label}
                </NavLink>
              </li>
            ))}
            <li>
              <a className="tabbar__tab tabbar__tab--ext" href={profile.resume} target="_blank" rel="noreferrer">
                Resume
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {open && <div className="tabbar__scrim" onClick={close} aria-hidden="true" />}
    </header>
  )
}

export default TabBar
