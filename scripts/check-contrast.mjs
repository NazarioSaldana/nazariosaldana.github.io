// Checks WCAG contrast for every text/background pair the site uses, reading
// colors straight from src/styles/tokens.css.   npm run contrast
import { readFileSync } from 'node:fs'

const css = readFileSync(new URL('../src/styles/tokens.css', import.meta.url), 'utf8')
const v = Object.fromEntries([...css.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]))

// [text, background, minimum ratio]  4.5 = AA body text, 3 = large text / UI outlines
const PAIRS = [
  ...['px-cream', 'px-cream-2', 'px-white', 'px-red', 'px-mint', 'px-sky', 'px-lemon', 'px-lavender', 'px-peach', 'px-gb'].map(
    (bg) => ['ink', bg, 4.5],
  ),
  ...['px-cream', 'px-cream-2', 'px-white', 'px-sky', 'px-mint', 'px-gb'].map((bg) => ['muted', bg, 4.5]),
  ...['px-cream', 'px-cream-2', 'px-white', 'px-lemon', 'px-lavender', 'px-sky', 'px-mint'].map((bg) => ['accent-text', bg, 4.5]),
  ['px-gb-ink', 'px-gb', 4.5],
  ['px-cream', 'ink', 4.5], // text on dark (arcade, tag--solid)
  ['px-red', 'ink', 4.5],
  ['focus', 'px-cream', 3],
  ['focus', 'px-white', 3],
]

const lum = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a, b) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

let failed = 0
for (const [fg, bg, min] of PAIRS) {
  if (!v[fg] || !v[bg]) throw new Error(`Missing token --${!v[fg] ? fg : bg}`)
  const r = ratio(v[fg], v[bg])
  const ok = r >= min
  if (!ok) failed++
  console.log(`${ok ? 'pass' : 'FAIL'}  ${r.toFixed(2).padStart(5)}:1  ${fg} on ${bg}  (needs ${min})`)
}
console.log(failed ? `\n${failed} pair(s) below WCAG AA` : '\nAll pairs meet WCAG AA')
process.exit(failed ? 1 : 0)
