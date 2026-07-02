import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import ContactForm from '../components/ContactForm'
import MapEmbed from '../components/MapEmbed'

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '0715 579579',
    href: 'tel:0715579579',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@madarakahomes.co.ke',
    href: 'mailto:info@madarakahomes.co.ke',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'TRV Towers, Ngara Road\nSuite 4C, Ngara, Nairobi',
    href: undefined,
  },
  {
    icon: Clock,
    label: 'Business Hours',
    value: 'Monday — Friday: 8:00 AM — 5:00 PM\nSaturday: 9:00 AM — 1:00 PM',
    href: undefined,
  },
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

export default function ContactPage() {
  return (
    <>
      <Hero
        variant="page"
        title="Get in Touch"
        subtitle="Have a question or ready to invest? We'd love to hear from you."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeader
            title="Contact Us"
            subtitle="Reach out via the form below or use any of our contact details."
          />

          <div className="mt-12 grid gap-12 lg:grid-cols-5">
            {/* Form — takes 3 cols */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
            >
              <ContactForm />
            </motion.div>

            {/* Contact Info — takes 2 cols */}
            <motion.div
              className="lg:col-span-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <motion.div
                    key={info.label}
                    variants={fadeUp}
                    className="rounded-xl bg-primary-light p-5 shadow-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                        <info.icon size={22} className="text-white" />
                      </div>
                      <div>
                        <p className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="mt-1 block font-body text-base font-semibold text-charcoal transition-colors hover:text-primary"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="mt-1 font-body text-base font-semibold text-charcoal whitespace-pre-line">
                            {info.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div variants={fadeUp} className="mt-6">
                <MapEmbed src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.654!2d36.816!3d-1.283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zMcKwMDUnMzYuMCJTIDM2wrAwMCc1Ny42IkU!5e0!3m2!1sen!2ske!4v1" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
