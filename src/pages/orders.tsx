
// src/pages/orders.tsx
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OrderCard, { OrderItem } from '../components/OrderCard';
import { motion } from 'framer-motion';

interface OrderItemDto {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface OrderDto {
  id: number;
  orderDate: string;
  isDelivered: boolean;
  items: OrderItemDto[];
}

interface Order {
  id: number;
  dateOrdered: string;
  isDelivered: boolean;
  items: OrderItem[];
}

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userJson = localStorage.getItem('user');
    if (!token || !userJson) {
      setError('Turite prisijungti, kad matytumėte savo užsakymus.');
      setLoading(false);
      return;
    }
    const { id: userId } = JSON.parse(userJson);
    const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:7296';

    async function fetchOrders() {
      try {
        const res = await fetch(`${API_URL}/api/Order/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Klaida ${res.status}: ${text}`);
        }
        const data: OrderDto[] = await res.json();

        const normalized: Order[] = data.map(o => ({
          id: o.id,
          dateOrdered: new Date(o.orderDate).toLocaleString(),
          isDelivered: o.isDelivered,
          items: o.items.map(i => ({
            productId: Number(i.productId),
            name: i.productName,
            quantity: i.quantity,
            price: i.price,
          })),
        }));

        setOrders(normalized);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <>
      <title>Gymvenience | Užsakymai</title>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <motion.main
          className="flex-grow py-8 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto mb-8">
            <h1 className="text-4xl font-bold text-center mb-2">
              Mano užsakymai
            </h1>
            <p className="text-center text-gray-600">
              Čia matote visą savo užsakymų istoriją
            </p>
          </div>

          {loading && (
            <p className="text-center text-gray-500">Kraunama užsakymų…</p>
          )}
          {error && (
            <p className="text-center text-red-500">Klaida: {error}</p>
          )}
          {!loading && !error && orders.length === 0 && (
            <p className="text-center text-gray-600">
              Dar neturite užsakymų.
            </p>
          )}

          <div className="space-y-8">
            {orders.map(order => (
              <OrderCard key={order.id} {...order} />
            ))}
          </div>
        </motion.main>

        <Footer />
      </div>
    </>
  );
}