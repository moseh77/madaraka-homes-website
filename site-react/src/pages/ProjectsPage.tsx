import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'
import ProjectCard from '../components/ProjectCard'
import { cn } from '../lib/utils'

const allProjects = [
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
  {
    slug: 'kilimani-heights',
    title: 'Kilimani Heights',
    location: 'Kilimani, Nairobi',
    price: '2,500,000',
    status: 'Coming Soon' as const,
    image: 'https://placehold.co/800x500/7C2A0E/FFFFFF?text=Kilimani+Heights',
    category: 'residential',
    size: '60 x 100',
  },
  {
    slug: 'thika-road-commercial',
    title: 'Thika Road Commercial',
    location: 'Thika Road, Nairobi',
    price: '850,000',
    status: 'Available' as const,
    image: 'https://placehold.co/800x500/059669/FFFFFF?text=Thika+Road+Commercial',
    category: 'commercial',
    size: '25 x 70',
  },
  {
    slug: 'runda-estate',
    title: 'Runda Estate Plots',
    location: 'Runda, Nairobi',
    price: '3,800,000',
    status: 'Sold Out' as const,
    image: 'https://placehold.co/800x500/475569/FFFFFF?text=Runda+Estate',
    category: 'residential',
    size: '80 x 120',
  },
]

const categories = ['All', 'Residential', 'Commercial']

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filtered = useMemo(() => {
    return allProjects.filter((p) => {
      const matchesCategory =
        activeCategory === 'All' ||
        p.category.toLowerCase() === activeCategory.toLowerCase()
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <>
      <Hero
        variant="page"
        title="Our Projects"
        subtitle="Discover prime land opportunities across Kenya's most promising locations."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <SectionHeader
            title="Explore Our Portfolio"
            subtitle="From residential suburbs to commercial hubs, find the perfect plot for your needs."
          />

          {/* Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="mb-10 flex flex-col items-center gap-4 md:flex-row md:justify-between"
          >
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'rounded-lg px-4 py-2 font-body text-sm font-medium transition-colors',
                    activeCategory === cat
                      ? 'bg-primary text-white'
                      : 'bg-primary-light text-primary hover:bg-primary hover:text-white',
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-charcoal-muted"
              />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-warm-border bg-white py-2 pl-10 pr-4 font-body text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </motion.div>

          {/* Project Grid with AnimatePresence */}
          <AnimatePresence mode="popLayout">
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              layout
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filtered.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center font-body text-base text-charcoal-muted"
            >
              No projects found matching your criteria.
            </motion.p>
          )}
        </div>
      </section>
    </>
  )
}
