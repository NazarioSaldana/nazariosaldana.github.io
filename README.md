# Nazario Saldaña · Portfolio

Personal site built with React + Vite, deployed for free on GitHub Pages.

## Editing content

Almost everything (bio, interests, the "Now" board, projects, leadership, skills) lives in
[`src/data.js`](src/data.js). Edit it, push to `main`, and the site redeploys automatically.

- **Resume:** replace `public/resume.pdf` (keep the file name).
- **Project media:** `image` is the card cover (in `public/covers/`); add `youtubeId` for a video, which also shows the ▶ overlay.
- **Status monitor:** the BPM and coffee counter are in `monitor` in `data.js`; the "Currently …" line cycles the `now` board.
- **Colors & fonts:** the whole pastel pixel palette lives in [`src/styles/tokens.css`](src/styles/tokens.css).
  Run `npm run contrast` after changing colors to check every text/background pair against WCAG AA.
- **Tabs:** the menu is defined in [`src/tabs.js`](src/tabs.js); routes are in [`src/App.jsx`](src/App.jsx).
  The site uses hash routing (`/#/projects`), so every tab survives a refresh on GitHub Pages.
- **Intro screen:** plays once per browser session ([`src/components/Intro.jsx`](src/components/Intro.jsx));
  skipped automatically when the visitor prefers reduced motion. To see it again, open a new tab or run
  `sessionStorage.removeItem('intro-seen')` in the console.

## Pixel art

All art is original and lives as character grids in [`src/art/`](src/art) (logo, icons, project covers,
cat frames). Small icons render as inline SVG via `<PixelIcon>`. Files in `public/` (favicons, covers,
cat sprite sheet) are generated with:

```bash
npm run art            # everything
npm run art -- covers  # or just: icons | covers | cat
```

It has no dependencies (PNG/ICO encoding uses Node's zlib) and reads colors from `tokens.css`.

**The cat:** [`src/components/Cat/cat.config.js`](src/components/Cat/cat.config.js) points at the sprite
sheet and describes each state (`idle`, `walk`, `sleep`) as a row of frames. To use your own artwork,
drop a PNG in `public/sprites/` and update the config; `npm run art` never overwrites it.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

Add `?rm=1` before the `#` in a dev URL (e.g. `http://localhost:5173/?rm=1#/`) to preview the
reduced-motion experience.

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
