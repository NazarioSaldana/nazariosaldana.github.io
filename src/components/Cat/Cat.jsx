import { useEffect, useRef, useSyncExternalStore } from 'react'
import { useIntroPlaying } from '../../introState'
import { usePageVisible, useReducedMotion } from '../../motion'
import config from './cat.config'

// Only on devices with a real hovering pointer (mouse/trackpad); hidden on touch screens
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
function useFinePointer() {
  return useSyncExternalStore(
    (cb) => {
      finePointer.addEventListener('change', cb)
      return () => finePointer.removeEventListener('change', cb)
    },
    () => finePointer.matches,
  )
}

const W = config.frameWidth * config.scale
const H = config.frameHeight * config.scale

// Sprite frames are a CSS steps() animation over the sheet; only the walk position uses JS,
// and its requestAnimationFrame loop runs only while the cat is actually walking.
function setState(el, name) {
  if (el.dataset.state === name) return
  const s = config.states[name]
  el.dataset.state = name
  el.style.setProperty('--row-y', `${-s.row * H}px`)
  el.style.setProperty('--strip', `${-s.frames * W}px`)
  el.style.setProperty('--frames', s.frames)
  el.style.setProperty('--dur', `${s.frames / s.fps}s`)
}

function Cat() {
  const fine = useFinePointer()
  const intro = useIntroPlaying()
  const reduced = useReducedMotion()
  const visible = usePageVisible()
  const ref = useRef(null)
  const show = fine && !intro

  // Reserve room at the bottom of the page so the cat never covers the last line
  useEffect(() => {
    if (!show) return
    document.documentElement.classList.add('has-cat')
    return () => document.documentElement.classList.remove('has-cat')
  }, [show])

  useEffect(() => {
    const box = ref.current
    if (!box || !show) return
    const el = box.firstChild // the sprite; the outer box only moves

    // Reduced motion: a static cat napping in the corner, no following
    if (reduced) {
      setState(el, 'sleep')
      box.style.transform = `translateX(${window.innerWidth - W - 24}px)`
      return
    }

    let x = window.innerWidth / 2 - W / 2
    let target = x
    let facing = 1
    let raf = 0
    let last = 0
    let sleepTimer = 0

    const place = () => {
      box.style.transform = `translateX(${x}px)`
      el.style.transform = `scaleX(${facing})`
    }

    const scheduleSleep = () => {
      clearTimeout(sleepTimer)
      sleepTimer = setTimeout(() => setState(el, 'sleep'), config.sleepAfter)
    }

    const step = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const dx = target - x
      if (Math.abs(dx) <= config.stopDistance) {
        raf = 0
        setState(el, 'idle')
        scheduleSleep()
        return
      }
      facing = Math.sign(dx)
      x += facing * Math.min(Math.abs(dx), config.speed * dt)
      place()
      raf = requestAnimationFrame(step)
    }

    const onMove = (e) => {
      target = Math.max(0, Math.min(window.innerWidth - W, e.clientX - W / 2))
      if (Math.abs(target - x) > config.stopDistance && !raf) {
        setState(el, 'walk')
        clearTimeout(sleepTimer)
        last = performance.now()
        raf = requestAnimationFrame(step)
      } else if (!raf) {
        setState(el, 'idle')
        scheduleSleep()
      }
    }

    setState(el, 'idle')
    place()
    scheduleSleep()
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
      clearTimeout(sleepTimer)
    }
  }, [show, reduced])

  if (!show) return null

  return (
    <div ref={ref} className={`cat ${visible ? '' : 'is-paused'}`} aria-hidden="true" style={{ width: W, height: H }}>
      <div
        className="cat__sprite"
        style={{
          backgroundImage: `url(${config.sheet})`,
          backgroundSize: `auto ${(Math.max(...Object.values(config.states).map((s) => s.row)) + 1) * H}px`,
        }}
      />
      <span className="cat__z">z</span>
    </div>
  )
}

export default Cat
