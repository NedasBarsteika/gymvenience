import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import Calendar from "../components/Calendar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

function TrainerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [trainer, setTrainer] = useState<any>(null);
  const location = useLocation();
  const trainerId = location.state?.trainerId;

  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const response = await axios.get(`https://localhost:7296/user/${trainerId}`);
        setTrainer(response.data);
      } catch (error) {
        console.error("Nepavyko gauti trenerio duomenų", error);
      }
    };

    if (trainerId) fetchTrainer();
  }, [trainerId]);
  
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  useEffect(() => {
    const fetchAvailableTimes = async () => {
      if (!selectedDate || !trainerId) return;
  
      const formattedDate = selectedDate.toISOString().split("T")[0];
      try {
        const response = await axios.get(
          `https://localhost:7296/api/TrainerAvailability/${trainerId}/all`
        );
  
        const slots = response.data.filter(
          (slot: any) => {
            const slotDate = new Date(slot.date).toISOString().split("T")[0];
            return slotDate === formattedDate && slot.reserved === false;
          }
        );
  
        const formattedSlots = slots.map((slot: any) => {
          const start = slot.startTime.substring(0, 5);
          const end = calculateEndTime(slot.startTime, slot.duration);
          return `${start}–${end}`;
        });
  
        setAvailableTimes(formattedSlots);
      } catch (error) {
        console.error("Nepavyko gauti trenerio laikų", error);
        setAvailableTimes([]);
      }
    };
  
    fetchAvailableTimes();
  }, [selectedDate, trainerId]);
  

  const WorkTimes = availableTimes.length > 0 ? (
    availableTimes.map((time) => (
      <div
        key={time}
        className="p-4 border bg-white text-center rounded hover:bg-blue-100 cursor-pointer"
      >
        {time}
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-sm mt-2">Šiai dienai laisvų laikų nėra</p>
  );

  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
            <h1 className="text-4xl md:text-6xl font-bold">
              {trainer
                ? `${capitalize(trainer.name)} ${capitalize(trainer.surname)} laikai`
                : "Trenerio laikai"}
            </h1>
            <p className="mt-4 text-lg md:text-2xl">
              Išsirinkite Jūsų norimą laiką.
            </p>
          </div>
        </section>

        <div className="flex">
          {/* Kairė – Trenerio info */}
          <div className="w-1/4 p-4 space-y-4">
            {trainer && (
              <>
                <img
                  src={trainer.imageUrl}
                  alt="Trenerio nuotrauka"
                  className="w-48 h-48 object-cover rounded-full mx-auto"
                />
                <h2 className="text-xl font-semibold text-center">
                  {trainer.name} {trainer.surname}
                </h2>
                <p className="text-center text-gray-600">Reitingas: ⭐ {trainer.rating}</p>
                <p className="text-sm text-gray-700">{trainer.bio}</p>
                {trainer.gym && (
                  <div className="text-sm text-gray-500 mt-2 text-center">
                    Sporto klubas: <br />
                    <strong>{trainer.gym.name}</strong><br />
                    {trainer.gym.city}, {trainer.gym.address}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="w-px bg-gray-300 mx-4"></div>

          {/* Vidurys – Kalendorius */}
          <div className="w-2/4 p-4">
            {trainerId && (
              <Calendar trainerId={trainerId} onDateSelect={setSelectedDate} />
            )}
          </div>

          <div className="w-px bg-gray-300 mx-4"></div>

          {/* Dešinė – Laikai */}
          <div className="w-1/4 p-4">
            {selectedDate && (
              <>
                <p>
                  {selectedDate.toLocaleDateString("lt-LT", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="grid grid-cols-1 gap-1 mt-2">{WorkTimes}</div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      <Footer />
    </div>
  );
}

export default TrainerPage;

function calculateEndTime(start: string, durationStr: string): string {
  const [startHours, startMinutes] = start.split(":").map(Number);
  const [durHours, durMinutes] = durationStr.split(":").map(Number);

  const startTotal = startHours * 60 + startMinutes;
  const durationTotal = durHours * 60 + durMinutes;

  const endTotal = startTotal + durationTotal;
  const endHours = Math.floor(endTotal / 60);
  const endMinutes = endTotal % 60;

  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
}
