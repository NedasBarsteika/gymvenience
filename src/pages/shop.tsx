// src/pages/ShopPage.tsx
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  coverImageUrl: string;
}

function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const endpoint = search ? `/products/search?search=${search}` : '/products/search';
        const response = await axios.get(`https://localhost:7296${endpoint}`);
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search]);
  
  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow"
      >
        <section className="py-6 bg-gray-100">
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold">Parduotuvė</h1>
            <p className="mt-4 text-lg md:text-2xl">
              Išsirinkite iš mūsų plataus prekių pasirinkimo.
            </p>
            <input
              type="text"
              placeholder="Ieškoti produktų..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mt-4 p-2 border border-gray-500 rounded w-full md:w-1/2"
            />
          </div>
        </section>

        <section id="shop" className="max-w-screen-xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center text-lg">Kraunama...</p>
          ) : error ? (
            <p className="text-center text-lg text-red-500">{error}</p>
          ) : (
            products.map((product) => <ProductCard key={product.id} {...product} />)
          )}
        </section>
      </motion.div>
      
      <Footer />
      <CartSidebar />
    </div>
  );
}

export default ShopPage;
