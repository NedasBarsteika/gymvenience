// src/components/ProductCard.tsx
import React from 'react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  coverImageUrl: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, category, price, coverImageUrl }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ id, name, description, category, price, coverImageUrl, quantity: 1 });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105">
      <img src={coverImageUrl} alt={name} className="w-full h-100 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="mt-2 text-gray-600">€{price.toFixed(2)}</p>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg transition transform duration-150 hover:scale-105 active:scale-95 hover:bg-blue-700 focus:outline-none cursor-pointer"
        >
          Pridėti į krepšelį
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
