import { useEffect, useState } from 'react'
import { ICONS } from '../art/icons'
import { monitor, now, projects } from '../data'
import { usePageVisible, useReducedMotion } from '../motion'
import PixelIcon from './PixelIcon'

// One beat of an ECG trace, 200 units wide. Two are visible at a time; a third is drawn
// offscreen and the whole path scrolls left by one beat on a loop, so it never seams.
const BEAT = 'L20 50 L60 50 L68 44 L76 50 L90 50 L96 58 L104 10 L112 78 L120 50 L140 50 L152 40 L166 50 L200 50'
const shift = (dx) => BEAT.replace(/L(\d+)/g, (_, x) => `L${+x + dx}`)
const ECG = `M0 50 ${BEAT} ${shift(200)} ${shift(400)}`

const ROTATE_MS = 5000
const austinTime = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', hour: 'numeric', minute: '2-digit' })

// Re-renders at the top of every minute
function useMinuteClock() {
  const [date, setDate] = useState(() => new Date())
  useEffect(() => {
    let t
    const tick = () => {
      setDate(new Date())
      t = setTimeout(tick, 60000 - (Date.now() % 60000))
    }
    t = setTimeout(tick, 60000 - (Date.now() % 60000))
    return () => clearTimeout(t)
  }, [])
  return date
}

// Retro status panel: what I'm working on (cycles through the Now board) plus live readouts
function Monitor() {
  const reduced = useReducedMotion()
  const visible = usePageVisible()
  const time = useMinuteClock()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const item = now[i]

  // Auto-advance unless the visitor prefers reduced motion, is hovering/focused, or the tab is hidden
  useEffect(() => {
    if (reduced || paused || !visible) return
    const t = setTimeout(() => setI((n) => (n + 1) % now.length), ROTATE_MS)
    return () => clearTimeout(t)
  }, [i, reduced, paused, visible])

  return (
    <section
      className="scope"
      aria-label="Status monitor"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="scope__bar" aria-hidden="true">
        <span className="dot dot--live" /> NAZARIO.status
        <span className="scope__tag">live</span>
      </div>

      <div className="scope__screen" aria-hidden="true">
        <span className="scope__bpm">
          <PixelIcon rows={ICONS.heart.rows} size={18} className="heart" /> {monitor.bpm} BPM
        </span>
        <svg viewBox="0 0 400 90" preserveAspectRatio="none" className="scope__trace">
          <g className="scope__scroll">
            <path d={ECG} />
          </g>
        </svg>
      </div>

      <div className="scope__status">
        <p className="scope__now" aria-hidden="true" key={i}>
          <span className="scope__now-label">Currently {item.verb.toLowerCase()} ▸</span> {item.what}
        </p>
        <button type="button" className="scope__next" onClick={() => setI((n) => (n + 1) % now.length)}>
          <span aria-hidden="true">▶</span>
          <span className="sr-only">Show next status</span>
        </button>
        {/* Screen readers get the whole board at once instead of a rotating line */}
        <ul className="sr-only">
          {now.map((n) => (
            <li key={n.verb}>
              Currently {n.verb.toLowerCase()}: {n.what}
            </li>
          ))}
        </ul>
      </div>

      <dl className="scope__readouts">
        <div>
          <dt className="scope__label">Austin</dt>
          <dd className="scope__value">{austinTime.format(time)}</dd>
          <dd className="scope__unit">local time</dd>
        </div>
        <div>
          <dt className="scope__label">Projects</dt>
          <dd className="scope__value">{projects.length}</dd>
          <dd className="scope__unit">built</dd>
        </div>
        <div>
          <dt className="scope__label">Coffee</dt>
          <dd className="scope__value">{monitor.coffee}</dd>
          <dd className="scope__unit">{monitor.coffeeUnit}</dd>
        </div>
      </dl>
    </section>
  )
}

export default Monitor
