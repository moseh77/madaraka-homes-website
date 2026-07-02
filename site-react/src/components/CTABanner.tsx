import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface CTABannerProps {
  title: string
  subtitle?: string
  buttonText: string
  buttonLink: string
}

export default function CTABanner({ title, subtitle, buttonText, buttonLink }: CTABannerProps) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 md:px-16 md:py-20"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="relative z-10 text-center">
        <h2 className="font-display text-2xl font-bold text-white md:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-xl font-body text-base text-white/80 md:text-lg">
            {subtitle}
          </p>
        )}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8"
        >
          <Link
            to={buttonLink}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-white/60 px-8 py-3 font-body text-sm font-semibold text-white transition-all hover:bg-white hover:text-primary"
          >
            {buttonText}
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
