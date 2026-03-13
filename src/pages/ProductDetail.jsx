import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Heart, ShoppingCart, Truck, RotateCcw, Check, Minus, Plus } from 'lucide-react'
import Button from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'
import { mockProducts, formatPrice, formatDiscount } from '../lib/utils'
import { useStore } from '../store/useStore'
import { toast } from 'sonner'
import ProductCard from '../components/product/ProductCard'
import { useSEO } from '../hooks/useSEO'

export default function ProductDetail() {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(0)
  const [selectedSize, setSelectedSize] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const product = mockProducts.find((p) => p.id === id)
  const addToCart = useStore((state) => state.addToCart)
  const toggleWishlist = useStore((state) => state.toggleWishlist)

  useSEO({ 
    title: product ? `${product.name} | ${product.brand}` : 'Product Not Found',
    description: product ? `${product.name} from ${product.brand}. ${product.inStock ? 'In stock' : 'Out of stock'}. Premium luxury quality.` : ''
  })

  if (!product) return <div>Product not found</div>

  const handleAddToCart = () => {
    addToCart(
      {
        ...product,
        variants: {
          color: product.variants.color[selectedColor],
          size: product.variants.size[selectedSize],
        },
      },
      quantity
    )
    toast.success(`${product.name} added to cart`)
  }

  const handleWishlist = () => {
    toggleWishlist(product)
    setIsWishlisted(!isWishlisted)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="glass rounded-2xl overflow-hidden p-8">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="space-y-6">
              <div>
                <span className="text-sm text-primary font-semibold uppercase">
                  {product.brand}
                </span>
                <h1 className="text-4xl font-bold mt-2">{product.name}</h1>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'fill-accent text-accent' : 'text-muted'}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-xl line-through text-muted-foreground">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-lg font-bold text-accent">
                    Save {formatDiscount(product.originalPrice, product.price)}
                  </span>
                </div>
              </div>

              {/* Stock */}
              <p className={product.inStock ? 'text-green-400 flex items-center gap-2' : 'text-red-400 flex items-center gap-2'}>
                {product.inStock ? <><Check size={16} /> In Stock</> : 'Out of Stock'}
              </p>

              {/* Variants */}
              <div className="space-y-6">
                {product.variants.color && product.variants.color.length > 1 && (
                  <div>
                    <h3 className="font-bold mb-3">Color</h3>
                    <div className="flex gap-3">
                      {product.variants.color.map((color, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedColor(idx)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedColor === idx
                              ? 'border-primary bg-primary/20'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.variants.size && product.variants.size.length > 1 && (
                  <div>
                    <h3 className="font-bold mb-3">Size</h3>
                    <div className="flex gap-3">
                      {product.variants.size.map((size, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedSize(idx)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedSize === idx
                              ? 'border-primary bg-primary/20'
                              : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-bold">Quantity</span>
                <div className="flex items-center border border-white/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-white/10"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-6 py-2 min-w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-white/10"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <button
                  onClick={handleWishlist}
                  className={`px-6 py-3 rounded-xl border-2 transition-all ${
                    isWishlisted
                      ? 'bg-accent text-accent-foreground border-accent'
                      : 'border-white/20 hover:border-primary'
                  }`}
                >
                  <Heart className="w-5 h-5" fill={isWishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Easy Returns</p>
                </div>
                <div className="text-center">
                  <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium">Secure Payment</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <section>
          <h2 className="text-4xl font-bold mb-12">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts.filter((p) => p.id !== product.id).slice(0, 4).map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
