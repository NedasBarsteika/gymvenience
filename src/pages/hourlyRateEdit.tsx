// src/pages/hourlyRateEdit.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function HourlyRateEdit() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [rate, setRate] = useState<number>(user.hourlyRate || 0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Siunčiame atnaujinimą
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    setLoading(true);
    try {
      await axios.put(
        `https://localhost:7296/user/${user.id}/hourlyRate`,
        rate,
        { headers: { "Content-Type": "application/json" } }
      );
      // Atnaujiname localStorage
      user.hourlyRate = rate;
      localStorage.setItem("user", JSON.stringify(user));
      // Grįžtame į profilio puslapį
      navigate("/profilis", { replace: true });
    } catch (err) {
      console.error("Klaida atnaujinant įkainį:", err);
      setError("Nepavyko atnaujinti įkainio. Bandykite dar kartą.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Gymvenience | Redaguoti Įkainį</title>
      <div className="flex flex-col min-h-screen">
        <Navbar />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-grow justify-center items-center bg-gray-100 p-6"
        >
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Redaguoti valandinį įkainį
            </h2>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="font-semibold">Valandinis įkainis (€):</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="mt-1 w-full p-2 border rounded"
                  required
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className={`w-full p-2 rounded text-white 
                  ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {loading ? "Įkainis atnaujinamas..." : "Išsaugoti"}
              </button>
            </form>
          </div>
        </motion.div>

        <Footer />
      </div>
    </>
  );
}

export default HourlyRateEdit;
