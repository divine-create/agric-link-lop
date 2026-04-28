# AGENTS.md

## Dev Commands

```bash
npm run dev      # Dev server on port 3000
npm run build   # Production build
npm run lint    # TypeScript type check (tsc --noEmit)
```

## Setup

1. Copy `.env.example` to `.env.local`
2. Add your `GEMINI_API_KEY` (required for AI features)

## Project Structure

- Single-package React 19 + Vite 6 app
- Tailwind CSS 4 for styling
- React Router 7 for routing
- Entry point: `src/main.tsx`

## Important Quirks

- **HMR disabled**: Vite config sets `hmr: process.env.DISIBLE_HMR !== 'true'`. Don't modify this—the repo uses AI Studio where HMR causes flickering.
- **`@` alias**: Imports use `@/` prefix (configured in tsconfig.json paths).
- **No tests**: No test framework configured (Vitest could be added if needed).