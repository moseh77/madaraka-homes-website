import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import { cn } from '../lib/utils'

interface FormData {
  name: string
  email: string
  phone: string
  interest: string
  message: string
  consent: boolean
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interest: 'General',
    message: '',
    consent: false,
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const validate = (): boolean => {
    const errs: FormErrors = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.message.trim()) errs.message = 'Message is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate() || submitting) return

    setSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setSubmitting(false)
    setSuccess(true)
  }

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    // Clear error on change
    if (typeof value === 'string' && errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const inputClasses = (field: keyof FormErrors) =>
    cn(
      'w-full rounded-lg border bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors placeholder:text-charcoal-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/30',
      errors[field]
        ? 'border-destructive focus:border-destructive'
        : 'border-warm-border focus:border-primary',
    )

  return (
    <div>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex flex-col items-center justify-center rounded-xl bg-secondary-light p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
            >
              <CheckCircle size={64} className="text-secondary" />
            </motion.div>
            <h3 className="mt-4 font-display text-2xl font-bold text-charcoal">
              Message Sent!
            </h3>
            <p className="mt-2 font-body text-base text-charcoal-muted">
              Thank you for reaching out. We&apos;ll get back to you within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-5"
          >
            <div className="grid gap-5 md:grid-cols-2">
              {/* Name */}
              <div>
                <label className="mb-1 block font-body text-sm font-medium text-charcoal">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className={inputClasses('name')}
                  placeholder="John Kamau"
                />
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 font-body text-xs text-destructive"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-1 block font-body text-sm font-medium text-charcoal">
                  Email <span className="text-destructive">*</span>
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={inputClasses('email')}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 font-body text-xs text-destructive"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {/* Phone */}
              <div>
                <label className="mb-1 block font-body text-sm font-medium text-charcoal">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className={inputClasses('name')}
                  placeholder="0715 579579"
                />
              </div>

              {/* Interest */}
              <div>
                <label className="mb-1 block font-body text-sm font-medium text-charcoal">
                  I&apos;m interested in
                </label>
                <select
                  value={form.interest}
                  onChange={(e) => handleChange('interest', e.target.value)}
                  className={inputClasses('name')}
                >
                  <option value="General">General Inquiry</option>
                  <option value="Buying">Buying Land</option>
                  <option value="Selling">Selling Land</option>
                  <option value="Partnership">Partnership</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-1 block font-body text-sm font-medium text-charcoal">
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => handleChange('message', e.target.value)}
                className={inputClasses('message')}
                placeholder="Tell us about your property needs..."
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 font-body text-xs text-destructive"
                >
                  {errors.message}
                </motion.p>
              )}
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => handleChange('consent', e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-warm-border text-primary focus:ring-primary"
              />
              <span className="font-body text-sm text-charcoal-muted">
                I consent to Madaraka Homes Ltd processing my data for the purposes of responding to my inquiry.
              </span>
            </label>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-body text-sm font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70 md:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
