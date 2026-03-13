import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Zap, Clock, Tag, ArrowRight, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { mockProducts, formatPrice, formatDiscount } from '../lib/utils'
import ProductCard from '../components/product/ProductCard'
import { containerVariants, itemVariants } from '../lib/animations'
import { useSEO } from '../hooks/useSEO'

function useCountdown(targetHours = 12) {
  const [time, setTime] = useState({ h: targetHours, m: 34, s: 56 })
  useEffect(() => {
    const id = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev
        if (s > 0) return { h, m, s: s - 1 }
        if (m > 0) return { h, m: m - 1, s: 59 }
        if (h > 0) return { h: h - 1, m: 59, s: 59 }
        return { h: 23, m: 59, s: 59 } // reset
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return time
}

function TimeBlock({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-16 md:w-20 h-16 md:h-20 glass rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-bold font-display text-accent"
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <span className="text-xs text-white/40 mt-2 uppercase tracking-wider">{label}</span>
    </div>
  )
}

const dealCategories = [
  { label: 'All Deals', key: 'all' },
  { label: 'Flash Sale', key: 'flash' },
  { label: 'Trending', key: 'trending' },
  { label: 'New Arrivals', key: 'new' },
  { label: 'Bestsellers', key: 'bestseller' },
]

export default function Deals() {
  const { h, m, s } = useCountdown(11)
  const [activeTab, setActiveTab] = useState('all')

  const dealsProducts = mockProducts.filter((p) => p.badge)
  const filtered = activeTab === 'all' ? dealsProducts : dealsProducts.filter((p) => p.badge === activeTab)
  const featured = mockProducts.find((p) => p.badge === 'trending')

  return (
    <div className="min-h-screen px-4 md:px-8 pb-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="pt-4 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-7 h-7 text-accent" />
            <h1 className="text-4xl font-display font-bold">Flash Deals</h1>
          </div>
          <p className="text-white/50">Limited time offers — grab them before they're gone</p>
        </motion.div>

        {/* Countdown */}
        <motion.div
          variants={itemVariants} initial="hidden" animate="visible"
          className="glass rounded-3xl p-6 md:p-10 mb-10 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5" />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-accent uppercase tracking-widest">Deals Reset In</span>
            </div>
            <div className="flex items-center justify-center gap-3 md:gap-6">
              <TimeBlock value={h} label="Hours" />
              <span className="text-3xl font-bold text-white/30 mb-5">:</span>
              <TimeBlock value={m} label="Minutes" />
              <span className="text-3xl font-bold text-white/30 mb-5">:</span>
              <TimeBlock value={s} label="Seconds" />
            </div>
          </div>
        </motion.div>

        {/* Featured Deal */}
        {featured && (
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-10">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" /> Exclusive Featured Deal
            </h2>
            <Link to={`/product/${featured.id}`} className="group block glass rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative overflow-hidden h-64 md:h-80">
                  <img src={featured.image} alt={featured.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-accent text-black text-xs font-bold rounded-full uppercase tracking-wide">
                    {formatDiscount(featured.originalPrice, featured.price)} OFF
                  </span>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs text-primary font-semibold uppercase tracking-wider mb-2">{featured.category}</span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{featured.name}</h3>
                  <p className="text-white/60 text-sm mb-6 line-clamp-2">{featured.description}</p>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-primary">{formatPrice(featured.price)}</span>
                    <span className="text-lg line-through text-white/30">{formatPrice(featured.originalPrice)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    Shop Now <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* Deal Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {dealCategories.map((c) => (
            <button key={c.key} onClick={() => setActiveTab(c.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                activeTab === c.key
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30'
              }`}>
              {c.label}
            </button>
          ))}
        </div>

        {/* Products */}
        <motion.div
          variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filtered.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20 text-white/40">
              <Tag className="w-16 h-16 mx-auto text-primary/30 mb-4" />
              <p>No deals in this category right now. Check back soon!</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
