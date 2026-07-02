import { motion } from 'framer-motion'

interface MapEmbedProps {
  src: string
}

export default function MapEmbed({ src }: MapEmbedProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="overflow-hidden rounded-xl shadow-card"
    >
      <iframe
        src={src}
        width="100%"
        height="350"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Location Map"
        className="w-full"
      />
    </motion.div>
  )
}
