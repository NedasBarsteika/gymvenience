import Navbar from "../components/Navbar";
import axios from 'axios';
import Footer from "../components/Footer";
import { useState } from "react";
import { motion } from 'framer-motion';

function SchedulesEdit() {
    const [bio, setBio] = useState(localStorage.getItem("bio"));

    var user = JSON.parse(localStorage.getItem("user") || '{}');

    function handleSubmitForm(e: any) {
        e.preventDefault();
        var formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        if (user.isTrainer) {
            localStorage.setItem("user", formJson.bioField as string);
        }
    }
    function ifDayActive(day: string){

    }
    return (
        <>
            <title>Gymvenience | Darbo Laiko Redagavimas</title>

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
                        <div className="absolute top-10 left-1/20 w-š/10">
                            <div className="text-[50px] pb-3">Darbo Laikas</div>
                            <div className="pb-6">Redaguokite savo darbo laiką čia</div>

                            {/*Weekdays*/}
                            <div className="pb-3 ml-5">
                            </div>
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