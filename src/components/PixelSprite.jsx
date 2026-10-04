// Draws tiny pixel art with a single div + box-shadow: one shadow per filled pixel.
// `rows` uses one character per pixel; each character maps to a CSS color in `palette`
// ('.' or ' ' = transparent).
function PixelSprite({ rows, palette, size = 4, className = '', label }) {
  const shadows = []
  rows.forEach((row, y) => {
    ;[...row].forEach((ch, x) => {
      const color = palette[ch]
      if (color) shadows.push(`${(x + 1) * size}px ${(y + 1) * size}px 0 ${color}`)
    })
  })
  const w = Math.max(...rows.map((r) => r.length))
  return (
    <span
      className={`sprite ${className}`}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      style={{ width: (w + 1) * size, height: (rows.length + 1) * size }}
    >
      <span style={{ width: size, height: size, boxShadow: shadows.join(','), marginLeft: -size, marginTop: -size }} />
    </span>
  )
}

export default PixelSprite
