// src/pages/signUp.tsx
import { motion } from 'framer-motion';
import '../App.css';
import NavbarOnlyLogo from '../components/NavbarOnlyLogo';
import Footer from '../components/Footer';
import { useState } from 'react';

function SignUpPage() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Slaptažodžiai skiriasi!");
            return;
        }
        console.log("Vartotojas uzregistruotas:", formData);
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
                        <h2 className="text-2xl font-bold mb-4 text-center">Paskyros kūrimas</h2>
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
                                value={formData.name}
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
                            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                                Registruotis
                            </button>
                        </form>
                    </div>
                </div>
            </motion.div>

            <Footer />
        </div>
    );
}

export default SignUpPage;
