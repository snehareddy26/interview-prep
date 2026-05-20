import { useState } from 'react'
import { Button } from '@interview-prep/ui'
import TopBar from './components/TopBar'
import ChatPanel from './components/ChatPanel'
import ResponsePanel from './components/ResponsePanel'
import './App.css'

type Mode = 'chat' | 'voice' | 'screen'

export default function App() {
  const [mode, setMode] = useState<Mode>('chat')
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([])
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState('')

  const handleSendMessage = async (content: string) => {
    // Add user message
    const newMessages = [...messages, { role: 'user', content }]
    setMessages(newMessages)
    setLoading(true)
    setResponse('')

    try {
      // Call MCP server directly (independent, no web app dependency)
      const res = await fetch('http://localhost:3001', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      })

      if (!res.ok) throw new Error('API error')

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response body')

      const decoder = new TextDecoder()
      let fullResponse = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        fullResponse += chunk
        setResponse(fullResponse)
      }

      setMessages([...newMessages, { role: 'assistant', content: fullResponse }])
    } catch (error) {
      console.error('Error:', error)
      setResponse('Error: Failed to get response')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app-container">
      <TopBar mode={mode} setMode={setMode} />

      <div className="panels">
        <ChatPanel
          mode={mode}
          onSendMessage={handleSendMessage}
          loading={loading}
        />
        <ResponsePanel response={response} loading={loading} />
      </div>
    </div>
  )
}
