import { motion } from 'framer-motion'

interface SectionHeaderProps {
  title: string
  subtitle?: string
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="mb-12 text-center"
    >
      <h2 className="font-display text-3xl font-bold text-charcoal md:text-4xl">
        {title}
      </h2>

      {subtitle && (
        <p className="mx-auto mt-3 max-w-2xl font-body text-base text-charcoal-muted md:text-lg">
          {subtitle}
        </p>
      )}

      {/* African textile pattern divider */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="block h-px w-16 bg-warm-border" />
        <span className="block h-3 w-3 rotate-45 bg-primary" />
        <span className="block h-3 w-3 rotate-45 bg-accent" />
        <span className="block h-3 w-3 rotate-45 bg-secondary" />
        <span className="block h-3 w-3 rotate-45 bg-accent" />
        <span className="block h-3 w-3 rotate-45 bg-primary" />
        <span className="block h-px w-16 bg-warm-border" />
      </div>
    </motion.div>
  )
}
