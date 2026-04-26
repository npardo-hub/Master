import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './pages/Inicio';
import Tienda from './pages/Tienda';
import Nosotros from './pages/Nosotros';
import DetallesDeProducto from './pages/DetallesDeProducto';
import Carrito from './pages/Carrito';
import Confirmacion from './pages/Confirmacion';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/Tienda" element={<Tienda />} />
              <Route path="/Nosotros" element={<Nosotros />} />
              <Route path="/Productos/:id" element={<DetallesDeProducto />} />
              <Route path="/Carrito" element={<Carrito />} />
              <Route path="/Confirmacion" element={<Confirmacion />} />
              <Route path="*" element={<Inicio />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}
