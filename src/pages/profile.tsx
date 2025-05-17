// src/pages/profile.tsx
import Navbar from "../components/Navbar";
import axios from 'axios';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Gym {
    id: String,
    name: String,
    city: String,
    address: String,
    companyName: String,
    phoneNumber: String,
    email: String,
    description: String
}

function ProfilePage() {

    var user = JSON.parse(localStorage.getItem("user") || '{}');

    const [bio, setBio] = useState(user.bio);
    const [gyms, setGyms] = useState<Gym[]>([])

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    async function handleSubmitForm(e: any) {
        e.preventDefault();
        var formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        

        if (bio == formJson.bioField && user.gym ? (user.gym.id === formJson.gymField) : false) {
            alert("Duomenys sutampa su esamais, niekas nepakeista");
            return;
        }

        try {
            if (bio != formJson.bioField) {
                axios.put(`https://localhost:7296/user/${user.id}/me`, {
                    bio: formJson.bioField,
                })
            }
            if (user.gym ? user.gym.id != formJson.gymField : true) {
                axios.put(`https://localhost:7296/user/${user.id}/assign-gym/${formJson.gymField}`)
            }
            user.bio = formJson.bioField;
            user.gym = gyms.find((gym) => gym.id === formJson.gymField)
            localStorage.setItem("user", JSON.stringify(user));
            alert("Duomenys pakeisti ir išsaugoti sėkmingai");
            window.location.reload();
        } catch (err) {
            alert("Duomenų pakeisti nepavyko");
            setError('Duomenų pakeitimas nesėkmingas');
        }

    }

    const fetchGyms = async () => {
        const response = await axios.get("https://localhost:7296/api/Gym")
        setGyms(response.data)
        setLoading(false);
    }


    console.log(user.gym.id)

    useEffect(() => {
        fetchGyms();
    }, []);

    function IfTrainer_TimeTable() {
        if (user.isTrainer) {
            return (
                <Link
                    to="/profilis/laikas"
                    className="border-r-4 font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 bg-gray-300 text-2xl"
                >
                    Įterpti rezervacijos laikus
                </Link>);
        }
    }

    function IfTrainer_EditBio() {
        if (user.isTrainer) {

            return (loading ? (
                <p className="text-center text-lg">Kraunama...</p>
              ) : (
                <div id={"bio"} className="pb-3">
                    <form method="post" onSubmit={handleSubmitForm}>
                        <div className="pb-3">Aprašas</div>
                        <textarea name={"bioField"} placeholder={"Jūsų aprašas"} rows={6} className="pb-3 mb-5 w-full resize-none border-2" defaultValue={user.bio}></textarea>
                        <div className="pb-3">Sporto Salė</div>
                        <select name="gymField" className="pb-3 w-full resize-none border-2" defaultValue={user.gym ? user.gym.id : ""}>
                            <option value="">--Pasirinkite savo sporto salę--</option>
                            {gyms.sort((gym1, gym2) => gym1.name < gym2.name ? -1 : 1)
                            .map((gym) => {
                                if (gym.name != "" && gym.city != "" && gym.address != "") {
                                    return (<option value={gym.id as string}>{gym.name + " | " + gym.address + ", " + gym.city}</option>);
                                }
                            })}
                        </select>
                        <button className="rounded-lg radius-4 mt-3 hover:cursor-pointer w-25 h-10 hover:bg-gray-400 bg-gray-300">Išsaugoti</button>
                    </form>
                </div>) 
            )
        }
    }
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
                        {/*  Left side: basic profile information*/}
                        <div className="absolute top-10 left-1/20 w-4/10">
                            <div className="text-[50px] pb-3">Mano Paskyra</div>
                            <div className="pb-6">Peržiurėkite savo užsakymus ir valdykite savo paskyros informaciją</div>

                            {/*Bio*/}
                            {IfTrainer_EditBio()}
                        </div>

                        {/* Right side: panels for extra info */}
                        <div className="absolute flex flex-col top-10 right-1/20 w-4/10 gap-2">
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
                                Rezervacijų istorija
                            </Link>
                            {IfTrainer_TimeTable()}
                        </div>
                    </div>
                </motion.div>

                <Footer />
            </div>
        </>
    );
}

export default ProfilePage;