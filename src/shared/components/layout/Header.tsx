import { useState } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import {
  FiEdit3,
  FiHome,
  FiInfo,
  FiLogOut,
  FiMail,
  FiMenu,
  FiMessageCircle,
  FiUser,
  FiX,
} from 'react-icons/fi'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAuthStore } from '@/features/auth/store/auth.store'
import { Container } from '@/shared/components/layout/Container'
import { Button } from '@/shared/components/ui/Button'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: FiHome },
  { label: 'Posts', href: '/posts', icon: FiEdit3 },
  { label: 'About', href: '/about', icon: FiInfo },
  { label: 'Contact', href: '/contact', icon: FiMail },
  { label: 'Chat', href: '/chat', icon: FiMessageCircle },
]

function AuthButtonsDesktop({ onLogout, user }: { onLogout: () => void; user: { name: string } }) {
  return (
    <>
      <Link to="/profile" className="group">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex cursor-pointer items-center space-x-2 rounded-md bg-muted/30 px-3 py-2 text-sm transition-colors duration-200 group-hover:bg-accent/50"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-gradient text-xs font-bold text-white">
            {user.name.charAt(0)}
          </div>
          <span className="font-medium text-foreground">{user.name}</span>
        </motion.div>
      </Link>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button variant="ghost" size="sm" onClick={onLogout}>
          <FiLogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </motion.div>
    </>
  )
}

function AuthButtonsMobile({
  onLogout,
  user,
  closeMenu,
}: {
  onLogout: () => void
  user: { name: string; email: string }
  closeMenu: () => void
}) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center space-x-3 rounded-md bg-muted/30 px-3 py-2"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient text-sm font-bold text-white">
          {user.name.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-medium text-foreground">{user.name}</div>
          <div className="text-xs text-muted-foreground">{user.email}</div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link to="/profile" onClick={closeMenu}>
          <Button variant="ghost" className="w-full justify-start">
            <FiUser className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
          <FiLogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </motion.div>
    </>
  )
}

function NavLinks({
  isMobile = false,
  onLinkClick,
}: {
  isMobile?: boolean
  onLinkClick?: () => void
}) {
  const location = useLocation()
  return (
    <>
      {navItems.map((item, index) => {
        const isActive = location.pathname === item.href
        const Icon = item.icon

        if (isMobile) {
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={item.href} onClick={onLinkClick} className="relative block">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="mobileActiveTab"
                      className="absolute inset-0 rounded-md bg-primary"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          )
        }

        return (
          <Link key={item.href} to={item.href} className="relative">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="desktopActiveTab"
                  className="absolute inset-0 rounded-md bg-primary"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                />
              )}
            </motion.div>
          </Link>
        )
      })}
    </>
  )
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { isAuthenticated, user, logout } = useAuthStore()

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsMenuOpen(false)
  }

  return (
    <motion.header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-8 w-8 items-center justify-center rounded bg-brand-gradient"
            >
              <span className="text-sm font-bold text-white">RT</span>
            </motion.div>
            <span className="bg-brand-gradient bg-clip-text text-lg font-bold text-transparent">
              React Template
            </span>
          </Link>

          <nav className="hidden items-center space-x-1 md:flex">
            <NavLinks />
          </nav>

          <div className="hidden items-center space-x-3 md:flex">
            {isAuthenticated && user ? (
              <AuthButtonsDesktop user={user} onLogout={handleLogout} />
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link to="/signup">
                    <Button size="sm">Sign up</Button>
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
            <motion.div animate={{ rotate: isMenuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
              {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
            </motion.div>
          </Button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t bg-background md:hidden"
            >
              <div className="space-y-1 py-4">
                <NavLinks isMobile onLinkClick={closeMenu} />

                <div className="space-y-3 border-t px-4 pb-4 pt-4">
                  {isAuthenticated && user ? (
                    <AuthButtonsMobile user={user} onLogout={handleLogout} closeMenu={closeMenu} />
                  ) : (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Link to="/login" onClick={closeMenu}>
                          <Button variant="ghost" className="w-full justify-start">
                            Login
                          </Button>
                        </Link>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Link to="/signup" onClick={closeMenu}>
                          <Button className="w-full justify-start">Sign up</Button>
                        </Link>
                      </motion.div>
                    </>
                  )}
                </div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </Container>
    </motion.header>
  )
}
