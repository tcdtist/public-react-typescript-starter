import { motion } from 'framer-motion'
import {
  FiArrowLeft,
  FiCalendar,
  FiGlobe,
  FiLoader,
  FiMail,
  FiMessageCircle,
  FiUser,
} from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'

import {
  type Comment,
  type Post,
  type User,
  usePostComments,
  usePostWithUser,
} from '@/features/posts/hooks/use-posts'
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold text-destructive">Error Loading Post</h1>
      <p className="mb-4 text-muted-foreground">{message}</p>
      <Link to="/posts">
        <Button variant="outline">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Posts
        </Button>
      </Link>
    </div>
  )
}

function LoadingMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <FiLoader className="h-6 w-6 animate-spin" />
        <span>{text}</span>
      </div>
    </div>
  )
}

function BackButton() {
  return (
    <Link to="/posts">
      <Button variant="ghost" size="sm">
        <FiArrowLeft className="mr-2 h-4 w-4" />
        Back to Posts
      </Button>
    </Link>
  )
}

function PostHeader({ post, user, comments }: { post: Post; user?: User; comments?: Comment[] }) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="mb-4 flex items-center justify-between">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient text-lg font-bold text-white"
          >
            {post.id}
          </motion.div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center">
              <FiCalendar className="mr-1 h-3 w-3" />
              Published
            </span>
            {comments && (
              <span className="flex items-center">
                <FiMessageCircle className="mr-1 h-3 w-3" />
                {comments.length} comments
              </span>
            )}
          </div>
        </div>
        <CardTitle className="text-2xl leading-tight sm:text-3xl">{post.title}</CardTitle>
        {user && (
          <CardDescription className="flex items-center text-base">
            <FiUser className="mr-2 h-4 w-4" />
            By {user.name} (@{user.username})
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  )
}

function PostContent({ post }: { post: Post }) {
  return (
    <Card className="mb-8">
      <CardContent className="pt-6">
        <div className="prose prose-lg max-w-none">
          <p className="whitespace-pre-line text-base leading-relaxed">{post.body}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function CommentsSection({
  comments,
  commentsLoading,
}: {
  comments?: Comment[]
  commentsLoading: boolean
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FiMessageCircle className="mr-2 h-5 w-5" />
          Comments {comments && `(${comments.length})`}
        </CardTitle>
        <CardDescription>Join the conversation and share your thoughts</CardDescription>
      </CardHeader>
      <CardContent>
        {commentsLoading ? (
          <div className="flex justify-center py-8">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <FiLoader className="h-4 w-4 animate-spin" />
              <span>Loading comments...</span>
            </div>
          </div>
        ) : comments && comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-l-4 border-primary/20 pl-4"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-semibold">{comment.name}</h4>
                    <p className="flex items-center text-xs text-muted-foreground">
                      <FiMail className="mr-1 h-3 w-3" />
                      {comment.email}
                    </p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">{comment.body}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <FiMessageCircle className="mx-auto mb-2 h-12 w-12 opacity-50" />
            <p>No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function AuthorCard({ user }: { user: User }) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg">About the Author</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center space-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-gradient text-xl font-bold text-white"
          >
            {user.name.charAt(0)}
          </motion.div>
          <div>
            <h4 className="font-semibold">{user.name}</h4>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <FiMail className="mr-2 h-4 w-4" />
            {user.email}
          </div>
          {user.website && (
            <div className="flex items-center text-muted-foreground">
              <FiGlobe className="mr-2 h-4 w-4" />
              <a
                href={`http://${user.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-primary"
              >
                {user.website}
              </a>
            </div>
          )}
          {user.company && (
            <div className="mt-4 rounded-lg bg-muted/20 p-3">
              <p className="text-sm font-medium">{user.company.name}</p>
              <p className="text-xs text-muted-foreground">{user.company.catchPhrase}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function MoreActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">More Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Link to="/posts" className="block">
          <Button variant="outline" className="w-full justify-start">
            <FiArrowLeft className="mr-2 h-4 w-4" />
            All Posts
          </Button>
        </Link>
        <Button variant="ghost" className="w-full justify-start">
          <FiMessageCircle className="mr-2 h-4 w-4" />
          Share Post
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <FiUser className="mr-2 h-4 w-4" />
          Follow Author
        </Button>
      </CardContent>
    </Card>
  )
}

export function PostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const postId = Number(id)

  const { post, user, isLoading, error } = usePostWithUser(postId)
  const { data: comments, isLoading: commentsLoading } = usePostComments(postId)

  if (error) {
    return (
      <Layout>
        <Container className="py-20">
          <ErrorMessage message="Unable to load the requested post. Please try again later." />
        </Container>
      </Layout>
    )
  }

  if (isLoading) {
    return (
      <Layout>
        <Container className="py-20">
          <LoadingMessage text="Loading post..." />
        </Container>
      </Layout>
    )
  }

  if (!post) {
    return (
      <Layout>
        <Container className="py-20">
          <ErrorMessage message="The post you're looking for doesn't exist or has been removed." />
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container className="py-8 sm:py-12">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <motion.div variants={itemVariants} className="mb-8">
            <BackButton />
          </motion.div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <motion.div variants={itemVariants}>
                <PostHeader post={post} user={user} comments={comments} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <PostContent post={post} />
              </motion.div>

              <motion.div variants={itemVariants}>
                <CommentsSection comments={comments} commentsLoading={commentsLoading} />
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              {user && (
                <motion.div variants={itemVariants}>
                  <AuthorCard user={user} />
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <MoreActions />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Layout>
  )
}
