import { useEffect, useRef, useState } from 'react'
import { leadership, stats } from '../data'

function Counter({ value, prefix = '', suffix = '' }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setN(value)
        return
      }
      const t0 = performance.now()
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / 1200)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  )
}

function Leadership() {
  return (
    <section id="leadership" className="section">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="kicker">05 · leadership</p>
          <h2>Community is the whole point</h2>
          <p className="section__sub">
            Engineering is a team sport. Here's where I've been showing up outside the lab.
          </p>
        </div>

        <div className="stats reveal">
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat__num">
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p>{s.label}</p>
            </div>
          ))}
        </div>

        <ol className="timeline reveal">
          {leadership.map((l) => (
            <li key={l.role} className={`timeline__item ${l.current ? 'is-current' : ''}`}>
              <div className="timeline__meta">
                <span className="timeline__dates">{l.dates}</span>
                {l.current && <span className="badge">Current</span>}
              </div>
              <h3>{l.role}</h3>
              <p className="timeline__org">{l.org}</p>
              <ul>
                {l.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default Leadership
