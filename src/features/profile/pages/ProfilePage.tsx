import { useState } from 'react'

import { motion } from 'framer-motion'
import { FiCalendar, FiEdit, FiMail, FiSettings, FiUser } from 'react-icons/fi'

import { useAuthStore } from '@/features/auth/store/auth.store'
import { MessageHistoryModal } from '@/features/chat/components/MessageHistoryModal'
import { CreatePostModal } from '@/features/posts/components/CreatePostModal'
import { AccountSettingsModal } from '@/features/profile/components/AccountSettingsModal'
import { EditProfileModal } from '@/features/profile/components/EditProfileModal'
import { Container } from '@/shared/components/layout/Container'
import { Layout } from '@/shared/components/layout/Layout'
import { Badge } from '@/shared/components/ui/Badge'
import { Button } from '@/shared/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card'

interface User {
  id: string
  name: string
  email: string
}

interface ProfileStat {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
}

interface ProfileHeaderProps {
  user: User
  onEditClick: () => void
}

function ProfileHeader({ user, onEditClick }: ProfileHeaderProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="pb-6">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg"
          >
            <span className="text-2xl font-bold">{user.name?.charAt(0).toUpperCase()}</span>
          </motion.div>

          <div className="flex-1">
            <CardTitle className="mb-2 text-3xl">{user.name}</CardTitle>
            <CardDescription className="mb-4 flex items-center text-base">
              <FiMail className="mr-2 h-4 w-4" />
              {user.email}
            </CardDescription>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <FiUser className="mr-1 h-3 w-3" />
                Active
              </Badge>
              <Badge variant="secondary">Member since 2024</Badge>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant="outline" onClick={onEditClick}>
              <FiSettings className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </motion.div>
        </div>
      </CardHeader>
    </Card>
  )
}

interface ProfileInfoItemProps {
  label: string
  value: string | React.ReactNode
  delay: number
  className?: string
}

function ProfileInfoItem({ label, value, delay, className = '' }: ProfileInfoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <dt className="text-sm font-medium text-muted-foreground">{label}</dt>
      <dd className={`mt-1 text-sm ${className}`}>{value}</dd>
    </motion.div>
  )
}

interface ProfileInformationProps {
  user: User
}

function ProfileInformation({ user }: ProfileInformationProps) {
  return (
    <div className="lg:col-span-2">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Your account details and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <ProfileInfoItem
              label="User ID"
              value={<span className="rounded bg-muted px-2 py-1 font-mono">{user.id}</span>}
              delay={0.1}
            />
            <ProfileInfoItem label="Email" value={user.email} delay={0.2} />
            <ProfileInfoItem
              label="Full Name"
              value={user.name}
              delay={0.3}
              className="font-medium"
            />
            <ProfileInfoItem
              label="Status"
              value={
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
              }
              delay={0.4}
            />
            <ProfileInfoItem label="Joined" value="January 2024" delay={0.5} />
            <ProfileInfoItem label="Last Login" value="Today" delay={0.6} />
          </dl>
        </CardContent>
      </Card>
    </div>
  )
}

interface ActivityStatsProps {
  stats: ProfileStat[]
}

function ActivityStats({ stats }: ActivityStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Stats</CardTitle>
        <CardDescription>Your platform engagement</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center justify-between rounded-lg bg-muted/20 p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
                <span className="text-lg font-bold text-primary">{stat.value}</span>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

interface QuickActionsProps {
  onCreatePostClick: () => void
  onAccountSettingsClick: () => void
  onMessageHistoryClick: () => void
}

function QuickActions({
  onCreatePostClick,
  onAccountSettingsClick,
  onMessageHistoryClick,
}: QuickActionsProps) {
  const quickActions = [
    { label: 'Create New Post', icon: FiEdit, onClick: onCreatePostClick },
    { label: 'Account Settings', icon: FiSettings, onClick: onAccountSettingsClick },
    { label: 'Message History', icon: FiMail, onClick: onMessageHistoryClick },
  ]

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {quickActions.map((action) => {
          const Icon = action.icon
          return (
            <motion.div key={action.label} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="w-full justify-start" onClick={action.onClick}>
                <Icon className="mr-2 h-4 w-4" />
                {action.label}
              </Button>
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}

interface SidebarProps {
  stats: ProfileStat[]
  onCreatePostClick: () => void
  onAccountSettingsClick: () => void
  onMessageHistoryClick: () => void
}

function Sidebar({
  stats,
  onCreatePostClick,
  onAccountSettingsClick,
  onMessageHistoryClick,
}: SidebarProps) {
  return (
    <div>
      <ActivityStats stats={stats} />
      <QuickActions
        onCreatePostClick={onCreatePostClick}
        onAccountSettingsClick={onAccountSettingsClick}
        onMessageHistoryClick={onMessageHistoryClick}
      />
    </div>
  )
}

export const ProfilePage = () => {
  const { user } = useAuthStore()
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [isAccountSettingsOpen, setIsAccountSettingsOpen] = useState(false)
  const [isMessageHistoryOpen, setIsMessageHistoryOpen] = useState(false)

  if (!user) {
    return null
  }

  const profileStats: ProfileStat[] = [
    { label: 'Posts Created', value: '12', icon: FiEdit },
    { label: 'Comments Made', value: '34', icon: FiMail },
    { label: 'Days Active', value: '89', icon: FiCalendar },
  ]

  const handleEditProfileClick = () => setIsEditProfileOpen(true)
  const handleCreatePostClick = () => setIsCreatePostOpen(true)
  const handleAccountSettingsClick = () => setIsAccountSettingsOpen(true)
  const handleMessageHistoryClick = () => setIsMessageHistoryOpen(true)

  return (
    <Layout>
      <Container className="py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl"
        >
          <ProfileHeader user={user} onEditClick={handleEditProfileClick} />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <ProfileInformation user={user} />
            <Sidebar
              stats={profileStats}
              onCreatePostClick={handleCreatePostClick}
              onAccountSettingsClick={handleAccountSettingsClick}
              onMessageHistoryClick={handleMessageHistoryClick}
            />
          </div>
        </motion.div>
      </Container>

      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
      <CreatePostModal isOpen={isCreatePostOpen} onClose={() => setIsCreatePostOpen(false)} />
      <AccountSettingsModal
        isOpen={isAccountSettingsOpen}
        onClose={() => setIsAccountSettingsOpen(false)}
      />
      <MessageHistoryModal
        isOpen={isMessageHistoryOpen}
        onClose={() => setIsMessageHistoryOpen(false)}
      />
    </Layout>
  )
}
