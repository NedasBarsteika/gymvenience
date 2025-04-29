import React, { useEffect, useState } from 'react';
import { useSearchParams, Link }    from 'react-router-dom';
import { motion }                    from 'framer-motion';
import Navbar                        from '../components/Navbar';
import Footer                        from '../components/Footer';
import axios                         from 'axios';
import { CheckCircle2 }              from 'lucide-react';

function SuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [message, setMessage] = useState('Užsakymas apdorojamas...');

  useEffect(() => {
    if (!sessionId) {
      setMessage('Nėra sesijos ID.');
      return;
    }
    axios.get(`https://localhost:7296/api/Payment/session/${sessionId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` }
    })
    .then(({ data }) => {
      setMessage(`Apmokėjimas sėkmingas! Jūsų užsakymo numeris: #${data.orderId}.`);
    })
    .catch(() => {
      setMessage('Apmokėjimas sėkmingas!');
    });
  }, [sessionId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.main
        className="flex-grow flex flex-col items-center justify-center bg-green-50 p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md text-center">
          <CheckCircle2 className="mx-auto text-green-600" size={64} />
          <h1 className="mt-4 text-3xl font-bold text-gray-800">Mokėjimas sėkmingas!</h1>
          <p className="mt-2 text-gray-600">{message}</p>
          <Link
            to="/"
            className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Grįžti į pradžią
          </Link>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
}

export default SuccessPage;
