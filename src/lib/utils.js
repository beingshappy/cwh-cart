import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
}

export function formatDiscount(original, discounted) {
  return `${((original - discounted) / original * 100).toFixed(0)}%`
}

export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

export const mockProducts = [
  // ── Electronics ──────────────────────────────────────────
  {
    id: '1', name: 'Pro Noise-Cancelling Headphones', price: 299.99, originalPrice: 399.99,
    rating: 4.8, reviews: 2341, category: 'Electronics', brand: 'CWH Cart',
    description: 'Industry-leading 40dB ANC with 30-hour battery. Plush leather cushions, foldable design, and Hi-Res audio certification.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    inStock: true, badge: 'trending',
    variants: { color: ['Midnight Black', 'Pearl Silver', 'Champagne Gold'], size: ['OneSize'] },
    tags: ['electronics', 'audio'],
  },
  {
    id: '2', name: 'Ultra-Slim Pro Laptop 14"', price: 1299.99, originalPrice: 1699.99,
    rating: 4.9, reviews: 1876, category: 'Electronics', brand: 'CWH Cart',
    description: 'Intel Core Ultra 7, 32GB RAM, 1TB SSD. 2.8K OLED display, all-day battery life. The thinnest premium laptop.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
    inStock: true, badge: 'new',
    variants: { color: ['Silver', 'Space Gray', 'Starlight'], size: ['14inch', '16inch'] },
    tags: ['electronics', 'computers'],
  },
  {
    id: '3', name: 'Smart 4K OLED Monitor 27"', price: 799.99, originalPrice: 999.99,
    rating: 4.7, reviews: 934, category: 'Electronics', brand: 'CWH Cart',
    description: '4K OLED panel with 120Hz refresh rate, HDR10+, and USB-C connectivity. Perfect for creatives and gamers alike.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    inStock: true, badge: null,
    variants: { color: ['Matte Black'], size: ['27inch', '32inch'] },
    tags: ['electronics', 'computers'],
  },
  {
    id: '4', name: 'Wireless Mechanical Keyboard', price: 149.99, originalPrice: 199.99,
    rating: 4.6, reviews: 2109, category: 'Electronics', brand: 'CWH Cart',
    description: 'Premium tactile switches, per-key RGB, 3-device Bluetooth. Aluminium chassis with satisfying click.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    inStock: true, badge: 'flash',
    variants: { color: ['Black', 'White', 'Pink'], size: ['TKL', 'Full'] },
    tags: ['electronics', 'accessories'],
  },
  {
    id: '5', name: 'Premium Wireless Earbuds', price: 199.99, originalPrice: 279.99,
    rating: 4.8, reviews: 4321, category: 'Electronics', brand: 'CWH Cart',
    description: 'Custom-tuned 11mm drivers, adaptive ANC, 36h total playtime. IPX5 waterproof, spatial audio support.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80',
    inStock: true, badge: 'bestseller',
    variants: { color: ['Black', 'White', 'Sage Green', 'Navy'], size: ['OneSize'] },
    tags: ['electronics', 'audio'],
  },
  {
    id: '6', name: 'Portable Bluetooth Speaker', price: 129.99, originalPrice: 179.99,
    rating: 4.5, reviews: 1532, category: 'Electronics', brand: 'CWH Cart',
    description: '360° surround sound with 24h battery and IP67 waterproofing. Pair two for stereo.',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    inStock: true, badge: null,
    variants: { color: ['Black', 'Teal', 'Red', 'White'], size: ['OneSize'] },
    tags: ['electronics', 'audio'],
  },

  // ── Wearables ─────────────────────────────────────────────
  {
    id: '7', name: 'Smart Watch Ultra Pro', price: 449.99, originalPrice: 599.99,
    rating: 4.9, reviews: 3201, category: 'Wearables', brand: 'CWH Cart',
    description: 'Always-on AMOLED display, ECG, SpO2, GPS. LTE connectivity and 18-day battery life.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    inStock: true, badge: 'trending',
    variants: { color: ['Black', 'Silver', 'Rose Gold', 'Titanium'], size: ['40mm', '44mm', '49mm'] },
    tags: ['wearables'],
  },
  {
    id: '8', name: 'Fitness Tracker Band', price: 89.99, originalPrice: 129.99,
    rating: 4.5, reviews: 5892, category: 'Wearables', brand: 'CWH Cart',
    description: '24/7 health monitoring, 14-day battery, 50m water resistance. Sleek minimalist design.',
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&q=80',
    inStock: true, badge: 'flash',
    variants: { color: ['Black', 'Pink', 'Blue', 'Green'], size: ['S/M', 'L/XL'] },
    tags: ['wearables'],
  },

  // ── Photography ───────────────────────────────────────────
  {
    id: '9', name: 'Full-Frame Mirrorless Camera', price: 2499.99, originalPrice: 2999.99,
    rating: 4.9, reviews: 788, category: 'Photography', brand: 'CWH Cart',
    description: '61MP sensor, 10fps burst, 4K120p video, in-body 5-axis stabilization. The camera professionals trust.',
    image: 'https://images.unsplash.com/photo-1606986628055-a6a7d880ef4c?w=800&q=80',
    inStock: true, badge: 'new',
    variants: { color: ['Black'], size: ['Body Only', 'With 24-70mm Lens'] },
    tags: ['photography'],
  },
  {
    id: '10', name: 'Professional Drone 4K', price: 1199.99, originalPrice: 1499.99,
    rating: 4.7, reviews: 456, category: 'Photography', brand: 'CWH Cart',
    description: '4K/60fps, 12km range, 46min flight time, 3-axis gimbal, obstacle sensing.',
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&q=80',
    inStock: true, badge: null,
    variants: { color: ['Gray'], size: ['Standard', 'Fly More Combo'] },
    tags: ['photography'],
  },
  {
    id: '11', name: 'Instant Retro Camera', price: 149.99, originalPrice: 179.99,
    rating: 4.4, reviews: 2109, category: 'Photography', brand: 'CWH Cart',
    description: 'Shoots and prints instantly. Built-in selfie mirror and double exposure mode.',
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&q=80',
    inStock: true, badge: 'flash',
    variants: { color: ['Pink', 'White', 'Lilac', 'Mint'], size: ['OneSize'] },
    tags: ['photography'],
  },

  // ── Fashion ───────────────────────────────────────────────
  {
    id: '12', name: 'Designer Aviator Sunglasses', price: 219.99, originalPrice: 299.99,
    rating: 4.7, reviews: 1892, category: 'Fashion', brand: 'CWH Cart',
    description: 'Polarized UV400 lenses with titanium frame. Timeless aviator silhouette, featherlight at just 18g.',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    inStock: true, badge: 'trending',
    variants: { color: ['Gold/Brown', 'Silver/Grey', 'Black/Black'], size: ['OneSize'] },
    tags: ['fashion', 'accessories'],
  },
  {
    id: '13', name: 'Premium Leather Sneakers', price: 289.99, originalPrice: 389.99,
    rating: 4.6, reviews: 3241, category: 'Fashion', brand: 'CWH Cart',
    description: 'Hand-stitched full-grain leather upper, cushioned insole, vulcanized rubber sole. Built to last a decade.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    inStock: true, badge: null,
    variants: { color: ['White', 'Black', 'Tan', 'Navy'], size: ['UK6', 'UK7', 'UK8', 'UK9', 'UK10', 'UK11'] },
    tags: ['fashion', 'shoes'],
  },
  {
    id: '14', name: 'Luxury Silk Scarf', price: 119.99, originalPrice: 159.99,
    rating: 4.8, reviews: 743, category: 'Fashion', brand: 'CWH Cart',
    description: '100% Mulberry silk, hand-rolled edges. Versatile 90×90cm square. A wardrobe essential.',
    image: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?w=800&q=80',
    inStock: true, badge: 'new',
    variants: { color: ['Floral Pattern', 'Geometric', 'Solid Navy', 'Ivory'], size: ['OneSize'] },
    tags: ['fashion', 'accessories'],
  },
  {
    id: '15', name: 'Classic Trench Coat', price: 449.99, originalPrice: 599.99,
    rating: 4.8, reviews: 1021, category: 'Fashion', brand: 'CWH Cart',
    description: 'Water-resistant cotton gabardine, detachable belt, signature epaulettes. An enduring classic.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80',
    inStock: true, badge: null,
    variants: { color: ['Camel', 'Black', 'Navy', 'Olive'], size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    tags: ['fashion', 'outerwear'],
  },
  {
    id: '16', name: 'Premium Denim Jacket', price: 179.99, originalPrice: 229.99,
    rating: 4.5, reviews: 1689, category: 'Fashion', brand: 'CWH Cart',
    description: 'Rigid 12oz selvedge denim, copper rivets, custom fit. Ages beautifully with every wear.',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80',
    inStock: true, badge: 'flash',
    variants: { color: ['Indigo', 'Light Wash', 'Dark Wash'], size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    tags: ['fashion', 'outerwear'],
  },

  // ── Accessories ───────────────────────────────────────────
  {
    id: '17', name: 'Luxury Leather Backpack', price: 299.99, originalPrice: 399.99,
    rating: 4.8, reviews: 2109, category: 'Accessories', brand: 'CWH Cart',
    description: 'Full-grain leather, YKK zipper, padded 15" laptop sleeve, hidden RFID pocket. Handcrafted in Italy.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80',
    inStock: true, badge: 'bestseller',
    variants: { color: ['Cognac', 'Black', 'Forest Green', 'Navy'], size: ['OneSize'] },
    tags: ['accessories', 'bags'],
  },
  {
    id: '18', name: 'Minimalist Leather Wallet', price: 79.99, originalPrice: 109.99,
    rating: 4.7, reviews: 5432, category: 'Accessories', brand: 'CWH Cart',
    description: 'Slim 8-card capacity, full-grain leather, RFID blocking. Weighs just 28g.',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
    inStock: true, badge: 'flash',
    variants: { color: ['Tan', 'Black', 'Navy', 'Burgundy'], size: ['OneSize'] },
    tags: ['accessories'],
  },
  {
    id: '19', name: 'Premium Leather Belt', price: 89.99, originalPrice: 119.99,
    rating: 4.6, reviews: 1234, category: 'Accessories', brand: 'CWH Cart',
    description: 'Full-grain vegetable-tanned leather with solid brass buckle. Reversible black/brown.',
    image: 'https://images.unsplash.com/photo-1624222247344-550fb60583f2?w=800&q=80',
    inStock: true, badge: null,
    variants: { color: ['Black/Brown Reversible', 'All Black', 'All Brown'], size: ['30"', '32"', '34"', '36"', '38"', '40"'] },
    tags: ['accessories', 'fashion'],
  },
  {
    id: '20', name: 'Stainless Steel Water Bottle', price: 49.99, originalPrice: 69.99,
    rating: 4.7, reviews: 8921, category: 'Accessories', brand: 'CWH Cart',
    description: '500ml double-walled vacuum insulated. Keeps beverages cold 24h, hot 12h. BPA-free, leak-proof.',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&q=80',
    inStock: true, badge: 'trending',
    variants: { color: ['Matte Black', 'Silver', 'Forest', 'Blush Pink', 'Ocean Blue'], size: ['500ml', '750ml', '1L'] },
    tags: ['accessories', 'lifestyle'],
  },

  // ── Home & Garden ─────────────────────────────────────────
  {
    id: '21', name: 'Scented Soy Candle Set', price: 59.99, originalPrice: 79.99,
    rating: 4.8, reviews: 3241, category: 'Home', brand: 'CWH Cart',
    description: 'Hand-poured 100% soy wax with essential oils. Notes of sandalwood, amber, and vanilla. 60hr burn time.',
    image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80',
    inStock: true, badge: 'new',
    variants: { color: ['Sandalwood Set', 'Floral Set', 'Citrus Set'], size: ['Set of 3', 'Set of 6'] },
    tags: ['home', 'lifestyle'],
  },
  {
    id: '22', name: 'Ergonomic Office Chair', price: 599.99, originalPrice: 799.99,
    rating: 4.7, reviews: 1098, category: 'Home', brand: 'CWH Cart',
    description: 'Lumbar support, adjustable armrests, breathable mesh back, 4D headrest. BIFMA certified.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
    inStock: true, badge: null,
    variants: { color: ['Black', 'Grey', 'White'], size: ['OneSize'] },
    tags: ['home', 'office'],
  },
  {
    id: '23', name: 'Smart LED Desk Lamp', price: 99.99, originalPrice: 139.99,
    rating: 4.6, reviews: 2345, category: 'Home', brand: 'CWH Cart',
    description: 'Circadian rhythm lighting, wireless charging pad, USB-C port, voice assistant compatible.',
    image: 'https://images.unsplash.com/photo-1573297888-debcd32ebbef?w=800&q=80',
    inStock: true, badge: 'flash',
    variants: { color: ['Black', 'White', 'Silver'], size: ['OneSize'] },
    tags: ['home', 'office'],
  },
  {
    id: '24', name: 'Linen Throw Blanket', price: 79.99, originalPrice: 109.99,
    rating: 4.8, reviews: 4321, category: 'Home', brand: 'CWH Cart',
    description: '100% stonewashed linen, pre-washed for softness. Lightweight, breathable, and gets better with every wash.',
    image: 'https://images.unsplash.com/photo-1567016376408-0226e4d0c1ea?w=800&q=80',
    inStock: true, badge: null,
    variants: { color: ['Sand', 'Sage', 'Dusty Blue', 'Terracotta', 'Ivory'], size: ['Throw', 'Queen', 'King'] },
    tags: ['home', 'bedroom'],
  },
  {
    id: '25', name: 'Ceramic Pour-Over Coffee Set', price: 89.99, originalPrice: 119.99,
    rating: 4.9, reviews: 1892, category: 'Home', brand: 'CWH Cart',
    description: 'Handcrafted ceramic dripper, server, and two mugs. Produces a clean, aromatic cup every time.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    inStock: true, badge: 'trending',
    variants: { color: ['Matte White', 'Charcoal', 'Sage Green', 'Terracotta'], size: ['OneSize'] },
    tags: ['home', 'kitchen'],
  },

  // ── More Electronics ──────────────────────────────────────
  {
    id: '26', name: 'Gaming Console Controller', price: 69.99, originalPrice: 89.99,
    rating: 4.7, reviews: 6543, category: 'Electronics', brand: 'CWH Cart',
    description: 'Haptic feedback, adaptive triggers, motion sensor, built-in mic and USB-C. Compatible with PC.',
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80',
    inStock: true, badge: 'flash',
    variants: { color: ['Black', 'White', 'Blue', 'Red'], size: ['OneSize'] },
    tags: ['electronics', 'gaming'],
  },
  {
    id: '27', name: 'USB-C 8K Cable Hub', price: 79.99, originalPrice: 99.99,
    rating: 4.6, reviews: 1234, category: 'Electronics', brand: 'CWH Cart',
    description: '12-in-1 USB-C hub: 8K HDMI, SD card, 100W PD, 10Gbps USB-A/C. Compact aluminium body.',
    image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=800&q=80',
    inStock: true, badge: null,
    variants: { color: ['Space Gray', 'Silver'], size: ['OneSize'] },
    tags: ['electronics', 'accessories'],
  },
  {
    id: '28', name: 'Smart Home Security Camera', price: 119.99, originalPrice: 159.99,
    rating: 4.5, reviews: 2891, category: 'Electronics', brand: 'CWH Cart',
    description: '2K QHD, color night vision, AI person detection, 2-way audio, works with Alexa & Google.',
    image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&q=80',
    inStock: true, badge: null,
    variants: { color: ['White', 'Black'], size: ['Indoor', 'Outdoor'] },
    tags: ['electronics', 'home'],
  },

  // ── Premium extras ────────────────────────────────────────
  {
    id: '29', name: 'Luxury Perfume Noir', price: 189.99, originalPrice: 249.99,
    rating: 4.9, reviews: 2341, category: 'Accessories', brand: 'CWH Cart',
    description: 'Top notes of bergamot and black pepper, heart of oud and saffron, base of amber and musk. 100ml EDP.',
    image: 'https://images.unsplash.com/photo-1615654040913-ad12a49f1a63?w=800&q=80',
    inStock: true, badge: 'trending',
    variants: { color: ['Noir', 'Blanc', 'Rose'], size: ['50ml', '100ml'] },
    tags: ['accessories', 'lifestyle'],
  },
  {
    id: '30', name: 'Titanium Multi-Tool Set', price: 139.99, originalPrice: 189.99,
    rating: 4.7, reviews: 987, category: 'Accessories', brand: 'CWH Cart',
    description: '21 functions including pliers, knife, scissors, and bits. Grade-5 titanium, lifetime warranty.',
    image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&q=80',
    inStock: true, badge: 'new',
    variants: { color: ['Titanium', 'Black Titanium'], size: ['OneSize'] },
    tags: ['accessories', 'lifestyle'],
  },
]

export const categories = [
  { name: 'All', key: 'all', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', count: mockProducts.length },
  { name: 'Electronics', key: 'Electronics', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80', count: mockProducts.filter(p => p.category === 'Electronics').length },
  { name: 'Fashion', key: 'Fashion', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=80', count: mockProducts.filter(p => p.category === 'Fashion').length },
  { name: 'Wearables', key: 'Wearables', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', count: mockProducts.filter(p => p.category === 'Wearables').length },
  { name: 'Photography', key: 'Photography', image: 'https://images.unsplash.com/photo-1606986628055-a6a7d880ef4c?w=500&q=80', count: mockProducts.filter(p => p.category === 'Photography').length },
  { name: 'Accessories', key: 'Accessories', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80', count: mockProducts.filter(p => p.category === 'Accessories').length },
  { name: 'Home', key: 'Home', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&q=80', count: mockProducts.filter(p => p.category === 'Home').length },
]
