import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { formatPrice } from '../lib/utils'
import { containerVariants, itemVariants } from '../lib/animations'
import { toast } from 'sonner'
import { useSEO } from '../hooks/useSEO'

export default function Wishlist() {
  useSEO({ title: 'My Wishlist' })
  const { wishlist, toggleWishlist, addToCart } = useStore()

  const handleRemove = (item) => {
    toggleWishlist(item)
    toast.success(`${item.name} removed from wishlist`)
  }

  const handleAddToCart = (item) => {
    addToCart({ ...item, variants: { color: item.variants?.color?.[0], size: item.variants?.size?.[0] } }, 1)
    toast.success(`${item.name} added to cart`)
  }

  return (
    <div className="min-h-screen px-4 md:px-8 pb-12">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="pt-4 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart size={28} className="text-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold">My Wishlist</h1>
          </div>
          <p className="text-white/50 text-sm">{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
        </motion.div>

        {wishlist.length === 0 ? (
          <motion.div variants={itemVariants} initial="hidden" animate="visible"
            className="glass rounded-3xl p-16 text-center border border-white/10">
            <Heart className="w-16 h-16 mx-auto text-primary/40 mb-5 animate-pulse" />
            <h2 className="text-2xl font-bold mb-3">Your wishlist is empty</h2>
            <p className="text-white/50 mb-8 text-sm max-w-xs mx-auto">Save items you love and come back to them anytime.</p>
            <Link to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-xl font-semibold transition-all">
              Start Shopping <ArrowRight size={16} />
            </Link>
          </motion.div>
        ) : (
          <>
            <motion.div variants={containerVariants} initial="hidden" animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {wishlist.map((item) => (
                <motion.div key={item.id} variants={itemVariants} layout
                  className="glass rounded-2xl border border-white/10 hover:border-primary/30 transition-all overflow-hidden flex gap-4 p-4">
                  <Link to={`/product/${item.id}`} className="flex-shrink-0">
                    <img src={item.image} alt={item.name}
                      className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-xl hover:scale-105 transition-transform duration-300" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs text-primary/80 font-semibold uppercase tracking-wider">{item.category}</span>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="font-bold text-sm md:text-base leading-snug mb-1 hover:text-primary transition-colors line-clamp-2">{item.name}</h3>
                    </Link>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg font-bold text-primary">{formatPrice(item.price)}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-white/30 line-through">{formatPrice(item.originalPrice)}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(item)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-light text-white text-xs font-semibold rounded-lg transition-all">
                        <ShoppingCart size={13} /> Add to Cart
                      </motion.button>
                      <motion.button whileTap={{ scale: 0.95 }}
                        onClick={() => handleRemove(item)}
                        className="p-1.5 rounded-lg border border-white/10 hover:border-red-400/50 hover:text-red-400 transition-all text-white/40">
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => wishlist.forEach(item => handleAddToCart(item))}
                className="flex items-center justify-center gap-2 px-8 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all">
                <ShoppingCart size={18} /> Add All to Cart
              </button>
              <Link to="/shop"
                className="flex items-center justify-center gap-2 px-8 py-3 bg-white/5 border border-white/15 hover:border-white/30 font-semibold rounded-xl transition-all">
                Continue Shopping <ArrowRight size={16} />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
