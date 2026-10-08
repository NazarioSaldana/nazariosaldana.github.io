// Sprite sheet + animation config for the walking cat.
//
// To use your own artwork: put a PNG sprite sheet in public/sprites/, point `sheet` at it,
// and set the frame size and one row per state below. Frames in a row are laid out
// left to right; the art should face right (it's mirrored when walking left).
// The default sheet (cat-default.png) is generated from src/art/cat.js by `npm run art`.
const catConfig = {
  sheet: 'sprites/cat-default.png', // relative to public/
  frameWidth: 24, // px, in the sheet
  frameHeight: 16,
  scale: 3, // on-screen size = frame size x scale (kept crisp with pixelated rendering)
  states: {
    idle: { row: 0, frames: 2, fps: 1.5 },
    walk: { row: 1, frames: 4, fps: 8 },
    sleep: { row: 2, frames: 2, fps: 1 },
  },
  speed: 160, // px per second while following the cursor
  stopDistance: 12, // px; closer than this and the cat stops walking
  sleepAfter: 8000, // ms without pointer movement before it curls up
}

export default catConfig
