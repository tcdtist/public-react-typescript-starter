import { motion } from 'framer-motion'

import { Footer } from './Footer'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
}

const pageTransition = {
  duration: 0.3,
  ease: [0.4, 0.0, 0.2, 1] as const,
}

export function Layout({ children, className = '' }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <motion.main
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
        className={`flex-1 ${className}`}
      >
        {children}
      </motion.main>

      <Footer />
    </div>
  )
}
