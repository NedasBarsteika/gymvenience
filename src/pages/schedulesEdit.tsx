// src/pages/schedulesEdit.tsx
import Navbar from "../components/Navbar";
import axios from "axios";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import AvailabilityListCard from "../components/AvailabilityListCard";

interface Availability {
  id: string;
  trainerId: string;
  date: string;
  startTime: string;
  duration: string;
  reserved: boolean;
  gymId: string;
}

function SchedulesEdit() {
  var user = JSON.parse(localStorage.getItem("user") || "{}");

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [date, setDate] = useState<Value>(new Date());
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(0);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailabilities = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://localhost:7296/api/TrainerAvailability/${user.id}/all`
      );
      setAvailabilities(response.data);
    } catch {
      setError("Nepavyko gauti trenerio laikų");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailabilities();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();
    var durationUpdated = `${Math.floor(duration / 60)}:${duration % 60}`;
    var newDate = new Date(date.valueOf() + 3 * 3600 * 1000)
      .toISOString()
      .slice(0, 10);

    try {
      await axios.post("https://localhost:7296/api/TrainerAvailability", {
        trainerId: user.id,
        date: newDate,
        startTime: startTime,
        duration: durationUpdated,
      });
      alert(`Rezervacijos laikas įterptas sėkmingai\n
                Data: ${newDate}\n
                Pradžios laikas: ${startTime}\n
                Trukmė: ${Math.floor(duration / 60)}h ${duration % 60}min`);
      window.location.reload();
    } catch {
      alert("Įterpiant rezervacijos laiką įvyko klaida");
    }
  }

  return (
    <>
      <title>Gymvenience | Darbo Laikas</title>

      <div className="flex flex-col min-h-screen relative">
        <Navbar />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className=""
        >
          <div className="flex-nowrap columns-2 min-h-screen relative">
            {/*  Left side: weekday and time selections*/}
            <div className="absolute top-10 left-1/20 p-3 w-4/10 flex flex-col">
              <div className="text-[50px] pb-3">Darbo Laikas</div>
              <div className="pb-6">
                Įterpkite vietą rezervacijai su jumis čia
              </div>
              <div className="pb-3 ml-5 border-2">
                <div className="grid grid-cols-2">
                  <Calendar
                    onChange={setDate}
                    minDate={new Date(Date.now())}
                    minDetail="month"
                    value={date}
                  />
                  <div>
                    <div className="grid grid-rows-2">
                      <p className="align-middle">Vizito laikas</p>
                      <input
                        id="startTime"
                        type="time"
                        placeholder="9:00"
                        className="p-2 border-1 border-gray-600 rounded"
                        onChange={(e: any) => setStartTime(e.target.value)}
                        value={startTime}
                      ></input>
                    </div>
                    <div className="grid grid-rows-2">
                      <p className="text-center align-text-bottom">
                        Trukmė (Minutėmis)
                      </p>

                      <input
                        id="duration"
                        type="number"
                        placeholder="0"
                        className="p-2 border-1 border-gray-600 rounded"
                        onChange={(e: any) => setDuration(e.target.value)}
                        value={duration}
                      ></input>
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
              <div></div>
              <button
                className="rounded-lg radius-4 ml-5 mt-3 hover:cursor-pointer w-30 h-10 hover:bg-gray-400 bg-gray-300"
                onClick={handleSubmit}
              >
                Išsaugoti
              </button>
            </div>

            {/* Right side: created availability list */}
            <div className="absolute flex flex-col top-10 right-1/20 h-8/10 w-4/10 gap-2 overflow-scroll">
              {availabilities
                .filter(slot => slot.reserved === false)
                .sort((slot1, slot2) =>
                  slot1.date == slot2.date
                    ? slot1.startTime > slot2.startTime
                      ? -1
                      : slot1.startTime < slot2.startTime
                      ? 1
                      : 0
                    : slot1.date > slot2.date
                    ? -1
                    : 1
                )
                .map((slot: Availability) => (
                  <AvailabilityListCard
                    slotId={slot.id}
                    date={slot.date}
                    time={slot.startTime}
                    duration={slot.duration}
                  />
                ))}
            </div>
          </div>
        </motion.div>

        <Footer />
      </div>
    </>
  );
}

export default SchedulesEdit;
