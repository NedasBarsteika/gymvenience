// src/pages/admin/trainers.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface Trainer {
  id: string;
  name: string;
  surname: string;
  email: string;
  bio: string;
  imageUrl: string;
  rating: number;
  gym: {
    name: string;
  } | null;
}

const ITEMS_PER_PAGE = 5;

export default function AdminTrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalImage, setModalImage] = useState<string | null>(null);

  const [cities, setCities] = useState<string[]>([]);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const citiesRes = await axios.get(
          "https://localhost:7296/api/gym/cities"
        );
        const addressesRes = await axios.get(
          "https://localhost:7296/api/gym/addresses"
        );
        setCities(citiesRes.data);
        setAddresses(addressesRes.data);
      } catch {
        console.error("Nepavyko gauti filtrų");
      }
    };
    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://localhost:7296/user/searchTrainers?city=${selectedCity}&address=${selectedAddress}`
        );
        setTrainers(res.data);
        setCurrentPage(1);
      } catch {
        setError("Nepavyko gauti trenerių");
      } finally {
        setLoading(false);
      }
    };
    fetchTrainers();
  }, [selectedCity, selectedAddress]);

  const handleDemote = async (trainerId: string) => {
    await axios.post(`https://localhost:7296/user/demote/${trainerId}`);
    setTrainers((prev) => prev.filter((t) => t.id !== trainerId));
  };

  const handleDelete = async (trainerId: string) => {
    await axios.delete(`https://localhost:7296/user/delete/${trainerId}`);
    setTrainers((prev) => prev.filter((t) => t.id !== trainerId));
  };

  const paginatedTrainers = trainers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  const totalPages = Math.ceil(trainers.length / ITEMS_PER_PAGE);

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
          Trenerių administravimas
        </h1>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="p-2 border border-gray-500 rounded"
          >
            <option value="">Miestas (visi)</option>
            {cities.map((city, i) => (
              <option key={i} value={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            className="p-2 border border-gray-500 rounded"
          >
            <option value="">Adresas (visi)</option>
            {addresses.map((addr, i) => (
              <option key={i} value={addr}>
                {addr}
              </option>
            ))}
          </select>
        </div>

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
                    <th className="p-3 text-left">Nuotrauka</th>
                    <th className="p-3 text-left">Vardas</th>
                    <th className="p-3 text-left">Pavardė</th>
                    <th className="p-3 text-left">El. paštas</th>
                    <th className="p-3 text-left">Bio</th>
                    <th className="p-3 text-left">Reitingas</th>
                    <th className="p-3 text-left">Sporto salė</th>
                    <th className="p-3 text-left">Veiksmai</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedTrainers.map((t) => (
                    <tr key={t.id} className="border-t">
                      <td className="p-3">
                        <img
                          src={t.imageUrl && t.imageUrl !== "" ? t.imageUrl : "/Images/avatar.png"}
                          className="w-12 h-12 object-cover rounded cursor-pointer"
                          onClick={() => setModalImage(t.imageUrl && t.imageUrl !== "" ? t.imageUrl : "/Images/avatar.png")}
                        />
                      </td>
                      <td className="p-3">{t.name}</td>
                      <td className="p-3">{t.surname}</td>
                      <td className="p-3">{t.email}</td>
                      <td className="p-3">{t.bio}</td>
                      <td className="p-3">{t.rating}</td>
                      <td className="p-3">{t.gym?.name || "-"}</td>
                      <td className="p-3 space-x-2 flex">
                        <button
                          className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-white cursor-pointer"
                          onClick={() => handleDemote(t.id)}
                        >
                          Pašalinti trenerį
                        </button>
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

      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Trainer"
            className="max-w-full max-h-full"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
