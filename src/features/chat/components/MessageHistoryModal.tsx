import { useState } from 'react'

import { motion } from 'framer-motion'
import {
  FiCalendar,
  FiFilter,
  FiMail,
  FiMessageCircle,
  FiSearch,
  FiTrash2,
  FiUser,
} from 'react-icons/fi'

import { useAuthStore } from '@/features/auth/store/auth.store'
import { Input } from '@/shared/components/form/Input'
import { Select } from '@/shared/components/form/Select'
import { Badge } from '@/shared/components/ui/Badge'
import { Button } from '@/shared/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card'
import { Modal } from '@/shared/components/ui/Modal'

interface Message {
  id: string
  sender: string
  recipient: string
  content: string
  timestamp: Date
  type: 'sent' | 'received'
  status: 'read' | 'unread'
}

interface MessageHistoryModalProps {
  isOpen: boolean
  onClose: () => void
}

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'John Doe',
    recipient: 'You',
    content: 'Hey! How are you doing today?',
    timestamp: new Date('2024-01-15T10:30:00'),
    type: 'received',
    status: 'read',
  },
  {
    id: '2',
    sender: 'You',
    recipient: 'John Doe',
    content: "Hi John! I'm doing great, thanks for asking. How about you?",
    timestamp: new Date('2024-01-15T10:35:00'),
    type: 'sent',
    status: 'read',
  },
  {
    id: '3',
    sender: 'Jane Smith',
    recipient: 'You',
    content: "Don't forget about our meeting tomorrow at 2 PM.",
    timestamp: new Date('2024-01-16T14:20:00'),
    type: 'received',
    status: 'read',
  },
  {
    id: '4',
    sender: 'You',
    recipient: 'Jane Smith',
    content: "Thanks for the reminder! I'll be there.",
    timestamp: new Date('2024-01-16T14:25:00'),
    type: 'sent',
    status: 'read',
  },
  {
    id: '5',
    sender: 'Bob Wilson',
    recipient: 'You',
    content: 'Can you review the latest project proposal?',
    timestamp: new Date('2024-01-17T09:15:00'),
    type: 'received',
    status: 'unread',
  },
]

function MessageFilters({
  searchQuery,
  onSearchChange,
  filterType,
  onFilterChange,
}: {
  searchQuery: string
  onSearchChange: (query: string) => void
  filterType: string
  onFilterChange: (type: string) => void
}) {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <FiFilter className="mr-2 h-4 w-4" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select
            value={filterType}
            onValueChange={onFilterChange}
            options={[
              { value: 'all', label: 'All Messages' },
              { value: 'sent', label: 'Sent' },
              { value: 'received', label: 'Received' },
              { value: 'unread', label: 'Unread' },
            ]}
          />
        </div>
      </CardContent>
    </Card>
  )
}

function MessageItem({ message, index }: { message: Message; index: number }) {
  const { user } = useAuthStore()

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-lg border p-4 transition-colors hover:bg-accent/50 ${
        message.status === 'unread' ? 'border-primary/30 bg-primary/5' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
            {message.type === 'sent'
              ? user?.name?.charAt(0).toUpperCase()
              : message.sender.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-medium">
                {message.type === 'sent' ? 'You' : message.sender}
              </span>
              <FiMessageCircle
                className={`h-3 w-3 ${
                  message.type === 'sent' ? 'text-blue-500' : 'text-green-500'
                }`}
              />
              {message.status === 'unread' && (
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  New
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {message.type === 'sent' ? `To: ${message.recipient}` : `From: ${message.sender}`}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{message.content}</p>
            <div className="mt-2 flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center">
                <FiCalendar className="mr-1 h-3 w-3" />
                {message.timestamp.toLocaleDateString()}
              </span>
              <span>{message.timestamp.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
          <FiTrash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  )
}

function MessageStats({ messages }: { messages: Message[] }) {
  const sentCount = messages.filter((m) => m.type === 'sent').length
  const receivedCount = messages.filter((m) => m.type === 'received').length
  const unreadCount = messages.filter((m) => m.status === 'unread').length

  return (
    <div className="mb-6 grid grid-cols-3 gap-4">
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-2xl font-bold text-blue-500">{sentCount}</p>
            <p className="text-sm text-muted-foreground">Sent</p>
          </div>
          <FiMail className="h-8 w-8 text-blue-500/20" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-2xl font-bold text-green-500">{receivedCount}</p>
            <p className="text-sm text-muted-foreground">Received</p>
          </div>
          <FiMessageCircle className="h-8 w-8 text-green-500/20" />
        </CardContent>
      </Card>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-2xl font-bold text-orange-500">{unreadCount}</p>
            <p className="text-sm text-muted-foreground">Unread</p>
          </div>
          <FiUser className="h-8 w-8 text-orange-500/20" />
        </CardContent>
      </Card>
    </div>
  )
}

export function MessageHistoryModal({ isOpen, onClose }: MessageHistoryModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredMessages = mockMessages.filter((message) => {
    const matchesSearch =
      message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'sent' && message.type === 'sent') ||
      (filterType === 'received' && message.type === 'received') ||
      (filterType === 'unread' && message.status === 'unread')

    return matchesSearch && matchesFilter
  })

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Message History" size="xl">
      <div className="space-y-6">
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg"
          >
            <FiMail className="h-6 w-6" />
          </motion.div>
          <p className="text-sm text-muted-foreground">View and manage your message history</p>
        </div>

        <MessageStats messages={mockMessages} />

        <MessageFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filterType={filterType}
          onFilterChange={setFilterType}
        />

        <Card>
          <CardHeader>
            <CardTitle>Messages ({filteredMessages.length})</CardTitle>
            <CardDescription>
              {filterType === 'all'
                ? 'All your messages'
                : `${filterType.charAt(0).toUpperCase() + filterType.slice(1)} messages`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredMessages.length > 0 ? (
              <div className="max-h-96 space-y-4 overflow-y-auto">
                {filteredMessages.map((message, index) => (
                  <MessageItem key={message.id} message={message} index={index} />
                ))}
              </div>
            ) : (
              <div className="py-8 text-center">
                <FiMessageCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-2 text-sm text-muted-foreground">No messages found</p>
                <p className="text-xs text-muted-foreground">Try adjusting your search or filter</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Modal>
  )
}
