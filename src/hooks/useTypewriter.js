import { useEffect, useState } from 'react'
import { usePageVisible, useReducedMotion } from '../motion'

// Types `phrases` character by character. With `loop`, it pauses, deletes, and moves to the
// next phrase; otherwise it stops after the first. Pass a stable (module-level) array.
// Under reduced motion it returns the first phrase complete and never animates.
export function useTypewriter(phrases, { loop = true, start = true, typeMs = 75, deleteMs = 40, holdMs = 1800, gapMs = 350 } = {}) {
  const reduced = useReducedMotion()
  const visible = usePageVisible()
  const [s, setS] = useState({ i: 0, n: 0, mode: 'typing' }) // typing | holding | deleting | done

  useEffect(() => {
    if (reduced || !start || !visible || s.mode === 'done') return
    const word = phrases[s.i]
    let delay
    let next
    if (s.mode === 'typing') {
      if (s.n < word.length) [delay, next] = [typeMs, { ...s, n: s.n + 1 }]
      else [delay, next] = [loop ? 0 : 500, { ...s, mode: loop ? 'holding' : 'done' }]
    } else if (s.mode === 'holding') {
      ;[delay, next] = [holdMs, { ...s, mode: 'deleting' }]
    } else if (s.n > 0) {
      ;[delay, next] = [deleteMs, { ...s, n: s.n - 1 }]
    } else {
      ;[delay, next] = [gapMs, { i: (s.i + 1) % phrases.length, n: 0, mode: 'typing' }]
    }
    const t = setTimeout(() => setS(next), delay)
    return () => clearTimeout(t)
  }, [s, phrases, loop, start, visible, reduced, typeMs, deleteMs, holdMs, gapMs])

  if (reduced) return { text: phrases[0], done: true, idle: true }
  return {
    text: phrases[s.i].slice(0, s.n),
    done: s.mode === 'done',
    // the cursor blinks only while nothing is changing
    idle: s.mode === 'holding' || s.mode === 'done' || !start,
  }
}
