// src/pages/ShopPage.tsx
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';

const products = [
  { id: 1, name: 'Proteino milteliai', price: 20.00, image: './Images/Products/product1.jpg' },
  { id: 2, name: 'Sporto pirštinės', price: 15.99, image: './Images/Products/product2.jpg' },
  { id: 3, name: 'Fitneso apyrankė', price: 49.99, image: './Images/Products/product3.jpg' },

];

function ShopPage() {
  return (
    <div className="flex flex-col min-h-screen relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow"
      >
        <Navbar />
        <section className="py-6 bg-gray-100">
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Parduotuvė</h1>
            <p className="mt-4 text-lg md:text-2xl">
              Išsirinkite iš mūsų plataus prekių pasirinkimo.
            </p>
          </div>
        </section>
        <section id="shop" className="max-w-screen-xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </section>
      </motion.div>
      <Footer />
      <CartSidebar />
    </div>
  );
}

export default ShopPage;
