import { motion } from 'framer-motion'
import { FiMessageCircle, FiUser } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import type { Post, User } from '@/features/posts/api/posts.api'
import { Button } from '@/shared/components/ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/Card'

interface PostCardProps {
  post: Post
  author?: User
  index?: number
  showFullContent?: boolean
}

export function PostCard({ post, author, index = 0, showFullContent = false }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      layout
    >
      <Card className="h-full border-2 transition-all duration-300 hover:border-primary/20 hover:shadow-lg">
        <CardHeader>
          <div className="mb-2 flex items-start justify-between">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white"
            >
              {post.id}
            </motion.div>
            {author && (
              <div className="flex items-center text-xs text-muted-foreground">
                <FiUser className="mr-1 h-3 w-3" />
                {author.name}
              </div>
            )}
          </div>
          <CardTitle className="line-clamp-2 text-lg leading-tight">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription
            className={`mb-4 text-sm leading-relaxed ${showFullContent ? '' : 'line-clamp-3'}`}
          >
            {post.body}
          </CardDescription>

          <div className="flex items-center justify-between">
            <Link to={`/posts/${post.id}`}>
              <Button variant="ghost" size="sm">
                Read More
              </Button>
            </Link>
            <div className="flex items-center text-xs text-muted-foreground">
              <FiMessageCircle className="mr-1 h-3 w-3" />
              Comments
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
