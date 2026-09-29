import { about, interests } from '../data'

function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="kicker">01 · about</p>
          <h2>A little about me</h2>
        </div>

        <div className="about__grid">
          <div className="about__bio reveal">
            {about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="reveal">
            <h3 className="subhead">Off the clock</h3>
            <div className="interests">
              {interests.map((it) => (
                <div className="interest" key={it.title}>
                  <span className="interest__icon">{it.icon}</span>
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
