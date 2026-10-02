import { useState, useRef, useEffect } from 'react'
import { Bot, Sparkles, MessageSquare, Minimize2, X, Send, Copy, Check } from 'lucide-react'

interface AIWidgetProps {
  pageContext: {
    title: string
    description: string
    section: string
  }
}

interface Message {
  id: number
  sender: 'bot' | 'user'
  text: string
  contentSuggestion?: string
}

const INITIAL_MESSAGES: Record<string, Message[]> = {
  'Landing Page': [
    {
      id: 1,
      sender: 'bot',
      text: `I've analyzed your landing page. I can help you:
• Enhance hero section copy
• Improve feature descriptions
• Create compelling CTAs
• Optimize for conversions
• Add social proof elements`,
    },
  ],
  'Owner Dashboard': [
    {
      id: 1,
      sender: 'bot',
      text: `Dashboard intelligence active. I can:
• Explain metrics and KPIs
• Suggest revenue optimizations
• Create better section titles
• Recommend new features
• Generate performance reports`,
    },
  ],
  'Shopping': [
    {
      id: 1,
      sender: 'bot',
      text: `Shopping system analyzed. I can help:
• Improve product descriptions
• Create better search copy
• Suggest comparison tables
• Optimize pricing display
• Write supplier reviews`,
    },
  ],
  'Authentication': [
    {
      id: 1,
      sender: 'bot',
      text: `Login page detected. I can:
• Improve form instructions
• Create better error messages
• Enhance security messaging
• Write helpful tooltips
• Create forgot password copy`,
    },
  ],
  'General': [
    {
      id: 1,
      sender: 'bot',
      text: `Lumina OS assistant ready. Ask me to:
• Generate page content
• Improve existing text
• Create marketing copy
• Explain features
• Suggest improvements`,
    },
  ],
}

const AI_RESPONSES: Record<string, string> = {
  'improve': 'Here\'s an enhanced version of this section that\'s more compelling and conversion-focused...',
  'content': 'I\'ve generated professional content for this section optimized for your audience...',
  'copy': 'Here\'s compelling copy that drives action and engagement...',
  'explain': 'This section helps users understand the key value proposition. Let me enhance it...',
  'title': 'Here\'s a more impactful headline that captures attention...',
  'features': 'Here are better feature descriptions that highlight benefits over features...',
  'default': 'I understand your request. Based on the current page context, here\'s my suggestion...',
}

export function AIWidget({ pageContext }: AIWidgetProps) {
  const [open, setOpen] = useState(true)
  const [minimized, setMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES[pageContext.section] || INITIAL_MESSAGES['General'])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    setMessages(INITIAL_MESSAGES[pageContext.section] || INITIAL_MESSAGES['General'])
  }, [pageContext.section])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      sender: 'user',
      text: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const keywords = input.toLowerCase()
      let responseText = AI_RESPONSES['default']

      if (keywords.includes('improve') || keywords.includes('better')) {
        responseText = AI_RESPONSES['improve']
      } else if (keywords.includes('content') || keywords.includes('write')) {
        responseText = AI_RESPONSES['content']
      } else if (keywords.includes('copy') || keywords.includes('cta')) {
        responseText = AI_RESPONSES['copy']
      } else if (keywords.includes('explain')) {
        responseText = AI_RESPONSES['explain']
      } else if (keywords.includes('title') || keywords.includes('heading')) {
        responseText = AI_RESPONSES['title']
      } else if (keywords.includes('feature')) {
        responseText = AI_RESPONSES['features']
      }

      const aiMessage: Message = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        contentSuggestion: `${responseText}\n\n✨ Here's optimized content for your ${pageContext.section}...`,
      }

      setMessages((prev) => [...prev, aiMessage])
      setLoading(false)
    }, 1000)
  }

  const handleCopy = (id: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/50 transition"
      >
        <Bot size={18} />
        AI Assistant
      </button>
    )
  }

  if (minimized) {
    return (
      <button
        onClick={() => setMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/50 transition"
      >
        <Sparkles size={18} />
        AI Active
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 max-h-[600px] flex flex-col rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl shadow-slate-950/80 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-800 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 p-1.5">
            <Sparkles size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Lumina AI</p>
            <p className="text-[10px] text-slate-400">Content Assistant • {pageContext.section}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setMinimized(true)}
            className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-700 transition"
            title="Minimize"
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-700 transition"
            title="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 p-4 bg-slate-900 scrollbar-hide">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white rounded-br-none'
                  : 'bg-slate-800 text-slate-100 rounded-bl-none'
              }`}
            >
              {message.text}
              {message.contentSuggestion && message.sender === 'bot' && (
                <button
                  onClick={() => handleCopy(message.id, message.contentSuggestion!)}
                  className="mt-2 flex items-center gap-1 text-xs bg-slate-700 hover:bg-slate-600 px-2 py-1 rounded transition"
                >
                  {copiedId === message.id ? (
                    <>
                      <Check size={12} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} /> Copy
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex gap-2 justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-bl-none bg-slate-800 px-3 py-2 text-sm text-slate-100">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-slate-700 bg-slate-800 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-slate-600 bg-slate-900 px-3 py-2 focus-within:border-cyan-500 transition">
          <MessageSquare size={16} className="text-slate-400" />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for content, copy, or help..."
            className="flex-1 bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 disabled:cursor-not-allowed p-1.5 text-white transition"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  )
}
