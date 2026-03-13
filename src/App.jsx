import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { AnimatePresence, motion } from 'framer-motion'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Account from './pages/Account'
import Search from './pages/Search'
import Deals from './pages/Deals'
import About from './pages/About'
import Contact from './pages/Contact'
import Wishlist from './pages/Wishlist'
import Blog from './pages/Blog'
import Privacy from './pages/Privacy'
import Returns from './pages/Returns'
import NotFound from './pages/NotFound'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MobileNav from './components/layout/MobileNav'
import BackgroundEffects from './components/layout/BackgroundEffects'
import ScrollToTop from './components/layout/ScrollToTop'
import AdminBackdoor from './components/ui/AdminBackdoor'
import { useStore } from './store/useStore'


/* Page transition wrapper — uses the router location from context */
const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(6px)' },
  animate: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0, y: -12, filter: 'blur(3px)',
    transition: { duration: 0.28, ease: [0.55, 0, 1, 0.45] },
  },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname} variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/search" element={<Search />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function App() {
  const { isAdminOpen, setAdminOpen, isLockedDown } = useStore()

  useEffect(() => {
    // 0. Toggle Class on Root
    if (isLockedDown) {
      document.documentElement.classList.add('is-locked')
    } else {
      document.documentElement.classList.remove('is-locked')
    }

    // 1. Disable Right-Click
    const handleContextMenu = (e) => {
      if (isLockedDown) e.preventDefault()
    }
    
    // 2. Disable Selection Event
    const handleSelectStart = (e) => {
      if (isLockedDown) e.preventDefault()
    }

    // 3. Handle Keyboard Shortcuts (Access & Zoom)
    let keyBuffer = ''
    const handleKeyDown = (e) => {
      // Secret Admin Access: "5295" sequence
      if (!isNaN(e.key)) {
        keyBuffer += e.key
        if (keyBuffer.endsWith('5295')) {
          setAdminOpen(true)
          keyBuffer = ''
        } else if (keyBuffer.length > 10) {
          keyBuffer = keyBuffer.slice(-4)
        }
      } else {
        keyBuffer = '' // Reset on non-numeric key
      }

      // Disable Zoom: Ctrl + Plus, Minus, Zero
      if (isLockedDown && e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '0' || e.key === '=')) {
        e.preventDefault()
      }
    }

    // 4. Disable Wheel Zoom: Ctrl + Wheel
    const handleWheel = (e) => {
      if (isLockedDown && e.ctrlKey) e.preventDefault()
    }

    // 5. Disable Pinch-to-zoom (Touch)
    const handleTouchStart = (e) => {
      if (isLockedDown && e.touches.length > 1) e.preventDefault()
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('keydown', handleKeyDown)
    window.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('touchstart', handleTouchStart, { passive: false })

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('wheel', handleWheel)
      document.removeEventListener('touchstart', handleTouchStart)
      document.documentElement.classList.remove('is-locked')
    }
  }, [setAdminOpen, isLockedDown])

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col relative">
        <BackgroundEffects />

        <Navbar />
        <main className="flex-1 pt-24 md:pt-28 pb-20 lg:pb-0 relative z-10">
          <AnimatedRoutes />
        </main>
        <Footer />
        <MobileNav />
        <AdminBackdoor isOpen={isAdminOpen} onClose={() => setAdminOpen(false)} />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'rgba(10,20,14,0.95)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#fff',
              borderRadius: '14px',
            },
          }}
        />
      </div>
    </BrowserRouter>
  )
}
