import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Phone, MapPin, ChevronDown, Send, MessageCircle, CheckCircle } from 'lucide-react'
import { containerVariants, itemVariants } from '../lib/animations'

const faqs = [
  { q: 'How long does shipping take?', a: 'Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available at checkout. Free shipping on orders over $50.' },
  { q: 'What is your return policy?', a: 'We offer a 30-day hassle-free return policy on all products. Items must be in original condition with tags attached.' },
  { q: 'Do you ship internationally?', a: 'Yes! We ship to 60+ countries worldwide. International orders typically arrive within 7-14 business days.' },
  { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a tracking link via email. You can also track via your account dashboard.' },
  { q: 'Are all products authentic?', a: 'Absolutely. We source directly from verified brands and authorized distributors. Every product comes with a certificate of authenticity.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div className="border-b border-white/10 last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full py-4 flex items-center justify-between text-left gap-4">
        <span className="font-medium text-sm md:text-base">{q}</span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="flex-shrink-0">
          <ChevronDown size={18} className="text-white/40" />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden">
            <p className="pb-4 text-sm text-white/60 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="min-h-screen px-4 md:px-8 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="pt-4 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Get in Touch</h1>
          <p className="text-white/50 max-w-xl mx-auto">We're here to help 24/7. Reach out via any of the channels below or send us a message.</p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Mail, color: 'text-primary', bg: 'bg-primary/15', title: 'Email Us', value: 'support@cwhcart.com', sub: 'Response within 2 hours' },
            { icon: Phone, color: 'text-accent', bg: 'bg-accent/15', title: 'Call Us', value: '+1 (555) 123-4567', sub: 'Mon–Fri, 9am–8pm EST' },
            { icon: MapPin, color: 'text-violet-400', bg: 'bg-violet-400/15', title: 'Visit Us', value: '123 Luxury Ave, NY', sub: 'Showroom open weekdays' },
          ].map(({ icon: Icon, color, bg, title, value, sub }, idx) => (
            <motion.div key={idx} variants={itemVariants}
              className="glass rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all text-center group">
              <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h3 className="font-bold mb-1">{title}</h3>
              <p className="font-medium text-sm">{value}</p>
              <p className="text-xs text-white/40 mt-1">{sub}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="glass rounded-3xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Send size={20} className="text-primary" />
                Send a Message
              </h2>
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12">
                  <CheckCircle className="w-16 h-16 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-white/60 text-sm">We'll get back to you within 2 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-all" />
                    <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-all" />
                  </div>
                  <input required placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-all" />
                  <textarea required rows={4} placeholder="Your message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-all resize-none" />
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit"
                    className="w-full py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
                    <Send size={16} /> Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="glass rounded-3xl p-6 md:p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageCircle size={20} className="text-accent" />
                Frequently Asked
              </h2>
              {faqs.map((item, idx) => <FAQItem key={idx} {...item} />)}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
