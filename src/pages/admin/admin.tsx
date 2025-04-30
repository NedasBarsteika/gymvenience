import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';

function AdminPage() {
  const adminOptions = [
    { label: 'Treneriai', path: '/admin/treneriai' },
    { label: 'Vartotojai', path: '/admin/vartotojai' },
    { label: 'Produktai', path: '/admin/produktai' },
    { label: 'Užsakymai', path: '/admin/uzsakymai' },
    { label: 'Vizitai', path: '/admin/vizitai' },
  ];

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
        <section className="py-10">
          <div className="max-w-screen-xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Admin Valdymo Pultas</h1>
            <p className="text-lg md:text-2xl mb-10">Pasirinkite ką norite administruoti:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-5">
              {adminOptions.map((option) => (
                <Link
                  key={option.path}
                  to={option.path}
                  className="bg-blue-600 text-white p-6 rounded-xl text-2xl font-semibold hover:bg-blue-700 transition duration-300"
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </motion.div>

      <Footer />
    </div>
  );
}

export default AdminPage;
