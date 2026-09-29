# Nazario Saldaña · Portfolio

Personal site built with React + Vite, deployed for free on GitHub Pages.

## Editing content

Almost everything (bio, interests, the "Now" board, projects, leadership, skills) lives in
[`src/data.js`](src/data.js). Edit it, push to `main`, and the site redeploys automatically.

- **Resume:** replace `public/resume.pdf` (keep the file name).
- **Project media:** set `youtubeId` for a video, or `image` pointing at a file in `public/`.

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
```

## Deployment

`.github/workflows/deploy.yml` builds the site and publishes it to GitHub Pages on every push to `main`.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
