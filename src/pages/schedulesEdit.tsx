// src/pages/schedulesEdit.tsx
import Navbar from "../components/Navbar";
import axios from 'axios';
import Footer from "../components/Footer";
import { useState } from "react";
import { motion } from 'framer-motion';
import SlotCard from "../components/SlotCard";
//import { Value } from "react-calendar/src/shared/types.js";

const weekDays = ["Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis", "Sekmadienis"];

function SchedulesEdit() {
    var user = JSON.parse(localStorage.getItem("user") || '{}');


    const [startTime, setStartTime] = useState("");
    const [duration, setDuration] = useState(0);

    async function handleSubmit(e: any) {
        e.preventDefault();
        var durationUpdated = `${Math.floor(duration / 60)}:${duration % 60}`

        //var formData = new FormData(e.target);
        //const formJson = Object.fromEntries(formData.entries());

        await axios.post("https://localhost:7296/api/TrainerAvailability",
            {
                trainerId: user.id,
                date: newDate,
                startTime: startTime,
                duration: durationUpdated,
                gymId: "01df7a45-db31-4065-9f11-ea4af52f06d4"

            }
        ).then(function (response: any) {
            if (response != 200) {
            }
        });
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
                        <div className="absolute top-10 left-1/20 w-6/10 flex flex-col">
                            <div className="text-[50px] pb-3">Darbo Laikas</div>
                            <div className="pb-6">Įterpkite vietą rezervacijai su jumis čia</div>
                            <div className="pb-3 ml-5 border-4">
                                <div className="grid grid-cols-7 p-5">
                                {weekDays.map((day) =>
                                        <div className="flex-rowalign-center h-50">
                                            <div>
                                                <p className="flex p-5 text-[24px]">{day}</p>
                                                <SlotCard 
                                                weekDay = {day} 
                                                />
                                            </div>
                                        </div>)}
                                </div>
                            </div>
                            <button className="rounded-lg radius-4 ml-5 mt-3 hover:cursor-pointer w-30 h-10 hover:bg-gray-400 bg-gray-300" onClick={handleSubmit}>Išsaugoti</button>
                        </div>

                        {/* Right side: exception day selection */}
                        <div className="absolute flex flex-col top-10 right-1/20 w-4/10 gap-2">

                        </div>
                    </div>
                </motion.div>

                <Footer />
            </div>
        </>
    );
}

export default SchedulesEdit;