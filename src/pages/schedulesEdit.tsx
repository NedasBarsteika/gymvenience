// src/pages/schedulesEdit.tsx
import Navbar from "../components/Navbar";
import axios from 'axios';
import Footer from "../components/Footer";
import { useState } from "react";
import { motion } from 'framer-motion';
import React from "react";
import SlotCard from "../components/SlotCard";
import { TimeTableProvider } from "../context/TimeTableContext";

const weekDays = ["Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis", "Sekmadienis"];

const [slots, setSlots] = React.useState(0);

function SchedulesEdit() {
    const [daySlots, setDaySlots] = useState({"Pirmadienis": [], "Antradienis": [], "Trečiadienis": [], "Ketvirtadienis": [], "Penktadienis": [], "Šeštadienis": [], "Sekmadienis": []});

    var user = JSON.parse(localStorage.getItem("user") || '{}');

    async function handleSubmit(e: any) {
        e.preventDefault();
        console.log(user.gymid)
        //var formData = new FormData(e.target);
        //const formJson = Object.fromEntries(formData.entries());

        if (!user.isTrainer) {
            for (var d = 0; d < weekDays.length; d++) {
                for(var n = 1; n < 4; n++){

                await axios.post("https://localhost:7296/api/TrainerAvailability",
                    {
                        trainerId: user.id,
                        date: new Date(Date.now() + (1000 * 60 * 60 * 24 * ((d+30)))),
                        startTime: "9:00",
                        duration: "0:30",
                        gymId: "01df7a45-db31-4065-9f11-ea4af52f06d4"

                    }
                ).then(function (response: any) {
                    if (response != 200) {
                    }
                });
            }
        }

        }
    }
    function handleAddElement() {
        return (
            <div className=" flex-row align-bottom">
                <div className="grid grid-cols-2 opacity-55">
                    <p className="align-middle">Vizito laikas</p>
                    <p className="align-middle">Trukmė</p>
                </div>
                <div className="grid grid-cols-2">
                    <input id="startTime" type="time" placeholder="3:00" className="p-2 w-35"></input>
                    <input id="duration" type="number" form="nn" placeholder="30" className="p-2 w-30"></input>
                </div>
                <button className="border-2 rounded-lg w-20 text-[20px]" onClick={handleAddElement}>+</button>
            </div>
        );
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
                            <div className="pb-6">Redaguokite savo darbo laiką čia</div>
                            <div className="pb-3 ml-5 border-4">
                                <div>
                                    {weekDays.map((day) =>
                                        <div className="flex align-center h-1/10">
                                            <div>
                                                <p className="p-5 text-[24px]">{day}</p>
                                                <button onClick={appendSlot} className="border-2 rounded-lg w-20 text-[20px]">+</button>
                                            </div>
                                            <SlotCard />
                                        </div>)}
                                </div>
                            </div>
                            <button className="rounded-lg radius-4" onClick={handleSubmit}>Išsaugoti</button>
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