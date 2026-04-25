import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Filter, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function Shop() {
  const [filter, setFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('featured');
  const { addToCart } = useCart();

  const categories = ['All', 'Snapback', 'Dad Hat', 'Trucker', 'Beanie'];

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (filter !== 'All') {
      result = result.filter(p => p.category === filter);
    }
    
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);

    return result;
  }, [filter, sortBy]);

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-20 text-center">
          <h1 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-8">Our Shop</h1>
          <h2 className="text-6xl font-bold tracking-tighter leading-none mb-12">The Collection.</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8 border-b border-gray-100 pb-10">
          <div className="flex items-center space-x-2 overflow-x-auto pb-4 md:pb-0 w-full md:w-auto scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all rounded-full border",
                  filter === cat 
                    ? "bg-gray-900 text-white border-gray-900" 
                    : "bg-transparent text-gray-400 border-gray-200 hover:border-gray-900 hover:text-gray-900"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4 w-full md:w-auto justify-end">
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-transparent pl-4 pr-10 py-2 text-sm font-bold uppercase tracking-widest border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <SlidersHorizontal className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 lg:gap-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-6 relative group">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    {!product.inStock && (
                      <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-900">
                        Sold Out
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                </Link>
                <div>
                  <Link to={`/product/${product.id}`} className="block mb-2">
                    <h3 className="text-lg font-bold tracking-tight hover:text-gray-600 transition-colors">{product.name}</h3>
                  </Link>
                  <p className="text-xs text-gray-400 uppercase tracking-widest mb-4">{product.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">${product.price.toLocaleString('de-DE')}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="text-xs font-bold uppercase tracking-widest border-b border-gray-900 pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-all disabled:opacity-50 disabled:border-gray-400 disabled:text-gray-400 disabled:cursor-not-allowed"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500 uppercase tracking-widest font-medium">No products found for this selection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
