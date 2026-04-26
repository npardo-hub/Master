import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, CreditCard, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Confirmacion() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zip: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = (e: FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real local app without a backend, we just clear and succeed
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    } catch (error) {
      console.error("Error en el pedido", error);
      setIsProcessing(false);
      alert("Ha ocurrido un error, intentalo más tarde.");
    }
  };

  if (isSuccess) {
    return (
      <div className="pt-40 pb-40 px-6 max-w-xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <CheckCircle2 className="w-20 h-20 text-green-500" />
        </div>
        <h1 className="text-4xl font-bold mb-4 tracking-tight">Pedido Confirmado.</h1>
        <p className="text-gray-500 mb-12 leading-relaxed italic font-serif">
          Gracias por elegir MazterCaps. Tu nueva gorra está siendo preparada para el envío. Recibirás un correo electrónico pronto con los detalles de tu pedido e información de seguimiento.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-gray-900 text-white px-12 py-5 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-95"
        >
          Volver al Inicio
        </Link>
      </div>
    );
  }

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="text-2xl font-bold mb-4">No hay productos seleccionados</h1>
        <Link to="/Tienda" className="text-gray-500 underline uppercase tracking-widest text-sm">Back to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-8">
            <Link to="/Carrito" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-12">
              <ChevronLeft className="w-4 h-4" />
              <span>Volver al carrito</span>
            </Link>

            {/* Stepper */}
            <div className="flex items-center space-x-8 mb-16">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= 1 ? 'text-gray-900' : 'text-gray-400'}`}>Envío</span>
              </div>
              <div className="h-[1px] w-12 bg-gray-200" />
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= 2 ? 'text-gray-900' : 'text-gray-400'}`}>Pagos</span>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={nextStep}
                  className="space-y-10"
                >
                  <section>
                    <h3 className="text-xl font-bold mb-8 flex items-center">
                      <Truck className="w-5 h-5 mr-3" />
                      Información del Envío
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Dirección de correo</label>
                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Nombre</label>
                        <input type="text" name="firstName" required value={formData.firstName} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Apellido</label>
                        <input type="text" name="lastName" required value={formData.lastName} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Address</label>
                        <input type="text" name="address" required value={formData.address} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Ciudad</label>
                        <input type="text" name="city" required value={formData.city} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Código Postal</label>
                        <input type="text" name="zip" required value={formData.zip} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors" />
                      </div>
                    </div>
                  </section>
                  <button type="submit" className="w-full py-5 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98]">
                    Continuar con el pago
                  </button>
                </motion.form>
              ) : (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handlePayment}
                  className="space-y-10"
                >
                  <section>
                    <h3 className="text-xl font-bold mb-8 flex items-center">
                      <CreditCard className="w-5 h-5 mr-3" />
                      Detalles del pago
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Nombre en la tarjeta</label>
                        <input type="text" name="cardName" required value={formData.cardName} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Número de tarjeta</label>
                        <input type="text" name="cardNumber" required placeholder="0000 0000 0000 0000" value={formData.cardNumber} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Fecha de Expiración</label>
                        <input type="text" name="expiry" required placeholder="MM/YY" value={formData.expiry} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">CVC</label>
                        <input type="text" name="cvc" required placeholder="000" value={formData.cvc} onChange={handleInputChange} className="w-full px-5 py-4 bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-900 transition-colors" />
                      </div>
                    </div>
                  </section>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 py-5 border border-gray-200 text-gray-400 text-sm font-bold uppercase tracking-widest hover:border-gray-900 hover:text-gray-900 transition-all">
                      Volver
                    </button>
                    <button type="submit" disabled={isProcessing} className="flex-[2] py-5 bg-gray-900 text-white text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-3">
                      {isProcessing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          <span>Procesando...</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Orden Completada</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right Summary Area */}
          <div className="lg:col-span-4 lg:sticky lg:top-40">
            <div className="bg-gray-50 p-10 border border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 font-primary">En tu carrito</h3>
              <ul className="space-y-6 mb-10 overflow-y-auto max-h-[300px] scrollbar-hide">
                {cart.map((item) => (
                  <li key={item.id} className="flex space-x-4">
                    <div className="w-16 h-20 bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold tracking-tight mb-1">{item.name}</h4>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Cantidad: {item.quantity}</span>
                        <span className="text-sm font-bold">${(item.price * item.quantity).toLocaleString('de-DE')}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="pt-8 border-t border-gray-200 space-y-4 mb-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-400">Subtotal</span>
                  <span>${totalPrice.toLocaleString('de-DE')}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-400">Envío</span>
                  <span className="text-green-600">Gratis</span>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-200 flex justify-between items-end">
                <span className="text-lg font-bold tracking-tight uppercase tracking-widest text-[10px] text-gray-400 mb-1">Total</span>
                <span className="text-3xl font-bold tracking-tighter">${totalPrice.toLocaleString('de-DE')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
