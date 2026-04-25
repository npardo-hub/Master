import { Instagram, Twitter, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 pt-20 pb-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold tracking-[0.2em] uppercase mb-6">MazterCaps</h2>
            <p className="text-gray-500 max-w-md leading-relaxed">
              La casa de las gorras en Colombia. Estilo urbano, calidad premium y los diseños más exclusivos para elevar tu outfit diario.
            </p>
            <div className="flex space-x-6 mt-8">
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-900 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 font-primary">Shopping</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/shop" className="hover:text-gray-500 transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-gray-500 transition-colors">Best Sellers</Link></li>
              <li><Link to="/shop" className="hover:text-gray-500 transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop" className="hover:text-gray-500 transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6 font-primary">Information</h3>
            <ul className="space-y-4 text-sm font-medium">
              <li><Link to="/about" className="hover:text-gray-500 transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-gray-500 transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-gray-500 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-gray-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 tracking-wider">
            © {new Date().getFullYear()} MAZTERCAPS COLOMBIA. TODOS LOS DERECHOS RESERVADOS.
          </p>
          <div className="flex items-center space-x-4">
            <span className="w-10 h-6 bg-gray-200 rounded animate-pulse" />
            <span className="w-10 h-6 bg-gray-200 rounded animate-pulse" />
            <span className="w-10 h-6 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
