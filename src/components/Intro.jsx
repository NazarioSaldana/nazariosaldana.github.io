import { useCallback, useEffect, useRef, useState } from 'react'
import { profile } from '../data'
import { endIntro, markIntroSeen, useIntroPlaying } from '../introState'
import { LOGO } from '../art/logos'
import PixelIcon from './PixelIcon'

const AUTO_CONTINUE_MS = 4500
const EXIT_MS = 350

// Plays once per browser session and never under reduced motion (decided in introState.js)
function Intro() {
  const playing = useIntroPlaying()
  const [leaving, setLeaving] = useState(false)
  const skipBtn = useRef(null)
  const dismiss = useCallback(() => setLeaving(true), [])

  useEffect(() => {
    if (!playing || leaving) return
    markIntroSeen()
    document.body.style.overflow = 'hidden'
    skipBtn.current?.focus()
    window.addEventListener('keydown', dismiss)
    const t = setTimeout(dismiss, AUTO_CONTINUE_MS)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', dismiss)
      clearTimeout(t)
    }
  }, [playing, leaving, dismiss])

  useEffect(() => {
    if (!leaving) return
    const t = setTimeout(endIntro, EXIT_MS)
    return () => clearTimeout(t)
  }, [leaving])

  if (!playing) return null

  return (
    <div
      className={`intro ${leaving ? 'is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Title screen"
      onPointerDown={dismiss}
    >
      <div className="intro__boot" aria-hidden="true">
        NS<span className="intro__reg">®</span>
      </div>
      <div className="intro__title">
        <PixelIcon rows={LOGO} size={96} className="intro__sprite" />
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
