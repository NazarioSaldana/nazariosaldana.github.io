// Candidate palettes for the lab preview. Keys match the CSS variables in src/styles/tokens.css.
export const PALETTES = {
  current: {
    name: 'Current',
    note: 'What ships today, for comparison.',
    vars: {
      'px-cream': '#fff8e7', 'px-cream-2': '#f6ecd2', 'px-white': '#ffffff',
      'px-red': '#f7b2b2', 'px-red-strong': '#e0606e', 'px-mint': '#bfe8cf', 'px-sky': '#b4dcf2',
      'px-lemon': '#ffe89a', 'px-lavender': '#d6c8f2', 'px-peach': '#ffd2b0', 'px-gb': '#cfe3a6', 'px-gb-ink': '#2f4a2f',
      ink: '#2b2b3a', muted: '#545468', 'accent-text': '#922a3f', focus: '#2f62c9',
    },
  },
  pallet: {
    name: 'Pallet (recommended)',
    note: 'A refresh of today: warmer cream, juicier pastels, same personality.',
    vars: {
      'px-cream': '#fff6e5', 'px-cream-2': '#f5e9cf', 'px-white': '#ffffff',
      'px-red': '#f6a6a6', 'px-red-strong': '#e05a6a', 'px-mint': '#a8e2c4', 'px-sky': '#a7d3f5',
      'px-lemon': '#ffe38a', 'px-lavender': '#cfc0f5', 'px-peach': '#ffc9a3', 'px-gb': '#cde5a1', 'px-gb-ink': '#2d4a2d',
      ink: '#2a2838', muted: '#524f64', 'accent-text': '#8f2b3f', focus: '#2c5fc7',
    },
  },
  cerulean: {
    name: 'Cerulean',
    note: 'Cooler and airier: icy background, pink + sky leads.',
    vars: {
      'px-cream': '#f4f8ff', 'px-cream-2': '#e4ecf9', 'px-white': '#ffffff',
      'px-red': '#ffc4d6', 'px-red-strong': '#e2638c', 'px-mint': '#b5ead7', 'px-sky': '#9fd0f7',
      'px-lemon': '#fff1a8', 'px-lavender': '#d8c8ff', 'px-peach': '#ffd8be', 'px-gb': '#c8e6c0', 'px-gb-ink': '#24452e',
      ink: '#263049', muted: '#46516c', 'accent-text': '#8a2d52', focus: '#2b5fc9',
    },
  },
  sunset: {
    name: 'Sunset',
    note: 'Warmer: blush background, coral + mauve leads, plum ink.',
    vars: {
      'px-cream': '#fff4f0', 'px-cream-2': '#f8e4dc', 'px-white': '#ffffff',
      'px-red': '#ffb4a2', 'px-red-strong': '#e46a54', 'px-mint': '#c7e3be', 'px-sky': '#bfd9f2',
      'px-lemon': '#ffe7a3', 'px-lavender': '#e5c1e5', 'px-peach': '#ffcdb2', 'px-gb': '#d6e5b0', 'px-gb-ink': '#3b4a2a',
      ink: '#3a2e3f', muted: '#5c4d5e', 'accent-text': '#93321f', focus: '#2d5bc0',
    },
  },
}

export function luminance(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const [r, g, b] = c.map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m)
  return (x + 0.05) / (y + 0.05)
}

// Text/background pairs the site actually uses, with the minimum each needs
export const PAIRS = [
  ['ink', 'px-cream', 4.5], ['ink', 'px-red', 4.5], ['ink', 'px-sky', 4.5], ['ink', 'px-lavender', 4.5],
  ['muted', 'px-cream', 4.5], ['muted', 'px-cream-2', 4.5], ['muted', 'px-white', 4.5], ['muted', 'px-sky', 4.5],
  ['accent-text', 'px-cream', 4.5], ['accent-text', 'px-white', 4.5], ['accent-text', 'px-lavender', 4.5],
  ['accent-text', 'px-lemon', 4.5], ['px-gb-ink', 'px-gb', 4.5], ['focus', 'px-cream', 3],
]
