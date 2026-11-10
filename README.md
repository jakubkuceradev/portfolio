# portfolio

Online CV: a React + Mantine (headless) site where each skill links to the work that demonstrates it.

## Develop

```bash
npm ci
npm run dev        # http://localhost:5173
npm test           # unit + interaction tests, including the content check
npm run build      # typecheck + tests + static build into dist/
```

## Content

All content is data under `src/content/`:

- `skills.ts` — the interactive skill list. Bullet tags must use these ids (TypeScript enforces it), and every skill needs at least one tagged bullet (`content.test.ts` enforces it).
- `experience.ts`, `projects.ts` — entries with tagged bullets.
- `coursework.ts` — **placeholder** sample courses (`placeholder: true`), to be replaced.
- `profile.ts` — name, intro, contact links, spoken languages.

## Deploy

`docker build .` runs the full build (tests included) and produces a Caddy image serving `dist/` on port 80. GitHub Actions publishes `ghcr.io/jakubkuceradev/portfolio:main` and `:<sha>` (linux/arm64) on every push to `main`.
