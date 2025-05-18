import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Calendar from "../components/Calendar";

interface Slot {
  id: string;
  date: string;        // ISO date
  startTime: string;   // "HH:mm:ss"
  duration: string;    // "HH:mm"
  reserved: boolean;
}
interface LocationState {
  trainerId: string;
}


function TrainerPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [trainer, setTrainer] = useState<any>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { trainerId } = (location.state ?? {}) as LocationState;

  useEffect(() => {
    if (!trainerId) return;
    axios
      .get(`https://localhost:7296/user/${trainerId}`)
      .then(res => setTrainer(res.data))
      .catch(err => console.error("Failed to fetch trainer:", err));
  }, [trainerId]);

  useEffect(() => {
    if (!selectedDate || !trainerId) return;
    const formattedDate = selectedDate.toISOString().split("T")[0];

    axios
      .get<Slot[]>(`https://localhost:7296/api/TrainerAvailability/${trainerId}/all`)
      .then(res => {
        const todaySlots = res.data.filter(s => {
          const slotDay = new Date(s.date).toISOString().split("T")[0];
          return slotDay === formattedDate && !s.reserved;
        });
        setSlots(todaySlots);
      })
      .catch(err => {
        console.error("Failed to fetch times:", err);
        setSlots([]);
      });
  }, [selectedDate, trainerId]);

  const WorkTimes = slots.length > 0 ? (
    slots.map((slot) => {
      const start = slot.startTime.substring(0, 5);
      const end = calculateEndTime(slot.startTime, slot.duration);

      return (
        <button
          key={slot.id}
          className="w-full p-4 border bg-white text-center rounded hover:bg-blue-100 cursor-pointer"
          onClick={() =>
            navigate("/Reservacija", {
              state: {
                trainerId,
                slotId: slot.id,
                date: slot.date,
                startTime: slot.startTime,
                duration: slot.duration,
              },
            })
          }
        >
          {start}–{end}
        </button>
      );
    })
  ) : (
    <p className="text-gray-500 text-sm mt-2">
      Šiai dienai laisvų laikų nėra
    </p>
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
        {/* Header */}
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
          {/* Left: Trainer info */}
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
                <p className="text-center text-gray-600">
                  Reitingas: ⭐ {trainer.rating}
                </p>
                <p className="text-sm text-gray-700">{trainer.bio}</p>
                {trainer.gym && (
                  <div className="text-sm text-gray-500 mt-2 text-center">
                    Sporto klubas:
                    <br />
                    <strong>{trainer.gym.name}</strong>
                    <br />
                    {trainer.gym.city}, {trainer.gym.address}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="w-px bg-gray-300 mx-4" />

          {/* Center: Calendar */}
          <div className="w-2/4 p-4">
            {trainerId && (
              <Calendar trainerId={trainerId} onDateSelect={setSelectedDate} />
            )}
          </div>

          <div className="w-px bg-gray-300 mx-4" />

          {/* Right: Slots as buttons */}
          <div className="w-1/4 p-4">
            {selectedDate && (
              <>
                <p className="font-medium">
                  {selectedDate.toLocaleDateString("lt-LT", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <div className="grid grid-cols-1 gap-2 mt-2">
                  {WorkTimes}
                </div>
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
  const [sh, sm] = start.split(":").map(Number);
  const [dh, dm] = durationStr.split(":").map(Number);
  const total = sh * 60 + sm + dh * 60 + dm;
  const eh = Math.floor(total / 60);
  const em = total % 60;
  return `${String(eh).padStart(2, "0")}:${String(em).padStart(2, "0")}`;
}
