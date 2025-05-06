// src/pages/schedules.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import ReservationCard from "../components/ReservationCard"
import axios from 'axios';
import { useEffect, useState } from "react";

interface ReservationRaw {
    id: string;
    userId: string;
    date: string;
    time: string;
    duration: string;
    trainerId: string;
    gymId: string;
    isDone: boolean;
  }
  
  interface Reservation {
    id: string;
    date: string;
    time: string;
    trainerName: string;
    trainerSurname: string;
    gymName: string;
    isDone: boolean;
  }


function ReservationsPage() {
    var user = JSON.parse(localStorage.getItem("user") || '{}');
    const [reservations, setReservations] = useState<Reservation[]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

      
    const fetchReservations = async () => {
        setLoading(true);
        try {
          const res = await axios.get<ReservationRaw[]>(`https://localhost:7296/api/Reservation/${user.id}`, {
            headers: { Authorization: `Bearer ${user.token}` }
          });
    
          const resolved = await Promise.all(
            res.data.map(async (r) => {
              let userName = "-";
              let userSurname = "-";
              let trainerName = "-";
              let trainerSurname = "-";
              let gymName = "-";
    
              try {
                const userRes = await axios.get(`https://localhost:7296/user/${r.userId}`);
                userName = userRes.data.name || "-";
                userSurname = userRes.data.surname || "-";
              } catch {}
    
              try {
                const trainerRes = await axios.get(`https://localhost:7296/user/${r.trainerId}`);
                trainerName = trainerRes.data.name || "-";
                trainerSurname = trainerRes.data.surname || "-";
                if (trainerRes.data.gym.city !== "" && trainerRes.data.gym.address !== "") {
                  gymName = trainerRes.data.gym.name + ", " + trainerRes.data.gym.address + " (" + trainerRes.data.gym.city + ")" || "-";
                }
                else if (trainerRes.data.gym.city !== "") {
                  gymName = trainerRes.data.gym.city || "-";
                }
                else {
                  gymName = "-";
                }
              } catch {}
    
              return {
                id: r.id,
                date: r.date.substring(0,10),
                time: r.time,
                duration: r.duration,
                userName,
                userSurname,
                trainerName,
                trainerSurname,
                gymName,
                isDone: r.isDone,
              };
            })
          );
    
          setReservations(resolved);
        } catch {
          setError("Nepavyko gauti rezervacijų");
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        fetchReservations();
      }, []);

        var scheduledReservations = reservations.filter((res: any) => res.isDone === false);
        var completedReservations = reservations.filter((res: any) => res.isDone === true);

        console.log(completedReservations);

    return (
        <>
            <title>Gymvenience | Vizitai</title>

            <div className="flex flex-col min-h-screen relative">
                <Navbar />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className=""
                >
                    <div className="w-full pt-5 h-1/15">
                        <h1 className="text-center font-bold mb-4 text-[50px]">MANO VIZITAI</h1>
                    </div>

                    <div className=" w-full justify-center p-4 bg-gray-100 min-h-screen gap-2 flex">
                        <div className="float mb-8 plr-1/10 w-45/100 overflow-auto align-top">
                            <h2 className="text-xl text-center font-semibold mb-2">AKTYVŪS VIZITAI</h2>

                            {scheduledReservations.map((res: any) => (
                                <ReservationCard
                                slotId={res.id}
                                trainerName={res.trainerName + " " + res.trainerSurname}
                                gymAddress={res.gymName}
                                date={res.date}
                                time={res.time}
                                done={res.isDone}
                            />
                            ))}

                        </div>
                        <div className="float mb-8 plr-1/10 w-45/100 overflow-auto align-top">
                            <h2 className="text-xl text-center font-semibold mb-2">VIZITŲ ISTORIJA</h2>

                            {completedReservations.map((res: any) => (
                                <ReservationCard
                                slotId={res.slotId}
                                trainerName={res.trainerName + " " + res.trainerSurname}
                                gymAddress={res.gymName}
                                date={res.date}
                                time={res.time}
                                done={res.isDone}
                            />))}

                        </div>
                    </div>
                </motion.div>

                <Footer />
            </div>
        </>
    );

}
export default ReservationsPage;
