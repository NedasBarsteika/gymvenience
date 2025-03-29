// src/pages/signUp.tsx
import { motion } from 'framer-motion';
import '../App.css';
import NavbarOnlyLogo from '../components/NavbarOnlyLogo';
import Footer from '../components/Footer';
import { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!formData.email || !formData.password) {
            setError("Įveskite prisijungimo duomenis");
            return;
        }

        setLoading(true);

        await axios.post("https://localhost:7296/user/login", {
            email: formData.email,
            password: formData.password,
        })
            .then(function (response: any) {
                if (response.status === 200) {
                    const token = response.data.token;
                    const user = response.data.user;
                    localStorage.setItem("authToken", token);
                    localStorage.setItem("user", JSON.stringify(user));
                    document.cookie = `token=${token}; path=/; max-age=3600; Secure; SameSite=Strict`;
                    const previousPage = location.state?.from || "/";
                    navigate(previousPage, { replace: true });
                }
                else if (response.status === 500) {
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
                        <h2 className="text-2xl font-bold mb-4 text-center">Prisijungimas</h2>

                        {error && <p className="text-red-500 text-sm text-center mb-5">{error}</p>}

                        <form onSubmit={handleSubmit} className="space-y-4">
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
                            <button
                                type="submit"
                                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400 hover:cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? "Prisijungiama..." : "Prisijungti"}
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
}

export default LoginPage;
