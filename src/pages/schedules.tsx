// src/pages/schedules.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

function SchedulePage() {
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

                            <div className="bg-white border-2 p-4 rounded-lg shadow max-h-50">
                                <p className="font-bold">TRENERIS: JOHN SMITH</p>
                                <p>VIETA: PRAMONĖS GATVĖ 143A GYM</p>
                                <p>DATA IR LAIKAS: 2025/03/10 14:30 – 15:30</p>
                                <button className="mt-2 text-red-600 font-semibold">ATŠAUKTI VIZITĄ &gt;</button>
                            </div>

                        </div>

                        <div className="float mb-8 pr-1/10 w-45/100 overflow-auto align-top">
                            <h2 className="text-xl text-center font-semibold mb-2">VIZITŲ ISTORIJA</h2>

                            <div className="bg-white border-2 p-4 rounded-lg shadow max-h-50">
                                <p className="font-bold">TRENERIS: JOHN SMITH</p>
                                <p>VIETA: PRAMONĖS GATVĖ 143A GYM</p>
                                <p>DATA IR LAIKAS: 2025/03/03 08:30 – 09:30</p>
                                <button className="mt-2 text-blue-600 font-semibold">PALIKTI ATSILIEPIMĄ &gt;</button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <Footer />
            </div>
        </>
    );

}
export default SchedulePage;