import { motion } from 'framer-motion'
import { Users, Package, Globe, Heart, Leaf, Zap, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { containerVariants, itemVariants } from '../lib/animations'
import { useSEO } from '../hooks/useSEO'

const stats = [
  { icon: Users, value: '280K+', label: 'Happy Customers' },
  { icon: Package, value: '1,400+', label: 'Products Curated' },
  { icon: Globe, value: '60+', label: 'Countries Served' },
  { icon: Heart, value: '98%', label: 'Satisfaction Rate' },
]

const values = [
  { icon: Heart, title: 'Customer First', description: 'Every decision we make is centred around creating exceptional experiences for our customers.' },
  { icon: Leaf, title: 'Sustainable', description: 'We partner only with ethical suppliers and offset 100% of our carbon emissions.' },
  { icon: Zap, title: 'Innovation', description: 'Constantly evolving our platform to bring you the best shopping technology available.' },
]

const team = [
  { name: 'Aisha Rahman', role: 'CEO & Co-Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80' },
  { name: 'Marcus Chen', role: 'CTO & Co-Founder', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Sofia Larsson', role: 'Head of Design', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
  { name: 'James Okafor', role: 'Head of Curation', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80' },
]

const timeline = [
  { year: '2020', title: 'Founded', desc: 'CWH Cart started in a small apartment with a big dream to redefine premium shopping.' },
  { year: '2021', title: 'First 10K Customers', desc: 'Reached our first milestone with a curated selection of 200 products.' },
  { year: '2022', title: 'Global Expansion', desc: 'Expanded to 40 countries, launched the mobile app and introduced same-day delivery.' },
  { year: '2023', title: 'AI Personalization', desc: 'Launched AI-powered recommendations and the CWH Cart VIP program.' },
  { year: '2024', title: '1M+ Orders', desc: 'Crossed one million orders milestone with 98% customer satisfaction.' },
]

export default function About() {
  useSEO({ 
    title: 'Our Story & Vision', 
    description: 'Learn about CWH Cart vision to redefine premium shopping and our journey to bringing luxury to everyone.' 
  })
  return (
    <div className="min-h-screen pb-12">
      {/* Hero */}
      <section className="px-4 md:px-8 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <span className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/15 text-primary text-xs font-semibold uppercase tracking-widest border border-primary/20">
              Our Story
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              We believe everyone deserves{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">luxury</span>
            </h1>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
              CWH Cart was built on a simple idea — that premium quality shouldn't be reserved for the few. We curate the world's best products and bring them to you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="px-4 md:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden h-64 md:h-96">
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80" alt="Team at work" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 md:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, value, label }, idx) => (
              <motion.div key={idx} variants={itemVariants}
                className="glass rounded-2xl p-6 text-center border border-white/10 hover:border-primary/30 transition-all">
                <Icon className="w-7 h-7 text-primary mx-auto mb-3" />
                <p className="text-3xl font-display font-bold mb-1">{value}</p>
                <p className="text-sm text-white/50">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 md:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">Our Core Values</h2>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description }, idx) => (
              <motion.div key={idx} variants={itemVariants}
                className="glass rounded-2xl p-8 border border-white/10 hover:border-primary/30 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/25 transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-4 md:px-8 mb-20">
        <div className="max-w-3xl mx-auto">
          <motion.h2 variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-4xl font-display font-bold mb-12 text-center">Our Journey</motion.h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-primary/30 to-transparent" />
            {timeline.map((item, idx) => (
              <motion.div key={idx} variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6 mb-8 relative">
                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center z-10">
                  <span className="text-xs font-bold text-primary">{item.year}</span>
                </div>
                <div className="pt-3">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="px-4 md:px-8 mb-20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-4xl font-display font-bold mb-12 text-center">Meet the Team</motion.h2>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div key={idx} variants={itemVariants}
                className="glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all group">
                <div className="relative h-48 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-0.5">{member.name}</h3>
                  <p className="text-xs text-primary/80">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="glass rounded-3xl p-10 border border-white/10">
            <h2 className="text-3xl font-display font-bold mb-4">Ready to experience CWH Cart?</h2>
            <p className="text-white/60 mb-8">Join hundreds of thousands of satisfied customers.</p>
            <Link to="/shop"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30">
              Start Shopping <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
