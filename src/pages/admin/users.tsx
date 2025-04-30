// src/pages/admin/users.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  isAdmin: boolean;
  isTrainer: boolean;
}

const ITEMS_PER_PAGE = 5;

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `https://localhost:7296/user/users`
          );
          setUsers(res.data);
          setCurrentPage(1);
        } catch {
          setError("Nepavyko gauti vartotojų");
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    await axios.delete(`https://localhost:7296/user/delete/${userId}`);
    setUsers((prev) => prev.filter((t) => t.id !== userId));
  };

  const renderBooleanCell = (value: boolean) => (
    <span
      className={`px-2 py-1 rounded text-white text-sm font-semibold ${
        value ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {value ? "Taip" : "Ne"}
    </span>
  );

  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);

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
          Vartotojų administravimas
        </h1>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : loading ? (
          <p className="text-center">Kraunama...</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 text-left">Vardas</th>
                    <th className="p-3 text-left">Pavardė</th>
                    <th className="p-3 text-left">El. paštas</th>
                    <th className="p-3 text-left">Adminas</th>
                    <th className="p-3 text-left">Treneris</th>
                    <th className="p-3 text-left">Veiksmai</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((t) => (
                    <tr key={t.id} className="border-t">
                      <td className="p-3">{t.name}</td>
                      <td className="p-3">{t.surname}</td>
                      <td className="p-3">{t.email}</td>
                      <td className="p-3">{renderBooleanCell(t.isAdmin)}</td>
                      <td className="p-3">{renderBooleanCell(t.isTrainer)}</td>
                      <td className="p-3 space-x-2 flex">
                        <button
                          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white cursor-pointer"
                          onClick={() => handleDelete(t.id)}
                        >
                          Ištrinti
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"} cursor-pointer`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </motion.div>

      <Footer />
    </div>
  );
}
