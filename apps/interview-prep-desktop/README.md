# Interview Prep Desktop App — Phase 1

Electron + React app for compact, floating interview prep UI.

## Architecture

**Completely independent** — no Next.js dependency:

```
Vite (dev server @ localhost:5173)
  ↓
React App (src/App.tsx)
  ↓
Electron Window (frameless, transparent, always-on-top)
```

## Features

✅ **Frameless, transparent window** (420×500px)
✅ **Always-on-top** — stays above other windows
✅ **Hidden from dock** (Mac) and screen share
✅ **Toggle hotkey** — `Cmd+Shift+I` to show/hide
✅ **Shared UI components** — uses `@interview-prep/ui` from monorepo
✅ **No Next.js dependency** — completely standalone

## Setup

From root of monorepo:

```bash
npm install  # Install all workspaces
npm run dev:desktop
```

Or from desktop app folder:

```bash
cd apps/interview-prep-desktop
npm install
npm run dev
```

## Development

The `npm run dev` command:
1. Starts Vite dev server on `http://localhost:5173`
2. Starts Electron app
3. Opens dev tools automatically

## File Structure

```
src/
├── index.tsx     ← React entry point
├── App.tsx       ← Main component (3-panel layout)
├── App.css       ← Component styling
└── index.css     ← Global Tailwind styles
main.js           ← Electron main process
preload.js        ← Secure IPC bridge
tsconfig.json     ← TypeScript config
vite.config.ts    ← Vite bundler config
```

## Phase 1 Verification

- [ ] `npm run dev` starts without errors
- [ ] Electron window opens (420×500px, frameless)
- [ ] Window is transparent, see desktop behind it
- [ ] Window stays on top of other apps
- [ ] Hotkey `Cmd+Shift+I` toggles visibility
- [ ] Input field is visible and clickable
- [ ] Dev tools open for debugging
- [ ] No console errors about missing components

## Next: Phase 2

1. Replace dummy "Panel 1" input with Voice/Screen/Chat mode selector
2. Add "Panel 2" response display area with streamed text
3. Implement mode switching (Voice, Screen, Chat)
4. Connect to HTTP API endpoint
5. Add Web Speech API transcription

## Important Notes

- ✅ Uses shared `@interview-prep/ui` components from monorepo
- ✅ Completely independent from Next.js web app
- ✅ Vite for fast React development
- ✅ Mac: Hidden from dock, screen share, task switcher
- ⚠️ Phase 1 is a skeleton — needs Phase 2 for functionality
