import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-40 px-6 max-w-xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Tu carrito está vacío.</h1>
        <p className="text-gray-500 mb-12 leading-relaxed">
          Parece que no has añadido nada a tu carrito. Explora nuestra colección y encuentra tu nueva gorra favorita.
        </p>
        <Link 
          to="/Tienda" 
          className="inline-block bg-gray-900 text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95"
        >
          Empezar a comprar
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-8">Carrito de compra</h1>
        <h2 className="text-6xl font-bold tracking-tighter leading-none mb-20">{totalItems} Item{totalItems !== 1 ? 's' : ''}.</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-10">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="flex flex-col sm:flex-row gap-8 pb-10 border-b border-gray-100 group"
                >
                  <Link to={`/product/${item.id}`} className="block w-full sm:w-48 aspect-[3/4] overflow-hidden bg-gray-100 flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="text-xl font-bold tracking-tight hover:text-gray-600 transition-all">{item.name}</h3>
                      </Link>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-6">{item.category}</p>
                    
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-6">
                      <div className="flex items-center border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-3 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-3 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-lg font-bold">${(item.price * item.quantity).toLocaleString('de-DE')}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4 sticky top-40 bg-gray-50 p-10 border border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 font-primary">Resumen del pedido</h3>
              <div className="space-y-6 mb-10">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${totalPrice.toLocaleString('de-DE')}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-500">Impuestos</span>
                  <span>Calculado al final de la compra</span>
                </div>
                <div className="pt-6 border-t border-gray-200 flex justify-between">
                  <span className="text-lg font-bold tracking-tight">Total</span>
                  <span className="text-2xl font-bold tracking-tight">${totalPrice.toLocaleString('de-DE')}</span>
                </div>
              </div>
            
            <Link 
              to="/Confirmacion"
              className="w-full bg-gray-900 text-white flex items-center justify-center space-x-3 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98] group"
            >
              <span>Continuar la compra</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <p className="mt-8 text-[10px] text-gray-400 text-center leading-relaxed uppercase tracking-widest">
              Al continuar, acepta nuestros <br /> términos de servicio y política de privacidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
