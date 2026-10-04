import { now } from '../data'

function Now() {
  return (
    <section id="now" className="section section--tinted">
      <div className="wrap">
        <div className="section__head">
          <p className="kicker">now</p>
          <h2>What I'm up to right now</h2>
          <p className="section__sub">A live-ish status board, updated whenever life changes.</p>
        </div>
        <ul className="now">
          {now.map((n) => (
            <li key={n.verb} className="now__item">
              <span className="now__verb">
                <span className="dot dot--live" /> {n.verb}
              </span>
              <span className="now__what">{n.what}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Now
