import { useEffect, useRef } from 'react'
import { motion, useMotionValue, animate, useInView } from 'framer-motion'

interface StatCounterProps {
  count: number
  label: string
  suffix?: string
}

export default function StatCounter({ count, label, suffix = '+' }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const displayValue = useMotionValue(0)

  useEffect(() => {
    if (isInView) {
      const controls = animate(displayValue, count, {
        type: 'spring',
        stiffness: 60,
        damping: 20,
        duration: 1.5,
      })
      return controls.stop
    }
  }, [isInView, count, displayValue])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <span className="font-display text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
        <motion.span>{displayValue}</motion.span>
        <span>{suffix}</span>
      </span>
      <p className="mt-2 font-body text-base font-medium text-charcoal-muted">
        {label}
      </p>
    </motion.div>
  )
}
