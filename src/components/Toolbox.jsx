import { ICONS } from '../art/icons'
import { coursework, honors, toolbox } from '../data'
import PixelIcon from './PixelIcon'

function Toolbox() {
  return (
    <section id="toolbox" className="section section--tinted">
      <div className="wrap">
        <div className="section__head">
          <p className="kicker">skills</p>
          <h1 tabIndex={-1}>What's on my bench</h1>
        </div>

        <div className="toolbox">
          {toolbox.map((g) => (
            <div className="toolbox__group" key={g.group}>
              <h3 className="subhead">{g.group}</h3>
              <div className="tags">
                {g.items.map((i) => (
                  <span className="tag" key={i}>
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
          <div className="toolbox__group">
            <h3 className="subhead">Coursework</h3>
            <div className="tags">
              {coursework.map((c) => (
                <span className="tag" key={c}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="honors">
          <h3 className="subhead">Honors</h3>
          <div className="honors__list">
            {honors.map((h) => (
              <span className="honor" key={h}>
                <PixelIcon rows={ICONS.medal.rows} size={20} /> {h}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Toolbox
