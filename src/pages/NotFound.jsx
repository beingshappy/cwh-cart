import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft, HelpCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Animated 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="relative inline-block mb-8"
        >
          <motion.p
            className="text-[8rem] md:text-[12rem] font-display font-bold leading-none select-none"
            style={{ WebkitTextStroke: '2px rgba(255,255,255,0.08)', color: 'transparent' }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            404
          </motion.p>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
              <HelpCircle className="w-16 h-16 md:w-24 md:h-24 text-primary relative z-10" />
            </div>
          </motion.div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="text-2xl md:text-4xl font-display font-bold mb-4"
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
          className="text-white/50 mb-10 max-w-sm mx-auto text-sm md:text-base"
        >
          Looks like this page got lost in the collection. Let's get you back to something premium.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-primary/30">
            <Home size={18} /> Back to Home
          </Link>
          <Link to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/15 hover:border-white/30 font-semibold rounded-xl transition-all">
            <ArrowLeft size={18} /> Browse Shop
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

