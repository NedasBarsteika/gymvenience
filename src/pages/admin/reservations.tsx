// src/pages/admin/reservations.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface ReservationRaw {
  id: string;
  userId: string;
  date: string;
  time: string;
  duration: string;
  trainerId: string;
  gymId: string;
  isDone: boolean;
}

interface Reservation {
  id: string;
  date: string;
  time: string;
  duration: string;
  userName: string;
  userSurname: string;
  trainerName: string;
  trainerSurname: string;
  gymName: string;
  isDone: boolean;
}

const ITEMS_PER_PAGE = 5;

export default function AdminReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user") || '{}');
      const res = await axios.get<ReservationRaw[]>("https://localhost:7296/api/Reservation/all", {
        headers: { Authorization: `Bearer ${user.token}` }
      });

      const resolved = await Promise.all(
        res.data.map(async (r) => {
          let userName = "-";
          let userSurname = "-";
          let trainerName = "-";
          let trainerSurname = "-";
          let gymName = "-";

          try {
            const userRes = await axios.get(`https://localhost:7296/user/${r.userId}`);
            userName = userRes.data.name || "-";
            userSurname = userRes.data.surname || "-";
          } catch {}

          try {
            const trainerRes = await axios.get(`https://localhost:7296/user/${r.trainerId}`);
            trainerName = trainerRes.data.name || "-";
            trainerSurname = trainerRes.data.surname || "-";
            if (trainerRes.data.gym.city !== "" && trainerRes.data.gym.address !== "") {
              gymName = trainerRes.data.gym.name + ", " + trainerRes.data.gym.address + " (" + trainerRes.data.gym.city + ")" || "-";
            }
            else if (trainerRes.data.gym.city !== "") {
              gymName = trainerRes.data.gym.city || "-";
            }
            else {
              gymName = "-";
            }
          } catch {}

          return {
            id: r.id,
            date: r.date,
            time: r.time,
            duration: r.duration,
            userName,
            userSurname,
            trainerName,
            trainerSurname,
            gymName,
            isDone: r.isDone,
          };
        })
      );

      setReservations(resolved);
    } catch {
      setError("Nepavyko gauti rezervacijų");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const paginated = reservations.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(reservations.length / ITEMS_PER_PAGE);

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
          Vizitų administravimas
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
                    <th className="p-3 text-left">Vartotojas</th>
                    <th className="p-3 text-left">Data</th>
                    <th className="p-3 text-left">Laikas</th>
                    <th className="p-3 text-left">Trukmė</th>
                    <th className="p-3 text-left">Treneris</th>
                    <th className="p-3 text-left">Sporto salė</th>
                    <th className="p-3 text-left">Įvykdyta?</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map((r) => (
                    <tr key={r.id} className="border-t">
                      <td className="p-3">{r.userName} {r.userSurname}</td>
                      <td className="p-3">{r.date.split("T")[0]}</td>
                      <td className="p-3">{r.time}</td>
                      <td className="p-3">{r.duration}</td>
                      <td className="p-3">{r.trainerName} {r.trainerSurname}</td>
                      <td className="p-3">{r.gymName}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-white text-sm font-semibold ${r.isDone ? "bg-green-500" : "bg-red-500"}`}>
                          {r.isDone ? "Taip" : "Ne"}
                        </span>
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
