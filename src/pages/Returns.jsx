import { motion } from 'framer-motion'
import { RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { itemVariants, containerVariants } from '../lib/animations'

const steps = [
  { step: '01', title: 'Initiate Return', desc: 'Go to your account orders page, select the item, and click "Request Return". Eligible items will have a button.' },
  { step: '02', title: 'Print Label', desc: 'We\'ll email you a prepaid return shipping label. Print it and attach it to the package.' },
  { step: '03', title: 'Drop Off', desc: 'Drop the package at any registered courier location. Keep the tracking receipt.' },
  { step: '04', title: 'Get Refunded', desc: 'Once we receive and inspect the item, your refund will be processed within 3-5 business days.' },
]

const policies = [
  { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10', title: 'Eligible for Returns', items: ['Items in original, unused condition', 'Products with original tags and packaging', 'Items within 30 days of delivery', 'Electronics in original sealed box'] },
  { icon: XCircle, color: 'text-red-400', bg: 'bg-red-400/10', title: 'Not Eligible', items: ['Items marked as Final Sale', 'Personalized or engraved items', 'Items without original packaging', 'Products with signs of use or damage'] },
  { icon: AlertCircle, color: 'text-amber-400', bg: 'bg-amber-400/10', title: 'Special Cases', items: ['Fashion: 14-day return window', 'Fragrance: unopened only', 'Swimwear: hygiene sticker intact', 'Contact us for exceptions'] },
]

export default function Returns() {
  return (
    <div className="min-h-screen px-4 md:px-8 pb-16">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="pt-4 mb-10 text-center">
          <div className="inline-flex items-center gap-2 text-primary mb-3">
            <RotateCcw size={22} />
          </div>
          <h1 className="text-4xl font-display font-bold mb-3">Returns & Refunds</h1>
          <p className="text-white/50 text-sm max-w-md mx-auto">We offer a 30-day hassle-free return policy. Your satisfaction is guaranteed.</p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          {steps.map((s, i) => (
            <motion.div key={i} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-5 border border-white/10 text-center">
              <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary font-bold text-sm flex items-center justify-center mx-auto mb-3">
                {s.step}
              </div>
              <h3 className="font-bold text-sm mb-2">{s.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Policies */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {policies.map(({ icon: Icon, color, bg, title, items }, i) => (
            <motion.div key={i} variants={itemVariants}
              className="glass rounded-2xl p-6 border border-white/10">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <h3 className="font-bold mb-3">{title}</h3>
              <ul className="space-y-2">
                {items.map((item, j) => (
                  <li key={j} className="text-sm text-white/60 flex items-start gap-2">
                    <span className={`${color} mt-0.5 text-xs`}>•</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
