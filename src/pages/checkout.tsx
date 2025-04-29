import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';

// Initialize Stripe with your test publishable key
const stripePromise = loadStripe('pk_test_51R8yi7H6vinJyGQsXgmj4xjTUaKIVnmfOkSq6A0YHRCvpheoN4ejatevvuyJITNNshEs9IzDsEHzy0mt2OrI3VDd003SV7ixEz');

interface ShippingOption {
  label: string;
  value: string;
  price: number;
  image: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, incrementFromCart, decrementFromCart, setQuantityInCart } = useCart();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const shippingOptions: ShippingOption[] = [
    { label: 'Omniva', value: 'omniva', price: 3, image: '/Images/Logo/omniva-logo.png' },
    { label: 'DPD', value: 'dpd', price: 4, image: '/Images/Logo/dpd-logo.jpg' },
    { label: 'LP Express', value: 'lp_express', price: 2.5, image: '/Images/Logo/lpexpress-logo.png' },
  ];

  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(shippingOptions[0]);

  const itemsTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPrice = itemsTotal + selectedShipping.price;

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const found = shippingOptions.find(opt => opt.value === value);
    if (found) setSelectedShipping(found);
  };

  const handleQuantityTyping = (id: number, raw: string) => {
    let n = parseInt(raw, 10);
    if (isNaN(n) || n < 1) n = 1;
    setQuantityInCart(id, n);
  };

  const handleProceedToPayment = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    const payload = {
      totalPrice,
      shippingMethod: selectedShipping.value,
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      const response = await axios.post(
        'https://localhost:7296/api/Payment/create-checkout-session',
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const sessionId = response.data.sessionId;
      const stripe = await stripePromise;
      if (!stripe) return;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) console.error('Stripe redirect error:', error.message);
    } catch (err) {
      console.error('Error creating checkout session:', err);
    }
  };

  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow flex justify-center p-6 bg-gray-50"
      >
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">Atsiskaitymas</h1>
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Krepšelis tuščias.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="flex items-center justify-between border p-3 rounded">
                    <div className="flex items-center">
                      <img src={item.coverImageUrl} alt={item.name} className="w-16 h-16 rounded mr-3 object-cover" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <button onClick={() => decrementFromCart(item.id)} className="px-2 bg-gray-200 rounded hover:bg-gray-300">-</button>
                          <input
                            type="number"
                            className="w-16 text-center border rounded"
                            value={item.quantity}
                            onChange={e => handleQuantityTyping(item.id, e.target.value)}
                          />
                          <button onClick={() => incrementFromCart(item.id)} className="px-2 bg-gray-200 rounded hover:bg-gray-300">+</button>
                        </div>
                      </div>
                    </div>
                    <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h2 className="font-semibold mb-2">Pristatymo būdas:</h2>
                <div className="space-y-2">
                  {shippingOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.value}
                        checked={selectedShipping.value === option.value}
                        onChange={handleShippingChange}
                        className="form-radio h-4 w-4"
                      />
                      <img src={option.image} alt={option.label} className="w-8 h-8 object-contain" />
                      <span>{option.label} (€{option.price.toFixed(2)})</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-6 border-t pt-4 text-right space-y-1">
                <p>Prekių suma: <span className="font-medium">€{itemsTotal.toFixed(2)}</span></p>
                <p>Pristatymas: <span className="font-medium">€{selectedShipping.price.toFixed(2)}</span></p>
                <p className="text-lg font-bold">Viso: €{totalPrice.toFixed(2)}</p>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
              >
                Toliau į mokėjimą
              </button>
            </>
          )}
        </div>
      </motion.div>

      <Footer />

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4">Reikia prisijungti</h2>
            <p className="mb-6 text-gray-600">Reikia prisijungti norint užsisakyti prekes.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Užverti
              </button>
              <button
                onClick={() => navigate('/prisijungimas', { state: { from: '/Atsiskaitymas' } })}
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
