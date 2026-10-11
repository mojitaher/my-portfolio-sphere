# My Portfolio Sphere

A lightweight, responsive 3D project portfolio built with React, TypeScript, Vite, GSAP and CSS Modules.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The static production site is generated in `dist/`.

## Add your projects

Edit `src/data/projects.ts`. Each project has a typed shape in `src/types/project.types.ts`:

- `title`, `category`, `year`, `description`
- `technologies`
- `image` (prefer a compressed image you own)
- `accent`
- `liveUrl` and `sourceUrl`

The project modal opens when a card is selected. Replace the example `hello@example.com` email in `src/App.tsx` and update the GitHub/profile links before publishing.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite** (usually detected automatically).
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Deploy.

No backend or environment variables are required for this demo.
