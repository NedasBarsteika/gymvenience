// src/pages/profilePage.tsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from 'react-router-dom';

function ProfilePage() {
    const navigate = useNavigate();


    return (
        <><title>Gymvenience | Profilis</title>
        
        <div className="flex flex-col min-h-screen relative">
            <Navbar />
            <div className="flex-nowrap columns-2 min-h-screen relative">
                <div className="absolute top-10 left-1/20 w-4/10">
                    <div className="text-[50px] pb-3">Mano Paskyra</div>
                    <div>Peržiurėkite savo užsakymus ir valdykite savo paskyros informaciją</div>
                </div>
                <div className="absolute flex flex-col top-10 right-1/20 w-4/10 gap-2">
                    <Link
                        to="/"
                        className="border-r-4 font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 bg-gray-300 text-2xl"
                    >
                        Paskyros informacija
                    </Link>
                    <Link
                        to="/"
                        className="border-r-4 font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 bg-gray-300 text-2xl"
                    >
                        Užsakymų istorija
                    </Link>
                    <Link
                        to="/"
                        className="border-r-4 font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 bg-gray-300 text-2xl"
                    >
                        Vizitų istorija
                    </Link>
                </div>
            </div>

            <Footer />
        </div></>

    );
}

export default ProfilePage;
