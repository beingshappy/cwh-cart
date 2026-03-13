import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { Search as SearchIcon, Filter, LayoutGrid, List, ArrowUpDown } from 'lucide-react'
import { mockProducts } from '../lib/utils'
import ProductCard from '../components/product/ProductCard'
import AdvancedFilter from '../components/shop/AdvancedFilter'
import Button from '../components/ui/Button'
import { containerVariants, itemVariants } from '../lib/animations'
import { useSEO } from '../hooks/useSEO'

export default function Search() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  useSEO({ 
    title: query ? `Search: ${query}` : 'Search Products', 
    description: query ? `Search results for "${query}" at CWH Cart. Find the best premium products.` : 'Search for premium luxury products at CWH Cart.'
  })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState('trending')
  const [viewMode, setViewMode] = useState('grid')
  const [activeFilters, setActiveFilters] = useState({})

  // Filter products based on search query
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase())
  )

  // Apply sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return b.id - a.id
      case 'rating':
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: Array.isArray(prev[filterType])
        ? prev[filterType].includes(value)
          ? prev[filterType].filter(v => v !== value)
          : [...prev[filterType], value]
        : [value],
    }))
  }

  const handleClearFilters = () => {
    setActiveFilters({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      {/* Search Header */}
      <section className="sticky top-20 z-30 glass border-b border-card-border py-6 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <div className="flex items-center gap-3 mb-4">
                <SearchIcon size={20} className="text-accent" />
                <h1 className="text-2xl md:text-3xl font-display font-bold">
                  Search Results
                </h1>
              </div>
              <p className="text-muted-foreground">
                Found <span className="text-primary font-semibold">{sortedProducts.length}</span> products for{' '}
                <span className="text-primary font-semibold">"{query}"</span>
              </p>
            </motion.div>

            {/* Controls */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-4 justify-between"
            >
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant={isFilterOpen ? 'primary' : 'secondary'}
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="md:hidden flex items-center gap-2"
                >
                  <Filter size={16} />
                  Filters
                </Button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-card-bg border border-card-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                >
                  <option value="trending">Sort by: Trending</option>
                  <option value="newest">Sort by: Newest</option>
                  <option value="price-low">Sort by: Price Low to High</option>
                  <option value="price-high">Sort by: Price High to Low</option>
                  <option value="rating">Sort by: Rating</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card-bg hover:bg-white/10'
                  }`}
                >
                  <LayoutGrid size={18} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card-bg hover:bg-white/10'
                  }`}
                >
                  <List size={18} />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filter */}
          <div className="hidden lg:block">
            <AdvancedFilter
              filters={{
                categories: ['Electronics', 'Fashion', 'Home'],
              }}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
              isOpen={true}
            />
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-3">
            {sortedProducts.length === 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center py-24"
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <SearchIcon className="w-16 h-16 mx-auto text-primary/30 mb-4" />
                  <h2 className="text-2xl font-display font-bold mb-2">No results found</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    We couldn't find any products matching "{query}". Try different keywords or explore our categories.
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {sortedProducts.map((product, idx) => (
                  <motion.div
                    key={product.id}
                    variants={itemVariants}
                    transition={{ delay: (idx % 12) * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AdvancedFilter
        filters={{
          categories: ['Electronics', 'Fashion', 'Home'],
        }}
        activeFilters={activeFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearFilters}
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
      />
    </div>
  )
}
