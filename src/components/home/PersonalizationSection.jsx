import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import ProductCard from '../product/ProductCard';
import { containerVariants, itemVariants } from '../../lib/animations';

export default function PersonalizationSection({
  title = "Personalized For You",
  description = "Based on your browsing history",
  products = [],
  variant = "default",
}) {
  if (products.length === 0) return null;

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
            <Sparkles size={20} className="text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Just For You
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            {title}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl"
          >
            {description}
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {products.slice(0, 4).map((product, idx) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} featured={idx === 0} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/shop">
            <Button
              size="lg"
              variant="accent"
              className="inline-flex items-center gap-2"
            >
              View More Recommendations
              <ArrowRight size={20} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
