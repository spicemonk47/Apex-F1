# APEX — Formula 1 Terminal

A Bloomberg-style Formula 1 terminal with live timing, race-control messages, tyres, weather, season schedules, and championship archive data.

## Tech

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS
- OpenF1 for live timing data
- Jolpica F1 for Ergast-compatible archive data

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy

This repository is configured for GitHub Pages using GitHub Actions. Every push to `main` builds a static export and deploys the `out` folder to Pages.

The public site URL is:

```text
https://spicemonk47.github.io/Apex-F1/
```

## Notes

GitHub Pages hosts static files only, so this version calls the public OpenF1 and Jolpica APIs directly from the browser. OpenF1's protected live window may require a server-backed deployment if credentials are needed for true in-progress session data.
