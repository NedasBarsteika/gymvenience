// src/pages/trainers.tsx
import { Card, CardContent } from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const trainers = [
    {
        name: "Clyde Marks",
        image: "/Images/Trainers/clyde.jpg",
        description: "Introduce your staff and team members to your potential clients.",
        rating: 4,
    },
    {
        name: "Lilith Vera",
        image: "/Images/Trainers/lilith.jpg",
        description: "Introduce your staff and team members to your potential clients.",
        rating: 5,
    },
    {
        name: "Kyla Alvarez",
        image: "/Images/Trainers/kyla.jpg",
        description: "Introduce your staff and team members to your potential clients.",
        rating: 3,
    }
];

export default function TrainersPage() {
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
                    </div>
                </section>

                <div className="container mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
                    {trainers.map((trainer, index) => (
                        <Link key={index} to={`/treneriai/${trainer.name.toLowerCase().replace(" ", "-")}`}>
                            <Card className="bg-gray-800 text-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                <img src={trainer.image} alt={trainer.name} className="w-full h-60 object-cover" />
                                <CardContent className="p-5">
                                    <h2 className="text-2xl font-bold">{trainer.name}</h2>
                                    <p className="mt-2 text-gray-300">{trainer.description}</p>
                                    <div className="flex mt-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-5 h-5 ${i < trainer.rating ? 'text-yellow-500' : 'text-gray-500'}`} />
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </motion.div>

            <Footer />
        </div>
    );
}
