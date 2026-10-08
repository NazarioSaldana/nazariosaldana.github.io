// Default sprite frames for the walking cat (a tuxedo cat like Socks), facing right.
// 24x16 per frame. `npm run art` packs these into public/sprites/cat-default.png using the
// rows/frames layout in src/components/Cat/cat.config.js.
import { blank, rect, stamp, toRows } from './grid.js'

// Standing body without legs or tail; m = eyes, w = white blaze/chest, r = nose
const BODY = [
  '................k...k...',
  '...............kk..kk...',
  '...............kkkkkk...',
  '..............kkkkkkkk..',
  '..............kkmkkmkk..',
  '..............kkkkkkkkk.',
  '..............kkkwwrwwk.',
  '.....kkkkkkkkkkkkwwwwk..',
  '....kkkkkkkkkkkkkkwwk...',
  '....kkkkkkkkkkkkkwwwk...',
  '....kkkkkkkkkkkkwwwk....',
  '....kkkkkkkkkkkkkwwk....',
]

const TAIL_UP = ['..k', '.kk', '.k.', '.k.', '.k.', '.kk', '..k']
const TAIL_SWISH = ['k..', 'kk.', '.k.', '.k.', '.k.', '.kk', '..k']

// Two-pixel-wide legs at the given x positions, with white paws
function legs(g, xs) {
  for (const x of xs) {
    rect(g, x, 12, 2, 2, 'k')
    rect(g, x, 14, 2, 1, 'w')
  }
}

function standing({ legXs = [4, 7, 15, 18], tail = TAIL_UP, blink = false, bob = 0 } = {}) {
  const g = blank(24, 16)
  stamp(g, BODY, 0, bob)
  stamp(g, tail, 1, 2 + bob)
  legs(g, legXs)
  if (blink) {
    rect(g, 16, 4 + bob, 1, 1, 'k')
    rect(g, 19, 4 + bob, 1, 1, 'k')
  }
  return toRows(g)
}

const SLEEP = [
  '........................',
  '........................',
  '........................',
  '........................',
  '........................',
  '........................',
  '........................',
  '...............k...k....',
  '..............kk..kk....',
  '......kkkkkkkkkkkkkkk...',
  '....kkkkkkkkkkkkkkkkkk..',
  '...kkkkkkkkkkkkkKKkKKk..',
  '..kkkkkkkkkkkkkkkkwrwk..',
  '..kkkkkkkkkkkkkkkwwwwk..',
  '.kkkwwkkkkkkkkkkwwkkk...',
  '..kkkkkkkkkkkkkkkkkk....',
]

// One pixel taller on the "inhale" frame
function breathe(rows) {
  const g = rows.map((r) => [...r])
  for (let y = 9; y < 14; y++) g[y - 1] = [...rows[y]]
  return toRows(g)
}

export const CAT_FRAMES = {
  idle: [standing(), standing({ blink: true, tail: TAIL_SWISH })],
  walk: [
    standing({ legXs: [3, 8, 14, 19] }),
    standing({ legXs: [4, 7, 15, 18], tail: TAIL_SWISH, bob: 0 }),
    standing({ legXs: [5, 6, 16, 17] }),
    standing({ legXs: [4, 7, 15, 18], tail: TAIL_SWISH }),
  ],
  sleep: [SLEEP, breathe(SLEEP)],
}
