import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function ScrollUX() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setShowTop(v > 0.08) // ~500px for a typical viewport
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-primary"
        style={{ scaleX }}
      />

      {/* Scroll-to-Top Button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors hover:bg-primary-hover"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
