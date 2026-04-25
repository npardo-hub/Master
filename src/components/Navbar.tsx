import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, ChevronRight, Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { totalItems } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Our Story', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 -ml-2"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-900" />
        </button>

        {/* Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0">
          <h1 className="text-xl font-bold tracking-[0.2em] uppercase text-gray-900 leading-none">
            MazterCaps
          </h1>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  "text-sm font-medium tracking-widest uppercase transition-colors hover:text-gray-900",
                  location.pathname === link.path ? "text-gray-900" : "text-gray-500"
                )}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <button className="hidden sm:block p-2 text-gray-500 hover:text-gray-900 transition-colors">
            <User className="w-5 h-5" />
          </button>
          <Link to="/cart" className="p-2 text-gray-500 hover:text-gray-900 transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-gray-900 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-white z-50 lg:hidden px-8 py-10"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-lg font-bold tracking-widest uppercase">Menu</span>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <ul className="space-y-8">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between text-2xl font-medium tracking-tight text-gray-900"
                    >
                      {link.name}
                      <ChevronRight className="w-6 h-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="absolute bottom-10 left-8 right-8 pt-8 border-t border-gray-100">
                <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">Follow Us</p>
                <div className="flex space-x-6 text-sm font-medium">
                  <a href="#" className="hover:text-gray-500">Instagram</a>
                  <a href="#" className="hover:text-gray-500">Twitter</a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
