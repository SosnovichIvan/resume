# GigaCode project context

## Project

Personal Russian-language resume website for Ivan Sosnovich. This repository contains a single Next.js frontend. There is no backend, API client, AI assistant, or required environment configuration.

## Stack

- Next.js 14, React 18, TypeScript in strict mode
- App Router with `output: "standalone"`
- Tailwind CSS with class-based dark mode
- Framer Motion
- npm

## Routes

- `/` — profile and previews
- `/experience` — work history and education
- `/projects` — commercial projects
- `/my-projects` — personal projects
- `/publications` — external publications

## Architecture

- `src/app` — routing, global styles and metadata
- `src/widgets` — composite UI blocks
- `src/entities/*/model/data.ts` — resume data
- `src/shared/ui` — reusable UI primitives

Use the `@/` alias for imports from `src`. Components use named exports; Next.js pages use default exports. Add `"use client"` only where browser APIs, state, effects or event handlers are required.

## Validation

```bash
npm ci
npm run lint
npx tsc --noEmit
npm run build
```

There are currently no automated tests or project-local `SKILL.md` files. Do not assume that an AI/backend feature exists unless it is added to the source tree.
