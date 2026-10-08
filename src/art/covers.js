// Project cover art: 64x36 grids (16:9), rendered to public/covers/*.png by `npm run art`.
// Shared style: pastel background with a dot texture, ink outlines, one central subject.
import { blank, dots, disc, line, outline, rect, ring, stamp, stampScaled, text3, toRows } from './grid.js'
import { HEART_SM } from './icons.js'

const W = 64
const H = 36

function base(bg, dot) {
  const g = blank(W, H, bg)
  dots(g, dot)
  return g
}

// Wearable tracker: watch with an ECG on its screen, BLE waves
function tracker() {
  const g = base('m', 'w')
  rect(g, 25, 0, 14, H, 'k') // strap
  rect(g, 26, 0, 12, H, 'K')
  for (let y = 2; y < H; y += 4) rect(g, 31, y, 2, 1, 'k') // strap holes
  rect(g, 18, 7, 28, 22, 'k') // case
  rect(g, 19, 8, 26, 20, 'l')
  rect(g, 21, 10, 22, 16, 'k') // screen bezel
  rect(g, 22, 11, 20, 14, 'g')
  stamp(g, HEART_SM, 23, 12)
  const ecg = [[22, 20], [27, 20], [28, 18], [29, 20], [31, 20], [32, 22], [33, 14], [34, 23], [35, 20], [41, 20]]
  ecg.slice(1).forEach(([x, y], i) => line(g, ecg[i][0], ecg[i][1], x, y, 'G'))
  rect(g, 46, 16, 2, 4, 'k') // crown
  // BLE waves
  ;[4, 7, 10].forEach((r) => ring(g, 50, 18, r, 'k', (dx, dy) => dx > 0 && Math.abs(dy) < r * 0.75))
  text3(g, 'BLE', 52, 29)
  return toRows(g)
}

// LC-3b: CPU with bits on one side and assembly listing on the other
function lc3b() {
  const g = base('s', 'w')
  for (let i = 0; i < 6; i++) {
    rect(g, 24 + i * 3, 3, 1, 3, 'Z')
    rect(g, 24 + i * 3, 30, 1, 3, 'Z')
    rect(g, 19, 9 + i * 3, 3, 1, 'Z')
    rect(g, 42, 9 + i * 3, 3, 1, 'Z')
  }
  rect(g, 22, 6, 20, 24, 'k')
  rect(g, 24, 8, 16, 20, 'l')
  outline(g, 24, 8, 16, 20, 'w')
  text3(g, 'LC', 27, 11)
  text3(g, '-3b', 25, 19)
  rect(g, 25, 9, 1, 1, 'y') // pin-1 dot
  // bits
  ;['0101', '1100', '0011', '1010'].forEach((b, j) => text3(g, b, 2 + (j % 2) * 2, 4 + j * 7, j % 2 ? 'K' : 'k'))
  // assembly listing window
  rect(g, 48, 4, 14, 28, 'k')
  rect(g, 49, 5, 12, 26, 'w')
  ;[8, 5, 10, 7, 9, 4, 8, 6].forEach((len, j) => rect(g, 50 + (j % 3 === 1 ? 2 : 0), 7 + j * 3, len - (j % 3 === 1 ? 2 : 0), 1, j % 4 === 0 ? 'R' : 'K'))
  return toRows(g)
}

// ATV: quad bike with a linear actuator on the rear
function atv() {
  const g = base('p', 'w')
  rect(g, 0, 31, W, 5, 'T') // dirt
  for (let x = 2; x < W; x += 6) rect(g, x, 33, 2, 1, 'D')
  rect(g, 0, 30, W, 1, 'k')
  // wheels
  for (const cx of [17, 46]) {
    disc(g, cx, 24, 7, 'k')
    disc(g, cx, 24, 3, 'Z')
    rect(g, cx, 24, 1, 1, 'k')
  }
  // body
  rect(g, 10, 14, 44, 6, 'k')
  rect(g, 11, 15, 42, 4, 'R')
  rect(g, 22, 10, 16, 5, 'k') // seat
  rect(g, 23, 11, 14, 3, 'K')
  rect(g, 8, 12, 10, 3, 'k') // front rack
  line(g, 14, 12, 18, 5, 'k') // handlebar post
  rect(g, 15, 4, 7, 2, 'k')
  // linear actuator on the rear rack
  rect(g, 40, 9, 16, 4, 'k')
  rect(g, 41, 10, 9, 2, 'Z')
  rect(g, 50, 10, 5, 2, 'y') // extending rod
  rect(g, 55, 8, 2, 8, 'k')
  // headlight beam
  rect(g, 6, 15, 3, 2, 'y')
  return toRows(g)
}

// Space Invaders: alien over a breadboard with the LCD and slide pot
const INVADER = ['..k.....k..', '...k...k...', '..kkkkkkk..', '.kk.kkk.kk.', 'kkkkkkkkkkk', 'k.kkkkkkk.k', 'k.k.....k.k', '...kk.kk...']
const SHIP = ['...k...', '..kkk..', 'kkkkkkk']

function invaders() {
  const g = base('l', 'w')
  stampScaled(g, INVADER, 21, 2, 2)
  // breadboard
  rect(g, 6, 22, 52, 12, 'k')
  rect(g, 7, 23, 50, 10, 'w')
  for (let x = 9; x < 56; x += 2) {
    rect(g, x, 24, 1, 1, 'Z')
    rect(g, x, 31, 1, 1, 'Z')
  }
  // LCD showing the player's ship
  rect(g, 10, 25, 14, 6, 'k')
  rect(g, 11, 26, 12, 4, 'k')
  stamp(g, SHIP.map((r) => r.replaceAll('k', 'g')), 14, 27)
  // microcontroller
  rect(g, 28, 25, 12, 6, 'k')
  for (let x = 29; x < 40; x += 2) rect(g, x, 24, 1, 1, 'k')
  rect(g, 29, 26, 2, 1, 'Z')
  // slide potentiometer
  rect(g, 44, 27, 11, 2, 'K')
  rect(g, 48, 25, 3, 6, 'k')
  rect(g, 49, 26, 1, 4, 'R')
  // laser
  rect(g, 31, 19, 1, 2, 'R')
  rect(g, 31, 15, 1, 2, 'R')
  return toRows(g)
}

export const COVERS = {
  tracker: tracker(),
  lc3b: lc3b(),
  atv: atv(),
  invaders: invaders(),
}
