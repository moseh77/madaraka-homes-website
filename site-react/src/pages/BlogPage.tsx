import { motion } from 'framer-motion'
import { Newspaper, Mail } from 'lucide-react'
import Hero from '../components/Hero'
import SectionHeader from '../components/SectionHeader'

export default function BlogPage() {
  return (
    <>
      <Hero
        variant="page"
        title="Insights & Updates"
        subtitle="Stay informed with the latest from Madaraka Homes."
      />

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <SectionHeader
            title="Coming Soon"
            subtitle="We're working on something exciting!"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            className="mt-10 text-center"
          >
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent-light">
              <Newspaper size={40} className="text-accent" />
            </div>

            <p className="mx-auto mt-6 max-w-xl font-body text-base leading-relaxed text-charcoal-muted md:text-lg">
              Our blog is launching soon! We&apos;ll be sharing insights on land buying,
              real estate investment tips, market trends, and updates on our latest
              developments across Kenya.
            </p>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: 0.2 }}
              className="mx-auto mt-10 max-w-md"
            >
              <div className="rounded-xl bg-primary-light p-6 shadow-card">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <Mail size={20} className="text-primary" />
                  <h3 className="font-display text-lg font-semibold text-charcoal">
                    Stay Updated
                  </h3>
                </div>
                <p className="mb-4 text-center font-body text-sm text-charcoal-muted">
                  Subscribe to receive updates when we publish new content.
                </p>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex flex-col gap-3"
                >
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-warm-border bg-white px-4 py-3 font-body text-sm text-charcoal placeholder:text-charcoal-muted/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
