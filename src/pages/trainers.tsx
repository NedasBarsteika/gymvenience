// src/pages/reservations.tsx
import { Card, CardContent } from "../components/Card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import TrainersPage from './trainers';
import Calendar from "../components/Calendar";
import React, { useState } from "react";
function TrainerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const times = [
    "7:00–8:15", "8:30–9:45", "10:00–11:15", "11:30–12:45",
    "13:00–14:15", "15:00–16:15", "16:30–17:45",
    "18:00–19:15", "19:30–20:45", "21:00–22:15"
  ];
  
  const WorkTimes = times.map((time) => (
    <div key={time} className="p-4 border bg-white text-center rounded hover:bg-blue-100 cursor-pointer">
      {time}
    </div>
  ));
  
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

            <div className="flex">
            <div className="w-3/4 p-4">
            <Calendar onDateSelect={setSelectedDate} /></div>

            <div className="w-px bg-gray-300 mx-4"></div>

            <div className="w-1/4 p-4">{
            selectedDate && (
              <><p>
                {selectedDate.toLocaleDateString("lt-LT", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p><div className="grid grid-cols-1 gap-1 mt-2">{WorkTimes}</div></>
            )}
            </div>
            </div>
            
        </motion.div>

        <Footer />
    </div>
);
  }
  export default TrainerPage;
