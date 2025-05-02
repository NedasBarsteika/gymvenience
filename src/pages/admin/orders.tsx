// src/pages/admin/orders.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface OrderItem {
  id: number;
  orderId: number;
  productId: string;
  quantity: number;
  price: number;
}

interface Order {
  id: number;
  userId: string;
  orderDate: string;
  items: OrderItem[];
}

const ITEMS_PER_PAGE = 5;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      try {
        const res = await axios.get("https://localhost:7296/api/Order", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(res.data);
      } catch {
        setError("Nepavyko gauti užsakymų");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-grow p-4 max-w-screen-xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Užsakymų administravimas</h1>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : loading ? (
          <p className="text-center">Kraunama...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Vartotojo ID</th>
                  <th className="p-3 text-left">Data</th>
                  <th className="p-3 text-left">Produktai</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.userId}</td>
                    <td className="p-3">{new Date(order.orderDate).toLocaleString()}</td>
                    <td className="p-3">
                      <ul className="list-disc list-inside space-y-1">
                        {order.items.map((item) => (
                          <li key={item.id}>
                            ID: {item.productId}, Kiekis: {item.quantity}, Kaina: {item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-1 rounded ${
                      currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                    } cursor-pointer`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>
      <Footer />
    </div>
  );
}
