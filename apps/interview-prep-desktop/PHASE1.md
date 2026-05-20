# Phase 1 — Electron Shell

## What's Included

### Files Created
- **main.js** — Electron main process
  - Frameless, transparent window (420×500px)
  - Always-on-top, hidden from dock (Mac)
  - Invisible in screen share via `setContentProtection(true)`
  - Hotkey `Cmd+Shift+I` to toggle visibility
  - Loads Next.js dev server on `http://localhost:3000`

- **preload.js** — Secure IPC bridge
  - Exposes `window.electron.minimizeWindow()`
  - Exposes `window.electron.toggleAlwaysOnTop(state)`
  - Context isolation enabled for security

- **package.json** — Scripts and dependencies
  - `npm run dev` — Start Electron app
  - `npm run build` — Build production version
  - Electron 42.2.0 installed

- **README.md** — Setup instructions
- **.gitignore** — Node modules, env files, logs

## Window Configuration

```javascript
{
  width: 420,          // Compact width
  height: 500,         // Default height (resizable)
  frame: false,        // No OS chrome
  transparent: true,   // See through background
  alwaysOnTop: true,   // Stays above other windows
  level: 'screen-saver', // Even above system dialogs
  skipTaskbar: true,   // Hidden from taskbar
}
```

## Architecture

```
┌─────────────────────────────────────┐
│  Electron App                       │
├─────────────────────────────────────┤
│  main.js                            │
│  ├─ BrowserWindow (frameless)       │
│  ├─ Global hotkey (Cmd+Shift+I)     │
│  └─ IPC handlers                    │
├─────────────────────────────────────┤
│  preload.js                         │
│  └─ Secure context bridge           │
├─────────────────────────────────────┤
│  Renderer (http://localhost:3000)   │
│  └─ Next.js dev server              │
│     └─ React components             │
└─────────────────────────────────────┘
```

## How to Test

**Terminal 1 — Start Next.js dev server:**
```bash
cd ../interview-prep-mvp
npm run dev
```

**Terminal 2 — Start Electron app:**
```bash
cd interview-prep-desktop
npm run dev
```

**Verify:**
- ✅ Electron window appears (frameless, transparent)
- ✅ Can see desktop behind the window
- ✅ Window stays on top
- ✅ Press `Cmd+Shift+I` to toggle visibility
- ✅ Window is resizable and draggable
- ✅ Dev tools open (for debugging)

## What's NOT Included (for Phase 2+)

- Compact 3-panel UI (Chat, Screen, Voice)
- React components for modes
- Web Speech API integration
- Screen capture functionality
- Voice transcription

## Notes

- Window loads the full Next.js app from `interview-prep-mvp`
- For Phase 2, we'll build a new compact React renderer
- All Electron APIs are safely isolated via contextBridge
- Mac-specific: dock hiding works, screen share invisibility enabled

## Ready for Phase 2?

Once this Phase 1 is approved, Phase 2 will build the compact 3-panel UI inside the Electron window.
