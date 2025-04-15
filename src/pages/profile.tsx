// src/pages/profile.tsx
import Navbar from "../components/Navbar";
import axios from 'axios';
import Footer from "../components/Footer";
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useState } from "react";

function ProfilePage() {

    var user = JSON.parse(localStorage.getItem("user") || '{}');

    const [bio, setBio] = useState(user.bio);

    function handleSubmitForm(e: any){
        e.preventDefault();
        var formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        if (bio != formJson.bioField)
        {
            //localStorage.setItem("bio", formJson.bioField as string);
            axios.put(`https://localhost:7296/user/${user.id}/me`, {
                bio: formJson.bioField,
            })
        }
    }

    function checkIfUserTrainer(){
        console.log(user)
        if(user.isTrainer){
          return (
          <Link
          to="/profilis/laikas"
          className="border-r-4 font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 bg-gray-300 text-2xl"
      >
          Redaguoti darbo laiką
        </Link>);
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
                            <div id={"bio"} className="pb-3">
                                <div className="pb-3">Aprašas</div>
                                <form method="post" onSubmit={handleSubmitForm}>
                                    <textarea name={"bioField"} placeholder={"Jūsų aprašas"} rows={6} className="pb-3 w-full resize-none border-2" defaultValue={user.bio}></textarea>
                                    <button className="align-right">Išsaugoti</button>
                                </form>
                            </div>
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
                                Vizitų istorija
                            </Link>
                            {checkIfUserTrainer()}
                        </div>
                    </div>
                </motion.div>

                <Footer />
            </div>
        </>
    );
}

export default ProfilePage;