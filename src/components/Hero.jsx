import { useTypewriter } from '../hooks/useTypewriter'
import { useIntroPlaying } from '../introState'
import { useReducedMotion } from '../motion'
import { Link } from 'react-router'
import { ICONS } from '../art/icons'
import { buildWords, profile, toolbox } from '../data'
import Monitor from './Monitor'
import PixelIcon from './PixelIcon'

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
        <Monitor />
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
