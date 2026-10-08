import { useSyncExternalStore } from 'react'
import { prefersReducedMotion } from './motion'

// Whether the title-screen intro is showing. Decided once at load so every component
// agrees from the first render (the hero waits to type, the cat stays hidden).
const KEY = 'intro-seen'

function shouldPlay() {
  try {
    return !prefersReducedMotion() && sessionStorage.getItem(KEY) !== '1'
  } catch {
    return false
  }
}

let playing = shouldPlay()
const subs = new Set()

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, '1')
  } catch {
    // storage blocked; the intro will just play again next load
  }
}

export function endIntro() {
  playing = false
  subs.forEach((cb) => cb())
}

export function useIntroPlaying() {
  return useSyncExternalStore(
    (cb) => {
      subs.add(cb)
      return () => subs.delete(cb)
    },
    () => playing,
  )
}
