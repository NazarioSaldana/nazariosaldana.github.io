// Original pixel-art icons that replace emoji across the site.
// Each entry: { rows, label } where `label` is the alt text.
import { blank, outline, rect, toRows } from './grid.js'

function flag() {
  const g = blank(16, 12)
  rect(g, 1, 1, 5, 10, 'F')
  rect(g, 6, 1, 4, 10, 'w')
  rect(g, 10, 1, 5, 10, 'E')
  rect(g, 7, 5, 2, 2, 'T') // simple center mark, not the coat of arms
  outline(g, 0, 0, 16, 12, 'k')
  return toRows(g)
}

const SCREWDRIVER = [
  '..............kk',
  '.............kZk',
  '............kZk.',
  '...........kZk..',
  '..........kZk...',
  '.........kZk....',
  '........kZk.....',
  '......kkZk......',
  '.....kRkk.......',
  '....kRRRk.......',
  '...kRRRk........',
  '..kRwRk.........',
  '.kRwRk..........',
  'kRRRk...........',
  'kRRk............',
  '.kk.............',
]

const INVADER = [
  '..k.....k..',
  '...k...k...',
  '..kkkkkkk..',
  '.kk.kkk.kk.',
  'kkkkkkkkkkk',
  'k.kkkkkkk.k',
  'k.k.....k.k',
  '...kk.kk...',
]

const HAND_HEART = [
  '................',
  '.....kk.kk......',
  '....kRRkRRk.....',
  '....kRwRRRk.....',
  '.....kRRRk......',
  '......kRk.......',
  '.......k........',
  '................',
  '.kk..........kk.',
  '.kpk........kpk.',
  '.kppkkkkkkkkppk.',
  '..kppppppppppk..',
  '...kppppppppk...',
  '....kkkkkkkk....',
]

const HAT = [
  '.....kkkkkk.....',
  '....kTTTTTTk....',
  '....kTTDDTTk....',
  '....kTTTTTTk....',
  '....kDDDDDDk....',
  '.kk.kTTTTTTk.kk.',
  'kTTkkTTTTTTkkTTk',
  'kTTTTTTTTTTTTTTk',
  '.kkTTTTTTTTTTkk.',
  '...kkkkkkkkkk...',
]

const PIN = [
  '..kkkkkk..',
  '.kRRRRRRk.',
  'kRRRwwRRRk',
  'kRRwwwwRRk',
  'kRRwwwwRRk',
  'kRRRwwRRRk',
  '.kRRRRRRk.',
  '.kRRRRRRk.',
  '..kRRRRk..',
  '..kRRRRk..',
  '...kRRk...',
  '...kRRk...',
  '....kk....',
]

function gradCap() {
  const g = blank(16, 12)
  // diamond-shaped board
  const widths = [2, 6, 10, 14, 10, 6, 2]
  widths.forEach((w, y) => {
    const x = 8 - w / 2
    rect(g, x, y, w, 1, 'K')
    rect(g, x, y, 1, 1, 'k')
    rect(g, x + w - 1, y, 1, 1, 'k')
  })
  rect(g, 4, 5, 8, 5, 'k') // cap
  rect(g, 5, 6, 6, 3, 'K')
  rect(g, 8, 3, 6, 1, 'y') // tassel cord
  rect(g, 13, 3, 1, 6, 'y')
  rect(g, 12, 9, 3, 2, 'y')
  return toRows(g)
}

const MEDAL = [
  'kkkk....kkkk',
  'kssk....krrk',
  '.kssk..krrk.',
  '..ksskkrrk..',
  '...kskkrk...',
  '....kkkk....',
  '..kkyyyykk..',
  '.kyywyyyyyk.',
  '.kywyyOyyyk.',
  'kyyyyOOOyyyk',
  'kyyyOOOOOyyk',
  'kyyyyOOOyyyk',
  '.kyyyOyOyyk.',
  '.kyyyyyyyyk.',
  '..kkyyyykk..',
  '....kkkk....',
]

export const HEART_SM = ['.kk.kk.', 'kRRkRRk', 'kRwRRRk', '.kRRRk.', '..kRk..', '...k...']

export const CLOSE = ['kk....kk', 'kkk..kkk', '.kkkkkk.', '..kkkk..', '..kkkk..', '.kkkkkk.', 'kkk..kkk', 'kk....kk']

export const SPARKLE = ['...k...', '..kRk..', '.kRRRk.', 'kRRRRRk', '.kRRRk.', '..kRk..', '...k...']

export const PLAY = [
  'kkkkkkkkkkkkkk',
  'kyyyyyyyyyyyyk',
  'kyyykyyyyyyyyk',
  'kyyykkyyyyyyyk',
  'kyyykkkyyyyyyk',
  'kyyykkkkyyyyyk',
  'kyyykkkkkyyyyk',
  'kyyykkkkyyyyyk',
  'kyyykkkyyyyyyk',
  'kyyykkyyyyyyyk',
  'kyyykyyyyyyyyk',
  'kyyyyyyyyyyyyk',
  'kkkkkkkkkkkkkk',
]

export const ICONS = {
  flag: { rows: flag(), label: 'Pixel green, white, and red tricolor flag' },
  screwdriver: { rows: SCREWDRIVER, label: 'Pixel screwdriver' },
  invader: { rows: INVADER, label: 'Pixel space invader' },
  handHeart: { rows: HAND_HEART, label: 'Pixel hand holding a heart' },
  hat: { rows: HAT, label: 'Pixel cowboy hat' },
  pin: { rows: PIN, label: 'Map pin' },
  cap: { rows: gradCap(), label: 'Graduation cap' },
  medal: { rows: MEDAL, label: 'Medal' },
  heart: { rows: HEART_SM, label: 'Heart' },
  close: { rows: CLOSE, label: 'Close' },
  sparkle: { rows: SPARKLE, label: 'Sparkle' },
  play: { rows: PLAY, label: 'Play' },
}
