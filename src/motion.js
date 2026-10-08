import { useSyncExternalStore } from 'react'

// Dev-only override for testing: add ?rm=1 to the URL (before the #) to force reduced motion
const forced = import.meta.env.DEV && new URLSearchParams(window.location.search).has('rm')
if (forced) document.documentElement.classList.add('force-rm')

const query = window.matchMedia('(prefers-reduced-motion: reduce)')

export function prefersReducedMotion() {
  return forced || query.matches
}

export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      query.addEventListener('change', cb)
      return () => query.removeEventListener('change', cb)
    },
    prefersReducedMotion,
  )
}

// False while the tab is in the background, so animations can pause
export function usePageVisible() {
  return useSyncExternalStore(
    (cb) => {
      document.addEventListener('visibilitychange', cb)
      return () => document.removeEventListener('visibilitychange', cb)
    },
    () => !document.hidden,
  )
}
