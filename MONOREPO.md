# Interview Prep Monorepo

This is a monorepo containing multiple applications sharing a common UI component library.

## Structure

```
telegram-workspace/
├── packages/
│   └── ui-components/          ← Shared UI components library (@interview-prep/ui)
├── apps/
│   ├── interview-prep-mvp/      ← Web app (Next.js)
│   └── interview-prep-desktop/  ← Desktop app (Electron + React)
└── package.json                 ← Root monorepo config with npm workspaces
```

## Setup

Install dependencies for all workspaces:

```bash
npm install
```

This automatically installs dependencies in:
- `packages/ui-components/`
- `apps/interview-prep-mvp/`
- `apps/interview-prep-desktop/`

## Development

### Start Both Apps

```bash
npm run dev
```

### Start Individual Apps

**Web App (Next.js):**
```bash
npm run dev:web
# or
cd apps/interview-prep-mvp && npm run dev
```

**Desktop App (Electron + React + Vite):**
```bash
npm run dev:desktop
# or
cd apps/interview-prep-desktop && npm run dev
```

## Shared UI Components

Located in `packages/ui-components/src/`:

```
├── button.tsx
├── card.tsx
├── badge.tsx
├── input.tsx
├── textarea.tsx
├── utils.ts         ← cn() utility function
└── index.ts         ← Exports all components
```

### Using Shared Components

Both apps import from `@interview-prep/ui`:

```typescript
import { Button, Card, Badge } from '@interview-prep/ui'
```

### Adding New Components

1. Create component in `packages/ui-components/src/`
2. Export from `packages/ui-components/src/index.ts`
3. Both apps can use immediately via `@interview-prep/ui`

## Architecture

### Web App (`apps/interview-prep-mvp/`)
- Framework: Next.js (React)
- Entry: `app/page.tsx`
- Uses: `@interview-prep/ui` components
- Features: Dashboard, sessions, full app experience

### Desktop App (`apps/interview-prep-desktop/`)
- Framework: Electron + React
- Build tool: Vite
- Entry: `src/index.tsx` → `src/App.tsx`
- Uses: `@interview-prep/ui` components
- Features: Minimal 3-panel floating UI for interviews

### Shared Components (`packages/ui-components/`)
- Framework: React + TypeScript
- No build step needed (ships as source)
- Exports: React components + utilities
- Used by: Both web and desktop apps

## Build

### Web App
```bash
cd apps/interview-prep-mvp
npm run build
```

### Desktop App
```bash
cd apps/interview-prep-desktop
npm run build
```

## Key Benefits

✅ **Single source of truth** — Components defined once, used everywhere
✅ **Consistent design** — Web + desktop always in sync
✅ **Independent apps** — Desktop doesn't depend on Next.js
✅ **Easy scaling** — Add new apps without duplicating components
✅ **Professional structure** — Industry-standard monorepo approach

## npm Workspaces

The root `package.json` defines workspaces:

```json
{
  "workspaces": [
    "packages/*",
    "apps/*"
  ]
}
```

This allows:
- `npm install` at root installs all dependencies
- `npm run dev:web` runs scripts in `apps/interview-prep-mvp`
- `npm run dev:desktop` runs scripts in `apps/interview-prep-desktop`
- Shared dependencies are deduplicated
