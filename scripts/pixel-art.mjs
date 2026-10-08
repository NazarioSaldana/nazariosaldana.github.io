// Renders the site's pixel art (src/art/*.js) to PNG/ICO files in public/.
// Zero dependencies: PNGs are encoded with Node's built-in zlib.
//
//   npm run art
//
// Theme colors are read from src/styles/tokens.css, so re-run this after changing the palette.
// The generated files are committed; CI never needs to run this.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateSync } from 'node:zlib'
import { COLORS } from '../src/art/colors.js'
import { CAT_FRAMES } from '../src/art/cat.js'
import { COVERS } from '../src/art/covers.js'
import catConfig from '../src/components/Cat/cat.config.js'
import { LOGO } from '../src/art/logos.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const out = (p) => join(root, 'public', p)

// ---------- colors ----------
const tokens = readFileSync(join(root, 'src/styles/tokens.css'), 'utf8')
const vars = Object.fromEntries([...tokens.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]))

function rgba(color) {
  const v = color.match(/^var\(--([\w-]+)\)$/)
  const hex = v ? vars[v[1]] : color
  if (!hex) throw new Error(`Unknown color ${color}`)
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16)).concat(255)
}

// ---------- rasterize ----------
// Draws `rows` scaled by `scale` onto a w x h canvas at (ox, oy), over an optional background.
export function render(rows, { scale = 1, w, h, ox = 0, oy = 0, bg = null, colors = COLORS } = {}) {
  w ??= rows[0].length * scale
  h ??= rows.length * scale
  const px = new Uint8Array(w * h * 4)
  if (bg) {
    const c = rgba(bg)
    for (let i = 0; i < w * h; i++) px.set(c, i * 4)
  }
  rows.forEach((row, y) => {
    ;[...row].forEach((ch, x) => {
      if (!colors[ch]) return
      const c = rgba(colors[ch])
      for (let dy = 0; dy < scale; dy++)
        for (let dx = 0; dx < scale; dx++) {
          const X = ox + x * scale + dx
          const Y = oy + y * scale + dy
          if (X >= 0 && X < w && Y >= 0 && Y < h) px.set(c, (Y * w + X) * 4)
        }
    })
  })
  return { w, h, px }
}

// ---------- PNG ----------
const CRC = new Int32Array(256).map((_, n) => {
  let c = n
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
  return c
})
function crc32(buf) {
  let c = -1
  for (const b of buf) c = CRC[(c ^ b) & 0xff] ^ (c >>> 8)
  return (c ^ -1) >>> 0
}
function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const td = Buffer.concat([Buffer.from(type), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(td))
  return Buffer.concat([len, td, crc])
}
export function png({ w, h, px }) {
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0)
  ihdr.writeUInt32BE(h, 4)
  ihdr.set([8, 6, 0, 0, 0], 8) // 8-bit RGBA
  const raw = Buffer.alloc((w * 4 + 1) * h)
  for (let y = 0; y < h; y++) {
    raw[y * (w * 4 + 1)] = 0 // filter: none
    raw.set(px.subarray(y * w * 4, (y + 1) * w * 4), y * (w * 4 + 1) + 1)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// ICO with embedded PNG images (supported by every current browser)
function ico(images) {
  const head = Buffer.alloc(6 + 16 * images.length)
  head.writeUInt16LE(1, 2)
  head.writeUInt16LE(images.length, 4)
  let offset = head.length
  images.forEach(({ size, data }, i) => {
    const e = 6 + 16 * i
    head[e] = size % 256
    head[e + 1] = size % 256
    head.writeUInt16LE(1, e + 4)
    head.writeUInt16LE(32, e + 6)
    head.writeUInt32LE(data.length, e + 8)
    head.writeUInt32LE(offset, e + 12)
    offset += data.length
  })
  return Buffer.concat([head, ...images.map((i) => i.data)])
}

function write(path, buf) {
  mkdirSync(dirname(out(path)), { recursive: true })
  writeFileSync(out(path), buf)
  console.log(`${path.padEnd(28)} ${String(buf.length).padStart(6)} bytes`)
}

// ---------- targets ----------
function icons() {
  const logoPng = (scale) => png(render(LOGO, { scale }))
  // Big icons sit on the cream background with padding (iOS/Android dislike transparency)
  const padded = (size, scale) => {
    const art = LOGO.length * scale
    const o = Math.floor((size - art) / 2)
    return png(render(LOGO, { scale, w: size, h: size, ox: o, oy: o, bg: 'var(--px-cream)' }))
  }
  const p16 = logoPng(1)
  const p32 = logoPng(2)
  write('favicon.ico', ico([{ size: 16, data: p16 }, { size: 32, data: p32 }]))
  write('icons/icon-16.png', p16)
  write('icons/icon-32.png', p32)
  write('icons/apple-touch-icon.png', padded(180, 10))
  write('icons/icon-192.png', padded(192, 10))
  write('icons/icon-512.png', padded(512, 28))
}

// Project covers: 64x36 art at 4x (256x144) so they stay crisp even where
// image-rendering: pixelated isn't applied (link previews, etc.)
function covers() {
  for (const [id, rows] of Object.entries(COVERS)) write(`covers/${id}.png`, png(render(rows, { scale: 4 })))
}

// Cat sprite sheet: one row per state, frames left to right (layout from cat.config.js)
function cat() {
  const { frameWidth: fw, frameHeight: fh, states } = catConfig
  const rows = Object.values(states).reduce((m, s) => Math.max(m, s.row + 1), 0)
  const cols = Object.values(states).reduce((m, s) => Math.max(m, s.frames), 0)
  const w = cols * fw
  const h = rows * fh
  const sheet = { w, h, px: new Uint8Array(w * h * 4) }
  for (const [name, s] of Object.entries(states)) {
    CAT_FRAMES[name].slice(0, s.frames).forEach((frame, i) => {
      const { px } = render(frame, { w: fw, h: fh })
      for (let y = 0; y < fh; y++) sheet.px.set(px.subarray(y * fw * 4, (y + 1) * fw * 4), ((s.row * fh + y) * w + i * fw) * 4)
    })
  }
  write('sprites/cat-default.png', png(sheet))
}

const targets = { icons, covers, cat }
const wanted = process.argv.slice(2)
for (const [name, fn] of Object.entries(targets)) if (!wanted.length || wanted.includes(name)) fn()
