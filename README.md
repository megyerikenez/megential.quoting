# MÉRTÉK — Prémium lakásfelújítás

A fictional Hungarian renovation brand and its interactive quote calculator,
built as a Megential portfolio demonstration.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4

## Getting started

```bash
npm install
npm run dev
```

The dev server is exposed on the local network (`server.host: true`), so the
site can be opened from a phone on the same Wi-Fi.

## Scripts

| Command               | Purpose                                        |
| --------------------- | ---------------------------------------------- |
| `npm run dev`         | Start the Vite dev server                      |
| `npm run build`       | Typecheck + production build into `dist/`      |
| `npm run preview`     | Serve the production build locally             |
| `npm run lint`        | Run ESLint                                     |
| `npm run typecheck`   | Run TypeScript                                 |

## Structure

- `src/pages`, `src/sections` — the landing page
- `src/calculator` — the quote calculator (state, seven steps, lead form, confirmation)
- `src/data` — services, works, projects, steps, and the central pricing configuration
- `src/lib/estimate.ts` — the deterministic estimation engine
- `src/assets/photos` — imagery

The product is fully frontend-only: routing is hash-based (`#/`, `#/kalkulator`)
and calculator state persists to `sessionStorage`. The `dist/` folder deploys to
any static host as-is.

## Note

The MÉRTÉK brand, design, content, and visual assets are fictional and were
created as part of a Megential portfolio demonstration.

## License

Copyright © 2026 Megential. All rights reserved.

This repository is publicly available for portfolio and demonstration
purposes only. No permission is granted to copy, modify, distribute,
sublicense, or use this project or its source code for commercial purposes.
