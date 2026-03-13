import { motion } from 'framer-motion'
import { Shield, Lock, Eye, Server } from 'lucide-react'
import { itemVariants } from '../lib/animations'

const sections = [
  { title: '1. Information We Collect', icon: Eye, content: 'We collect information you provide directly to us, including name, email address, shipping address, payment information, and account details. We also automatically collect certain information when you use our services including device information, IP address, browsing behavior, and purchase history.' },
  { title: '2. How We Use Your Information', icon: Server, content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send transaction confirmations and support messages, respond to comments and questions, send marketing communications (with your consent), and monitor analytics.' },
  { title: '3. Information Sharing', icon: Shield, content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website, conducting our business, or servicing you — provided they agree to keep this information confidential.' },
  { title: '4. Data Security', icon: Lock, content: 'We implement SSL encryption, secure data storage, and regular security audits to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure.' },
  { title: '5. Cookies', icon: Eye, content: 'We use cookies and similar tracking technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.' },
  { title: '6. Your Rights', icon: Shield, content: 'You have the right to access, correct, or delete your personal data. You may opt out of marketing emails at any time. Contact us at privacy@cwhcart.com to exercise any of these rights.' },
]

export default function Privacy() {
  return (
    <div className="min-h-screen px-4 md:px-8 pb-16">
      <div className="max-w-3xl mx-auto">
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="pt-4 mb-10 text-center">
          <h1 className="text-4xl font-display font-bold mb-3">Privacy Policy</h1>
          <p className="text-white/50 text-sm">Last updated: March 1, 2025</p>
        </motion.div>

        <div className="space-y-6">
          {sections.map(({ title, icon: Icon, content }, i) => (
            <motion.div key={i} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
                  <Icon size={17} className="text-primary" />
                </div>
                <h2 className="font-bold text-base">{title}</h2>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
