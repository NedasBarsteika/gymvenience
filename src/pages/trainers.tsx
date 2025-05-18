// src/pages/trainers.tsx
import { Card, CardContent } from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

interface Trainer {
    id: number;
    name: string;
    surname: string;
    imageUrl: string;
    description: string;
    rating: number;
}

export default function TrainersPage() {
    const [trainers, setTrainers] = useState<Trainer[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [cities, setCities] = useState<string[]>([]);
    const [addresses, setAddresses] = useState<string[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedAddress, setSelectedAddress] = useState<string>('');

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const citiesRes = await axios.get("https://localhost:7296/api/gym/cities");
                const addressesRes = await axios.get("https://localhost:7296/api/gym/addresses");
                setCities(citiesRes.data);
                setAddresses(addressesRes.data);
            } catch (err) {
                console.error("Failed to load cities or addresses");
            }
        };
        fetchFilters();
    }, []);

    useEffect(() => {
        const fetchTrainers = async () => {
            setLoading(true);
            try {
                const endpoint = `/user/searchTrainers?city=${selectedCity}&address=${selectedAddress}`;
                const response = await axios.get(`https://localhost:7296${endpoint}`);
                setTrainers(response.data);
            } catch (err) {
                setError("Failed to load trainers");
            } finally {
                setLoading(false);
            }
        };
        fetchTrainers();
    }, [selectedCity, selectedAddress]);

    return (
        <div className="flex flex-col min-h-screen relative">
            <Navbar />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="flex-grow"
            >
                <section className="py-6 bg-gray-100">
                    <div className="max-w-screen-xl mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-6xl font-bold">Treneriai</h1>
                        <p className="mt-4 text-lg md:text-2xl">
                            Išsirinkite Jūsų norimą trenerį.
                        </p>
                        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="p-2 border border-gray-500 rounded"
                            >
                                <option value="">Miestas (visi)</option>
                                {cities.map((city, idx) => (
                                    <option key={idx} value={city}>{city}</option>
                                ))}
                            </select>
                            <select
                                value={selectedAddress}
                                onChange={(e) => setSelectedAddress(e.target.value)}
                                className="p-2 border border-gray-500 rounded"
                            >
                                <option value="">Adresas (visi)</option>
                                {addresses.map((addr, idx) => (
                                    <option key={idx} value={addr}>{addr}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </section>

                <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
                    {loading ? (
                        <p className="text-center text-lg">Kraunama...</p>
                    ) : error ? (
                        <p className="text-center text-lg text-red-500">{error}</p>
                    ) : (
                        trainers.map((trainer) => (
                            <Link key={trainer.id} to={`/treneriai/${trainer.name.toLowerCase()}-${trainer.surname.toLowerCase()}`} state={{ trainerId: trainer.id }}>
                                <Card className="bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <img src={trainer.imageUrl} alt={trainer.name} className="w-full h-60 object-cover" />
                                    <CardContent className="p-5">
                                        <h2 className="text-2xl font-bold">{trainer.name} {trainer.surname}</h2>
                                        <p className="mt-2 text-gray-300">{trainer.description}</p>
                                        <div className="flex mt-3">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-5 h-5 ${i < trainer.rating ? 'text-yellow-500' : 'text-gray-500'}`} />
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    )}
                </div>
            </motion.div>

            <Footer />
        </div>
    );
}
