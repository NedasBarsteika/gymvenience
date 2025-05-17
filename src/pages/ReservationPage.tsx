import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { loadStripe } from '@stripe/stripe-js';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const stripePromise = loadStripe(
  'pk_test_51R8yi7H6vinJyGQsXgmj4xjTUaKIVnmfOkSq6A0YHRCvpheoN4ejatevvuyJITNNshEs9IzDsEHzy0mt2OrI3VDd003SV7ixEz'
);

interface LocationState {
  trainerId: string;
  slotId: string;
  date: string;       // "YYYY-MM-DD"
  startTime: string;  // "HH:mm:ss"
  duration: string;   // "HH:mm"
}

interface JwtPayload {
  exp: number;
}

const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);
    return Date.now() / 1000 >= exp;
  } catch {
    return true;
  }
};

export default function ReservationPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { trainerId, slotId, date, startTime, duration } =
    (state as LocationState) || {};

  const [trainer, setTrainer] = useState<any>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Purge expired token on mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && isTokenExpired(token)) {
      localStorage.removeItem('authToken');
    }
  }, []);

  // Fetch trainer details
  useEffect(() => {
    if (!trainerId) return;
    axios
      .get(`https://localhost:7296/user/${trainerId}`)
      .then(res => setTrainer(res.data))
      .catch(err => console.error('Nepavyko gauti trenerio duomenų', err));
  }, [trainerId]);

  // Helpers
  const toHours = (dur: string): number => {
    const [h, m] = dur.split(':').map(Number);
    return h + m / 60;
  };

  const computePrice = (): string => {
    if (!trainer) return '…';
    const hours = toHours(duration);
    return (trainer.hourlyRate * hours).toFixed(2);
  };

  const formattedDate = date
    ? new Date(date).toLocaleDateString('lt-LT', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const formattedTime = `${startTime.slice(0, 5)}–${(() => {
    const [sh, sm] = startTime.slice(0, 5).split(':').map(Number);
    const [dh, dm] = duration.split(':').map(Number);
    const total = sh * 60 + sm + dh * 60 + dm;
    const eh = Math.floor(total / 60);
    const em = total % 60;
    return `${String(eh).padStart(2, '0')}:${String(em).padStart(2, '0')}`;
  })()}`;

  // Payment flow
  const handleProceedToPayment = async () => {
    const token = localStorage.getItem('authToken');
    if (!token || isTokenExpired(token)) {
      localStorage.removeItem('authToken');
      setShowLoginModal(true);
      return;
    }

    setIsRedirecting(true);
    try {
      const { data } = await axios.post(
        'https://localhost:7296/api/payment/create-reservation-session',
        { trainerId, slotId, date, startTime, duration, origin: window.location.origin },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const stripe = await stripePromise;
      if (!stripe) return;
      const { error } = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (error) console.error('Stripe redirect error:', error.message);
    } catch (err) {
      console.error('Klaida kuriant Stripe sesiją:', err);
      setIsRedirecting(false);
    }
  };

  if (!state) {
    return (
      <div className="flex-grow p-6 flex items-center justify-center">
        <p className="text-center text-red-600">Nėra pasirinktų rezervacijos duomenų.</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow p-6 bg-gray-50 flex items-center justify-center"
      >
        <div className="max-w-md w-full bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4 text-center">Patvirtinkite rezervaciją</h1>

          {trainer && (
            <div className="mb-4 text-center">
              <img
                src={trainer.imageUrl}
                alt={`${trainer.name} ${trainer.surname}`}
                className="w-24 h-24 object-cover rounded-full mx-auto mb-3"
              />
              <h2 className="text-xl font-semibold">
                {trainer.name} {trainer.surname}
              </h2>
              <p className="text-gray-600 mb-1">Reitingas: ⭐ {trainer.rating}</p>
              {trainer.gym && (
                <p className="text-gray-600">
                  Klubas: {trainer.gym.name}, {trainer.gym.city}
                </p>
              )}
            </div>
          )}

          <div className="mb-4">
            <p className="font-medium">Data:</p>
            <p className="text-gray-700">{formattedDate}</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Laikas:</p>
            <p className="text-gray-700">{formattedTime}</p>
          </div>
          <div className="mb-6">
            <p className="font-medium">Kaina:</p>
            <p className="text-gray-700">€{computePrice()}</p>
          </div>

          <button
            onClick={handleProceedToPayment}
            disabled={isRedirecting}
            className="w-full py-3 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
          >
            {isRedirecting ? 'Kreipiamės į Stripe…' : 'Toliau į mokėjimą'}
          </button>
        </div>
      </motion.div>

      <Footer />

      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Reikia prisijungti</h2>
            <p className="mb-6 text-gray-600">
              Norėdami tęsti rezervaciją, prisijunkite prie paskyros.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Uždaryti
              </button>
              <button
                onClick={() => navigate('/prisijungimas', { state: { from: '/reservation' } })}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Prisijungti
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
