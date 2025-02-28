// src/components/CartSidebar.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar: React.FC = () => {
  const { cartItems, decrementFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div
      className={`fixed top-0 bottom-0 right-0 bg-white shadow-lg border-l transition-all duration-300 z-50 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Header / Toggle Button */}
      <div className="p-2 border-b flex items-center justify-center">
        <button onClick={toggleSidebar} className="focus:outline-none">
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18l-2 13H5L3 3z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 16a4 4 0 01-8 0" />
          </svg>
        </button>
      </div>

      {/* Main Container: flex layout with a scrollable area + fixed footer area */}
      {isOpen && (
        <div className="flex flex-col h-150">
          {/* Scrollable Cart Items */}
          <div className="p-4 flex-grow overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">Krepšelis</h2>
            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-600">Krepšelis tusčias.</p>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex items-center justify-between border p-2 rounded">
                    <div className="flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded mr-3"
                      />
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-xs text-gray-500"> {item.quantity}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => decrementFromCart(item.id)}
                      className="bg-red-600 text-white text-xs py-1 px-2 rounded transition transform duration-150 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none"
                    >
                      Išimti prekę
                    </button>
                  </li>
                ))}
              </ul>
              
            )}
            
          </div>

          {/* Checkout Button at the Bottom */}
          <div className="p-4 border-t">
            <Link
              to="/checkout"
              className="block w-full bg-green-600 text-white py-2 text-center rounded transition transform duration-150 hover:scale-105 active:scale-95 hover:bg-green-700 focus:outline-none"
            >
              Atsiskaitymas
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
