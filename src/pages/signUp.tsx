// src/pages/signUp.tsx
import { motion } from "framer-motion";
import "../App.css";
import NavbarOnlyLogo from "../components/NavbarOnlyLogo";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.name ||
      !formData.surname ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Įveskite visus duomenis");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Slaptažodžiai skiriasi!");
      return;
    }

    setLoading(true);

    await axios
      .post("https://localhost:7296/user/register", {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
      })
      .then(function (response: any) {
        if (response.status === 200) {
          alert("Registracija sėkminga!");
          navigate("/prisijungimas");
        } else if (response.status === 500) {
          setError("Serverio klaida. Bandykite kitą kartą.");
        }
      })
      .catch(function (error: any) {
        setError(error.response.data);
      });

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavbarOnlyLogo />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col flex-grow justify-center items-center bg-gray-100 p-4"
      >
        <div className="flex flex-1 justify-center items-center bg-gray-100 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Paskyros kūrimas
            </h2>

            {error && (
              <p className="text-red-500 text-sm text-center mb-5">{error}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Vardas"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="text"
                name="surname"
                placeholder="Pavardė"
                value={formData.surname}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="El. paštas"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Slaptažodis"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Pakartokite slaptažodį"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400 hover:cursor-pointer"
                disabled={loading}
              >
                {loading ? "Registruojama..." : "Registruotis"}
              </button>
            </form>
            <div className="w-full max-w-md text-center mt-2">
              <button
                onClick={() => navigate("/prisijungimas")}
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 cursor-pointer"
              >
                Prisijungti
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}

export default SignUpPage;
