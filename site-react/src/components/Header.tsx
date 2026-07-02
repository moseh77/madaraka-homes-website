import { useState, useRef } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from 'framer-motion'
import { Phone, Menu, X } from 'lucide-react'
import { cn } from '../lib/utils'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
  { to: '/blog', label: 'Insights' },
  { to: '/payment-plans', label: 'Payment Plans' },
]

const linkVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.1 * i, duration: 0.3 },
  }),
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollY } = useScroll()
  const headerRef = useRef<HTMLDivElement>(null)

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 40)
  })

  return (
    <header
      ref={headerRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/90 backdrop-blur-lg shadow-card'
          : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold tracking-wide text-primary md:text-2xl">
            Madaraka
            <span className="text-secondary"> Homes</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'font-body text-sm font-medium tracking-wide transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-charcoal-muted hover:text-primary',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Phone CTA */}
        <a
          href="tel:0715579579"
          className="hidden items-center gap-2 rounded-lg bg-primary px-4 py-2 font-body text-sm font-semibold text-white transition-colors duration-200 hover:bg-primary-hover lg:inline-flex"
        >
          <Phone size={16} />
          0715 579579
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-charcoal p-2 lg:hidden"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={mobileOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-warm-border bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  custom={i}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-md px-3 py-2 font-body text-base font-medium transition-colors',
                        isActive
                          ? 'bg-primary-light text-primary'
                          : 'text-charcoal-muted hover:bg-primary-light hover:text-primary',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <a
                href="tel:0715579579"
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
              >
                <Phone size={16} />
                0715 579579
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
