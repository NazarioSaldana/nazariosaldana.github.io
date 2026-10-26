import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { ICONS } from '../art/icons'
import { projects } from '../data'
import PixelIcon from './PixelIcon'

function Cover({ project }) {
  return <img src={project.image} alt={project.imageAlt} width="256" height="144" loading="lazy" className="cover" />
}

// <model-viewer> (and the three.js it bundles) only loads once a model is actually opened.
// The pixel-art cover stays on top until the model has downloaded and rendered.
function ModelView({ project }) {
  const [ready, setReady] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const viewer = useRef(null)

  useEffect(() => {
    import('@google/model-viewer').then(() => setReady(true))
  }, [])

  useEffect(() => {
    const el = viewer.current
    if (!el) return
    const onLoad = () => setLoaded(true)
    el.addEventListener('load', onLoad)
    return () => el.removeEventListener('load', onLoad)
  }, [ready])

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="model">
      {ready && (
        <model-viewer
          ref={viewer}
          src={project.model}
          alt={project.modelAlt}
          camera-controls=""
          touch-action="pan-y"
          {...(!reduceMotion && { 'auto-rotate': '' })}
          auto-rotate-delay="0"
          rotation-per-second="20deg"
          camera-orbit="30deg 60deg auto"
          shadow-intensity="1"
          exposure="1.1"
          interaction-prompt="none"
        />
      )}
      <div className={`model__cover${loaded ? ' model__cover--hidden' : ''}`} aria-hidden={loaded}>
        <Cover project={project} />
      </div>
      <span className="model__hint">{loaded ? 'Drag to rotate · scroll to zoom' : 'Loading 3D model…'}</span>
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
            {project.youtubeId ? (
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}`}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : project.model ? (
              <ModelView project={project} />
            ) : (
              <Cover project={project} />
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
          <p className="section__sub">Click any card for the full story, plus video or a 3D model when there is one.</p>
        </div>

        <div className="projects">
          {projects.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`} className="card dialog">
              <div className="card__thumb">
                <Cover project={p} />
                {p.youtubeId && (
                  <span className="card__play">
                    <PixelIcon rows={ICONS.play.rows} size={36} />
                  </span>
                )}
                {p.model && <span className="badge badge--float badge--3d">3D</span>}
                {p.status && <span className="badge badge--float">{p.status}</span>}
              </div>
              <div className="card__body">
                <h3>
                  {p.title}
                  {p.youtubeId && <span className="sr-only"> (has video)</span>}
                  {p.model && <span className="sr-only"> (has 3D model)</span>}
                </h3>
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
