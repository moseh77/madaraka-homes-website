import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Globe, MessageCircle, Share2, Mail, Phone, MapPin } from 'lucide-react'

const quickLinks = [
  { to: '/about', label: 'About Us' },
  { to: '/projects', label: 'Our Projects' },
  { to: '/contact', label: 'Contact' },
  { to: '/blog', label: 'Insights' },
  { to: '/payment-plans', label: 'Payment Plans' },
]

const resources = [
  { to: '/blog', label: 'Land Buying Guide' },
  { to: '/payment-plans', label: 'Financing Options' },
  { to: '/about', label: 'Why Choose Us' },
  { to: '/contact', label: 'FAQs' },
]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Footer() {
  return (
    <footer>
      {/* African textile-inspired gradient bar */}
      <div
        className="h-2 w-full"
        style={{
          background: 'repeating-linear-gradient(90deg, #9A3412 0px, #9A3412 20px, #B45309 20px, #B45309 40px, #059669 40px, #059669 60px)',
        }}
      />

      <div className="bg-charcoal text-white">
        <motion.div
          className="mx-auto max-w-7xl px-4 py-16 md:px-8"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <motion.div variants={fadeUp}>
              <h3 className="font-display text-xl font-bold tracking-wide">
                Madaraka<span className="text-secondary"> Homes</span>
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray-300">
                Your trusted partner in Kenyan real estate. Building communities, one plot at a time.
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://www.facebook.com/madarakahomesltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 transition-colors hover:bg-primary"
                  aria-label="Facebook"
                >
                  <MessageCircle size={18} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 transition-colors hover:bg-primary"
                  aria-label="Twitter"
                >
                  <Share2 size={18} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 p-2 transition-colors hover:bg-primary"
                  aria-label="LinkedIn"
                >
                  <Globe size={18} />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeUp}>
              <h4 className="font-display text-base font-semibold tracking-wide">Quick Links</h4>
              <ul className="mt-4 space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-body text-sm text-gray-300 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div variants={fadeUp}>
              <h4 className="font-display text-base font-semibold tracking-wide">Resources</h4>
              <ul className="mt-4 space-y-2">
                {resources.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-body text-sm text-gray-300 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={fadeUp}>
              <h4 className="font-display text-base font-semibold tracking-wide">Stay Updated</h4>
              <p className="mt-2 font-body text-sm text-gray-300">
                Get the latest property news and offers.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-4 flex flex-col gap-2"
              >
                <input
                  type="email"
                  placeholder="Your email"
                  className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 font-body text-sm text-white placeholder-gray-400 focus:border-primary focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                >
                  Subscribe
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 md:flex-row md:px-8">
            <p className="font-body text-xs text-gray-400">
              &copy; {new Date().getFullYear()} Madaraka Homes Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
              <span className="flex items-center gap-1">
                <MapPin size={12} />
                TRV Towers, Ngara Road Suite 4C, Ngara, Nairobi
              </span>
              <span className="flex items-center gap-1">
                <Phone size={12} />
                0715 579579
              </span>
              <span className="flex items-center gap-1">
                <Mail size={12} />
                info@madarakahomes.co.ke
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
