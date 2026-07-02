import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

const WHATSAPP_LINK =
  'https://wa.me/254715579579?text=Hello%20Madaraka%20Homes,%20I%27m%20interested%20in%20learning%20more%20about%20your%20properties.'

export default function WhatsAppButton() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg"
      style={{ background: '#25D366' }}
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      whileHover={{ scale: 1.15 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} className="text-white" />
    </motion.a>
  )
}
