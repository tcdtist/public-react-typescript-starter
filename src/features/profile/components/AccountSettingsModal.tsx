import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { FormProvider, useForm } from 'react-hook-form'
import {
  FiBell,
  FiEye,
  FiEyeOff,
  FiLoader,
  FiLock,
  FiMail,
  FiSave,
  FiSettings,
  FiShield,
  FiTrash2,
} from 'react-icons/fi'
import { z } from 'zod'

import { FormItem } from '@/shared/components/form/FormItem'
import { Button } from '@/shared/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card'
import { Modal } from '@/shared/components/ui/Modal'

const securitySettingsSchema = z
  .object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean(),
  pushNotifications: z.boolean(),
  weeklyDigest: z.boolean(),
  marketingEmails: z.boolean(),
})

type SecuritySettingsFormData = z.infer<typeof securitySettingsSchema>
type NotificationSettingsFormData = z.infer<typeof notificationSettingsSchema>

interface AccountSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

function SecuritySettings() {
  const [showPasswords, setShowPasswords] = useState(false)

  const methods = useForm<SecuritySettingsFormData>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = methods

  const onSubmit = async (data: SecuritySettingsFormData) => {
    console.log('Updating password:', data)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    reset()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FiLock className="mr-2 h-5 w-5" />
          Security
        </CardTitle>
        <CardDescription>Update your password and security preferences</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="relative">
              <FormItem.InputPassword
                name="currentPassword"
                label="Current Password *"
                placeholder="Enter current password"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative">
                <FormItem.Input
                  name="newPassword"
                  type={showPasswords ? 'text' : 'password'}
                  label="New Password *"
                  placeholder="Enter new password"
                />
              </div>
              <div className="relative">
                <FormItem.Input
                  name="confirmPassword"
                  type={showPasswords ? 'text' : 'password'}
                  label="Confirm Password *"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowPasswords(!showPasswords)}
              >
                {showPasswords ? (
                  <FiEyeOff className="mr-2 h-4 w-4" />
                ) : (
                  <FiEye className="mr-2 h-4 w-4" />
                )}
                {showPasswords ? 'Hide' : 'Show'} passwords
              </Button>
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-2"
                  >
                    <FiLoader className="h-4 w-4" />
                  </motion.div>
                  Updating...
                </>
              ) : (
                <>
                  <FiSave className="mr-2 h-4 w-4" />
                  Update Password
                </>
              )}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

function NotificationSettings() {
  const methods = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyDigest: true,
      marketingEmails: false,
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: NotificationSettingsFormData) => {
    console.log('Updating notifications:', data)
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FiBell className="mr-2 h-5 w-5" />
          Notifications
        </CardTitle>
        <CardDescription>Choose how you want to be notified</CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormItem.Checkbox
              name="emailNotifications"
              label="Email Notifications"
              description="Receive email notifications for important updates"
            />
            <FormItem.Checkbox
              name="pushNotifications"
              label="Push Notifications"
              description="Get push notifications on your device"
            />
            <FormItem.Checkbox
              name="weeklyDigest"
              label="Weekly Digest"
              description="Receive a weekly summary of activity"
            />
            <FormItem.Checkbox
              name="marketingEmails"
              label="Marketing Emails"
              description="Receive emails about new features and promotions"
            />

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-2"
                  >
                    <FiLoader className="h-4 w-4" />
                  </motion.div>
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2 h-4 w-4" />
                  Save Preferences
                </>
              )}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

function PrivacySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FiShield className="mr-2 h-5 w-5" />
          Privacy & Data
        </CardTitle>
        <CardDescription>Manage your privacy and data preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Profile Visibility</h4>
              <p className="text-sm text-muted-foreground">Control who can see your profile</p>
            </div>
            <Button variant="outline" size="sm">
              Public
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Data Export</h4>
              <p className="text-sm text-muted-foreground">Download your data</p>
            </div>
            <Button variant="outline" size="sm">
              <FiMail className="mr-2 h-4 w-4" />
              Request
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-destructive">Delete Account</h4>
              <p className="text-sm text-muted-foreground">Permanently delete your account</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              <FiTrash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AccountSettingsModal({ isOpen, onClose }: AccountSettingsModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Account Settings" size="xl">
      <div className="space-y-6">
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg"
          >
            <FiSettings className="h-6 w-6" />
          </motion.div>
          <p className="text-sm text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-6">
          <SecuritySettings />
          <NotificationSettings />
          <PrivacySettings />
        </div>
      </div>
    </Modal>
  )
}
