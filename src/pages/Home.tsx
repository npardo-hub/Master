import { motion } from 'motion/react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import { useCart } from '../context/CartContext';

export default function Home() {
  const { addToCart } = useCart();
  const featuredProducts = PRODUCTS.slice(0, 3);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden flex items-center justify-center text-center px-6">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&q=80&w=2000" 
            alt="MazterCaps Hero"
            className="w-full h-full object-cover brightness-[0.6] contrast-125"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        <div className="relative z-10 max-w-4xl">
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-sm font-bold uppercase tracking-[0.4em] mb-6"
          >
            Premium Headwear Colombia
          </motion.p>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9] mb-12"
          >
            ESTILO <br /> SIN LÍMITES.
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <Link 
              to="/shop" 
              className="group inline-flex items-center space-x-3 bg-white text-gray-900 px-10 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
            >
              <span>Explore Collection</span>
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">Latest Drops</h2>
              <h3 className="text-4xl font-bold tracking-tight text-gray-900">Featured Essentials.</h3>
            </div>
            <Link to="/shop" className="text-sm font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 hover:text-gray-500 hover:border-gray-500 transition-all flex items-center group">
              View All <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants} className="group cursor-pointer">
                <Link to={`/product/${product.id}`}>
                  <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-6 relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                  </div>
                </Link>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold tracking-tight mb-1">{product.name}</h4>
                    <p className="text-sm text-gray-500 uppercase tracking-widest">{product.category}</p>
                  </div>
                  <span className="font-bold text-lg">${product.price.toLocaleString('de-DE')}</span>
                </div>
                <button 
                  onClick={() => addToCart(product)}
                  className="mt-6 w-full py-4 border border-gray-900 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-all active:scale-[0.98]"
                >
                  Quick Add
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Identity Section */}
      <section className="bg-gray-900 py-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-white/40 mb-6">Nuestra Visión</h2>
              <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tighter leading-none mb-10">
                PASIÓN POR <br /> LAS GORRAS.
              </h3>
              <p className="text-white/60 text-lg leading-relaxed mb-12 max-w-lg">
                MazterCaps nació en el corazón de Colombia con el objetivo de traer las mejores tendencias globales de headwear. No somos solo una tienda, somos un estilo de vida que celebra la individualidad.
              </p>
              <Link to="/about" className="inline-flex items-center space-x-3 text-white font-bold uppercase tracking-widest group">
                <span>The Story</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Link>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square md:aspect-video lg:aspect-square"
            >
              <img 
                src="https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=80&w=1200" 
                alt="Brand Identity"
                className="w-full h-full object-cover grayscale opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -inset-4 border border-white/10 -z-10" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-6">Mantente Conectado</h2>
          <h3 className="text-4xl font-bold tracking-tight mb-8">Únete al Club de MazterCaps.</h3>
          <p className="text-gray-500 mb-12">
            Sé el primero en enterarte de nuevos lanzamientos, ediciones limitadas y el viaje de MazterCaps en Colombia.
          </p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="flex-1 px-6 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors text-sm uppercase tracking-widest font-medium"
              required
            />
            <button 
              type="submit"
              className="bg-gray-900 text-white px-10 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95 whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
