# Resume Site — GIGACODE Context

## Project Overview

A responsive personal portfolio / resume website for **Ivan Sosnovich** (Senior Frontend Developer). It serves as an interactive business card with an AI assistant. The site is built as a **Next.js 14** application using **Feature-Sliced Design (FSD)** architecture.

### Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router, static prerender), `output: "standalone"` |
| UI | React 18, TypeScript, Tailwind CSS (darkMode: `class`), Framer Motion |
| Lint | ESLint — `next/core-web-vitals`, `next/typescript` |
| Package manager | npm |
| Backend | Go 1.23 (`cmd/server/`) — separate repo path, not in this directory |

### Architecture (FSD)

```
src/
├── app/              # Next.js App Router pages, layout, globals.css
│   ├── page.tsx      # Home page — previews of all sections
│   ├── experience/   # /experience — full work history
│   ├── skills/       # /skills — all skill categories + education
│   ├── projects/     # /projects — all projects
│   └── articles/     # /articles — all articles
├── entities/         # Data models (pure data, no UI components)
│   ├── profile/
│   ├── experience/
│   ├── skill/
│   ├── article/
│   └── project/
├── widgets/          # Composite UI widgets
│   ├── header/       # Header with photo, name, badges
│   ├── theme-toggle/ # Dark/light theme toggle
│   └── ai-assistant/ # Pulsating contact button + modal
└── shared/ui/        # Reusable primitive UI components
    ├── Icon.tsx
    ├── Badge.tsx
    ├── Card.tsx
    ├── SectionHeader.tsx
    ├── BackLink.tsx
    ├── PageTransition.tsx
    └── index.ts      # Barrel exports
```

### Key Pages

- **`/`** (Home): Shows previews — last job, top 3 skill categories, 2 projects, last article. Uses `FadeInSection` for scroll-triggered animations and `SectionHeader` with "View all" links.
- **`/experience`**: Full list of work experiences with achievements, sub-projects, and tech stack badges.
- **`/skills`**: All skill categories with progress bars + education section.
- **`/projects`**: All projects with descriptions and stacks.
- **`/articles`**: All articles as external links.

## Building and Running

### Dev Server
```bash
npm run dev          # Starts dev server on http://localhost:3000
```

### Production Build
```bash
npm run build        # Production build (static prerender with App Router)
npm start            # Production server
```

### Linting
```bash
npm run lint         # ESLint check (next/core-web-vitals config)
```

### TypeScript
```bash
npx tsc --noEmit     # Type checking (strict mode enabled)
```

### Environment Variables
Copy `.env.example` to `.env.local`:
```
NEXT_PUBLIC_API_URL=      # Backend URL (e.g. http://localhost:8080)
NEXT_PUBLIC_SHARED_SECRET= # 32-char encryption key
```

## Development Conventions

### Coding Style & Patterns

1. **Typescript**: Strict mode enabled. Use `interface` for prop types, `type` for unions. Export both types and const data from entity `data.ts` files.
2. **React**: Functional components with named exports. Components receive typed props via `interface ComponentProps`.
3. **Imports**: Use `@/` path alias (maps to `./src/*`). Barrel exports in `shared/ui/index.ts`.
4. **Styling**: Tailwind CSS utility classes. Use consistent spacing scale (`p-4`, `gap-3`, `space-y-2`). Dark mode via `dark:` prefix. Color palette: `indigo-*` (primary accent), `pink-*` (secondary gradient), `slate-*` (neutral text/backgrounds), `green-*` (success indicators).
5. **Animations**: Framer Motion for page transitions (`PageTransition` wraps each page) and scroll-triggered fade-ins (`FadeInSection`). Default transition: `{ duration: 0.35, ease: "easeOut" }`. Respects `prefers-reduced-motion`.
6. **Theme**: Dark mode via `class` strategy. Inline script in `layout.tsx` prevents FOUC. Theme persisted in `localStorage`.

### Component Patterns

- **UI primitives** (`shared/ui/`): Small, reusable, presentational components without business logic.
  - `Icon`: SVG-based icons (Lucide-style), defined as inline `<path>` data in a `Record<string, React.ReactNode>` map. Falls back to `null` for unknown icon names.
  - `Badge`: Two variants — `"accent"` (indigo, filled) and `"muted"` (gray, bordered).
  - `Card`: Rounded-2xl container with optional `hover` prop for border highlight.
  - `SectionHeader`: Title with icon + optional "View all" link to detail page.
  - `BackLink`: "Back to home" link with left arrow animation.
  - `PageTransition` / `FadeInSection`: Framer Motion wrappers for page-level and section-level animations.

- **Widgets** (`widgets/`): Composite components that combine UI primitives with business logic.
  - Use `"use client"` directive when using hooks (state, effects, event handlers).
  - `Header`: Avatar, name with gradient text, position, location badge, highlights.
  - `ThemeToggle`: Client component that reads/writes `document.documentElement.classList` and `localStorage`.
  - `AIAssistant`: FAB button with pulsating wave animation, contact modal with name/message form → opens Telegram link.

### UI/UX Conventions

- **Color scheme**: Indigo is the primary brand color (`indigo-50` bg, `indigo-600` text/buttons, `indigo-500` borders on hover).
- **Gradients**: `from-indigo-* to-pink-*` for accent elements (avatar ring, progress bars, button backgrounds, icon containers).
- **Layout**: `max-w-4xl` or `max-w-5xl` centered containers with responsive padding (`px-4 sm:px-6 lg:px-8`).
- **Responsive**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints. Grid layouts switch from single-column to multi-column at `md:` or `sm:`.
- **Dark mode**: Every text/background/border color has a `dark:` counterpart. Card backgrounds: `white` → `slate-800`. Text: `slate-600` → `slate-300`.
- **BackLink**: Present on all detail pages (`/experience`, `/skills`, `/projects`, `/articles`) for navigation back to home.

### Data Model Pattern

All resume data lives in `src/entities/*/model/data.ts` files. Each file exports an interface and a const array/object. To update resume content, **only these data files need editing** — no component changes required.

### Naming Conventions

| Pattern | Example |
|---------|---------|
| Components | PascalCase: `PageTransition`, `ThemeToggle` |
| Files (components) | PascalCase: `AIAssistant.tsx`, `BackLink.tsx` |
| Files (data) | `data.ts` inside `model/` |
| Exports | Named exports for components and data |

### Export Pattern

Components use `export function` (not `export default`). The barrel file `shared/ui/index.ts` re-exports all UI primitives:
```typescript
export { Icon } from "./Icon";
export { Badge } from "./Badge";
// ...
```

### State Management

No global state library. Theme state is managed locally in `ThemeToggle` via `useState` + `localStorage`. No Redux, Zustand, etc.

### Testing

No test files found in the current source tree. No test runner configured in `package.json`. Tests exist in the backend (Go) portion of the project only.
