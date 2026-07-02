import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { cn } from '../lib/utils'

interface HeroProps {
  variant: 'home' | 'page'
  title: string
  subtitle?: string
  cta?: { label: string; to: string }
  image?: string
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.4 } },
}

const springBtn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 15, delay: 0.6 } },
}

export default function Hero({ variant, title, subtitle, cta, image }: HeroProps) {
  const isHome = variant === 'home'

  // Split title into words for staggered animation
  const words = title.split(' ')

  return (
    <section
      className={cn(
        'relative flex items-center overflow-hidden',
        isHome ? 'min-h-screen' : 'min-h-[40vh]',
      )}
    >
      {/* Background Image with Ken Burns zoom */}
      <motion.div
        className="absolute inset-0"
        initial={isHome ? { scale: 1 } : undefined}
        animate={isHome ? { scale: 1.06 } : undefined}
        transition={{ duration: 12, ease: 'easeOut', repeat: Infinity, repeatType: 'reverse' }}
      >
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${image || 'https://placehold.co/1920x1080/9A3412/FFFFFF?text=Madaraka+Homes'})`,
          }}
        />
        {/* Gradient Overlay */}
        <div
          className={cn(
            'absolute inset-0',
            isHome
              ? 'bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-transparent'
              : 'bg-charcoal/60',
          )}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className={cn(
          'relative z-10 mx-auto w-full px-4 md:px-8',
          isHome ? 'max-w-7xl pt-24 pb-20' : 'max-w-5xl pt-24 pb-16 text-center',
        )}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title with staggered words */}
        <h1
          className={cn(
            'font-display font-bold leading-tight text-white',
            isHome ? 'text-4xl md:text-6xl lg:text-7xl' : 'text-3xl md:text-5xl',
          )}
        >
          {words.map((word, i) => {
            const isLast = i === words.length - 1
            const isAccent = word.toLowerCase() === 'legacy.' || word.toLowerCase() === 'legacy'
            return (
              <motion.span
                key={i}
                variants={wordVariants}
                className={cn(
                  'mr-[0.25em] inline-block',
                  isAccent && 'text-accent',
                )}
              >
                {word}
              </motion.span>
            )
          })}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            variants={fadeUp}
            className={cn(
              'mt-6 font-body leading-relaxed text-gray-200',
              isHome ? 'max-w-xl text-lg md:text-xl' : 'mx-auto max-w-2xl text-base md:text-lg',
            )}
          >
            {subtitle}
          </motion.p>
        )}

        {/* CTAs */}
        {isHome ? (
          <motion.div variants={springBtn} className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Explore Projects
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/40 px-6 py-3 font-body text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
            >
              Get in Touch
            </Link>
          </motion.div>
        ) : cta ? (
          <motion.div variants={springBtn} className="mt-8">
            <Link
              to={cta.to}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              {cta.label}
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  )
}
