import { useEffect, useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'

interface LightboxProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  initialIndex?: number
}

export default function Lightbox({
  images,
  isOpen,
  onClose,
  initialIndex = 0,
}: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)

  // Sync index when lightbox opens with a new initialIndex
  useEffect(() => {
    if (isOpen) {
      setIndex(Math.min(initialIndex, images.length - 1))
    }
  }, [isOpen, initialIndex, images.length])

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(i + 1, images.length - 1))
  }, [images.length])

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(i - 1, 0))
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose, goNext, goPrev])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <X size={24} />
          </button>

          {/* Navigation Arrows */}
          {index > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Previous image"
            >
              <ArrowLeft size={28} />
            </button>
          )}
          {index < images.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Next image"
            >
              <ArrowRight size={28} />
            </button>
          )}

          {/* Image with AnimatePresence */}
          <div
            className="flex max-h-[80vh] max-w-[90vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={index}
                src={images[index]}
                alt={`Image ${index + 1}`}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
                className="max-h-[80vh] max-w-[90vw] rounded-lg object-contain"
              />
            </AnimatePresence>
          </div>

          {/* Thumbnail Strip */}
          <div
            className="absolute bottom-4 flex items-center gap-2 overflow-x-auto px-4 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`h-14 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                  i === index
                    ? 'border-white opacity-100'
                    : 'border-transparent opacity-50 hover:opacity-75'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
