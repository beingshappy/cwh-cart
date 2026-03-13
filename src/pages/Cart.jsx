import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Trash2, Plus, Minus } from 'lucide-react'
import Button from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useStore } from '../store/useStore'
import { formatPrice } from '../lib/utils'
import { Empty } from '../components/ui/Empty'
import { useSEO } from '../hooks/useSEO'

export default function Cart() {
  useSEO({ title: 'Your Shopping Cart' })
  const cartItems = useStore((state) => state.cartItems)
  const updateCartQuantity = useStore((state) => state.updateCartQuantity)
  const removeFromCart = useStore((state) => state.removeFromCart)

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>
          <Empty
            icon="ShoppingCart"
            title="Your cart is empty"
            description="Add some products to get started"
            action={
              <Link to="/shop">
                <Button>Continue Shopping</Button>
              </Link>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <motion.div
                key={`${item.id}-${JSON.stringify(item.variants)}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Card>
                  <div className="flex gap-6">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.variants?.color} • {item.variants?.size}
                      </p>
                      <p className="text-primary font-bold mt-2">{formatPrice(item.price)}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.variants, item.quantity - 1)
                        }
                        className="p-2 hover:bg-white/10 rounded-lg"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.id, item.variants, item.quantity + 1)
                        }
                        className="p-2 hover:bg-white/10 rounded-lg"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id, item.variants)}
                        className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-24">
              <div className="space-y-4">
                <h2 className="text-xl font-bold">Order Summary</h2>

                <div className="space-y-3 border-b border-white/10 pb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-green-400">Free</span>
                  </div>
                </div>

                <div className="flex justify-between text-lg font-bold pt-4">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(total)}</span>
                </div>

                <Link to="/checkout">
                  <Button className="w-full">Proceed to Checkout</Button>
                </Link>

                <Link to="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
