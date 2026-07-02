import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Ruler } from 'lucide-react'
import { cn } from '../lib/utils'

interface Project {
  slug: string
  title: string
  location: string
  price: string
  status: 'Available' | 'Sold Out' | 'Coming Soon'
  image: string
  category: string
  size: string
}

interface ProjectCardProps {
  project: Project
  index?: number
}

const statusColors: Record<string, string> = {
  Available: 'bg-secondary-light text-secondary',
  'Sold Out': 'bg-gray-100 text-gray-500',
  'Coming Soon': 'bg-accent-light text-accent',
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group overflow-hidden rounded-xl bg-card shadow-card transition-shadow hover:shadow-card-hover"
    >
      <Link to={`/projects/${project.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.4 }}
          />
          {/* Status Badge */}
          <span
            className={cn(
              'absolute top-3 left-3 rounded-full px-3 py-1 font-body text-xs font-semibold',
              statusColors[project.status],
            )}
          >
            {project.status}
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold text-charcoal group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-charcoal-muted">
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {project.location}
            </span>
            <span className="flex items-center gap-1">
              <Ruler size={14} />
              {project.size}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-warm-border pt-4">
            <span className="font-display text-xl font-bold text-primary">
              KES {project.price}
            </span>
            <span className="font-body text-xs font-medium uppercase tracking-wider text-charcoal-muted group-hover:text-primary transition-colors">
              View Details
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
