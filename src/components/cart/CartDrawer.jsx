import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingCart, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { formatPrice, cn } from '../../lib/utils';
import { drawerVariants, listVariants, listItemVariants } from '../../lib/animations';
import { useStore } from '../../store/useStore';

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, updateCartQuantity } = useStore();

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + tax + shipping;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 z-[999] backdrop-blur-sm"
            />

          {/* Drawer */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed right-0 top-0 h-screen w-full max-w-sm sm:max-w-md md:max-w-xl bg-card-bg border-l border-card-border z-[1000] flex flex-col overflow-hidden shadow-[-20px_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-card-border">
              <h2 className="text-xl sm:text-2xl font-display font-semibold">Shopping Cart</h2>
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Cart Items */}
            {cartItems.length > 0 ? (
              <motion.div
                variants={listVariants}
                initial="hidden"
                animate="visible"
                className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4"
              >
                {cartItems.map((item) => (
                  <motion.div
                    key={`${item.id}-${JSON.stringify(item.variants)}`}
                    variants={listItemVariants}
                    className="glass p-4 flex gap-4 group"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-muted to-muted/50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <Link
                          to={`/product/${item.id}`}
                          className="text-sm font-semibold hover:text-primary transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        {item.variants && (
                          <p className="text-[10px] text-muted-foreground mt-1 flex gap-2">
                            {Object.entries(item.variants).map(([key, value]) => (
                              <span key={key}>{key}: {value}</span>
                            ))}
                          </p>
                        )}
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-white/5 rounded-lg p-1">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateCartQuantity(item.id, item.variants, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1 hover:bg-white/10 rounded disabled:opacity-50"
                          >
                            <Minus size={14} />
                          </motion.button>
                          <span className="w-6 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => updateCartQuantity(item.id, item.variants, item.quantity + 1)}
                            className="p-1 hover:bg-white/10 rounded"
                          >
                            <Plus size={14} />
                          </motion.button>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold text-primary">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatPrice(item.price)} ea
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeFromCart(item.id, item.variants)}
                      className="p-2 hover:bg-destructive/20 text-destructive rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 size={16} />
                    </motion.button>
                  </motion.div>
                ))}

                {/* Recommended Section */}
                <motion.div
                  variants={listItemVariants}
                  className="pt-4 border-t border-card-border"
                >
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-3">
                    Frequently Bought Together
                  </p>
                  <div className="space-y-2">
                    {/* Placeholder for recommended items */}
                    <p className="text-xs text-muted-foreground italic">
                      Personalized recommendations loading...
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-white/5 border-2 border-card-border flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart size={32} className="text-primary/40" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add items to get started
                  </p>
                  <Button onClick={onClose} variant="primary" size="md">
                    Continue Shopping
                  </Button>
                </div>
              </div>
            )}

            {/* Footer */}
            {cartItems.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="border-t border-card-border p-4 sm:p-6 space-y-4 bg-gradient-to-t from-card-bg/50"
              >
                {/* Order Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {shipping > 0 && (
                    <div className="flex justify-between text-muted-foreground">
                      <span>Shipping</span>
                      <span>{formatPrice(shipping)}</span>
                    </div>
                  )}
                  {shipping === 0 && (
                    <div className="flex justify-between text-accent text-xs items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Zap size={12} className="fill-current" />
                        <span>Free Premium Shipping</span>
                      </div>
                    </div>
                  )}
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-base pt-2 border-t border-card-border">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(total)}</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Link to="/checkout" onClick={onClose} className="block">
                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      Checkout
                      <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={onClose}
                    className="w-full"
                  >
                    Continue Shopping
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
