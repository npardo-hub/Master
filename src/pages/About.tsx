import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="pt-40 pb-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-xs font-bold uppercase tracking-[0.4em] text-gray-400 mb-8 text-center lg:text-left">Nuestra Historia</h1>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.9] mb-16 text-center lg:text-left">
            LA CULTURA DE LA GORRA EN COLOMBIA.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="space-y-8 text-lg text-gray-600 leading-relaxed">
              <p>
                MazterCaps comenzó con una misión clara: ofrecer a los colombianos acceso a gorras de la más alta calidad que no se encuentran en cualquier lugar.
              </p>
              <p>
                Fundada en 2022, nos hemos convertido en el referente del headwear premium en el país. Seleccionamos cada pieza pensando en los detalles, la durabilidad y, sobre todo, el estilo.
              </p>
            </div>
            <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-medium text-gray-900">
              <p>
                "Nuestra meta es que cada cliente encuentre esa gorra que defina su personalidad. No vendemos accesorios, vendemos confianza."
              </p>
              <div className="pt-8">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Desde 2022</p>
                <p className="text-sm font-bold uppercase tracking-widest text-gray-900">MazterCaps Colombia</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-32 aspect-video overflow-hidden grayscale contrast-125"
        >
          <img 
            src="https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=2000" 
            alt="MazterCaps Style"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
    </div>
  );
}
