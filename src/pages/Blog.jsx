import { motion } from 'framer-motion'
import { ArrowRight, BookOpen, Rss } from 'lucide-react'
import { Link } from 'react-router-dom'
import { containerVariants, itemVariants } from '../lib/animations'

const posts = [
  { slug: '1', title: '10 Must-Have Premium Tech Gadgets of 2025', category: 'Electronics', date: 'Mar 10, 2025', read: '5 min', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80', excerpt: 'From ultra-slim laptops to noise-cancelling earbuds — the gadgets redefining what premium means.' },
  { slug: '2', title: 'The Art of Sustainable Luxury Fashion', category: 'Fashion', date: 'Mar 7, 2025', read: '7 min', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80', excerpt: 'How the world\'s most coveted fashion brands are embracing sustainability without sacrificing style.' },
  { slug: '3', title: 'Build the Perfect Home Office in 2025', category: 'Home', date: 'Mar 4, 2025', read: '6 min', image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', excerpt: 'Expert picks for ergonomic chairs, lighting, and accessories that make working from home a joy.' },
  { slug: '4', title: 'Smartwatch Buyer\'s Guide: Which One Is Right For You?', category: 'Wearables', date: 'Mar 1, 2025', read: '8 min', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', excerpt: 'Comparing the best smartwatches of 2025 — health tracking, battery life, and style.' },
  { slug: '5', title: 'The CWH Cart Promise: Why We Obsess Over Quality', category: 'Brand', date: 'Feb 26, 2025', read: '4 min', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80', excerpt: 'An inside look at how we vet every product before it appears in our collection.' },
  { slug: '6', title: 'Photography Gear for Every Budget in 2025', category: 'Photography', date: 'Feb 22, 2025', read: '9 min', image: 'https://images.unsplash.com/photo-1606986628055-a6a7d880ef4c?w=600&q=80', excerpt: 'Whether you\'re a beginner or a pro — these cameras and accessories will elevate your craft.' },
]

const categoryColors = { Electronics: 'text-blue-400', Fashion: 'text-pink-400', Home: 'text-amber-400', Wearables: 'text-green-400', Brand: 'text-primary', Photography: 'text-violet-400' }

export default function Blog() {
  const [featured, ...rest] = posts

  return (
    <div className="min-h-screen px-4 md:px-8 pb-12">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="pt-4 mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Rss size={20} className="text-primary" />
            <span className="text-xs text-primary font-bold uppercase tracking-widest">CWH Cart Journal</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">Stories & Guides</h1>
          <p className="text-white/50 max-w-xl text-sm">Inspiration, buying guides, and brand stories from the world of premium products.</p>
        </motion.div>

        {/* Featured Post */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-10">
          <Link to={`/blog/${featured.slug}`}
            className="group block glass rounded-3xl overflow-hidden border border-white/10 hover:border-primary/40 transition-all">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative overflow-hidden h-64 md:h-80">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className={`text-xs font-bold uppercase tracking-widest mb-3 ${categoryColors[featured.category] || 'text-primary'}`}>{featured.category}</span>
                <h2 className="text-2xl md:text-3xl font-bold mb-3 leading-tight group-hover:text-primary transition-colors">{featured.title}</h2>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-white/40">
                  <span>{featured.date} · {featured.read} read</span>
                  <span className="text-primary group-hover:gap-3 flex items-center gap-1.5 font-semibold transition-all">Read More <ArrowRight size={14} /></span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Grid */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Link to={`/blog/${post.slug}`}
                className="group block glass rounded-2xl overflow-hidden border border-white/10 hover:border-primary/30 transition-all h-full">
                <div className="relative overflow-hidden h-48">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className={`text-xs font-bold uppercase tracking-widest ${categoryColors[post.category] || 'text-primary'}`}>{post.category}</span>
                  <h3 className="font-bold text-base mt-1.5 mb-2 leading-snug group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <p className="text-xs text-white/30">{post.date} · {post.read} read</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
