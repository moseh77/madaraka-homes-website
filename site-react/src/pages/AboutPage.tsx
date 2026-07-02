import { motion } from 'framer-motion'
import { Target, Eye, Heart } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description:
      'To make land ownership accessible and transparent for every Kenyan, providing prime investment opportunities that build lasting wealth and communities.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description:
      'To be Kenya\'s most trusted real estate company, transforming the landscape of land ownership through integrity, innovation, and exceptional service.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description:
      'Integrity in every transaction. Transparency in every deal. Commitment to our clients\' dreams. We build relationships that last as long as the land we sell.',
  },
]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        variant="page"
        title="Our Story"
        subtitle="Building Kenya's future, one plot at a time."
      />

      {/* Company Story */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <SectionHeader
            title="Who We Are"
            subtitle="A Kenyan real estate company with a passion for land and community."
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="space-y-5"
          >
            <p className="font-body text-base leading-relaxed text-charcoal md:text-lg">
              Madaraka Homes Ltd was founded on a simple belief: every Kenyan deserves the
              opportunity to own land. What started as a vision to connect people with prime
              property has grown into a trusted real estate company serving hundreds of
              families across Kenya.
            </p>
            <p className="font-body text-base leading-relaxed text-charcoal md:text-lg">
              Headquartered at TRV Towers on Ngara Road, Nairobi, we specialize in residential
              and commercial land sales, offering carefully verified plots in Kenya's most
              promising locations. From the growing suburbs of Juja to the strategic
              commercial hubs of Nairobi, we source properties that offer real value and
              long-term appreciation.
            </p>
            <p className="font-body text-base leading-relaxed text-charcoal md:text-lg">
              Our team brings decades of combined experience in real estate, land
              valuation, and property law. We handle every aspect of the land buying
              process — from due diligence and title verification to documentation and
              transfer — so our clients can invest with complete peace of mind.
            </p>
            <p className="font-body text-base leading-relaxed text-charcoal md:text-lg">
              At Madaraka Homes, we don&apos;t just sell land. We help build legacies.
              Your land. Your legacy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="bg-primary-light py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {values.map((v) => (
              <motion.div
                key={v.title}
                variants={fadeUp}
                className="rounded-xl bg-card p-8 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-light">
                  <v.icon size={32} className="text-accent" />
                </div>
                <h3 className="mt-5 text-center font-display text-xl font-semibold text-charcoal">
                  {v.title}
                </h3>
                <p className="mt-3 text-center font-body text-sm leading-relaxed text-charcoal-muted">
                  {v.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <CTABanner
            title="Want to Learn More?"
            subtitle="Reach out to our team and discover how we can help you find the perfect plot."
            buttonText="Contact Us"
            buttonLink="/contact"
          />
        </div>
      </section>
    </>
  )
}
