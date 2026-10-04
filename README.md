# Nazario Saldaña · Portfolio

Personal site built with React + Vite, deployed for free on GitHub Pages.

## Editing content

Almost everything (bio, interests, the "Now" board, projects, leadership, skills) lives in
[`src/data.js`](src/data.js). Edit it, push to `main`, and the site redeploys automatically.

- **Resume:** replace `public/resume.pdf` (keep the file name).
- **Project media:** set `youtubeId` for a video, or `image` pointing at a file in `public/`.
- **Colors & fonts:** the whole pastel pixel palette lives in [`src/styles/tokens.css`](src/styles/tokens.css).
- **Tabs:** the menu is defined in [`src/tabs.js`](src/tabs.js); routes are in [`src/App.jsx`](src/App.jsx).
  The site uses hash routing (`/#/projects`), so every tab survives a refresh on GitHub Pages.
- **Intro screen:** plays once per browser session ([`src/components/Intro.jsx`](src/components/Intro.jsx));
  skipped automatically when the visitor prefers reduced motion. To see it again, open a new tab or run
  `sessionStorage.removeItem('intro-seen')` in the console.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
