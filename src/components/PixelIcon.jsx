import { COLORS } from '../art/colors'

// Renders a character grid (see src/art/grid.js) as a crisp inline SVG.
// Pass `label` for meaningful images; without it the icon is decorative (aria-hidden).
function PixelIcon({ rows, size = 32, label, className = '', colors }) {
  const map = colors ? { ...COLORS, ...colors } : COLORS
  const h = rows.length
  const w = Math.max(...rows.map((r) => r.length))
  const rects = []
  rows.forEach((row, y) => {
    // merge horizontal runs of the same color into one rect
    let x = 0
    while (x < row.length) {
      const ch = row[x]
      let end = x + 1
      while (end < row.length && row[end] === ch) end++
      if (map[ch]) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={end - x} height={1} fill={map[ch]} />)
      x = end
    }
  })
  return (
    <svg
      className={`px-icon ${className}`}
      viewBox={`0 0 ${w} ${h}`}
      width={(size * w) / h}
      height={size}
      shapeRendering="crispEdges"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {rects}
    </svg>
  )
}

export default PixelIcon
