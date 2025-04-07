// src/pages/trainer.tsx
import { Card, CardContent } from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TrainersPage from './trainers';
function TrainerPage() {
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
                    <h1 className="text-4xl md:text-6xl font-bold">[Trenerio vardas] laikai</h1>
                    <p className="mt-4 text-lg md:text-2xl">
                        Išsirinkite Jūsų norimą laiką.
                    </p>
                </div>
            </section>

            <div className="flex justify-center">
              <table className="border-collapse border border-gray-300 text-center m-4 w-350">
                  <thead>
                    <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-1">Pirmadienis</th>
                    <th className="border border-gray-300 p-1">Antradienis</th>
                    <th className="border border-gray-300 p-1">Trečiadienis</th>
                    <th className="border border-gray-300 p-1">Ketvirtadienis</th>
                    <th className="border border-gray-300 p-1">Penktadienis</th>
                    <th className="border border-gray-300 p-1">Šeštadienis</th>
                    <th className="border border-gray-300 p-1">Sekmadienis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">7:00-8:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">7:00-8:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">7:00-8:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">7:00-8:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">7:00-8:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">7:00-8:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">7:00-8:15</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">8:30-9:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">8:30-9:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">8:30-9:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">8:30-9:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">8:30-9:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">8:30-9:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">8:30-9:45</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">10:00-11:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">10:00-11:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">10:00-11:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">10:00-11:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">10:00-11:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">10:00-11:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">10:00-11:15</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">11:30-12:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">11:30-12:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">11:30-12:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">11:30-12:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">11:30-12:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">11:30-12:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">11:30-12:45</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">13:00-14:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">13:00-14:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">13:00-14:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">13:00-14:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">13:00-14:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">13:00-14:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">13:00-14:15</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">15:00-16:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">15:00-16:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">15:00-16:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">15:00-16:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">15:00-16:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">15:00-16:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">15:00-16:15</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">16:30-17:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">16:30-17:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">16:30-17:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">16:30-17:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">16:30-17:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">16:30-17:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">16:30-17:45</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">18:00-19:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">18:00-19:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">18:00-19:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">18:00-19:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">18:00-19:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">18:00-19:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">18:00-19:15</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">19:30-20:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">19:30-20:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">19:30-20:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">19:30-20:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">19:30-20:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">19:30-20:45</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">19:30-20:45</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">21:00-22:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">21:00-22:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">21:00-22:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">21:00-22:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">21:00-22:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">21:00-22:15</td>
                    <td className="border border-gray-300 p-1 hover:bg-blue-200 cursor-pointer">21:00-22:15</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
        </motion.div>

        <Footer />
    </div>
);
  }
  export default TrainerPage;