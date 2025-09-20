import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { FiLoader, FiSearch } from 'react-icons/fi'

import { PostCard } from '@/features/posts/components/PostCard'
import { type Post, type User, useAllPosts, useUsers } from '@/features/posts/hooks/use-posts'
import { Container } from '@/shared/components/layout/Container'
import { Layout } from '@/shared/components/layout/Layout'
import { Button } from '@/shared/components/ui/Button'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

function ErrorMessage() {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold text-destructive">Error Loading Posts</h1>
      <p className="text-muted-foreground">Unable to load posts. Please try again later.</p>
    </div>
  )
}

function Header() {
  return (
    <motion.div variants={itemVariants} className="mb-8">
      <h1 className="mb-4 text-3xl font-bold sm:text-4xl">Latest Posts</h1>
      <p className="text-lg text-muted-foreground">Discover amazing content from our community</p>
    </motion.div>
  )
}

function SearchBar({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <motion.div variants={itemVariants} className="mb-8">
      <div className="relative max-w-md">
        <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>
    </motion.div>
  )
}

function Loading() {
  return (
    <motion.div variants={itemVariants} className="flex justify-center py-20">
      <div className="flex items-center space-x-2 text-muted-foreground">
        <FiLoader className="h-6 w-6 animate-spin" />
        <span>Loading posts...</span>
      </div>
    </motion.div>
  )
}

function PostsGrid({ posts, userMap }: { posts: Post[]; userMap: Record<number, User> }) {
  return (
    <AnimatePresence>
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {posts.map((post, index) => (
          <PostCard key={post.id} post={post} author={userMap[post.userId]} index={index} />
        ))}
      </motion.div>
    </AnimatePresence>
  )
}

function EmptyState({
  searchTerm,
  filteredPostsLength,
  setSearchTerm,
}: {
  searchTerm: string
  filteredPostsLength: number
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}) {
  if (filteredPostsLength > 0 || !searchTerm) return null
  return (
    <motion.div variants={itemVariants} className="py-20 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <FiSearch className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mb-2 text-lg font-semibold">No posts found</h3>
      <p className="mb-4 text-muted-foreground">
        Try adjusting your search terms or browse all posts.
      </p>
      <Button variant="outline" onClick={() => setSearchTerm('')}>
        Clear Search
      </Button>
    </motion.div>
  )
}

function Stats({
  postsLength,
  filteredPostsLength,
  searchTerm,
}: {
  postsLength?: number
  filteredPostsLength: number
  searchTerm: string
}) {
  if (!postsLength) return null
  return (
    <motion.div variants={itemVariants} className="mt-12 text-center text-sm text-muted-foreground">
      Showing {filteredPostsLength} of {postsLength} posts
      {searchTerm && ` for "${searchTerm}"`}
    </motion.div>
  )
}

export function PostsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const { data: posts, isLoading: postsLoading, error: postsError } = useAllPosts()
  const { data: users } = useUsers()

  const userMap =
    users?.reduce(
      (acc, user) => {
        acc[user.id] = user
        return acc
      },
      {} as Record<number, (typeof users)[0]>
    ) || {}

  const filteredPosts =
    posts?.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
    ) || []

  if (postsError) {
    return (
      <Layout>
        <Container className="py-20">
          <ErrorMessage />
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <Container className="py-8 sm:py-12">
        <motion.div initial="hidden" animate="visible" variants={containerVariants}>
          <Header />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {postsLoading ? (
            <Loading />
          ) : (
            <>
              <PostsGrid posts={filteredPosts} userMap={userMap} />
              <EmptyState
                searchTerm={searchTerm}
                filteredPostsLength={filteredPosts.length}
                setSearchTerm={setSearchTerm}
              />
              <Stats
                postsLength={posts?.length}
                filteredPostsLength={filteredPosts.length}
                searchTerm={searchTerm}
              />
            </>
          )}
        </motion.div>
      </Container>
    </Layout>
  )
}
