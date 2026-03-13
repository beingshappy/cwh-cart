import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { heroTextVariants, heroImageVariants, badgeVariants } from '../../lib/animations';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-accent/20 to-transparent rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          variants={heroTextVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={badgeVariants}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2">
              <Sparkles size={16} className="text-accent" />
              <span className="text-sm font-semibold text-primary">
                Premium Collection 2024
              </span>
            </div>
          </motion.div>

          {/* Headline */}
          <div className="space-y-4">
            <motion.h1
              variants={heroTextVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
            >
              Luxury Shopping
              <motion.span
                className="block bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              >
                Redefined
              </motion.span>
            </motion.h1>

            <motion.p
              variants={heroTextVariants}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl"
            >
              Discover curated collections of premium products from world-class brands. Experience luxury shopping with personalized recommendations and exclusive deals.
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div
            variants={heroTextVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <Link to="/shop">
              <Button size="lg" variant="primary" className="w-full sm:w-auto">
                Shop Collection
              </Button>
            </Link>
            <Link to="/deals">
              <Button size="lg" variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2">
                View Today's Deals
                <ArrowRight size={20} />
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={heroTextVariants}
            className="grid grid-cols-3 gap-4 pt-8 border-t border-card-border"
          >
            {[
              { number: '10K+', label: 'Premium Products' },
              { number: '50K+', label: 'Happy Customers' },
              { number: '24/7', label: 'Customer Support' },
            ].map((stat, idx) => (
              <div key={idx}>
                <p className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.number}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Visual */}
        <motion.div
          variants={heroImageVariants}
          initial="hidden"
          animate="visible"
          className="relative hidden lg:block"
        >
          {/* Premium Image Container */}
          <div className="relative">
            {/* Floating Cards */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-8 -left-8 w-40 h-40 glass rounded-2xl p-4 z-10"
            >
              <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/10 rounded-lg flex items-center justify-center">
                <span className="text-4xl">⭐</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-8 -right-8 w-32 h-32 glass rounded-2xl p-4 z-10"
            >
              <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
            </motion.div>

            {/* Main Hero Image Area */}
            <div className="relative w-full aspect-square rounded-3xl overflow-hidden glass border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/10" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-9xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent opacity-20">
                  🛍️
                </div>
              </motion.div>

              {/* Shopping Bag Animation */}
              <motion.div
                animate={{ rotate: [0, -5, 5, 0], y: [-20, 0, -20] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="text-7xl drop-shadow-lg">
                  👜
                </div>
              </motion.div>
            </div>
          </div>

          {/* Floating Elements */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-12 border-2 border-primary/10 rounded-full pointer-events-none"
          />
        </motion.div>
      </div>
    </section>
  );
}
