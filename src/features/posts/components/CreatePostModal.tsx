import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { FormProvider, useForm } from 'react-hook-form'
import { FiEdit, FiLoader, FiSend } from 'react-icons/fi'
import { z } from 'zod'

import { useAuthStore } from '@/features/auth/store/auth.store'
import { FormItem } from '@/shared/components/form/FormItem'
import { Button } from '@/shared/components/ui/Button'
import { Modal } from '@/shared/components/ui/Modal'

const createPostSchema = z.object({
  title: z
    .string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title cannot exceed 100 characters'),
  body: z
    .string()
    .min(10, 'Content must be at least 10 characters')
    .max(5000, 'Content cannot exceed 5000 characters'),
  tags: z.string().optional(),
})

type CreatePostFormData = z.infer<typeof createPostSchema>

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
}

function PostForm({ onSuccess }: { onSuccess: () => void }) {
  const { user } = useAuthStore()

  const methods = useForm<CreatePostFormData>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: '',
      body: '',
      tags: '',
    },
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
    watch,
  } = methods

  const bodyContent = watch('body')
  const wordCount = bodyContent?.split(' ').filter(Boolean).length || 0

  const onSubmit = async (data: CreatePostFormData) => {
    console.log('Creating post:', {
      ...data,
      userId: user?.id,
      createdAt: new Date().toISOString(),
    })

    await new Promise((resolve) => setTimeout(resolve, 2000))

    reset()
    onSuccess()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg"
          >
            <FiEdit className="h-6 w-6" />
          </motion.div>
          <p className="text-sm text-muted-foreground">Share your thoughts with the community</p>
        </div>

        <FormItem.Input name="title" label="Post Title *" placeholder="What's your post about?" />

        <div className="space-y-2">
          <FormItem.TextArea
            name="body"
            label="Content *"
            placeholder="Write your post content here..."
            rows={8}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{wordCount} words</span>
            <span>{bodyContent?.length || 0}/5000 characters</span>
          </div>
        </div>

        <FormItem.Input
          name="tags"
          label="Tags"
          placeholder="technology, programming, tips (separate with commas)"
        />

        <div className="rounded-lg border bg-muted/20 p-4">
          <h4 className="mb-2 font-medium">Preview</h4>
          <div className="space-y-2">
            <h5 className="font-semibold">{watch('title') || 'Your post title'}</h5>
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {watch('body') || 'Your post content will appear here...'}
            </p>
            {watch('tags') && (
              <div className="flex flex-wrap gap-1">
                {watch('tags')
                  ?.split(',')
                  .map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 border-t pt-6">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Clear
          </Button>
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
                Publishing...
              </>
            ) : (
              <>
                <FiSend className="mr-2 h-4 w-4" />
                Publish Post
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export function CreatePostModal({ isOpen, onClose }: CreatePostModalProps) {
  const handleSuccess = () => {
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Post" size="xl">
      <PostForm onSuccess={handleSuccess} />
    </Modal>
  )
}
