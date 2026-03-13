import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle } from 'lucide-react';
import Button from '../ui/Button';
import { formatPrice } from '../../lib/utils';
import { drawerVariants, listVariants, listItemVariants } from '../../lib/animations';

export default function ProductComparison({ products = [], isOpen, onClose }) {
  const comparisonFeatures = [
    'Price',
    'Rating',
    'Stock Status',
    'Warranty',
    'Free Shipping',
    'Return Policy',
    'Material',
    'Color Options',
  ];

  const getFeatureValue = (product, feature) => {
    switch (feature) {
      case 'Price':
        return formatPrice(product.price);
      case 'Rating':
        return `${product.rating} / 5 stars`;
      case 'Stock Status':
        return product.inStock ? 'In Stock' : 'Out of Stock';
      case 'Warranty':
        return product.warranty || '1 Year';
      case 'Free Shipping':
        return product.freeShipping ? 'Yes' : 'Standard Rate';
      case 'Return Policy':
        return product.returnDays || '30 days';
      case 'Material':
        return product.material || 'Premium';
      case 'Color Options':
        return product.colors?.length || '1';
      default:
        return 'N/A';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Comparison Panel */}
          <motion.div
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 md:inset-auto md:right-0 md:top-0 md:h-screen md:w-full md:max-w-4xl bg-card-bg border-l border-card-border z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-card-border">
              <h2 className="text-2xl font-display font-semibold">Compare Products</h2>
              <motion.button
                whileHover={{ rotate: 90 }}
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Comparison Table */}
            <div className="flex-1 overflow-x-auto overflow-y-auto p-6">
              {products.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <AlertCircle size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No products to compare</p>
                  </div>
                </div>
              ) : (
                <motion.table
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full min-w-max"
                >
                  <tbody className="space-y-4">
                    {/* Product Headers */}
                    <motion.tr variants={listItemVariants}>
                      <td className="font-semibold text-sm w-32 py-4 pr-4">Product</td>
                      {products.map((product) => (
                        <td key={product.id} className="px-4 py-4 min-w-56">
                          <div className="glass p-4 rounded-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-40 object-cover rounded-lg mb-3"
                            />
                            <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                              {product.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">{product.brand}</p>
                          </div>
                        </td>
                      ))}
                    </motion.tr>

                    {/* Features */}
                    {comparisonFeatures.map((feature, idx) => (
                      <motion.tr
                        key={feature}
                        variants={listItemVariants}
                        transition={{ delay: idx * 0.05 }}
                        className="border-t border-card-border"
                      >
                        <td className="font-medium text-sm py-4 pr-4 text-muted-foreground">
                          {feature}
                        </td>
                        {products.map((product) => (
                          <td key={product.id} className="px-4 py-4 text-sm">
                            <div className="glass p-3 rounded-lg flex items-center gap-2">
                              <span>{getFeatureValue(product, feature)}</span>
                              {feature === 'Free Shipping' && product.freeShipping && (
                                <Check size={16} className="text-success" />
                              )}
                            </div>
                          </td>
                        ))}
                      </motion.tr>
                    ))}

                    {/* Add to Cart */}
                    <motion.tr variants={listItemVariants} className="border-t border-card-border">
                      <td className="py-6 pr-4" />
                      {products.map((product) => (
                        <td key={product.id} className="px-4 py-6">
                          <Button
                            variant="primary"
                            size="md"
                            className="w-full"
                            disabled={!product.inStock}
                          >
                            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                          </Button>
                        </td>
                      ))}
                    </motion.tr>
                  </tbody>
                </motion.table>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
