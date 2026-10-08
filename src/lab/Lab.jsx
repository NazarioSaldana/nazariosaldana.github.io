// Dev-only preview page (#/lab). Never included in production builds.
import PixelIcon from '../components/PixelIcon'
import { LOGOS } from '../art/logos'
import { PAIRS, PALETTES, contrast } from './palettes'
import './lab.css'

const styleVars = (vars) => Object.fromEntries(Object.entries(vars).map(([k, v]) => [`--${k}`, v]))

function PaletteCard({ id, p }) {
  return (
    <section className="lab-pal" style={styleVars(p.vars)} aria-labelledby={`pal-${id}`}>
      <div className="lab-pal__bar">
        <PixelIcon rows={LOGOS.monogram.rows} size={32} />
        <span className="lab-pal__tab is-on">▶ Home</span>
        <span className="lab-pal__tab">Projects</span>
        <span className="lab-pal__tab">Skills</span>
      </div>
      <div className="lab-pal__body">
        <p className="kicker">palette</p>
        <h2 id={`pal-${id}`}>{p.name}</h2>
        <p className="lab-pal__note">{p.note}</p>
        <div className="dialog lab-pal__card">
          <h3>Wearable Fitness Tracker</h3>
          <p className="lab-muted">A wrist-worn tracker that streams heart rate over BLE.</p>
          <span className="lab-accent">C, BLE, KiCad</span>
        </div>
        <div className="lab-pal__row">
          <button className="btn btn--primary">See projects</button>
          <button className="btn btn--ghost">Contact</button>
        </div>
        <div className="tags">
          {['px-sky', 'px-mint', 'px-peach', 'px-lavender', 'px-red', 'px-lemon'].map((c) => (
            <span key={c} className="tag" style={{ background: `var(--${c})` }}>
              {c.replace('px-', '')}
            </span>
          ))}
        </div>
        <div className="lab-pal__lcd">♥ 72 BPM · CURRENTLY BUILDING ▸ tracker</div>
        <ul className="lab-pal__swatches">
          {Object.entries(p.vars).map(([k, v]) => (
            <li key={k}>
              <span style={{ background: v }} />
              <code>
                {k} {v}
              </code>
            </li>
          ))}
        </ul>
        <details>
          <summary>Contrast (lowest {Math.min(...PAIRS.map(([f, b]) => contrast(p.vars[f], p.vars[b]))).toFixed(2)}:1)</summary>
          <table className="lab-table">
            <tbody>
              {PAIRS.map(([f, b, need]) => {
                const r = contrast(p.vars[f], p.vars[b])
                return (
                  <tr key={f + b}>
                    <td>
                      {f} on {b}
                    </td>
                    <td>{r.toFixed(2)}</td>
                    <td>{r >= need ? 'pass' : 'FAIL'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </details>
      </div>
    </section>
  )
}

function Lab() {
  return (
    <section className="section">
      <div className="wrap">
        <p className="kicker">dev only</p>
        <h1 tabIndex={-1}>Design lab</h1>
        <p className="section__sub">Pick a logo and a palette. This page is excluded from production builds.</p>

        <h2 className="lab-h2">Logos</h2>
        <div className="lab-logos">
          {Object.entries(LOGOS).map(([id, l]) => (
            <figure key={id} className="dialog lab-logo">
              <figcaption>{l.name}</figcaption>
              <div className="lab-logo__sizes">
                <PixelIcon rows={l.rows} size={96} label={l.name} />
                <PixelIcon rows={l.rows} size={48} />
                <PixelIcon rows={l.rows} size={32} />
                <PixelIcon rows={l.rows} size={16} />
              </div>
              <div className="lab-logo__header">
                <PixelIcon rows={l.rows} size={44} />
                <span>Nazario Saldaña</span>
              </div>
              <div className="lab-logo__tab">
                <PixelIcon rows={l.rows} size={16} /> Nazario Saldaña
              </div>
            </figure>
          ))}
        </div>

        <h2 className="lab-h2">Palettes</h2>
        <div className="lab-compare">
          {Object.entries(PALETTES).map(([id, p]) => (
            <div key={id} className="lab-compare__col" style={styleVars(p.vars)}>
              <strong>{p.name}</strong>
              {['px-red', 'px-peach', 'px-lemon', 'px-mint', 'px-sky', 'px-lavender', 'px-gb'].map((c) => (
                <span key={c} className="lab-compare__sw" style={{ background: `var(--${c})` }}>
                  Aa
                </span>
              ))}
              <span className="lab-compare__ink">
                Body text <em>muted text</em> <b>accent</b>
              </span>
            </div>
          ))}
        </div>
        <div className="lab-pals">
          {Object.entries(PALETTES).map(([id, p]) => (
            <PaletteCard key={id} id={id} p={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Lab
