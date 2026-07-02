import { motion } from 'framer-motion'

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  avatar?: string
}

export default function TestimonialCard({ quote, name, role, avatar }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="relative rounded-xl bg-card p-8 shadow-card"
    >
      {/* Large decorative quote mark */}
      <span
        className="absolute top-2 left-4 font-display text-7xl leading-none opacity-10"
        style={{ color: '#9A3412' }}
      >
        &ldquo;
      </span>

      <p className="relative z-10 font-body text-base leading-relaxed italic text-charcoal md:text-lg">
        {quote}
      </p>

      <div className="mt-6 flex items-center gap-4 border-t border-warm-border pt-4">
        {/* Avatar */}
        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-primary-light">
          {avatar ? (
            <img src={avatar} alt={name} className="h-full w-full object-cover" />
          ) : (
            <span className="font-display text-lg font-bold text-primary">
              {name.charAt(0)}
            </span>
          )}
        </div>

        <div>
          <p className="font-display text-sm font-semibold text-charcoal">{name}</p>
          <p className="font-body text-xs text-charcoal-muted">{role}</p>
        </div>
      </div>
    </motion.div>
  )
}
