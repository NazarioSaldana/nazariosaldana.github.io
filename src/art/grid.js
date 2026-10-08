// Tiny helpers for authoring pixel art as character grids.
// A grid is an array of equal-length strings; each character is one pixel and
// '.' is transparent. Characters map to colors in src/art/colors.js.

export function blank(w, h, ch = '.') {
  return Array.from({ length: h }, () => Array(w).fill(ch))
}

export function rect(g, x, y, w, h, ch) {
  for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (g[j] && i >= 0 && i < g[j].length) g[j][i] = ch
}

export function outline(g, x, y, w, h, ch) {
  rect(g, x, y, w, 1, ch)
  rect(g, x, y + h - 1, w, 1, ch)
  rect(g, x, y, 1, h, ch)
  rect(g, x + w - 1, y, 1, h, ch)
}

// Copy `rows` onto the grid at (x, y); '.' in rows leaves the grid untouched
export function stamp(g, rows, x, y) {
  rows.forEach((row, j) => [...row].forEach((ch, i) => ch !== '.' && rect(g, x + i, y + j, 1, 1, ch)))
}

// Swap characters in rows, e.g. recolor(FONT.N, { k: 'w' })
export function recolor(rows, map) {
  return rows.map((r) => [...r].map((c) => map[c] ?? c).join(''))
}

// Build symmetric art from its left half
export function mirror(half, odd = false) {
  return half.map((r) => r + [...r].reverse().join('').slice(odd ? 1 : 0))
}

export const toRows = (g) => g.map((r) => r.join(''))

// 3x5 and 4x7 letters for monograms
export const FONT = {
  N: ['k..k', 'kk.k', 'kk.k', 'k.kk', 'k.kk', 'k..k', 'k..k'],
  S: ['.kkk', 'k...', 'k...', '.kk.', '...k', '...k', 'kkk.'],
  n3: ['k.k', 'kkk', 'kkk', 'k.k', 'k.k'],
  s3: ['.kk', 'k..', '.k.', '..k', 'kk.'],
}
