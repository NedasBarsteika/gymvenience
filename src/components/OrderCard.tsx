// src/components/OrderCard.tsx
import React from 'react';

export interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

export interface OrderCardProps {
  id: number;
  dateOrdered: string;
  isDelivered: boolean;
  items: OrderItem[];
}

const OrderCard: React.FC<OrderCardProps> = ({
  id,
  dateOrdered,
  isDelivered,
  items,
}) => {
  return (
    <div className="bg-white w-full max-w-3xl mx-auto border rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Order #{id}</h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}
        >
          {isDelivered ? 'Delivered' : 'Being delivered'}
        </span>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        <p>
          <strong>Ordered:</strong> {dateOrdered}
        </p>
      </div>

      <ul className="divide-y">
        {items.map((it) => (
          <li key={it.productId} className="py-2 flex justify-between">
            <div>
              <p className="font-medium">{it.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {it.quantity} × €{it.price.toFixed(2)}
              </p>
            </div>
            <div className="text-lg font-semibold">€{(it.price * it.quantity).toFixed(2)}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderCard;