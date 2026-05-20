import { Button } from '@interview-prep/ui'
import './TopBar.css'

type Mode = 'chat' | 'voice' | 'screen'

interface TopBarProps {
  mode: Mode
  setMode: (mode: Mode) => void
}

export default function TopBar({ mode, setMode }: TopBarProps) {
  return (
    <div className="top-bar">
      <div className="mode-selector">
        <Button
          variant={mode === 'chat' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setMode('chat')}
          className="mode-btn"
        >
          💬 Chat
        </Button>
        <Button
          variant={mode === 'voice' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setMode('voice')}
          className="mode-btn"
        >
          🎙 Voice
        </Button>
        <Button
          variant={mode === 'screen' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setMode('screen')}
          className="mode-btn"
        >
          🖥 Screen
        </Button>
      </div>

      <div className="controls">
        <span className="timer">00:00</span>
        <Button variant="ghost" size="sm" className="icon-btn">
          ⚙️
        </Button>
      </div>
    </div>
  )
}
