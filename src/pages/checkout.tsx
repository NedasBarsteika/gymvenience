// src/pages/checkout.tsx
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

function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, incrementFromCart, decrementFromCart, setQuantityInCart } = useCart();

  const shippingOptions: ShippingOption[] = [
    { label: 'Omniva', value: 'omniva', price: 3, image: '/Images/Logo/omniva-logo.png' },
    { label: 'DPD', value: 'dpd', price: 4, image: '/Images/Logo/dpd-logo.jpg' },
    { label: 'LP Express', value: 'lp_express', price: 2.5, image: '/Images/Logo/lpexpress-logo.png' },
  ];

  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(shippingOptions[0]);
  const itemsTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalPrice = itemsTotal + selectedShipping.price;

  const handleShippingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const chosenValue = event.target.value;
    const found = shippingOptions.find(opt => opt.value === chosenValue);
    if (found) {
      setSelectedShipping(found);
    }
  };

  const handleQuantityTyping = (id: number, rawValue: string) => {
    let num = parseInt(rawValue, 10);
    if (isNaN(num) || num < 1) {
      num = 1;
    }
    setQuantityInCart(id, num);
  };

  const handleProceedToPayment = async () => {
    try {
      const response = await axios.post('https://localhost:7296/api/Payment/create-checkout-session', {
        totalPrice: totalPrice,
        shippingMethod: selectedShipping.value
      });
      const sessionId = response.data.sessionId;
      
      // Redirect to Stripe Checkout.
      const stripe = await stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe redirect error:', error.message);
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex-grow flex justify-center"
      >
        <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">Atsiskaitymas</h1>
          {cartItems.length === 0 ? (
            <p className="text-center">Krepšelis tuščias.</p>
          ) : (
            <>
              <ul className="space-y-4">
                {cartItems.map(item => (
                  <li key={item.id} className="border p-3 rounded flex items-center justify-between">
                    <div className="flex items-center">
                      <img src={item.coverImageUrl} alt={item.name} className="w-16 h-16 object-cover rounded mr-3" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <button onClick={() => decrementFromCart(item.id)} className="bg-gray-300 px-2 rounded hover:bg-gray-400">-</button>
                          <input
                            type="number"
                            className="w-16 text-center border border-gray-300 rounded"
                            value={item.quantity}
                            onChange={(e) => handleQuantityTyping(item.id, e.target.value)}
                          />
                          <button onClick={() => incrementFromCart(item.id)} className="bg-gray-300 px-2 rounded hover:bg-gray-400">+</button>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">€{(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">Pristatymo būdas:</h2>
                <div className="flex flex-col space-y-2">
                  {shippingOptions.map(option => (
                    <label key={option.value} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="shipping"
                        value={option.value}
                        checked={selectedShipping.value === option.value}
                        onChange={handleShippingChange}
                      />
                      <img src={option.image} alt={option.label} className="w-8 h-8 object-contain" />
                      <span>{option.label} ( €{option.price.toFixed(2)} )</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t pt-4 text-right">
                <div>Prekių suma: <b>€{itemsTotal.toFixed(2)}</b></div>
                <div>Pristatymas: <b>€{selectedShipping.price.toFixed(2)}</b></div>
                <div className="text-xl font-bold">Viso: €{totalPrice.toFixed(2)}</div>
              </div>

              <button
                onClick={handleProceedToPayment}
                className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Toliau į mokėjimą
              </button>
            </>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
}

export default CheckoutPage;
