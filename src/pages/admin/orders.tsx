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
  productName?: string;
}

interface OrderRaw {
  id: number;
  userId: string;
  orderDate: string;
  items: OrderItem[];
  isDelivered: boolean;
}

interface Order {
  id: number;
  name: string;
  surname: string;
  orderDate: string;
  items: OrderItem[];
  totalPrice: number;
  isDelivered: boolean;
}

const ITEMS_PER_PAGE = 5;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async () => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.get<OrderRaw[]>(
        "https://localhost:7296/api/Order",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const orderWithNames = await Promise.all(
        res.data.map(async (order) => {
          let name = "-";
          let surname = "-";
          try {
            const userRes = await axios.get(
              `https://localhost:7296/user/${order.userId}`
            );
            name = userRes.data.name || "-";
            surname = userRes.data.surname || "-";
          } catch {
            // user not found
          }

          const itemsWithNames = await Promise.all(
            order.items.map(async (item) => {
              try {
                const productRes = await axios.get(
                  `https://localhost:7296/products/${item.productId}`
                );
                return { ...item, productName: productRes.data.name || "-" };
              } catch {
                return { ...item, productName: "-" };
              }
            })
          );

          const totalPrice = itemsWithNames.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            id: order.id,
            name,
            surname,
            orderDate: order.orderDate,
            items: itemsWithNames,
            totalPrice,
            isDelivered: order.isDelivered,
          };
        })
      );

      setOrders(orderWithNames);
    } catch {
      setError("Nepavyko gauti užsakymų");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const markAsDelivered = async (orderId: number) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `https://localhost:7296/api/order/${orderId}/deliver`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Užsakymas pažymėtas kaip pristatytas");
      fetchOrders();
    } catch {
      alert("Nepavyko pažymėti užsakymo kaip pristatyto");
    }
  };

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
        <h1 className="text-3xl font-bold text-center mb-6">
          Užsakymų administravimas
        </h1>

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
                  <th className="p-3 text-left">Vartotojas</th>
                  <th className="p-3 text-left">Data</th>
                  <th className="p-3 text-left">Produktai</th>
                  <th className="p-3 text-left">Bendra suma</th>
                  <th className="p-3 text-left">Pristatytas?</th>
                  <th className="p-3 text-left">Veiksmai</th>
                </tr>
              </thead>
              <tbody>
                {paginatedOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.name} {order.surname}</td>
                    <td className="p-3">
                      {new Date(order.orderDate).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <ul className="list-disc list-inside space-y-1">
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.productName} – Kiekis: {item.quantity}, Kaina:{" "}
                            {item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-3 font-semibold">
                      {order.totalPrice.toFixed(2)}€
                    </td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-white text-sm font-semibold ${order.isDelivered ? "bg-green-500" : "bg-red-500"}`}>
                        {order.isDelivered ? "Taip" : "Ne"}
                      </span>
                    </td>
                    <td className="p-3 flex">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white"
                        onClick={() => markAsDelivered(order.id)}
                        disabled={order.isDelivered}
                      >
                        Nustatyti užsakymą pristatytu
                      </button>
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
                      currentPage === i + 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200"
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
