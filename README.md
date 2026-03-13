# CWH Cart - Extraordinary Premium Shopping

A cinematic, enterprise-grade luxury e-commerce platform built with an "anti-gravity" modern aesthetic. Designed to deliver high-end shopping experiences comparable to world-class luxury brands.

![React](https://img.shields.io/badge/React-18.3-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3-cyan?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-black?logo=framer)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### Advanced Design System (Cinematic Minimalism)
- **Bull Brand Identity**: Strong, premium visual presence with the new Bull mascot.
- **Extraordinary UI**: Vibrant colors, dark mode, and "anti-gravity" depth transitions.
- **Premium Color Palette**: Deep emerald, gold accents, and absolute black for high luxury.
- **Advanced Typography**: Sophisticated font pairings (Playfair Display + Inter/Outfit).
- **Glassmorphism 2.0**: High-refraction blur effects with dynamic lighting.
- **Micro-Animations**: Custom "liquid-glow" hover effects and smooth motion paths.

### Core Features
- 🛒 **PWA Ready** - Fully functional Progressive Web App with offline caching & mobile install support.
- 🚀 **SEO Optimized** - Dynamic page titles (`useSEO`), JSON-LD Structured Data, and rich social meta tags.
- 🛍️ **Advanced Collections** - Multi-select categories, price range, and rating-based filtering.
- 🔍 **Dynamic Search** - Instant search results with keyword highlighting and layout switching.
- 💝 **Premium Wishlist** - Pulsing heart interactions and specialized empty states (Emoji-free).
- 🏷️ **Flash Deals** - Live cinematic countdown timers and high-urgency luxury badges.
- 📊 **Smart Inventory** - Real-time "In Stock" indicators with premium icon feedback.

### Premium Interactions
- **Mega Menu Navigation** - Category showcases with featured items
- **Product Card Animations** - Hover zoom, color shifts, action overlays
- **Smooth Page Transitions** - Staggered animations with Framer Motion
- **Micro-interactions** - Feedback on every action
- **Loading States** - Skeleton screens and spinners
- **Toast Notifications** - Real-time feedback system

### Technical Excellence
- ⚡ **Vite Bundler** - Lightning-fast builds with HMR
- 🎬 **Framer Motion** - Professional animations throughout
- 🎨 **Tailwind CSS** - Utility-first styling with design tokens
- 📦 **Zustand** - Lightweight state management
- 🪝 **React Router v6** - Client-side routing
- 📝 **React Hook Form** - Efficient form handling
- ♿ **WCAG AA** - Accessibility compliant

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/cwh-cart/cwh-cart-frontend.git
cd cwh-cart-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Visit http://localhost:5173
```

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/              # Reusable components
│   ├── ui/                 # Basic UI components
│   ├── layout/             # Layout components (Navbar, Footer, MegaMenu)
│   ├── product/            # Product-related components
│   ├── shop/               # Shop features (Filter, etc.)
│   ├── cart/               # Cart components
│   └── home/               # Homepage sections
├── pages/                  # Route pages
├── store/                  # Zustand store (state management)
├── lib/                    # Utilities & helpers
│   ├── utils.js           # Helper functions
│   ├── animations.js      # Framer Motion variants
│   └── colors.ts          # Design tokens
├── App.jsx                # Main app component with routing
├── main.jsx               # Entry point
└── index.css              # Global styles & design tokens
```

## 🎨 Design System

### Colors
- **Primary**: Emerald Green (`#2D6A4F`)
- **Accent**: Gold (`#D4AF37`)
- **Background**: Black (`#000000`)
- **Text**: Cream (`#F7F7F4`)

### Typography
```css
Display: Playfair Display (Serif)
Body: Inter (Sans-serif)
Scale: 12px - 64px
Weights: 300, 400, 500, 600, 700
```

### Spacing
- **xs**: 0.5rem
- **sm**: 1rem
- **md**: 1.5rem
- **lg**: 2rem
- **xl**: 2.5rem
- **2xl**: 3rem

## 🧩 Key Components

### Navbar
Premium sticky navigation with mega menu, search, cart, and wishlist.

```jsx
<Navbar />
```

### ProductCard
Advanced product display with badges, actions, and animations.

```jsx
<ProductCard 
  product={product} 
  featured={true}
/>
```

### AdvancedFilter
Comprehensive filtering system with mobile drawer support.

```jsx
<AdvancedFilter 
  filters={filterConfig}
  activeFilters={filters}
  onFilterChange={handleFilter}
  isOpen={isOpen}
/>
```

### CartDrawer
Floating cart panel with order summary.

```jsx
<CartDrawer 
  isOpen={isCartOpen}
  onClose={() => setIsCartOpen(false)}
/>
```

### MegaMenu
Category showcase with featured items.

```jsx
<MegaMenu 
  isOpen={isOpen}
  onClose={handleClose}
  category="electronics"
/>
```

## 🎬 Animations

The project includes comprehensive Framer Motion animations:

- **Container Animations**: Staggered children animations
- **Item Animations**: Individual element transitions
- **Page Transitions**: Smooth route changes
- **Hover Effects**: Interactive feedback
- **Loading States**: Shimmer and pulse effects
- **Drawer Animations**: Slide-in panels

See `src/lib/animations.js` for all available variants.

## 🛒 State Management

Using Zustand for global state:

```javascript
// In any component
const { cart, addToCart, removeFromCart } = useStore()

// Add to cart
addToCart(product, quantity)

// Get cart count
const count = cart.reduce((sum, item) => sum + item.quantity, 0)
```

## 🔗 Routing

React Router v6 setup with the following routes:

- `/` - Home page
- `/shop` - Product listing
- `/product/:id` - Product detail
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/account/*` - User account pages
- `/search` - Search results
- `/deals` - Flash deals
- `/about` - About page
- `/contact` - Contact page

## ♿ Accessibility

- WCAG AA compliant
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus management
- Screen reader optimized

## 📈 Performance

- Lazy loading for images
- Code splitting for routes
- Efficient re-renders with React hooks
- Optimized animations
- CDN-ready image URLs

## 🔧 Customization

### Change Color Scheme

Edit `src/index.css` CSS variables:

```css
:root {
  --primary: 145 60% 38%;      /* Emerald Green */
  --accent: 40 90% 55%;        /* Gold */
  --background: 0 0% 2%;       /* Black */
  --foreground: 0 0% 97%;      /* Cream */
}
```

### Modify Typography

Update `tailwind.config.js` font family:

```javascript
fontFamily: {
  sans: ['Your Font', 'system-ui'],
  display: ['Your Display Font', 'serif'],
}
```

### Adjust Spacing

Edit spacing scale in `tailwind.config.js`:

```javascript
spacing: {
  xs: '0.5rem',
  sm: '1rem',
  // ... more values
}
```

## 📚 Dependencies

### Core
- `react` - UI library
- `react-dom` - DOM rendering
- `react-router-dom` - Routing
- `zustand` - State management

### Animation & UI
- `framer-motion` - Advanced animations
- `lucide-react` - Icon library
- `sonner` - Toast notifications

### Styling
- `tailwindcss` - Utility CSS
- `clsx` - Class composition
- `tailwind-merge` - Class merging

### Forms
- `react-hook-form` - Form handling

## 🌐 Browser Support

- Chrome/Edge 100+ (for Backdrop-filter support)
- Firefox 90+
- Safari 15+
- Mobile iOS/Android (PWA optimized)

## 📝 License

MIT License - feel free to use this project commercially.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues or questions:
1. Check the [Documentation](./ENTERPRISE_FEATURES.md)
2. Open an issue on GitHub
3. Contact support

## 🎯 Roadmap

- [ ] Backend API integration
- [ ] Payment processing (Stripe)
- [ ] User authentication
- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Admin dashboard
- [ ] Mobile app
- [ ] AI recommendations

## 🙌 Credits

Built with ❤️ using modern web technologies.

---

**Start building extraordinary e-commerce experiences today with CWH Cart!**

Visit [CWH Cart](https://cwhcart.com) for more details.
