import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Ruler, DollarSign, Calendar, ShieldCheck, ArrowLeft } from 'lucide-react'
import Hero from '../components/Hero'
import CTABanner from '../components/CTABanner'
import MapEmbed from '../components/MapEmbed'
import PaymentCalculator from '../components/PaymentCalculator'
import Lightbox from '../components/Lightbox'
import { cn } from '../lib/utils'

// This would come from an API/database in production
const projectData: Record<string, {
  title: string
  location: string
  price: string
  status: 'Available' | 'Sold Out' | 'Coming Soon'
  image: string
  category: string
  size: string
  paymentPlan: string
  description: string
  images: string[]
  mapSrc: string
}> = {
  'greenfield-estate-phase-3': {
    title: 'Greenfield Estate Phase 3',
    location: 'Juja, Kiambu County',
    price: '450,000',
    status: 'Available',
    image: 'https://placehold.co/1200x600/059669/FFFFFF?text=Greenfield+Estate',
    category: 'Residential',
    size: '50 x 100 ft',
    paymentPlan: '10% deposit, balance in 12 monthly instalments at 0% interest',
    description:
      'Greenfield Estate Phase 3 is our flagship residential development in the rapidly growing Juja area. Located just minutes from Kenyatta University and major transport routes, this gated community offers secure, well-planned plots perfect for building your dream home. Each plot comes with a verified title deed, surveyed boundaries, and access to all-weather roads. The estate features planned green spaces, community areas, and infrastructure that supports modern living. With Juja emerging as one of Nairobi\'s most promising satellite towns, this investment offers both immediate living potential and strong long-term appreciation.',
    images: [
      'https://placehold.co/800x500/059669/FFFFFF?text=Greenfield+Estate+1',
      'https://placehold.co/800x500/9A3412/FFFFFF?text=Greenfield+Estate+2',
      'https://placehold.co/800x500/B45309/FFFFFF?text=Greenfield+Estate+3',
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.654!2d37.016!3d-1.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zMcKwMDUnMzYuMCJTIDM3wrAwMCc1Ny42IkU!5e0!3m2!1sen!2ske!4v1',
  },
  'savannah-ridge': {
    title: 'Savannah Ridge',
    location: 'Machakos County',
    price: '380,000',
    status: 'Available',
    image: 'https://placehold.co/1200x600/B45309/FFFFFF?text=Savannah+Ridge',
    category: 'Residential',
    size: '40 x 80 ft',
    paymentPlan: '20% deposit, balance in 6 monthly instalments at 0% interest',
    description:
      'Savannah Ridge offers affordable land ownership in the serene landscapes of Machakos County. Perfect for those looking to escape the city bustle while remaining within easy reach of Nairobi. The development features stunning views, fertile soil, and a growing community of like-minded homeowners. Machakos County has seen significant infrastructure development including improved roads, water access, and electricity connectivity. Whether you plan to build a weekend retreat, a permanent home, or hold the land as a long-term investment, Savannah Ridge represents outstanding value.',
    images: [
      'https://placehold.co/800x500/B45309/FFFFFF?text=Savannah+Ridge+1',
      'https://placehold.co/800x500/9A3412/FFFFFF?text=Savannah+Ridge+2',
      'https://placehold.co/800x500/059669/FFFFFF?text=Savannah+Ridge+3',
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.654!2d37.016!3d-1.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zMcKwMDUnMzYuMCJTIDM3wrAwMCc1Ny42IkU!5e0!3m2!1sen!2ske!4v1',
  },
  'ngara-commercial': {
    title: 'Ngara Commercial Plot',
    location: 'Ngara, Nairobi',
    price: '1,200,000',
    status: 'Coming Soon',
    image: 'https://placehold.co/1200x600/9A3412/FFFFFF?text=Ngara+Commercial',
    category: 'Commercial',
    size: '30 x 60 ft',
    paymentPlan: 'TBA — reserved for pre-launch investors',
    description:
      'A prime commercial plot in the heart of Ngara, Nairobi. Situated on Ngara Road near TRV Towers, this property offers excellent visibility and access for commercial development. The area is a bustling commercial hub with high foot traffic, proximity to educational institutions, and excellent transport links to the city center. Ideal for an office block, retail space, or mixed-use development. This is a rare opportunity to secure commercial property in one of Nairobi\'s most accessible neighborhoods.',
    images: [
      'https://placehold.co/800x500/9A3412/FFFFFF?text=Ngara+Commercial+1',
      'https://placehold.co/800x500/7C2A0E/FFFFFF?text=Ngara+Commercial+2',
      'https://placehold.co/800x500/B45309/FFFFFF?text=Ngara+Commercial+3',
    ],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.654!2d36.816!3d-1.283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2zMcKwMDUnMzYuMCJTIDM2wrAwMCc1Ny42IkU!5e0!3m2!1sen!2ske!4v1',
  },
}

const statusColors: Record<string, string> = {
  Available: 'bg-secondary-light text-secondary',
  'Sold Out': 'bg-gray-100 text-gray-500',
  'Coming Soon': 'bg-accent-light text-accent',
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? projectData[slug] : undefined

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h2 className="font-display text-2xl font-bold text-charcoal">Project Not Found</h2>
        <p className="mt-2 font-body text-charcoal-muted">
          The project you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
        >
          <ArrowLeft size={18} />
          Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <Hero
        variant="page"
        title={project.title}
        subtitle={project.location}
      />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-charcoal-muted transition-colors hover:text-primary"
            >
              <ArrowLeft size={16} />
              Back to Projects
            </Link>
          </motion.div>

          {/* Image Gallery */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="mb-12 grid gap-4 md:grid-cols-4"
          >
            <motion.div variants={fadeUp} className="md:col-span-2 md:row-span-2">
              <button
                onClick={() => {
                  setLightboxIndex(0)
                  setLightboxOpen(true)
                }}
                className="w-full cursor-pointer"
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="h-full w-full rounded-xl object-cover"
                />
              </button>
            </motion.div>
            {project.images.slice(1).map((img, i) => (
              <motion.div key={i} variants={fadeUp}>
                <img
                  src={img}
                  alt={`${project.title} ${i + 2}`}
                  className="h-full w-full rounded-xl object-cover"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Content: Description + Sidebar */}
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Description */}
            <motion.div
              className="lg:col-span-2"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.h2
                variants={fadeUp}
                className="font-display text-2xl font-bold text-charcoal"
              >
                About {project.title}
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="mt-4 font-body text-base leading-relaxed text-charcoal"
              >
                {project.description}
              </motion.p>

              {/* Map */}
              <motion.div variants={fadeUp} className="mt-10">
                <h3 className="mb-4 font-display text-lg font-semibold text-charcoal">Location</h3>
                <MapEmbed src={project.mapSrc} />
              </motion.div>
            </motion.div>

            {/* Key Facts Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="lg:sticky lg:top-24 lg:self-start"
            >
              <div className="rounded-xl bg-primary-light p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold text-charcoal">Key Facts</h3>

                <div className="mt-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                        Location
                      </p>
                      <p className="font-body text-sm font-medium text-charcoal">{project.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Ruler size={18} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                        Plot Size
                      </p>
                      <p className="font-body text-sm font-medium text-charcoal">{project.size}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <DollarSign size={18} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                        Price
                      </p>
                      <p className="font-display text-xl font-bold text-primary">
                        KES {project.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Calendar size={18} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                        Payment Plan
                      </p>
                      <p className="font-body text-sm font-medium text-charcoal">{project.paymentPlan}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck size={18} className="mt-0.5 shrink-0 text-primary" />
                    <div>
                      <p className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted">
                        Status
                      </p>
                      <span
                        className={cn(
                          'inline-block rounded-full px-3 py-1 font-body text-xs font-semibold',
                          statusColors[project.status],
                        )}
                      >
                        {project.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inquiry CTA */}
                <div className="mt-6 border-t border-warm-border pt-6">
                  <Link
                    to="/contact"
                    className="block w-full rounded-lg bg-primary px-6 py-3 text-center font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                  >
                    Inquire About This Plot
                  </Link>
                </div>
              </div>

                {/* Payment Calculator */}
                <PaymentCalculator
                  price={Number(project.price.replace(/,/g, ''))}
                  className="mt-6"
                />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <CTABanner
            title="Interested in This Property?"
            subtitle="Contact our sales team for more details or to schedule a site visit."
            buttonText="Get in Touch"
            buttonLink="/contact"
          />
        </div>
      </section>

      {/* Lightbox */}
      <Lightbox
        images={project.images}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        initialIndex={lightboxIndex}
      />
    </>
  )
}
