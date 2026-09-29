import { useCallback, useEffect, useState } from 'react'
import { projectFilters, projects } from '../data'

function Thumb({ project }) {
  if (project.youtubeId) {
    return <img src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`} alt="" loading="lazy" />
  }
  if (project.image) {
    return <img src={project.image} alt="" loading="lazy" />
  }
  return (
    <div className="thumb-art">
      <span>{project.icon}</span>
    </div>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="Close">
          ✕
        </button>
        <div className="modal__scroll">
          <div className="modal__media">
            {project.mediaType === 'video' ? (
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}`}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <Thumb project={project} />
            )}
          </div>
          <div className="modal__body">
            {project.status && <span className="badge">{project.status}</span>}
            <h2>{project.title}</h2>
            <p className="modal__intro">{project.description}</p>
            <div className="tags">
              {project.tech.split(', ').map((t) => (
                <span key={t} className="tag tag--solid">
                  {t}
                </span>
              ))}
            </div>
            <h4>Overview</h4>
            <p>{project.fullDetails}</p>
            <h4>The process</h4>
            <p>{project.process}</p>
            <h4>Skills &amp; technologies</h4>
            <div className="tags">
              {project.skills.map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const [filter, setFilter] = useState('All')
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])
  const shown = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div className="section__head reveal">
          <p className="kicker">03 · projects</p>
          <h2>Things I've built</h2>
          <p className="section__sub">Click any card for the full story, plus video when there is one.</p>
        </div>

        <div className="filters reveal" role="tablist" aria-label="Filter projects">
          {projectFilters.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={filter === f}
              className={`filter ${filter === f ? 'filter--on' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="projects reveal">
          {shown.map((p) => (
            <button key={p.id} className="card" onClick={() => setActive(p)}>
              <div className="card__thumb">
                <Thumb project={p} />
                {p.mediaType === 'video' && <span className="card__play">▶</span>}
                {p.status && <span className="badge badge--float">{p.status}</span>}
              </div>
              <div className="card__body">
                <h3>{p.title}</h3>
                <p>{p.description}</p>
                <span className="card__tech">{p.tech}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  )
}

export default Projects
