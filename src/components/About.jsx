import { ICONS } from '../art/icons'
import { about, interests } from '../data'
import PixelIcon from './PixelIcon'

function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="section__head">
          <p className="kicker">about</p>
          <h1 tabIndex={-1}>A little about me</h1>
        </div>

        <div className="about__grid">
          <div className="about__bio dialog">
            {about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div>
            <h3 className="subhead">Off the clock</h3>
            <div className="interests">
              {interests.map((it) => (
                <div className="interest" key={it.title}>
                  <span className="interest__icon">
                    <PixelIcon rows={ICONS[it.icon].rows} label={ICONS[it.icon].label} size={32} />
                  </span>
                  <div>
                    <h4>{it.title}</h4>
                    <p>{it.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
