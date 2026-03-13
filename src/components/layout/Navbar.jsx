import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search as SearchIcon,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import { useStore } from '../../store/useStore'
import MegaMenu from './MegaMenu'
import CartDrawer from '../cart/CartDrawer'
import { slideDownVariants } from '../../lib/animations'
import Logo from '../ui/Logo'

const mainCategories = [
  { name: 'Electronics', key: 'electronics', hasMega: true },
  { name: 'Fashion', key: 'fashion', hasMega: true },
  { name: 'Home & Garden', key: 'home', hasMega: true },
  { name: 'Deals', key: 'deals', hasMega: false, to: '/deals' },
  { name: 'Trending', key: 'trending', hasMega: false, to: '/shop?sort=trending' },
]

export default function Navbar() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMegaMenu, setActiveMegaMenu] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { cartItems, wishlist } = useStore()

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setShowSearch(false)
      setSearchQuery('')
    }
  }

  return (
    <>
      {/* Floating Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-[500] flex justify-center px-4 pt-4 md:pt-6"
      >
        <nav className="w-full max-w-7xl relative mx-auto">
          {/* Main Pill Bar */}
          <div
            className={`flex items-center justify-between gap-4 px-6 py-2.5 rounded-[2rem] border transition-all duration-700 ${
              scrolled
                ? 'bg-black/80 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-3xl'
                : 'bg-black/40 border-white/12 shadow-[0_10px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl'
            }`}
          >
            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-9 h-9 flex-shrink-0"
              >
                <Logo size={36} onLongPress={() => useStore.getState().setAdminOpen(true)} />
              </motion.div>
              <div className="hidden sm:block leading-tight">
                <p className="text-base font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-display">
                  CWH Cart
                </p>
                <p className="text-[10px] text-white/40 -mt-0.5">Premium Shopping</p>
              </div>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <div className="hidden lg:flex items-center gap-0.5 flex-1 justify-center overflow-visible">
              {mainCategories.map((cat, catIdx) => (
                <div
                  key={cat.key}
                  className="relative"
                  onMouseEnter={() => cat.hasMega && setActiveMegaMenu(cat.key)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  {cat.hasMega ? (
                    <button
                      className={`flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 outline-none focus:outline-none select-none liquid-glow ${
                        activeMegaMenu === cat.key
                          ? 'text-white bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                          : 'text-white/70 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <span className="relative z-10 text-glow">{cat.name}</span>
                      <motion.span
                        animate={{ rotate: activeMegaMenu === cat.key ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown size={14} className="text-primary group-hover:text-white transition-colors" />
                      </motion.span>
                    </button>
                  ) : (
                    <Link
                      to={cat.to || '/'}
                      className="flex items-center gap-1 px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-300 outline-none focus:outline-none select-none text-white/70 hover:text-white hover:bg-white/10 liquid-glow text-glow"
                    >
                      {cat.name}
                    </Link>
                  )}
                  {cat.hasMega && (
                    <MegaMenu
                      isOpen={activeMegaMenu === cat.key}
                      onClose={() => setActiveMegaMenu(null)}
                      category={cat.key}
                      align={
                        catIdx === 0 ? 'left' :
                        catIdx >= mainCategories.filter(c => c.hasMega).length - 1 ? 'right' :
                        'center'
                      }
                    />
                  )}
                </div>
              ))}
            </div>

            {/* ── Right Actions ── */}
            <div className="flex items-center gap-1 flex-shrink-0">
              {/* Search */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowSearch((v) => !v)}
                className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all outline-none focus:outline-none"
              >
                <SearchIcon size={18} />
              </motion.button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all group magnetic-hover"
              >
                <Heart
                  size={18}
                  className="group-hover:fill-rose-400 group-hover:text-rose-400 transition-all duration-200"
                />
                {wishlist.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] rounded-full flex items-center justify-center font-bold"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </Link>

              {/* Cart */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all group outline-none focus:outline-none magnetic-hover"
              >
                <ShoppingCart
                  size={18}
                  className="group-hover:text-accent transition-colors duration-200"
                />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-black text-[10px] rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Account */}
              <Link
                to="/account"
                className="hidden sm:flex p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <User size={18} />
              </Link>

              {/* Mobile Hamburger */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen((v) => !v)}
                className="lg:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all ml-1 outline-none focus:outline-none"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={18} />
                    </motion.span>
                  ) : (
                    <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={18} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* ── Search Dropdown ── */}
          <AnimatePresence>
            {showSearch && (
              <motion.form
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                onSubmit={handleSearch}
                className="absolute top-[calc(100%+0.75rem)] left-0 right-0 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-2xl p-3 flex gap-2 shadow-2xl shadow-black/60"
              >
                <input
                  type="text"
                  placeholder="Search for premium products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="flex-1 bg-white/5 border border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-2 text-sm outline-none focus:border-primary/60 focus:bg-white/8 transition-all"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-light text-white text-sm font-semibold rounded-xl transition-colors"
                >
                  Search
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {/* ── Mobile Menu Dropdown ── */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="lg:hidden absolute top-[calc(100%+0.75rem)] left-0 right-0 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-2xl p-3 shadow-2xl shadow-black/60"
              >
                {mainCategories.map((cat) => (
                  <Link
                    key={cat.key}
                    to={`/shop?category=${cat.key}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:text-white hover:bg-white/8 transition-all font-medium text-sm"
                  >
                    {cat.name}
                  </Link>
                ))}
                <div className="h-px bg-white/8 my-2" />
                <Link
                  to="/account"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/8 transition-all text-sm"
                >
                  My Account
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
