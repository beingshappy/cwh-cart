import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ShoppingBag, Search, Heart, User } from 'lucide-react'
import { useStore } from '../../store/useStore'

const navItems = [
  { icon: Home, label: 'Home', to: '/' },
  { icon: ShoppingBag, label: 'Shop', to: '/shop' },
  { icon: Search, label: 'Search', to: '/search' },
  { icon: Heart, label: 'Wishlist', to: '/wishlist' },
  { icon: User, label: 'Account', to: '/account' },
]

export default function MobileNav() {
  const location = useLocation()
  const { wishlist } = useStore()

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-2xl border-t border-white/10 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2 pb-safe">
        {navItems.map(({ icon: Icon, label, to }) => {
          const isActive = location.pathname === to || (to !== '/' && location.pathname.startsWith(to))
          return (
            <Link key={label} to={to} className="relative flex flex-col items-center gap-1 px-3 py-1 group">
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`relative p-2 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-primary/20 text-primary' : 'text-white/40 group-active:text-white'
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2.5 : 1.8} />
                {/* Wishlist badge */}
                {label === 'Wishlist' && wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[9px] rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="mobileNavDot"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                  />
                )}
              </motion.div>
              <span className={`text-[10px] font-medium transition-colors ${isActive ? 'text-primary' : 'text-white/30'}`}>
                {label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
