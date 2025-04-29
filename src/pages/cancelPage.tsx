import React from 'react';
import { Link }       from 'react-router-dom';
import { motion }     from 'framer-motion';
import Navbar         from '../components/Navbar';
import Footer         from '../components/Footer';
import { XCircle }    from 'lucide-react';

function CancelPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main
        className="flex-grow flex flex-col items-center justify-center bg-red-50 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <XCircle className="mx-auto text-red-600" size={64} />
          <h1 className="mt-4 text-3xl font-bold text-gray-800">Mokėjimas atšauktas</h1>
          <p className="mt-2 text-gray-600">Jūsų mokėjimas nebuvo užbaigtas.</p>
          <div className="mt-6 space-x-4">
            <Link
              to="/Atsiskaitymas"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Bandykite dar kartą
            </Link>
            <Link
              to="/"
              className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-6 rounded-lg transition"
            >
              Grįžti į pradžią
            </Link>
          </div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}

export default CancelPage;
