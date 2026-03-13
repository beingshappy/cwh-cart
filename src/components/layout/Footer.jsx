import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Twitter, Facebook, Youtube, ArrowRight } from 'lucide-react'
import Logo from '../ui/Logo'

const footerLinks = {
  Shop: [
    { label: 'Electronics', to: '/shop?category=Electronics' },
    { label: 'Fashion', to: '/shop?category=Fashion' },
    { label: 'Wearables', to: '/shop?category=Wearables' },
    { label: 'Photography', to: '/shop?category=Photography' },
    { label: 'Accessories', to: '/shop?category=Accessories' },
    { label: 'Home & Garden', to: '/shop?category=Home' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Deals', to: '/deals' },
    { label: 'Contact', to: '/contact' },
    { label: 'Trending', to: '/shop?sort=trending' },
  ],
  Support: [
    { label: 'My Account', to: '/account' },
    { label: 'Wishlist', to: '/wishlist' },
    { label: 'Returns & Refunds', to: '/returns' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Track Order', to: '/account' },
  ],
}

const socials = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-black/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-10 mb-12">
          
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <Logo size={32} />
              <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CWH Cart
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
              Curating the world's finest products for those who appreciate quality without compromise.
            </p>
            
            {/* Newsletter */}
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-3">Stay in the loop</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input type="email" placeholder="Your email" 
                className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm placeholder:text-white/30 focus:outline-none focus:border-primary/60 transition-all" />
              <button type="submit"
                className="flex-shrink-0 px-3 py-2 bg-primary hover:bg-primary-light text-white rounded-lg transition-all">
                <ArrowRight size={16} />
              </button>
            </form>

            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {socials.map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-primary/20 border border-white/10 hover:border-primary/40 flex items-center justify-center text-white/50 hover:text-primary transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">{group}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link to={to}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200 hover:translate-x-0.5 inline-block">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 py-6 border-t border-b border-white/8">
          {[
            { icon: Mail, label: 'support@cwhcart.com' },
            { icon: Phone, label: '+1 (555) 123-4567' },
            { icon: MapPin, label: '123 Luxury Ave, New York, NY 10001' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-white/50">
              <Icon size={14} className="text-primary flex-shrink-0" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <p>© {new Date().getFullYear()} CWH Cart. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/returns" className="hover:text-white transition-colors">Returns</Link>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
