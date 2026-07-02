import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign } from 'lucide-react'

interface PaymentCalculatorProps {
  price: number
  className?: string
}

function formatKES(n: number): string {
  return n.toLocaleString('en-KE')
}

export default function PaymentCalculator({
  price,
  className = '',
}: PaymentCalculatorProps) {
  const [months, setMonths] = useState(12)
  const monthly = price / months

  return (
    <div
      className={`rounded-xl bg-white p-6 shadow-card ${className}`}
    >
      <div className="flex items-center gap-2">
        <DollarSign size={20} className="text-primary" />
        <h3 className="font-display text-lg font-semibold text-charcoal">
          Payment Calculator
        </h3>
      </div>

      <p className="mt-1 font-body text-xs text-charcoal-muted">
        Spread your payment over {months} months
      </p>

      {/* Slider */}
      <div className="mt-6">
        <label
          htmlFor="payment-months"
          className="font-body text-sm font-medium text-charcoal"
        >
          Duration: <span className="font-semibold text-primary">{months} months</span>
        </label>
        <input
          id="payment-months"
          type="range"
          min={6}
          max={24}
          step={3}
          value={months}
          onChange={(e) => setMonths(Number(e.target.value))}
          className="mt-2 w-full accent-primary"
        />
        <div className="mt-1 flex justify-between font-body text-xs text-charcoal-muted">
          <span>6 months</span>
          <span>24 months</span>
        </div>
      </div>

      {/* Monthly Amount */}
      <motion.div
        key={months}
        initial={{ opacity: 0, y: -8, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="mt-6 rounded-lg bg-primary-light p-4 text-center"
      >
        <p className="font-body text-xs uppercase tracking-wider text-charcoal-muted">
          Monthly Payment
        </p>
        <p className="font-display text-2xl font-bold text-primary">
          KES {formatKES(Math.round(monthly))}
        </p>
        <p className="font-body text-xs text-charcoal-muted">
          for {months} months
        </p>
      </motion.div>
    </div>
  )
}
