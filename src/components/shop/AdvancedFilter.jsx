import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Sliders } from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from '../ui/Button';
import { listVariants, listItemVariants } from '../../lib/animations';

export default function AdvancedFilter({
  filters,
  activeFilters,
  onFilterChange,
  onClearAll,
  isOpen,
  onToggle,
}) {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    rating: false,
    size: false,
    color: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handlePriceChange = (type, value) => {
    const newRange = type === 'min' 
      ? [Math.min(value, priceRange[1]), priceRange[1]]
      : [priceRange[0], Math.max(value, priceRange[0])];
    setPriceRange(newRange);
    onFilterChange('price', newRange);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed bottom-8 right-8 p-4 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center gap-2 z-40"
      >
        <Sliders size={20} />
        {Object.keys(activeFilters).length > 0 && (
          <span className="bg-accent text-accent-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
            {Object.keys(activeFilters).length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggle}
              className="md:hidden fixed inset-0 bg-black/50 z-30"
            />
            {/* Mobile Filter Panel */}
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              className="md:hidden fixed left-0 top-0 h-full w-80 bg-card-bg z-40 overflow-y-auto"
            >
              <div className="p-6 border-b border-card-border flex items-center justify-between">
                <h2 className="text-xl font-display font-semibold">Filters</h2>
                <button onClick={onToggle} className="p-1 hover:bg-white/10 rounded">
                  <X size={20} />
                </button>
              </div>
              <FilterContent
                filters={filters}
                activeFilters={activeFilters}
                onFilterChange={onFilterChange}
                expandedSections={expandedSections}
                toggleSection={toggleSection}
                priceRange={priceRange}
                handlePriceChange={handlePriceChange}
                onClearAll={onClearAll}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Filter Sidebar */}
      <div className="hidden md:block bg-card-bg rounded-xl p-6 h-fit sticky top-24 glass">
        <FilterContent
          filters={filters}
          activeFilters={activeFilters}
          onFilterChange={onFilterChange}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          priceRange={priceRange}
          handlePriceChange={handlePriceChange}
          onClearAll={onClearAll}
        />
      </div>
    </>
  );
}

function FilterContent({
  filters,
  activeFilters,
  onFilterChange,
  expandedSections,
  toggleSection,
  priceRange,
  handlePriceChange,
  onClearAll,
}) {
  return (
    <motion.div
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Clear All */}
      {Object.keys(activeFilters).length > 0 && (
        <motion.div variants={listItemVariants}>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="w-full text-destructive hover:bg-destructive/10"
          >
            Clear All Filters
          </Button>
        </motion.div>
      )}

      {/* Active Filters Display */}
      {Object.keys(activeFilters).length > 0 && (
        <motion.div variants={listItemVariants} className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Active Filters</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([key, values]) => (
              Array.isArray(values) ? values.map(v => (
                <motion.div
                  key={`${key}-${v}`}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-1.5 bg-primary/20 text-primary px-2.5 py-1 rounded-full text-xs"
                >
                  {v}
                  <button
                    onClick={() => onFilterChange(key, v)}
                    className="hover:bg-primary/30 rounded p-0.5"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              )) : null
            ))}
          </div>
        </motion.div>
      )}

      {/* Price Filter */}
      <motion.div variants={listItemVariants}>
        <button
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between py-3 hover:text-primary transition-colors"
        >
          <span className="font-semibold">Price Range</span>
          <motion.div
            animate={{ rotate: expandedSections.price ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>
        <AnimatePresence>
          {expandedSections.price && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-4 py-3"
            >
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                  placeholder="Min"
                  className="w-20 px-3 py-2 bg-white/5 border border-card-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
                <span className="flex items-center">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                  placeholder="Max"
                  className="w-20 px-3 py-2 bg-white/5 border border-card-border rounded-lg text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                className="w-full accent-primary"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Category Filter */}
      <motion.div variants={listItemVariants}>
        <button
          onClick={() => toggleSection('category')}
          className="w-full flex items-center justify-between py-3 hover:text-primary transition-colors"
        >
          <span className="font-semibold">Category</span>
          <motion.div
            animate={{ rotate: expandedSections.category ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>
        <AnimatePresence>
          {expandedSections.category && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 py-2"
            >
              {filters.categories?.map((cat) => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={activeFilters.category?.includes(cat) || false}
                    onChange={() => onFilterChange('category', cat)}
                    className="w-4 h-4 rounded bg-white/5 border border-card-border checked:bg-primary"
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">{cat}</span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Rating Filter */}
      <motion.div variants={listItemVariants}>
        <button
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between py-3 hover:text-primary transition-colors"
        >
          <span className="font-semibold">Rating</span>
          <motion.div
            animate={{ rotate: expandedSections.rating ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </button>
        <AnimatePresence>
          {expandedSections.rating && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-2 py-2"
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={activeFilters.rating?.includes(rating) || false}
                    onChange={() => onFilterChange('rating', rating)}
                    className="w-4 h-4 rounded bg-white/5 border border-card-border checked:bg-primary"
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">
                    {rating}+ Stars
                  </span>
                </label>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
