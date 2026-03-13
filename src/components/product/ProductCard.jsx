import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Star, Zap, TrendingUp } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { formatPrice, cn } from '../../lib/utils'
import { toast } from 'sonner'

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
}

export default function ProductCard({ product, featured = false }) {
  const [isWishlisted, setIsWishlisted] = useState(product.wishlisted || false)
  const { addToCart, toggleWishlist } = useStore()

  const discountPercent = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  const handleAddToCart = (e) => {
    e.preventDefault(); e.stopPropagation()
    addToCart(product, 1)
    toast.success(`${product.name} added to cart`)
  }

  const handleWishlist = (e) => {
    e.preventDefault(); e.stopPropagation()
    toggleWishlist(product)
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Saved to wishlist')
  }

  const isFlash = product.badge === 'flash'
  const isTrending = product.badge === 'trending'
  const isNew = product.badge === 'new'
  const isSale = product.originalPrice > product.price

  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <motion.article
        variants={cardVariants}
        initial="initial"
        animate="animate"
        whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1] } }}
        className={cn(
          'group relative h-full flex flex-col overflow-hidden transition-all duration-500',
          'rounded-3xl border border-white/8 bg-[rgba(10,22,14,0.7)] backdrop-blur-2xl',
          'shadow-[0_8px_40px_rgba(0,0,0,0.6),0_1px_0_rgba(255,255,255,0.08)_inset]',
          'hover:shadow-[0_20px_80px_rgba(0,0,0,0.8),0_0_0_1px_rgba(45,160,90,0.3),0_0_40px_rgba(45,160,90,0.2),0_1px_0_rgba(255,255,255,0.1)_inset]',
          featured && 'border-accent/40 shadow-[0_8px_40px_rgba(212,175,55,0.25)]',
        )}
      >
        {/* ── Image ─────────────────────────────────── */}
        <div className="relative overflow-hidden h-56 md:h-64 bg-gradient-to-br from-[#0a1a0e] to-[#030a06] flex-shrink-0 shine-sweep">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
          {/* Gradient overlay — visible on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* ── Badges ─────────────────────── */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
            {isFlash && (
              <motion.span
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 bg-red-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-[0_2px_8px_rgba(239,68,68,0.5)]"
              >
                <Zap size={10} className="fill-white" /> Flash
              </motion.span>
            )}
            {isTrending && (
              <motion.span
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}
                className="flex items-center gap-1 bg-[hsl(145,58%,38%)]/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-[0_2px_8px_rgba(45,160,90,0.5)]"
              >
                <TrendingUp size={10} /> Trending
              </motion.span>
            )}
            {isNew && (
              <span className="bg-blue-500/90 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold shadow-[0_2px_8px_rgba(59,130,246,0.5)]">
                New
              </span>
            )}
            {isSale && (
              <span className="bg-[hsl(40,88%,52%)] text-black px-2.5 py-1 rounded-full text-[11px] font-black shadow-[0_2px_8px_rgba(212,175,55,0.6)]">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* ── Hover Action Buttons ─────── */}
          <div className="absolute inset-0 flex items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
            <motion.button
              whileHover={{ scale: 1.15, rotate: 2 }} whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className="w-12 h-12 rounded-full bg-[hsl(145,58%,38%)] text-white flex items-center justify-center shadow-[0_8px_24px_rgba(45,160,90,0.7)] hover:shadow-[0_0_40px_rgba(45,160,90,0.9)] transition-all liquid-glow"
            >
              <ShoppingCart size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.92 }}
              onClick={handleWishlist}
              className={cn(
                'w-11 h-11 rounded-full flex items-center justify-center transition-all',
                isWishlisted
                  ? 'bg-[hsl(40,88%,52%)] text-black shadow-[0_4px_16px_rgba(212,175,55,0.6)]'
                  : 'bg-white/15 text-white backdrop-blur-md border border-white/25 hover:bg-white/25'
              )}
            >
              <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
            </motion.button>
          </div>

          {/* Wishlist pill top-right when not hovering */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          />
        </div>

        {/* ── Content ───────────────────────────────── */}
        <div className="flex flex-col flex-1 p-4">
          {/* Brand */}
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-1.5
            [text-shadow:0_0_8px_rgba(255,255,255,0.1)]">
            {product.brand || product.category}
          </p>

          {/* Title */}
          <h3 className="font-display font-semibold text-sm leading-snug mb-2 line-clamp-2
            text-white group-hover:text-[hsl(145,70%,65%)] transition-colors duration-200
            [text-shadow:0_1px_6px_rgba(0,0,0,0.8),0_0_16px_rgba(255,255,255,0.06)]">
            {product.name}
          </h3>

          {/* Stars */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={11}
                  className={i < Math.floor(product.rating || 0)
                    ? 'fill-[hsl(40,88%,55%)] text-[hsl(40,88%,55%)] drop-shadow-[0_0_4px_rgba(212,175,55,0.6)]'
                    : 'text-white/20'}
                />
              ))}
            </div>
            <span className="text-[10px] text-white/35">({(product.reviews || 0).toLocaleString()})</span>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline gap-2 mb-3 mt-auto">
            <span className="text-lg font-bold text-[hsl(145,65%,58%)]
              [text-shadow:0_0_16px_rgba(45,160,90,0.5),0_0_32px_rgba(45,160,90,0.2)]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-white/30 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-1.5 mb-3">
            {product.inStock ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-[10px] text-emerald-400/80">In Stock</span>
              </>
            ) : (
              <span className="text-[10px] text-red-400/70">Out of Stock</span>
            )}
          </div>

          {/* Add to cart button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={cn(
              'w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300',
              'relative overflow-hidden',
              // Inset top highlight
              'after:absolute after:inset-x-0 after:top-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent',
              product.inStock
                ? [
                    'bg-gradient-to-b from-[hsl(145,58%,44%)] to-[hsl(145,58%,34%)] text-white',
                    'shadow-[0_3px_12px_rgba(45,160,90,0.4)]',
                    'hover:shadow-[0_6px_24px_rgba(45,160,90,0.6),0_0_40px_rgba(45,160,90,0.15)]',
                    'hover:from-[hsl(145,58%,50%)] hover:to-[hsl(145,58%,40%)]',
                  ].join(' ')
                : 'bg-white/5 text-white/30 cursor-not-allowed border border-white/8',
            )}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </motion.button>
        </div>
      </motion.article>
    </Link>
  )
}
