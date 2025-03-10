// src/pages/home.tsx
import { motion } from 'framer-motion';
import '../App.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow"
      >
        {/* HERO SECTION */}
        <section className="flex justify-center my-6 max-w-screen-xl mx-auto">
          <img src="./Images/example5.gif" alt="Fitness Banner" className="rounded-xl shadow-lg w-full" />
        </section>

        {/* CARDS SECTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-xl mx-auto p-6">
          <a href="/parduotuve" className="p-6 border rounded-xl shadow-lg text-center hover:shadow-xl block bg-gray-100">
            <img src="./Images/protein.jpg" alt="Parduotuvė" className="mx-auto mb-4 h-55 object-cover" />
            <h2 className="text-xl font-bold text-black mt-10">Parduotuvė</h2>
          </a>
          <a href="/treneriai" className="p-6 border rounded-xl shadow-lg text-center hover:shadow-xl block bg-gray-100">
            <img src="./Images/trainer.jpg" alt="Treneriai" className="mx-auto mb-4 h-55 object-cover" />
            <h2 className="text-xl font-bold text-black mt-10">Treneriai</h2>
          </a>
          <a href="/kontaktai" className="p-6 border rounded-xl shadow-lg text-center hover:shadow-xl block bg-gray-100">
            <img src="./Images/phone.webp" alt="Kontaktai" className="mx-auto mb-4 h-55 object-cover" />
            <h2 className="text-xl font-bold text-black mt-10">Kontaktai</h2>
          </a>
        </section>
      </motion.div>
      
      <Footer />
    </div>
  );
}

export default HomePage;
