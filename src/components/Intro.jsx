import { useCallback, useEffect, useRef, useState } from 'react'
import { profile } from '../data'
import PixelSprite from './PixelSprite'
import { HEART, heartPalette } from '../sprites'

const KEY = 'intro-seen'
const AUTO_CONTINUE_MS = 4500
const EXIT_MS = 350

// Show once per browser session, and never for people who prefer reduced motion
function shouldPlay() {
  try {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return sessionStorage.getItem(KEY) !== '1'
  } catch {
    return false
  }
}

function Intro() {
  const [state, setState] = useState(() => (shouldPlay() ? 'on' : 'off')) // on | leaving | off

  const skipBtn = useRef(null)
  const dismiss = useCallback(() => setState((s) => (s === 'on' ? 'leaving' : s)), [])

  useEffect(() => {
    if (state !== 'on') return
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      // storage blocked; the intro will just play again next load
    }
    document.body.style.overflow = 'hidden'
    skipBtn.current?.focus()
    window.addEventListener('keydown', dismiss)
    const t = setTimeout(dismiss, AUTO_CONTINUE_MS)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', dismiss)
      clearTimeout(t)
    }
  }, [state, dismiss])

  useEffect(() => {
    if (state !== 'leaving') return
    const t = setTimeout(() => setState('off'), EXIT_MS)
    return () => clearTimeout(t)
  }, [state])

  if (state === 'off') return null

  return (
    <div
      className={`intro ${state === 'leaving' ? 'is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Title screen"
      onPointerDown={dismiss}
    >
      <div className="intro__boot" aria-hidden="true">
        NS<span className="intro__reg">®</span>
      </div>
      <div className="intro__title">
        <PixelSprite rows={HEART} palette={heartPalette} size={6} className="intro__sprite" />
        <p className="intro__name">{profile.firstName.toUpperCase()}</p>
        <p className="intro__version">~ ECE Version ~</p>
        <p className="intro__start">▶ PRESS START</p>
        <p className="intro__copy">© {new Date().getFullYear()} {profile.name}</p>
      </div>
      <button ref={skipBtn} type="button" className="intro__skip px-btn" onClick={dismiss}>
        Skip
      </button>
    </div>
  )
}

export default Intro
