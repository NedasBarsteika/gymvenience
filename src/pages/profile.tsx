// src/pages/profile.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

function ProfilePage() {
    return (
        <>
            <title>Gymvenience | Profilis</title>

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
                        <div className="absolute top-10 left-1/20 w-4/10">
                            <div className="text-[50px] pb-3">Mano Paskyra</div>
                            <div>Peržiurėkite savo užsakymus ir valdykite savo paskyros informaciją</div>
                        </div>
                        <div className="absolute flex flex-col top-10 right-1/20 w-4/10 gap-2">
                            <Link
                                to="/profilis/informacija"
                                className="border-r-4 font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 bg-gray-300 text-2xl"
                            >
                                Paskyros informacija
                            </Link>
                            <Link
                                to="/profilis/uzsakymai"
                                className="border-r-4 font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 bg-gray-300 text-2xl"
                            >
                                Užsakymų istorija
                            </Link>
                            <Link
                                to="/profilis/vizitai"
                                className="border-r-4 font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 bg-gray-300 text-2xl"
                            >
                                Vizitų istorija
                            </Link>
                        </div>
                    </div>
                </motion.div>

                <Footer />
            </div>
        </>
    );
}

export default ProfilePage;