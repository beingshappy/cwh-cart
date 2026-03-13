import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';

const menuData = {
  electronics: {
    sections: [
      { name: 'Computers', items: ['Laptops', 'Desktops', 'Tablets', 'Accessories'] },
      { name: 'Mobile', items: ['Smartphones', 'Phone Cases', 'Chargers', 'Screen Protectors'] },
      { name: 'Audio', items: ['Headphones', 'Speakers', 'Microphones', 'Cables'] },
    ],
    featured: { title: 'Premium Collection', items: [{ name: 'Pro Laptops', badge: 'New' }, { name: 'Wireless Earbuds', badge: 'Trending' }] },
  },
  fashion: {
    sections: [
      { name: 'Men', items: ['Shirts', 'Pants', 'Shoes', 'Accessories'] },
      { name: 'Women', items: ['Dresses', 'Tops', 'Bottoms', 'Shoes'] },
      { name: 'Accessories', items: ['Watches', 'Bags', 'Jewelry', 'Scarves'] },
    ],
    featured: { title: 'Seasonal Trends', items: [{ name: 'Summer Collection', badge: 'Sale' }, { name: 'Designer Collabs', badge: 'Exclusive' }] },
  },
  home: {
    sections: [
      { name: 'Furniture', items: ['Sofas', 'Chairs', 'Tables', 'Beds'] },
      { name: 'Decor', items: ['Wall Art', 'Lighting', 'Rugs', 'Plants'] },
      { name: 'Kitchen', items: ['Cookware', 'Appliances', 'Dinnerware', 'Utensils'] },
    ],
    featured: { title: 'Home Office', items: [{ name: 'Workspace Essentials', badge: 'New' }, { name: 'Standing Desks', badge: 'Premium' }] },
  },
};

export default function MegaMenu({ isOpen, onClose, category, align = 'center' }) {
  const data = menuData[category] || menuData.electronics;

  // Align the dropdown: for leftmost items left-align, rightmost right-align, middle center
  const alignClass =
    align === 'left' ? 'left-0' :
    align === 'right' ? 'right-0' :
    'left-1/2 -translate-x-1/2';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onMouseLeave={onClose}
          className={`absolute top-[calc(100%+0.75rem)] ${alignClass} w-[680px] max-w-[calc(100vw-2rem)] bg-black/85 backdrop-blur-2xl border border-white/12 rounded-2xl shadow-2xl shadow-black/60 z-[100] overflow-hidden`}
        >
          <div className="p-6">
            <div className="grid grid-cols-4 gap-6">
              {/* Sections */}
              <div className="col-span-3 grid grid-cols-3 gap-6">
                {data.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                      {section.name}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item}>
                          <Link
                            to={`/shop?q=${item.toLowerCase()}`}
                            onClick={onClose}
                            className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                          >
                            <ChevronRight size={11} className="opacity-0 group-hover:opacity-60 transition-opacity flex-shrink-0" />
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Featured */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3 flex items-center gap-1.5">
                  <Sparkles size={12} /> {data.featured.title}
                </h3>
                <div className="space-y-2">
                  {data.featured.items.map((item, idx) => (
                    <Link
                      key={idx}
                      to={`/shop?featured=${encodeURIComponent(item.name)}`}
                      onClick={onClose}
                      className="group block bg-white/5 hover:bg-white/10 border border-white/8 hover:border-primary/40 p-3 rounded-xl transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-medium group-hover:text-primary transition-colors leading-snug">{item.name}</span>
                        <span className="flex-shrink-0 text-[10px] bg-accent text-black px-1.5 py-0.5 rounded-full font-bold">
                          {item.badge}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
