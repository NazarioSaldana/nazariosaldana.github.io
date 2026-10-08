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

export function disc(g, cx, cy, r, ch) {
  for (let y = cy - r; y <= cy + r; y++)
    for (let x = cx - r; x <= cx + r; x++) if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r + r * 0.8) rect(g, x, y, 1, 1, ch)
}

export function ring(g, cx, cy, r, ch, keep = () => true) {
  for (let y = cy - r; y <= cy + r; y++)
    for (let x = cx - r; x <= cx + r; x++) {
      const d = (x - cx) ** 2 + (y - cy) ** 2
      if (d <= r * r + r * 0.8 && d > (r - 1) ** 2 + (r - 1) * 0.8 && keep(x - cx, y - cy)) rect(g, x, y, 1, 1, ch)
    }
}

// Bresenham line
export function line(g, x0, y0, x1, y1, ch) {
  const dx = Math.abs(x1 - x0)
  const dy = -Math.abs(y1 - y0)
  const sx = x0 < x1 ? 1 : -1
  const sy = y0 < y1 ? 1 : -1
  let err = dx + dy
  for (;;) {
    rect(g, x0, y0, 1, 1, ch)
    if (x0 === x1 && y0 === y1) break
    const e2 = 2 * err
    if (e2 >= dy) {
      err += dy
      x0 += sx
    }
    if (e2 <= dx) {
      err += dx
      y0 += sy
    }
  }
}

// Stamp `rows` scaled up by an integer factor
export function stampScaled(g, rows, x, y, s) {
  rows.forEach((row, j) => [...row].forEach((ch, i) => ch !== '.' && rect(g, x + i * s, y + j * s, s, s, ch)))
}

// Every 4th pixel gets a dot: the shared cover background texture
export function dots(g, ch, step = 4) {
  for (let y = 1; y < g.length; y += step) for (let x = 1 + (Math.floor(y / step) % 2) * 2; x < g[0].length; x += step) rect(g, x, y, 1, 1, ch)
}

// 3x5 glyphs for tiny labels
const G3 = {
  0: ['kkk', 'k.k', 'k.k', 'k.k', 'kkk'],
  1: ['.k.', 'kk.', '.k.', '.k.', 'kkk'],
  3: ['kkk', '..k', '.kk', '..k', 'kkk'],
  B: ['kk.', 'k.k', 'kk.', 'k.k', 'kk.'],
  C: ['.kk', 'k..', 'k..', 'k..', '.kk'],
  E: ['kkk', 'k..', 'kk.', 'k..', 'kkk'],
  L: ['k..', 'k..', 'k..', 'k..', 'kkk'],
  b: ['k..', 'k..', 'kk.', 'k.k', 'kk.'],
  '-': ['...', '...', 'kkk', '...', '...'],
}

export function text3(g, str, x, y, ch = 'k') {
  ;[...str].forEach((c, i) => {
    const glyph = G3[c]
    if (glyph) stamp(g, glyph.map((r) => r.replaceAll('k', ch)), x + i * 4, y)
  })
}
