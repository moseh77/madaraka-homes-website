import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Percent, ShieldCheck, Clock, ArrowRight, ClipboardCheck, Handshake, Key } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import CTABanner from '../components/CTABanner'

const steps = [
  {
    icon: ClipboardCheck,
    title: 'Choose Your Plot',
    description: 'Browse our available projects and select the plot that fits your needs and budget.',
  },
  {
    icon: Handshake,
    title: 'Agree on Terms',
    description: 'Our team will walk you through the payment plan options and help you choose the best structure.',
  },
  {
    icon: Key,
    title: 'Own Your Land',
    description: 'Make your payments as agreed, and receive your title deed upon completion.',
  },
]

const benefits = [
  {
    icon: Percent,
    title: '0% Interest',
    description: 'All our payment plans are interest-free. You pay exactly the agreed price, spread over manageable instalments.',
  },
  {
    icon: ShieldCheck,
    title: 'No Hidden Fees',
    description: 'Full transparency from day one. No processing fees, no hidden charges, no surprises.',
  },
  {
    icon: Clock,
    title: 'Flexible Duration',
    description: 'Choose from 3 to 12 months repayment periods. We work with your financial situation, not against it.',
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

export default function PaymentPlansPage() {
  return (
    <>
      <Hero
        variant="page"
        title="Flexible Payment Plans"
        subtitle="Own land on terms that work for you. Interest-free, transparent, and tailored to your needs."
      />

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeader
            title="How It Works"
            subtitle="Three simple steps to land ownership."
          />

          <motion.div
            className="mt-12 grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                variants={fadeUp}
                className="relative rounded-xl bg-card p-8 text-center shadow-card"
              >
                {/* Number */}
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
                  <span className="font-display text-xl font-bold">{i + 1}</span>
                </div>

                <div className="mt-6 flex justify-center">
                  <step.icon size={32} className="text-primary" />
                </div>

                <h3 className="mt-4 font-display text-lg font-semibold text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-charcoal-muted">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-primary-light py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeader
            title="Why Choose Our Plans?"
            subtitle="We make land ownership accessible through fair and transparent financing."
          />

          <motion.div
            className="mt-12 grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.title}
                variants={fadeUp}
                className="rounded-xl bg-card p-8 text-center shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary-light">
                  <benefit.icon size={32} className="text-secondary" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-charcoal">
                  {benefit.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-charcoal-muted">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <CTABanner
            title="Ready to Get Started?"
            subtitle="Find your perfect plot today and take advantage of our flexible payment plans."
            buttonText="Find Your Plot"
            buttonLink="/projects"
          />
        </div>
      </section>
    </>
  )
}
