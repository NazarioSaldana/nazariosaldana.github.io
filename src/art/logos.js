import { FONT, blank, mirror, outline, rect, stamp, toRows } from './grid.js'

// A: "NS" monogram in a dialogue box with a hard shadow
function monogram() {
  const g = blank(16, 16)
  rect(g, 1, 1, 15, 15, 'k') // shadow
  rect(g, 0, 0, 15, 15, 'k')
  rect(g, 1, 1, 13, 13, 'y')
  stamp(g, FONT.N, 3, 4)
  stamp(g, FONT.S, 8, 4)
  return toRows(g)
}

// B: pixel heart with an ECG blip running through it
const heartEcg = [
  '..kkkk....kkkk..',
  '.krrrrk..krrrrk.',
  'krrwwrrkkrrrrrrk',
  'krwrrrrrrrrrrrrk',
  'krrrrrrrrrrrrrrk',
  'krrrrrrrkrrrrrrk',
  'kkkkkrrkrkrrrrrk',
  'krrrrkkrrkrkkkkk',
  '.krrrrrrrkkrrrk.',
  '..krrrrrrrrrrk..',
  '...krrrrrrrrk...',
  '....krrrrrrk....',
  '.....krrrrk.....',
  '......krrk......',
  '.......kk.......',
  '................',
]

// C: microchip with "ns" on the die
function chip() {
  const g = blank(16, 16)
  for (let i = 3; i <= 12; i += 3) {
    rect(g, i, 0, 1, 2, 'Z')
    rect(g, i, 14, 1, 2, 'Z')
    rect(g, 0, i, 2, 1, 'Z')
    rect(g, 14, i, 2, 1, 'Z')
  }
  rect(g, 2, 2, 12, 12, 'k')
  rect(g, 3, 3, 10, 10, 's')
  outline(g, 3, 3, 10, 10, 'l')
  stamp(g, FONT.n3, 4, 6)
  stamp(g, FONT.s3, 9, 6)
  rect(g, 4, 4, 1, 1, 'w') // pin-1 dot
  return toRows(g)
}

// D: tuxedo cat face (a nod to Socks): black head, white blaze and muzzle
const catFace = mirror([
  '.kk.....',
  '.kkk....',
  '.krkk...',
  '.krrkkkk',
  'kkkkkkkk',
  'kkkkkkkk',
  'kkmmkkkk',
  'kkmkkkkw',
  'kkkkkkww',
  'kkkkkwwr',
  'kkkkwwww',
  '.kkkwwww',
  '..kkkwww',
  '...kkkkk',
  '...kwwww',
  '...kwwww',
])

export const LOGOS = {
  monogram: { name: 'A · NS monogram', rows: monogram() },
  heart: { name: 'B · Heart + ECG', rows: heartEcg },
  chip: { name: 'C · NS chip', rows: chip() },
  cat: { name: 'D · Tuxedo cat', rows: catFace },
}

// The chosen site logo (header + favicon)
export const LOGO = LOGOS.cat.rows
