import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Zap, TrendingUp, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react'
import { mockProducts, categories, formatPrice, formatDiscount } from '../lib/utils'
import ProductCard from '../components/product/ProductCard'
import { containerVariants, itemVariants } from '../lib/animations'
import { useSEO } from '../hooks/useSEO'

/* ── Live countdown ──────────────────────────────────────── */
function useCountdown() {
  const [t, setT] = useState({ h: 8, m: 47, s: 12 })
  useEffect(() => {
    const id = setInterval(() => setT(({ h, m, s }) => {
      if (s > 0) return { h, m, s: s - 1 }
      if (m > 0) return { h, m: m - 1, s: 59 }
      if (h > 0) return { h: h - 1, m: 59, s: 59 }
      return { h: 23, m: 59, s: 59 }
    }), 1000)
    return () => clearInterval(id)
  }, [])
  return t
}

function Pad({ v, u }) {
  return (
    <div className="text-center">
      <motion.div key={v} initial={{ y: -8, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
        className="w-14 md:w-16 h-14 md:h-16 glass rounded-xl flex items-center justify-center text-2xl font-bold text-accent font-display">
        {String(v).padStart(2, '0')}
      </motion.div>
      <span className="text-[10px] text-white/40 uppercase tracking-wider mt-1 block">{u}</span>
    </div>
  )
}

const testimonials = [
  { name: 'Sarah M.', role: 'Fashion Blogger', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80', text: 'CWH Cart completely changed how I shop. The curation is impeccable — every product feels hand-picked for me.', rating: 5 },
  { name: 'James K.', role: 'Tech Enthusiast', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80', text: "Incredible product quality and lightning-fast delivery. I've ordered 12 times and every experience has been flawless.", rating: 5 },
  { name: 'Priya N.', role: 'Interior Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80', text: 'The home collection is stunning. I always recommend CWH Cart when clients ask where to find premium home products.', rating: 5 },
]

const perks = [
  { icon: Truck, label: 'Free Shipping', sub: 'On orders over $50' },
  { icon: RefreshCw, label: '30-Day Returns', sub: 'Hassle-free policy' },
  { icon: ShieldCheck, label: 'Authentic Guarantee', sub: '100% genuine products' },
  { icon: Sparkles, label: 'VIP Rewards', sub: 'Earn points on every order' },
]

export default function Home() {
  useSEO({ 
    title: 'CWH Cart — Extraordinary Premium Shopping', 
    description: 'Experience the pinnacle of luxury shopping with CWH Cart. Curated collections of world-class premium products from electronics to fashion.',
    fullTitle: true 
  })
  const { h, m, s } = useCountdown()
  const featured = mockProducts.filter((_, i) => i < 8)
  const flashDeals = mockProducts.filter((p) => p.badge === 'flash' || p.badge === 'trending').slice(0, 4)
  const heroProduct = mockProducts[4]

  return (
    <div className="min-h-screen">

      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="relative px-4 md:px-8 pt-6 pb-20 overflow-visible">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[75vh]">

          {/* Left copy */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center lg:text-left">
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/25 text-primary text-xs font-semibold uppercase tracking-widest mb-6">
              <Sparkles size={12} /> Premium Collection 2025
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              Luxury Shopping{' '}
              <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">
                Redefined
              </span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-lg text-white/60 mb-8 max-w-xl mx-auto lg:mx-0">
              Discover curated collections of premium products from world-class brands. Personalized recommendations and exclusive deals — just for you.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
                Shop Collection <ArrowRight size={18} />
              </Link>
              <Link to="/deals"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/5 border border-white/15 hover:border-white/30 font-semibold rounded-xl transition-all">
                View Today's Deals <Zap size={18} className="text-accent" />
              </Link>
            </motion.div>

            {/* Mini stats */}
            <motion.div variants={itemVariants} className="flex items-center gap-6 mt-10 justify-center lg:justify-start">
              {[['280K+', 'Customers'], ['1400+', 'Products'], ['98%', 'Satisfaction']].map(([val, lab]) => (
                <div key={lab} className="text-center">
                  <p className="text-xl font-bold">{val}</p>
                  <p className="text-xs text-white/40">{lab}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Cinematic Minimalism Showcase */}
          <div className="relative hidden lg:flex items-center justify-end perspective-2000">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[440px] aspect-[1/1.2]"
            >
              {/* Massive Studio Lighting */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/10 via-transparent to-accent/5 blur-[100px] rounded-[3rem]" />
              
              {/* Product Frame — High contrast & material */}
              <motion.div 
                whileHover={{ y: -8 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative h-full w-full glass-hero rounded-[2.5rem] p-3 border border-white/10 group cursor-pointer overflow-hidden electric-border"
              >
                <div className="relative h-full w-full rounded-[2.2rem] overflow-hidden">
                  <motion.img 
                    src={heroProduct.image} 
                    alt={heroProduct.name}
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000"
                    whileHover={{ scale: 1.05 }}
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                </div>

                {/* Material Detail Nodes — now static and ultra-clean */}
                <div className="absolute top-10 right-10 flex flex-col items-end gap-2">
                  <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent/80">Available Now</span>
                  <div className="h-px w-12 bg-accent/40" />
                </div>
                
                <div className="absolute bottom-10 left-10">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-px bg-primary/40" />
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 mb-1">Authenticity</p>
                      <p className="text-sm font-display font-medium text-white italic">CWH Cart Certified</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Price Badge — Minimalist */}
              <motion.div 
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -right-8 top-1/2 -translate-y-1/2 bg-black/90 backdrop-blur-3xl px-6 py-4 rounded-2xl border border-white/20 shadow-2xl z-20"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Price</p>
                <p className="text-2xl font-bold text-white mb-1">{formatPrice(heroProduct.price)}</p>
                <div className="flex items-center gap-1.5">
                  <Star size={10} className="fill-accent text-accent" />
                  <span className="text-[10px] text-white/60 font-bold">{heroProduct.rating} Rating</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PERKS STRIP ─────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {perks.map(({ icon: Icon, label, sub }, i) => (
              <motion.div key={i} variants={itemVariants}
                className="flex items-center gap-3 glass rounded-xl px-4 py-4 border border-white/10">
                <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold leading-tight">{label}</p>
                  <p className="text-[11px] text-white/40">{sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FLASH DEALS COUNTDOWN ────────────────────────────── */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 text-red-400 mb-2">
                <Zap size={18} className="animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest">Flash Deals</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Ending Soon</h2>
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <Pad v={h} u="Hours" /><span className="text-2xl text-white/20 mb-5">:</span>
              <Pad v={m} u="Mins" /><span className="text-2xl text-white/20 mb-5">:</span>
              <Pad v={s} u="Secs" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flashDeals.map((p, i) => (
              <motion.div key={p.id} variants={itemVariants} initial="hidden" whileInView="visible"
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <ProductCard product={p} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link to="/deals" className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-light font-semibold transition-colors">
              View All Deals <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ──────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mb-8">
            <span className="text-xs text-accent font-bold uppercase tracking-widest">Browse</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mt-1">Shop by Category</h2>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.filter((c) => c.key !== 'all').map((cat, i) => (
              <motion.div key={cat.key} variants={itemVariants}>
                <Link to={`/shop?category=${cat.key}`}
                  className="group block relative overflow-hidden rounded-2xl h-44 md:h-52 border border-white/10 hover:border-primary/40 transition-all">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold">{cat.name}</p>
                        <p className="text-xs text-white/60">{cat.count} products</p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-primary/80 transition-all">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BEST SELLERS ─────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-accent mb-2">
                <TrendingUp size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">Top Picks</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Our Best Sellers</h2>
            </div>
            <Link to="/shop" className="hidden md:flex items-center gap-2 text-sm text-primary hover:text-primary-light font-semibold transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product, idx) => (
              <motion.div key={product.id} variants={itemVariants} initial="hidden"
                whileInView="visible" viewport={{ once: true }} transition={{ delay: (idx % 4) * 0.07 }}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link to="/shop" className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 rounded-xl text-sm font-semibold hover:border-white/30 transition-all">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">What Our Customers Say</h2>
            <p className="text-white/50 text-sm">Trusted by 280,000+ happy shoppers worldwide</p>
          </motion.div>
          <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} variants={itemVariants}
                className="glass rounded-2xl p-6 border border-white/10 hover:border-primary/30 transition-all">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} size={14} className="fill-accent text-accent" />)}
                </div>
                <p className="text-white/70 text-sm mb-5 leading-relaxed italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-primary/30" />
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA ───────────────────────────────────── */}
      <section className="px-4 md:px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-14 text-center border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-accent/5 -z-0" />
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/15 text-accent text-xs font-bold uppercase tracking-widest border border-accent/20 mb-5">
                VIP Members
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Join Our Exclusive Club</h2>
              <p className="text-white/60 max-w-md mx-auto mb-8 text-sm">
                Get early access to new drops, members-only deals, and 10% off your first order.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="Enter your email"
                  className="flex-1 px-5 py-3 rounded-xl bg-white/5 border border-white/15 text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-all" />
                <button type="submit"
                  className="px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30 whitespace-nowrap">
                  Subscribe Free
                </button>
              </form>
              <p className="text-xs text-white/30 mt-3">No spam. Unsubscribe at any time.</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
