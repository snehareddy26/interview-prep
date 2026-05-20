import { useState } from 'react'
import { Button } from '@interview-prep/ui'
import './ChatPanel.css'

type Mode = 'chat' | 'voice' | 'screen'

interface ChatPanelProps {
  mode: Mode
  onSendMessage: (content: string) => void
  loading: boolean
}

export default function ChatPanel({
  mode,
  onSendMessage,
  loading,
}: ChatPanelProps) {
  const [input, setInput] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  const handleSend = () => {
    if (!input.trim()) return
    onSendMessage(input)
    setInput('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (mode === 'chat') {
    return (
      <div className="chat-panel">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question or describe the problem..."
          className="input-field"
          disabled={loading}
        />
        <Button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="send-btn"
        >
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </div>
    )
  }

  if (mode === 'voice') {
    return (
      <div className="voice-panel">
        <div className="voice-controls">
          <Button
            onClick={() => setIsRecording(!isRecording)}
            variant={isRecording ? 'destructive' : 'default'}
            className="record-btn"
          >
            {isRecording ? '⏹ Stop Recording' : '🎙 Start Recording'}
          </Button>
        </div>
        <div className="transcript">
          <p className="transcript-label">Transcript:</p>
          <p className="transcript-text">{input || '(Listening...)'}</p>
        </div>
      </div>
    )
  }

  if (mode === 'screen') {
    return (
      <div className="screen-panel">
        <Button onClick={() => onSendMessage('analyze-screenshot')} className="capture-btn">
          📸 Capture Screen
        </Button>
        <p className="screen-label">Screenshot will be analyzed by Claude</p>
      </div>
    )
  }

  return null
}
