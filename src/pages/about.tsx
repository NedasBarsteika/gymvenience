// src/pages/about.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { motion } from "framer-motion";
function About() {
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
                <div className="max-w-screen-xl mx-auto px-4 text-center mt-30">
                    <h1 className="text-4xl md:text-6xl font-bold">Apie mus</h1>
                </div>
                <div className="max-w-screen-xl mx-auto text-left mt-30">
                    <h2 className="text-4xl md:text-3xl font-bold">Misija</h2>
                    <p className="mt-4 text-lg md:text-2xl">
                        Mes esame maža studentų grupelė, kurie sugalvojo padaryti pasiruošimą sportui paprastesniu.
                    </p>
                    
                </div>
                <div className="max-w-screen-xl mx-auto text-right mt-30">
                    <h2 className="text-4xl md:text-3xl font-bold">Vizija</h2>
                    <p className="mt-4 text-lg md:text-2xl">Sukurti vietą kur visi galėtų paprastai pradėti sportuoti.</p>
                </div>
                <div className="max-w-screen-xl mx-auto text-left mt-30">
                    <h2 className="text-4xl md:text-3xl font-bold">Vertybes</h2>
                    <p className="mt-4 text-lg md:text-2xl">Parprastumas, patogumas ir prieinamumas</p>
                </div>
                <div className="max-w-screen-xl mx-auto text-right mt-30">
                    <h2 className="text-4xl md:text-3xl font-bold">Komanda</h2>
                    <p className="mt-4 text-lg md:text-2xl">Haroldas Kaminskas</p>
                    <p className="mt-4 text-lg md:text-2xl">Linas Jančauskas</p>
                    <p className="mt-4 text-lg md:text-2xl">Nedas Barsteika</p>
                    <p className="mt-4 text-lg md:text-2xl">Mantas Maščinskas</p>
                    <p className="mt-4 text-lg md:text-2xl">Kasparas Vaitiekus</p>
                </div>
                <div className="max-w-screen-xl mx-auto text-left mt-30">
                    <h2 className="text-4xl md:text-3xl font-bold">Kontaktai</h2>
                    <p className="mt-4 text-lg md:text-2xl">GitHub:  <a href="https://github.com/NedasBarsteika/gymvenience/tree/main" target="_blank" rel="noopener noreferrer">https://github.com/NedasBarsteika/gymvenience/tree/main</a></p>
                    <p className="mt-4 text-lg md:text-2xl">Kontaktinis telefonas: +37069696969</p>
                    <p className="mt-4 text-lg md:text-2xl">El. paštas: neads.barsteika@ktu.edu</p>
                </div>
            </section>
        </motion.div>

        <Footer />
    </div>
);
}
export default About;
