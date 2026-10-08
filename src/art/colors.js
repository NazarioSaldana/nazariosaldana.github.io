// Character -> color for every pixel-art grid. Theme colors point at CSS variables
// (so art follows the palette); a few fixed colors are for things like flags.
export const COLORS = {
  k: 'var(--ink)',
  K: 'var(--muted)',
  w: 'var(--px-white)',
  c: 'var(--px-cream)',
  r: 'var(--px-red)',
  R: 'var(--px-red-strong)',
  y: 'var(--px-lemon)',
  s: 'var(--px-sky)',
  m: 'var(--px-mint)',
  l: 'var(--px-lavender)',
  p: 'var(--px-peach)',
  g: 'var(--px-gb)',
  G: 'var(--px-gb-ink)',
  // fixed colors
  B: '#2f55a4', // blaugrana blue
  A: '#a3214f', // blaugrana garnet
  F: '#3f9a5a', // flag green
  E: '#d4473f', // flag red
  O: '#e8a33a', // gold / orange
  T: '#a77048', // tan / wood
  D: '#6b4a32', // dark brown
  Z: '#8e96a8', // metal grey
}
