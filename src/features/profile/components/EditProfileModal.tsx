import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { FormProvider, useForm } from 'react-hook-form'
import { FiLoader, FiSave, FiUser } from 'react-icons/fi'
import { z } from 'zod'

import { useAuthStore } from '@/features/auth/store/auth.store'
import { FormItem } from '@/shared/components/form/FormItem'
import { Button } from '@/shared/components/ui/Button'
import { Modal } from '@/shared/components/ui/Modal'

const editProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  bio: z.string().max(500, 'Bio cannot exceed 500 characters').optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  location: z.string().max(100, 'Location cannot exceed 100 characters').optional(),
})

type EditProfileFormData = z.infer<typeof editProfileSchema>

interface EditProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

function ProfileForm({ onSuccess }: { onSuccess: () => void }) {
  const { user, updateUser } = useAuthStore()

  const methods = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: '',
      website: '',
      location: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = async (data: EditProfileFormData) => {
    console.log('Updating profile:', data)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    updateUser({ ...user!, name: data.name, email: data.email })

    onSuccess()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg"
          >
            <FiUser className="h-8 w-8" />
          </motion.div>
          <p className="text-sm text-muted-foreground">Update your profile information below</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormItem.Input name="name" label="Full Name *" placeholder="Enter your full name" />
          <FormItem.Input
            name="email"
            label="Email Address *"
            type="email"
            placeholder="your@email.com"
          />
        </div>

        <FormItem.TextArea
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          rows={3}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormItem.Input name="website" label="Website" placeholder="https://yourwebsite.com" />
          <FormItem.Input name="location" label="Location" placeholder="City, Country" />
        </div>

        <div className="flex justify-end space-x-3 border-t pt-6">
          <Button type="submit" disabled={isSubmitting} className="px-6">
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
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const handleSuccess = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile" size="lg">
      <ProfileForm onSuccess={handleSuccess} />
    </Modal>
  )
}
