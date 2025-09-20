import { useState } from 'react'

import { motion } from 'framer-motion'
import { FiMessageCircle, FiSend } from 'react-icons/fi'

import { useAuthStore } from '@/features/auth/store/auth.store'
import { Input } from '@/shared/components/form/Input'
import { Container } from '@/shared/components/layout/Container'
import { Layout } from '@/shared/components/layout/Layout'
import { Button } from '@/shared/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card'

interface Message {
  id: string
  sender: string
  text: string
  timestamp: Date
}

interface ChatHeaderProps {
  userName?: string
}

function ChatHeader({ userName }: ChatHeaderProps) {
  return (
    <CardHeader className="border-b">
      <CardTitle className="flex items-center text-2xl">
        <FiMessageCircle className="mr-2 h-6 w-6" />
        Chat Room
      </CardTitle>
      <CardDescription>
        Connected as <span className="font-medium">{userName}</span>
      </CardDescription>
    </CardHeader>
  )
}

interface MessageBubbleProps {
  message: Message
  isOwn: boolean
  index: number
}

function MessageBubble({ message, isOwn, index }: MessageBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs rounded-lg px-4 py-3 lg:max-w-md ${
          isOwn ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
        }`}
      >
        <div className="mb-1 text-xs font-medium opacity-75">{message.sender}</div>
        <div className="text-sm leading-relaxed">{message.text}</div>
        <div className="mt-2 text-xs opacity-75">{message.timestamp.toLocaleTimeString()}</div>
      </div>
    </motion.div>
  )
}

interface MessagesContainerProps {
  messages: Message[]
  currentUserName?: string
}

function MessagesContainer({ messages, currentUserName }: MessagesContainerProps) {
  return (
    <div className="h-96 space-y-4 overflow-y-auto p-6">
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwn={message.sender === currentUserName}
          index={index}
        />
      ))}
    </div>
  )
}

interface MessageInputProps {
  message: string
  onMessageChange: (value: string) => void
  onSend: (e: React.FormEvent) => void
}

function MessageInput({ message, onMessageChange, onSend }: MessageInputProps) {
  return (
    <div className="border-t bg-muted/20 p-6">
      <form onSubmit={onSend} className="flex space-x-3">
        <Input
          type="text"
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button type="submit" size="sm">
            <FiSend className="h-4 w-4" />
            Send
          </Button>
        </motion.div>
      </form>
    </div>
  )
}

export const ChatPage = () => {
  const { user } = useAuthStore()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'System',
      text: 'Welcome to the chat! Start your conversation.',
      timestamp: new Date(),
    },
  ])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim() || !user) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: user.name || 'Anonymous',
      text: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage('')
  }

  return (
    <Layout>
      <Container className="py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mx-auto max-w-4xl">
            <ChatHeader userName={user?.name} />
            <CardContent className="p-0">
              <MessagesContainer messages={messages} currentUserName={user?.name} />
              <MessageInput
                message={message}
                onMessageChange={setMessage}
                onSend={handleSendMessage}
              />
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Layout>
  )
}
