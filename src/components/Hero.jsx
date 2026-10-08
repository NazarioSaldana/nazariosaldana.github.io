import { useEffect, useState } from 'react'
import { useTypewriter } from '../hooks/useTypewriter'
import { useIntroPlaying } from '../introState'
import { useReducedMotion } from '../motion'
import { Link } from 'react-router'
import { ICONS } from '../art/icons'
import { buildWords, profile, toolbox } from '../data'
import PixelIcon from './PixelIcon'

// One beat of an ECG trace, 200 units wide. Two are visible at a time; a third is drawn
// offscreen and the whole path scrolls left by one beat on a loop, so it never seams.
const BEAT = 'L20 50 L60 50 L68 44 L76 50 L90 50 L96 58 L104 10 L112 78 L120 50 L140 50 L152 40 L166 50 L200 50'
const shift = (dx) => BEAT.replace(/L(\d+)/g, (_, x) => `L${+x + dx}`)
const ECG = `M0 50 ${BEAT} ${shift(200)} ${shift(400)}`

function rand(min, max) {
  return Math.round(min + Math.random() * (max - min))
}

function Scope() {
  const [vitals, setVitals] = useState({ hr: 72, spo2: 98, steps: 4210 })

  useEffect(() => {
    const t = setInterval(() => {
      setVitals((v) => ({ hr: rand(68, 79), spo2: rand(97, 99), steps: v.steps + rand(0, 4) }))
    }, 1200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="scope" aria-hidden="true">
      <div className="scope__bar">
        <span className="dot dot--live" /> WEARABLE_TRACKER.ble
        <span className="scope__tag">demo</span>
      </div>
      <div className="scope__screen">
        <svg viewBox="0 0 400 90" preserveAspectRatio="none" className="scope__trace">
          <g className="scope__scroll">
            <path d={ECG} />
          </g>
        </svg>
      </div>
      <div className="scope__readouts">
        <div>
          <span className="scope__label">HR</span>
          <span className="scope__value">
            <PixelIcon rows={ICONS.heart.rows} size={16} className="heart" /> {vitals.hr}
          </span>
          <span className="scope__unit">bpm</span>
        </div>
        <div>
          <span className="scope__label">SpO₂</span>
          <span className="scope__value">{vitals.spo2}</span>
          <span className="scope__unit">%</span>
        </div>
        <div>
          <span className="scope__label">Steps</span>
          <span className="scope__value">{vitals.steps.toLocaleString()}</span>
          <span className="scope__unit">today</span>
        </div>
      </div>
    </div>
  )
}

const NAME = [profile.firstName]
const BUILD_SENTENCE = `I build ${buildWords.slice(0, -1).join(', ')}, and ${buildWords.at(-1)}.`

// Typed text with a reserved-size "ghost" so nothing shifts while it types
function Typed({ text, ghost, idle, cursor, className = '' }) {
  return (
    <span className={`tw ${className}`}>
      <span className="tw__ghost">{ghost}</span>
      <span className="tw__text">
        {text}
        {cursor && <span className={`tw__cursor ${idle ? 'is-idle' : ''}`} />}
      </span>
    </span>
  )
}

const LONGEST = buildWords.reduce((a, b) => (b.length > a.length ? b : a))

function Hero() {
  const intro = useIntroPlaying()
  const reduced = useReducedMotion()
  const name = useTypewriter(NAME, { loop: false, start: !intro })
  const word = useTypewriter(buildWords, { start: name.done })

  const ticker = toolbox.flatMap((g) => g.items)

  return (
    <section className="hero" id="top">
      <div className="wrap hero__grid">
        <div className="hero__text">
          <p className="kicker">// hello, world</p>
          {/* Screen readers get the full text once; the animated copies are aria-hidden */}
          <h1 tabIndex={-1}>
            <span className="sr-only">Hey, I'm {profile.firstName}!</span>
            <span aria-hidden="true">
              Hey, I'm{' '}
              <Typed text={name.text} ghost={profile.firstName} idle={name.idle} cursor={!name.done} className="name-hl" />!
            </span>
          </h1>
          <p className="hero__build">
            <span className="sr-only">{BUILD_SENTENCE}</span>
            {reduced ? (
              <span aria-hidden="true">{BUILD_SENTENCE}</span>
            ) : (
              <span aria-hidden="true">
                I build <Typed text={word.text} ghost={LONGEST} idle={word.idle} cursor={name.done} className="hero__word" />
              </span>
            )}
          </p>
          <p className="hero__lede">
            Electrical &amp; Computer Engineering student at UT Austin, Houston native, and first-gen engineer who
            likes making hardware do fun things.
          </p>
          <div className="hero__cta">
            <Link to="/projects" className="btn btn--primary">
              See my projects
            </Link>
            <Link to="/arcade" className="btn btn--ghost">
              Play a game
            </Link>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Contact me
            </button>
          </div>
          <ul className="hero__chips">
            <li>
              <PixelIcon rows={ICONS.pin.rows} label={ICONS.pin.label} size={18} /> {profile.location}
            </li>
            <li>
              <PixelIcon rows={ICONS.cap.rows} label={ICONS.cap.label} size={16} /> {profile.school}
            </li>
            <li>
              <span className="dot dot--live" /> Open to embedded &amp; firmware internships
            </li>
          </ul>
        </div>
        <Scope />
      </div>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[...ticker, ...ticker].map((t, idx) => (
            <span key={idx}>
              {t}
              <PixelIcon rows={ICONS.sparkle.rows} size={14} className="ticker__sep" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Hero
