import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, Grid, List, ChevronDown, X, Star, Search } from 'lucide-react'
import { mockProducts, categories, formatPrice } from '../lib/utils'
import ProductCard from '../components/product/ProductCard'
import { useSEO } from '../hooks/useSEO'
import { containerVariants, itemVariants } from '../lib/animations'

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low → High', value: 'price-asc' },
  { label: 'Price: High → Low', value: 'price-desc' },
  { label: 'Best Rating', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
]

export default function Shop() {
  useSEO({ 
    title: 'Premium Collections', 
    description: 'Browse our curated collection of luxury electronics, designer fashion, and premium home products.' 
  })
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  const [activeCategory, setActiveCategory] = useState(
    categories.find((c) => c.key.toLowerCase() === initialCategory.toLowerCase())?.key || 'all'
  )
  const [sort, setSort] = useState('newest')
  const [priceRange, setPriceRange] = useState([0, 2600])
  const [minRating, setMinRating] = useState(0)
  const [viewMode, setViewMode] = useState('grid')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let products = activeCategory === 'all'
      ? mockProducts
      : mockProducts.filter((p) => p.category === activeCategory)

    products = products.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])
    if (minRating > 0) products = products.filter((p) => p.rating >= minRating)

    switch (sort) {
      case 'price-asc': return [...products].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...products].sort((a, b) => b.price - a.price)
      case 'rating': return [...products].sort((a, b) => b.rating - a.rating)
      case 'reviews': return [...products].sort((a, b) => b.reviews - a.reviews)
      default: return products
    }
  }, [activeCategory, sort, priceRange, minRating])

  return (
    <div className="min-h-screen px-4 md:px-8 pb-12">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-8 pt-4">
          <h1 className="text-4xl font-display font-bold mb-2">Shop All Products</h1>
          <p className="text-white/50 text-sm">{filtered.length} products found</p>
        </motion.div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                activeCategory === cat.key
                  ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
                  : 'bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-xs ${activeCategory === cat.key ? 'text-white/80' : 'text-white/30'}`}>
                {cat.count}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <button
            onClick={() => setShowFilters((v) => !v)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm hover:border-white/30 transition-all"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>

          <div className="flex items-center gap-3 ml-auto">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 text-sm px-4 pr-8 py-2 rounded-xl outline-none hover:border-white/30 transition-all cursor-pointer"
              >
                {sortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-white/40" />
            </div>
            {/* View */}
            <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white/15 text-white' : 'text-white/40'}`}><Grid size={16} /></button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white/15 text-white' : 'text-white/40'}`}><List size={16} /></button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="glass rounded-2xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm">Price Range</h3>
                  <input type="range" min={0} max={2600} step={50}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-primary"
                  />
                  <div className="flex justify-between text-xs text-white/50 mt-1">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
                {/* Rating */}
                <div>
                  <h3 className="font-semibold mb-3 text-sm">Min Rating</h3>
                  <div className="flex gap-2">
                    {[0, 3, 4, 4.5].map((r) => (
                      <button key={r} onClick={() => setMinRating(r)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border transition-all ${
                          minRating === r ? 'bg-accent/20 border-accent text-accent' : 'border-white/10 text-white/60 hover:border-white/30'
                        }`}>
                        <Star size={11} className="fill-current" />
                        {r === 0 ? 'All' : `${r}+`}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Reset */}
                <div className="flex items-end">
                  <button onClick={() => { setPriceRange([0, 2600]); setMinRating(0); setSort('newest'); setActiveCategory('all') }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-sm hover:border-red-400/50 hover:text-red-400 transition-all">
                    <X size={14} /> Reset All
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Grid / List */}
        <motion.div
          layout
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6'
              : 'flex flex-col gap-4'
          }
        >
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div variants={itemVariants} className="col-span-full text-center py-24 text-white/40">
                <Search className="w-16 h-16 mx-auto text-primary/30 mb-4" />
                <p className="text-lg font-medium">No products match your filters</p>
                <button onClick={() => { setPriceRange([0, 2600]); setMinRating(0); }}
                  className="mt-4 px-6 py-2 rounded-xl border border-white/20 text-sm hover:border-primary/50 transition-all">
                  Clear Filters
                </button>
              </motion.div>
            ) : (
              filtered.map((product, idx) => (
                <motion.div
                  key={product.id}
                  layout
                  variants={itemVariants}
                  className={viewMode === 'list' ? 'w-full' : ''}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
