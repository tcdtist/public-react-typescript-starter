import { useState } from 'react'

import { useAuthStore } from '../../auth/store/auth.store'

export const ChatPage = () => {
  const { user, isAuthenticated } = useAuthStore()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<
    Array<{ id: string; sender: string; text: string; timestamp: Date }>
  >([
    {
      id: '1',
      sender: 'System',
      text: 'Welcome to the chat! Start your conversation.',
      timestamp: new Date(),
    },
  ])

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
          <p className="mt-2 text-gray-600">Please login to access chat.</p>
        </div>
      </div>
    )
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      sender: user.name || 'Anonymous',
      text: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white shadow">
          {/* Header */}
          <div className="border-b border-gray-200 px-6 py-4">
            <h1 className="text-xl font-semibold text-gray-900">Chat Room</h1>
            <p className="text-sm text-gray-600">Connected as {user.name}</p>
          </div>

          {/* Messages */}
          <div className="h-96 space-y-4 overflow-y-auto p-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === user.name ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                    msg.sender === user.name
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  <div className="mb-1 text-xs opacity-75">{msg.sender}</div>
                  <div className="text-sm">{msg.text}</div>
                  <div className="mt-1 text-xs opacity-75">
                    {msg.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 px-6 py-4">
            <form onSubmit={handleSendMessage} className="flex space-x-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
