import { Button } from '@interview-prep/ui'
import './ResponsePanel.css'

interface ResponsePanelProps {
  response: string
  loading: boolean
}

export default function ResponsePanel({ response, loading }: ResponsePanelProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(response)
  }

  return (
    <div className="response-panel">
      <div className="response-header">
        <h3>AI Response</h3>
        {response && (
          <Button onClick={handleCopy} variant="ghost" size="sm">
            📋 Copy
          </Button>
        )}
      </div>

      <div className="response-content">
        {loading && <div className="loading-spinner">⏳ Generating response...</div>}
        {!loading && !response && (
          <p className="placeholder">Send a message to get started...</p>
        )}
        {response && (
          <div className="response-text">
            {response.split('\n').map((line, i) => (
              <p key={i}>{line || <br />}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
