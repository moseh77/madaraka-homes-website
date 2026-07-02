import { motion } from 'framer-motion'
import { Banknote, Calendar, ShieldCheck } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import StatCounter from '../components/StatCounter'
import ProjectCard from '../components/ProjectCard'
import TestimonialCard from '../components/TestimonialCard'
import CTABanner from '../components/CTABanner'

const projectsData = [
  {
    slug: 'greenfield-estate-phase-3',
    title: 'Greenfield Estate Phase 3',
    location: 'Juja, Kiambu County',
    price: '450,000',
    status: 'Available' as const,
    image: 'https://placehold.co/800x500/059669/FFFFFF?text=Greenfield+Estate',
    category: 'residential',
    size: '50 x 100',
  },
  {
    slug: 'savannah-ridge',
    title: 'Savannah Ridge',
    location: 'Machakos County',
    price: '380,000',
    status: 'Available' as const,
    image: 'https://placehold.co/800x500/B45309/FFFFFF?text=Savannah+Ridge',
    category: 'residential',
    size: '40 x 80',
  },
  {
    slug: 'ngara-commercial',
    title: 'Ngara Commercial Plot',
    location: 'Ngara, Nairobi',
    price: '1,200,000',
    status: 'Coming Soon' as const,
    image: 'https://placehold.co/800x500/9A3412/FFFFFF?text=Ngara+Commercial',
    category: 'commercial',
    size: '30 x 60',
  },
]

const testimonials = [
  {
    quote: 'Madaraka Homes made the process of buying my first plot incredibly smooth. Their team guided me through every step, and now I own land I can truly call my own.',
    name: 'James Ochieng',
    role: 'Homeowner, Greenfield Estate',
  },
  {
    quote: 'The flexible payment plans made it possible for me to invest in prime land without breaking the bank. Highly recommend their services to anyone looking to invest in real estate.',
    name: 'Grace Wanjiku',
    role: 'Investor, Savannah Ridge',
  },
  {
    quote: 'Professional, transparent, and trustworthy. Madaraka Homes helped me secure a commercial plot in Ngara at a fair price. Their after-sales support is exceptional.',
    name: 'Peter Kamau',
    role: 'Business Owner, Ngara',
  },
]

const features = [
  {
    icon: Banknote,
    title: 'Affordable Pricing',
    description: 'Prime land at prices that make sense. We believe every Kenyan deserves a chance to own property.',
  },
  {
    icon: Calendar,
    title: 'Flexible Payment Plans',
    description: 'Spread your payments over manageable instalments. Own land without the financial strain.',
  },
  {
    icon: ShieldCheck,
    title: 'Verified Land Titles',
    description: 'Every plot comes with a clean title deed. We handle the due diligence so you can invest with confidence.',
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

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        variant="home"
        title="Your Land. Your Legacy."
        subtitle="Discover prime land investments across Kenya. From residential plots to commercial properties, we help you build a legacy that lasts generations."
      />

      {/* 2. Stats */}
      <section className="bg-primary-light py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <motion.div
            className="grid grid-cols-2 gap-8 md:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            <motion.div variants={fadeUp}>
              <StatCounter count={12} label="Projects Completed" suffix="+" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StatCounter count={1500} label="Families Served" suffix="+" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StatCounter count={8} label="Counties Covered" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <StatCounter count={5} label="Years Experience" suffix="+" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Why Madaraka */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeader
            title="Why Madaraka Homes?"
            subtitle="We make land ownership accessible, transparent, and hassle-free for every Kenyan."
          />

          <motion.div
            className="mt-12 grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={fadeUp}
                className="rounded-xl bg-card p-8 text-center shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-light">
                  <feature.icon size={32} className="text-primary" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-charcoal">
                  {feature.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-relaxed text-charcoal-muted">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Featured Projects */}
      <section className="bg-primary-light py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeader
            title="Featured Projects"
            subtitle="Explore our latest land developments across Kenya's most promising locations."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projectsData.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="mt-10 text-center"
          >
            <a
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary px-6 py-3 font-body text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              View All Projects
            </a>
          </motion.div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeader
            title="What Our Clients Say"
            subtitle="Hear from the families and investors who have found their perfect piece of Kenya with us."
          />

          <motion.div
            className="mt-12 grid gap-8 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fadeUp}>
                <TestimonialCard quote={t.quote} name={t.name} role={t.role} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. CTA Banner */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <CTABanner
            title="Ready to Own Your Piece of Kenya?"
            subtitle="Start your journey to land ownership today. Our team is ready to help you find the perfect plot."
            buttonText="Get Started"
            buttonLink="/contact"
          />
        </div>
      </section>
    </>
  )
}
