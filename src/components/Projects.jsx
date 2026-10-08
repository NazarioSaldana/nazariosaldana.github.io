import { useCallback, useEffect, useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ICONS } from '../art/icons'
import { projects } from '../data'
import PixelIcon from './PixelIcon'

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
  const closeBtn = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    const opener = document.activeElement
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      opener?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__panel dialog"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeBtn} className="modal__close px-btn" onClick={onClose} aria-label="Close">
          <PixelIcon rows={ICONS.close.rows} size={16} />
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
  // The open project lives in the URL (#/projects/:id), so each one can be linked directly
  const { id } = useParams()
  const navigate = useNavigate()
  const active = projects.find((p) => p.id === id)
  const close = useCallback(() => navigate('/projects'), [navigate])

  useEffect(() => {
    if (id && !active) navigate('/projects', { replace: true })
  }, [id, active, navigate])

  return (
    <section id="projects" className="section">
      <div className="wrap">
        <div className="section__head">
          <p className="kicker">projects</p>
          <h1 tabIndex={-1}>Things I've built</h1>
          <p className="section__sub">Click any card for the full story, plus video when there is one.</p>
        </div>

        <div className="projects">
          {projects.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="card dialog">
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
            </Link>
          ))}
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={close} />}
    </section>
  )
}

export default Projects
