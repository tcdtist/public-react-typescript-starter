import { motion } from 'framer-motion'
import {
  FiArrowRight,
  FiCode,
  FiGlobe,
  FiShield,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

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

const features = [
  {
    icon: FiCode,
    title: 'Modern Stack',
    description:
      'Built with React 18, TypeScript, Vite, and Tailwind CSS for the best developer experience.',
  },
  {
    icon: FiZap,
    title: 'Lightning Fast',
    description:
      'Optimized for performance with code splitting, lazy loading, and modern build tools.',
  },
  {
    icon: FiShield,
    title: 'Type Safe',
    description: 'Full TypeScript support with strict type checking and excellent IntelliSense.',
  },
  {
    icon: FiGlobe,
    title: 'Responsive',
    description: 'Mobile-first design that looks great on all devices and screen sizes.',
  },
  {
    icon: FiUsers,
    title: 'Developer Friendly',
    description: 'Comprehensive documentation, examples, and best practices included.',
  },
  {
    icon: FiTrendingUp,
    title: 'Production Ready',
    description: 'Includes testing, linting, and deployment configurations out of the box.',
  },
]

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

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-background to-muted/20 py-20 sm:py-32">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div
            variants={itemVariants}
            className="mb-8 inline-flex items-center rounded-full bg-muted px-4 py-2 text-sm"
          >
            <span className="text-muted-foreground">
              🚀 Welcome to the future of web development
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl"
          >
            Build Amazing
            <span className="block bg-brand-gradient bg-clip-text text-transparent">
              React Apps
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            A modern, feature-rich React + TypeScript starter template with everything you need to
            build production-ready applications quickly and efficiently.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/posts">
              <Button size="lg" className="w-full sm:w-auto">
                Explore Posts
                <FiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      {/* Background Decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute inset-0 -z-10"
      >
        <div className="absolute left-1/4 top-1/4 h-96 w-96 animate-pulse rounded-full bg-brand-pink mix-blend-multiply blur-xl filter" />
        <div className="animation-delay-2000 absolute right-1/4 top-1/3 h-96 w-96 animate-pulse rounded-full bg-brand-purple mix-blend-multiply blur-xl filter" />
        <div className="animation-delay-4000 absolute bottom-1/4 left-1/2 h-96 w-96 animate-pulse rounded-full bg-brand-blue mix-blend-multiply blur-xl filter" />
      </motion.div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section className="py-20 sm:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything you need to get started
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Our template includes all the modern tools and best practices to help you build
              amazing applications faster.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div key={feature.title} variants={itemVariants} custom={index}>
                  <Card className="h-full border-2 transition-shadow duration-300 hover:border-primary/20 hover:shadow-lg">
                    <CardHeader>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"
                      >
                        <Icon className="h-6 w-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function CTASection() {
  return (
    <section className="bg-muted/30 py-20 sm:py-32">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.h2 variants={itemVariants} className="mb-6 text-3xl font-bold sm:text-4xl">
            Ready to start building?
          </motion.h2>
          <motion.p variants={itemVariants} className="mb-8 text-lg text-muted-foreground">
            Join thousands of developers who are already building amazing applications with our
            React template.
          </motion.p>
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Now
                <FiArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

export function HomePage() {
  return (
    <Layout>
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </Layout>
  )
}
