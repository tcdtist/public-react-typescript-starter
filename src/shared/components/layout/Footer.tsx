import { motion } from 'framer-motion'
import { FiGithub, FiHeart, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import { Container } from '@/shared/components/layout/Container'

const socialLinks = [
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
  { icon: FiMail, href: '#', label: 'Email' },
]

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'API', href: '#' },
      { label: 'Documentation', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blog', href: '/posts' },
      { label: 'Careers', href: '#' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', href: '#' },
      { label: 'Community', href: '#' },
      { label: 'Status', href: '#' },
      { label: 'Privacy', href: '#' },
    ],
  },
]

function BrandSection() {
  return (
    <div className="space-y-4">
      <Link to="/" className="flex items-center space-x-2">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex h-8 w-8 items-center justify-center rounded bg-brand-gradient"
        >
          <span className="text-sm font-bold text-white">RT</span>
        </motion.div>
        <span className="bg-brand-gradient bg-clip-text text-lg font-bold text-transparent">
          React Template
        </span>
      </Link>
      <p className="text-sm leading-relaxed text-muted-foreground">
        A modern React + TypeScript starter template with Vite, Tailwind CSS, and feature-based
        architecture for building amazing applications.
      </p>

      <SocialLinks />
    </div>
  )
}

function SocialLinks() {
  return (
    <div className="flex space-x-3">
      {socialLinks.map((social, index) => {
        const Icon = social.icon
        return (
          <motion.a
            key={social.label}
            href={social.href}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon className="h-4 w-4" />
            <span className="sr-only">{social.label}</span>
          </motion.a>
        )
      })}
    </div>
  )
}

function FooterLinks() {
  return (
    <>
      {footerLinks.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (sectionIndex + 1) * 0.1 }}
          className="space-y-4"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
            {section.title}
          </h3>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </>
  )
}

function NewsletterSignup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 border-t pt-8"
    >
      <div className="max-w-md">
        <h3 className="mb-3 text-sm font-semibold">Stay updated</h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Get the latest updates about new features and improvements.
        </p>
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Subscribe
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

function BottomBar() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="mt-8 flex flex-col items-center justify-between space-y-4 border-t pt-8 sm:flex-row sm:space-y-0"
    >
      <div className="flex items-center text-sm text-muted-foreground">
        <span>© 2024 React Template. Made with</span>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="mx-1"
        >
          <FiHeart className="h-4 w-4 text-red-500" />
        </motion.div>
        <span>by tcdtist</span>
      </div>
      <div className="flex space-x-6 text-sm text-muted-foreground">
        <Link to="#" className="transition-colors hover:text-foreground">
          Terms
        </Link>
        <Link to="#" className="transition-colors hover:text-foreground">
          Privacy
        </Link>
        <Link to="#" className="transition-colors hover:text-foreground">
          Cookies
        </Link>
      </div>
    </motion.div>
  )
}

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <BrandSection />
            <FooterLinks />
          </div>
          <NewsletterSignup />
          <BottomBar />
        </div>
      </Container>
    </footer>
  )
}
