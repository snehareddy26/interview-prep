# Phase 2 — Desktop App UI Implementation

## What's Implemented

### Components Created

**1. TopBar** (`src/components/TopBar.tsx`)
- Mode switcher: Chat | Voice | Screen
- Timer display (placeholder)
- Settings button
- Dark background with white text
- Draggable title bar (Mac)

**2. ChatPanel** (`src/components/ChatPanel.tsx`)
- Text input (textarea)
- Send button
- Disabled state during loading
- Enter key to send (Shift+Enter for newline)
- Three modes:
  - **Chat**: Text input + send button
  - **Voice**: Record button + transcript display
  - **Screen**: Capture button + status

**3. ResponsePanel** (`src/components/ResponsePanel.tsx`)
- AI response display (streamed)
- Copy button
- Loading state with spinner
- Scrollable with custom scrollbar
- Placeholder when empty

### State Management

```typescript
- mode: 'chat' | 'voice' | 'screen'
- messages: Array<{role, content}>
- loading: boolean
- response: string
```

### API Integration

**Independent - No Web App Dependency!**

```typescript
POST http://localhost:3001 (MCP server)
- Body: JSON { message: "..." }
- Response: Streamed text
- Direct connection to Claude via MCP
- Works even if web app is offline
```

Desktop app talks directly to:
```
Desktop (Electron) → MCP Server (localhost:3001)
                  ↓
              Claude AI
```

### Styling

✅ Clean, minimal UI
✅ Component-level CSS files
✅ Responsive layout
✅ Mac app region dragging
✅ Custom scrollbars
✅ Loading animations

## File Structure

```
src/
├── App.tsx                    ← Main component with state
├── App.css                    ← App layout styles
├── components/
│   ├── TopBar.tsx            ← Mode switcher
│   ├── TopBar.css
│   ├── ChatPanel.tsx         ← Input area (3 modes)
│   ├── ChatPanel.css
│   ├── ResponsePanel.tsx     ← Response display
│   └── ResponsePanel.css
├── index.tsx                 ← React entry
└── index.css                 ← Global styles
```

## Features

✅ **Mode Switching** — Chat, Voice, Screen tabs
✅ **Text Input** — Textarea with Enterkey support
✅ **API Integration** — Calls `/api/interview` endpoint
✅ **Streaming** — Real-time response display
✅ **Loading State** — Spinner + disabled inputs
✅ **Copy Button** — Copy response to clipboard
✅ **Message History** — Stores all messages
✅ **Error Handling** — Try/catch with user feedback

## How It Works

1. **User sends message** → `handleSendMessage(content)`
2. **Message added to state** → UI updates
3. **API call** → POST to `http://localhost:3001` (MCP server, NOT web app)
4. **Stream response** → Display in real-time
5. **Complete response** → Store in messages

**Key: Desktop app is completely independent!**
- No dependency on web app running
- Direct connection to MCP server
- Fast and self-contained

## Testing

```bash
cd apps/interview-prep-desktop
npm run dev
```

Expected:
- [ ] Window opens with dark top bar + white panels
- [ ] Click Chat/Voice/Screen buttons → UI changes
- [ ] Type message → Send button enables
- [ ] Click Send → Message appears, loading spinner shows
- [ ] Response streams in ResponsePanel
- [ ] Copy button works
- [ ] Cmd+Shift+I toggles window
- [ ] No console errors

## What's Missing (Phase 3+)

⚠️ **Voice Mode**:
- Web Speech API integration
- Mic permissions
- System audio capture (BlackHole)
- Silence detection

⚠️ **Screen Mode**:
- desktopCapturer integration
- Screenshot capture
- Claude Vision API

⚠️ **Polish**:
- Timer countdown
- Message timestamps
- Session management
- Keyboard shortcuts

## Architecture

```
User Input
  ↓
ChatPanel (textarea)
  ↓
handleSendMessage()
  ↓
Fetch API
  ↓
Stream response
  ↓
ResponsePanel (display)
```

## Notes

- Uses shared `@interview-prep/ui` components (Button)
- Zero external dependencies except React + UI library
- CSS is modular (one per component)
- **API endpoint: `http://localhost:3001` (MCP server directly)**
- **Completely independent from web app**
- Fast and lightweight
- Desktop app ≠ Web app (no coupling)
