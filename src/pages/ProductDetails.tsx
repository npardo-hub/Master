import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, Plus, Minus, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/shop" className="text-gray-500 underline uppercase tracking-widest text-sm">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/shop" className="inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-12">
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <p className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-4">{product.category}</p>
            <h1 className="text-5xl font-bold tracking-tighter leading-none mb-6">{product.name}</h1>
            <p className="text-2xl font-bold mb-10">${product.price.toLocaleString('de-DE')}</p>
            
            <div className="text-gray-500 leading-relaxed mb-12 max-w-md">
              <p>{product.description}</p>
            </div>

            {product.features && (
              <ul className="space-y-4 mb-12">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm font-medium">
                    <div className="w-1.5 h-1.5 bg-gray-900 rounded-full" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex items-center space-x-6 mb-10 pb-10 border-b border-gray-100">
              <div className="flex items-center border border-gray-200">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={() => {
                  for(let i = 0; i < quantity; i++) addToCart(product);
                }}
                disabled={!product.inStock}
                className="flex-1 bg-gray-900 text-white py-4 px-10 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <ShieldCheck className="w-5 h-5 mb-3 text-gray-400" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Secure Payments</p>
              </div>
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <Truck className="w-5 h-5 mb-3 text-gray-400" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Fast Shipping</p>
              </div>
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <RefreshCw className="w-5 h-5 mb-3 text-gray-400" />
                <p className="text-[10px] font-bold uppercase tracking-widest">Easy Returns</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
