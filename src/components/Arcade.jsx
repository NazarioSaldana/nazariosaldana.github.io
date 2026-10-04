import { useCallback, useEffect, useRef, useState } from 'react'

// Logical canvas size (scaled with CSS), matches the 4:3 feel of the original LCD build
const W = 480
const H = 360
const PX = 2 // size of one sprite "pixel"

const SPRITES = {
  crab: [
    '00100000100',
    '00010001000',
    '00111111100',
    '01101110110',
    '11111111111',
    '10111111101',
    '10100000101',
    '00011011000',
  ],
  squid: [
    '00001100000',
    '00011110000',
    '00111111000',
    '01101101100',
    '01111111100',
    '00100100100',
    '01011011010',
    '10100000101',
  ],
  ship: [
    '00000100000',
    '00001110000',
    '00001110000',
    '01111111110',
    '11111111111',
    '11111111111',
  ],
}
const SPRITE_W = 11 * PX
const ALIEN_H = 8 * PX
const SHIP_H = 6 * PX
const ROWS = 4
const COLS = 8
const PLAYER_Y = H - 40

function drawSprite(ctx, sprite, x, y, color) {
  ctx.fillStyle = color
  for (let r = 0; r < sprite.length; r++) {
    for (let c = 0; c < sprite[r].length; c++) {
      if (sprite[r][c] === '1') ctx.fillRect(x + c * PX, y + r * PX, PX, PX)
    }
  }
}

function newWave(wave) {
  const aliens = []
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      aliens.push({ x: 60 + c * 44, y: 50 + r * 30, row: r, alive: true })
    }
  }
  return { aliens, dir: 1, baseSpeed: 22 + wave * 8, fireEvery: Math.max(0.45, 1.3 - wave * 0.15), fireT: 1 }
}

function newGame() {
  return {
    ...newWave(1),
    wave: 1,
    score: 0,
    lives: 3,
    player: { x: W / 2 - SPRITE_W / 2, inv: 0 },
    shots: [],
    bombs: [],
    cooldown: 0,
    stars: Array.from({ length: 40 }, () => ({ x: Math.random() * W, y: Math.random() * H, s: Math.random() })),
    frame: 0,
  }
}

const hit = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

function loadBest() {
  try {
    return Number(localStorage.getItem('invaders-best')) || 0
  } catch {
    return 0
  }
}

function Arcade() {
  const canvasRef = useRef(null)
  const game = useRef(null)
  const keys = useRef({ left: false, right: false, fire: false })
  const [status, setStatus] = useState('idle') // idle | playing | over
  const [hud, setHud] = useState({ score: 0, lives: 3, wave: 1 })
  const [best, setBest] = useState(loadBest)

  const start = useCallback(() => {
    game.current = newGame()
    setHud({ score: 0, lives: 3, wave: 1 })
    setStatus('playing')
    canvasRef.current?.focus({ preventScroll: true })
  }, [])

  // Keyboard: only captured while a game is running, so the page scrolls normally otherwise
  useEffect(() => {
    if (status !== 'playing') return
    const map = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right', ' ': 'fire', ArrowUp: 'fire' }
    const down = (e) => {
      const k = map[e.key]
      if (k) {
        keys.current[k] = true
        e.preventDefault()
      }
    }
    const up = (e) => {
      const k = map[e.key]
      if (k) keys.current[k] = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      keys.current = { left: false, right: false, fire: false }
    }
  }, [status])

  // Game loop + rendering
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let last = performance.now()

    const colors = () => {
      const cs = getComputedStyle(canvas)
      return {
        bg: cs.getPropertyValue('--game-bg').trim(),
        ink: cs.getPropertyValue('--game-ink').trim(),
        a: cs.getPropertyValue('--blue').trim(),
        b: cs.getPropertyValue('--garnet').trim(),
        gold: cs.getPropertyValue('--gold').trim(),
      }
    }

    const update = (g, dt) => {
      g.frame += dt
      const k = keys.current
      const p = g.player
      if (k.left) p.x -= 230 * dt
      if (k.right) p.x += 230 * dt
      p.x = Math.max(8, Math.min(W - SPRITE_W - 8, p.x))
      p.inv = Math.max(0, p.inv - dt)

      g.cooldown -= dt
      if (k.fire && g.cooldown <= 0) {
        g.shots.push({ x: p.x + SPRITE_W / 2 - 1, y: PLAYER_Y - 8, w: 3, h: 10 })
        g.cooldown = 0.38
      }
      g.shots.forEach((s) => (s.y -= 420 * dt))
      g.shots = g.shots.filter((s) => s.y > -12)

      // Aliens speed up as their numbers drop, just like the original
      const alive = g.aliens.filter((a) => a.alive)
      const speed = g.baseSpeed * (1 + (ROWS * COLS - alive.length) / 10)
      let edge = false
      alive.forEach((a) => {
        a.x += g.dir * speed * dt
        if (a.x < 8 || a.x + SPRITE_W > W - 8) edge = true
      })
      if (edge) {
        g.dir *= -1
        alive.forEach((a) => {
          a.x += g.dir * speed * dt
          a.y += 14
        })
      }

      // Bottom-most alien in a random column drops a bomb
      g.fireT -= dt
      if (g.fireT <= 0 && alive.length) {
        const shooter = alive[Math.floor(Math.random() * alive.length)]
        const lowest = alive
          .filter((a) => Math.abs(a.x - shooter.x) < 4)
          .reduce((m, a) => (a.y > m.y ? a : m), shooter)
        g.bombs.push({ x: lowest.x + SPRITE_W / 2 - 1, y: lowest.y + ALIEN_H, w: 3, h: 9 })
        g.fireT = g.fireEvery * (0.6 + Math.random() * 0.8)
      }
      g.bombs.forEach((b) => (b.y += 170 * dt))
      g.bombs = g.bombs.filter((b) => b.y < H)

      // Collisions: shots vs aliens
      g.shots.forEach((s) => {
        for (const a of alive) {
          if (a.alive && hit(s, { x: a.x, y: a.y, w: SPRITE_W, h: ALIEN_H })) {
            a.alive = false
            s.y = -100
            g.score += [30, 20, 10, 10][a.row]
            break
          }
        }
      })

      // Bombs vs player
      const pBox = { x: p.x, y: PLAYER_Y, w: SPRITE_W, h: SHIP_H }
      if (p.inv === 0) {
        for (const b of g.bombs) {
          if (hit(b, pBox)) {
            b.y = H + 10
            g.lives -= 1
            p.inv = 1.5
            break
          }
        }
      }

      const invaded = alive.some((a) => a.y + ALIEN_H >= PLAYER_Y - 4)
      if (g.lives <= 0 || invaded) return 'over'

      if (alive.every((a) => !a.alive)) {
        g.wave += 1
        g.score += 100
        Object.assign(g, newWave(g.wave), { shots: [], bombs: [] })
      }
      return 'playing'
    }

    const draw = (g, c) => {
      ctx.fillStyle = c.bg
      ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = c.ink
      g.stars.forEach((s) => {
        ctx.globalAlpha = 0.15 + s.s * 0.35
        ctx.fillRect(s.x, (s.y + g.frame * (6 + s.s * 10)) % H, 1.5, 1.5)
      })
      ctx.globalAlpha = 1

      const flap = Math.floor(g.frame * 2.5) % 2 === 0
      g.aliens.forEach((a) => {
        if (!a.alive) return
        const sprite = a.row === 0 ? SPRITES.squid : SPRITES.crab
        const color = a.row === 0 ? c.gold : a.row % 2 ? c.b : c.a
        drawSprite(ctx, sprite, a.x, a.y + (flap ? 0 : 1), color)
      })

      const p = g.player
      if (p.inv === 0 || Math.floor(p.inv * 10) % 2 === 0) drawSprite(ctx, SPRITES.ship, p.x, PLAYER_Y, c.ink)

      ctx.fillStyle = c.ink
      g.shots.forEach((s) => ctx.fillRect(s.x, s.y, s.w, s.h))
      ctx.fillStyle = c.b
      g.bombs.forEach((b) => ctx.fillRect(b.x + (Math.floor(b.y / 6) % 2), b.y, b.w, b.h))

      ctx.fillStyle = c.ink
      ctx.globalAlpha = 0.25
      ctx.fillRect(0, H - 18, W, 1)
      ctx.globalAlpha = 1
    }

    // Idle screen: a demo formation marching around behind the start button
    const idle = newGame()

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const c = colors()
      if (status === 'playing' && game.current) {
        const g = game.current
        const next = update(g, dt)
        draw(g, c)
        setHud((h) =>
          h.score === g.score && h.lives === g.lives && h.wave === g.wave
            ? h
            : { score: g.score, lives: g.lives, wave: g.wave },
        )
        if (next === 'over') {
          setStatus('over')
          setBest((b) => {
            const nb = Math.max(b, g.score)
            try {
              localStorage.setItem('invaders-best', String(nb))
            } catch {
              // ignore
            }
            return nb
          })
          return
        }
      } else if (status === 'idle') {
        idle.frame += dt
        idle.aliens.forEach((a) => (a.x += Math.sin(idle.frame) * 20 * dt))
        draw(idle, c)
      } else if (game.current) {
        draw(game.current, c)
        return
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [status])

  const hold = (k) => ({
    onPointerDown: (e) => {
      e.preventDefault()
      keys.current[k] = true
    },
    onPointerUp: () => (keys.current[k] = false),
    onPointerLeave: () => (keys.current[k] = false),
    onPointerCancel: () => (keys.current[k] = false),
  })

  return (
    <section id="arcade" className="section section--tinted">
      <div className="wrap">
        <div className="section__head">
          <p className="kicker">arcade</p>
          <h1 tabIndex={-1}>Insert coin</h1>
          <p className="section__sub">
            I originally built Space Invaders in C on an MSPM0 microcontroller with a 128×160 LCD. This is the web
            remake. Beat my score?
          </p>
        </div>

        <div className="arcade">
          <div className="arcade__hud">
            <span>
              SCORE <b>{String(hud.score).padStart(5, '0')}</b>
            </span>
            <span>
              WAVE <b>{hud.wave}</b>
            </span>
            <span>
              LIVES <b>{'♥'.repeat(Math.max(0, hud.lives)) || '–'}</b>
            </span>
            <span>
              BEST <b>{String(best).padStart(5, '0')}</b>
            </span>
          </div>
          <div className="arcade__screen">
            <canvas ref={canvasRef} width={W} height={H} tabIndex={-1} aria-label="Space Invaders game" />
            {status !== 'playing' && (
              <div className="arcade__overlay">
                {status === 'over' && <p className="arcade__over">GAME OVER · {hud.score} pts</p>}
                <button className="btn btn--primary" onClick={start}>
                  {status === 'over' ? '↻ Play again' : '▶ Start game'}
                </button>
                <p className="arcade__keys">
                  <kbd>←</kbd> <kbd>→</kbd> move · <kbd>Space</kbd> fire
                </p>
              </div>
            )}
          </div>
          <div className="arcade__pad">
            <button aria-label="Move left" {...hold('left')}>
              ◀
            </button>
            <button aria-label="Fire" className="arcade__fire" {...hold('fire')}>
              FIRE
            </button>
            <button aria-label="Move right" {...hold('right')}>
              ▶
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Arcade
