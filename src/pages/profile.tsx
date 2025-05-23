// src/pages/profile.tsx
import Navbar from "../components/Navbar";
import axios from "axios";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProfilePictureEdit from "./profilePictureEdit";

interface Gym {
  id: number;
  name: string;
  address: string;
  city: string;
}

function ProfilePage() {
  var user = JSON.parse(localStorage.getItem("user") || "{}");

  const [bio, setBio] = useState<string>(user.bio || "");
  const [totalEarnings, setTotalEarnings] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>(user.imageUrl || "");

  const [rate, setRate] = useState<number>(user.hourlyRate || 0);
  const [rateLoading, setRateLoading] = useState<boolean>(false);
  const [rateError, setRateError] = useState<string | null>(null);

  // Add gym states
  const [gyms, setGyms] = useState<Gym[]>([]);
  const [selectedGymId, setSelectedGymId] = useState<string>();
  const [gymLoading, setGymLoading] = useState<boolean>(false);
  const [gymError, setGymError] = useState<string | null>(null);
  console.log(gyms);

  // Fetch total earnings for trainer
  useEffect(() => {
    if (user.isTrainer) {
      axios
        .put(`https://localhost:7296/user/${user.id}/earnings`, {
          trainerId: user.id,
        })
        .then((response) => setTotalEarnings(response.data.earnings))
        .catch((err) => console.error("Failed to fetch earnings", err));
    }
  }, []);

  async function handleSubmitForm(e: any) {
    e.preventDefault();
    var formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());

    axios.put(`https://localhost:7296/user/${user.id}/me`, {
      bio: formJson.bioField,
    });
    user.bio = bio;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Aprašymas sėkmingai pakeistas!");
  }

  // Fetch gyms for trainers
  useEffect(() => {
    if (user.isTrainer) {
      setGymLoading(true);
      axios
        .get("https://localhost:7296/api/Gym")
        .then((response) => {
          setGyms(response.data);
          setGymLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch gyms", err);
          setGymError("Nepavyko įkelti sporto salių sąrašo");
          setGymLoading(false);
        });
    }
  }, []);

  // Add gym update handler
  const handleGymChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newGymId = e.target.value;
    setGymError(null);
    try {
      // Option B: if your API uses the gymId in the URL
      await axios.post(
        `https://localhost:7296/user/${user.id}/assign-gym/${newGymId}`,
        {},
        { headers: { "Content-Type": "application/json" } }
      );
      setSelectedGymId(newGymId);
    } catch (err) {
      console.error("Klaida atnaujinant sporto salę:", err);
      setGymError("Nepavyko atnaujinti sporto salės");
    }
  };

  const handleRateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRateError(null);
    setRateLoading(true);

    try {
      // PUT /user/{id}/hourlyRate su raw body = rate
      await axios.put(
        `https://localhost:7296/user/${user.id}/hourlyRate`,
        rate,
        { headers: { "Content-Type": "application/json" } }
      );
      // Update local
      user.hourlyRate = rate;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (err) {
      console.error("Klaida atnaujinant įkainį:", err);
      setRateError("Nepavyko atnaujinti įkainio.");
    } finally {
      setRateLoading(false);
    }
  };

  function IfTrainer_TimeTable() {
    if (user.isTrainer) {
      return (
        <Link
          to="/profilis/laikas"
          className="border-r-4 font-semibold block py-2 px-3 text-gray-900 rounded hover:bg-gray-400 bg-gray-300 text-2xl"
        >
          Redaguoti darbo laiką
        </Link>
      );
    }
  }

  function IfTrainer_Rate() {
    if (user.isTrainer) {
      return (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Valandinis įkainis (€)</h3>
          {rateError && <p className="text-red-500 mb-1">{rateError}</p>}
          <form onSubmit={handleRateSubmit} className="flex items-center gap-2">
            <input
              type="number"
              step="0.01"
              min="0"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-24 p-1 border rounded"
              disabled={rateLoading}
              required
            />
            <button
              type="submit"
              disabled={rateLoading}
              className={`px-3 py-1 rounded text-white ${
                rateLoading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {rateLoading ? "..." : "Keisti"}
            </button>
          </form>
        </div>
      );
    }
    return null;
  }

  function IfTrainer_Image() {
    if (user.isTrainer) {
      return (
        <div className="mb-5">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profilio nuotrauka"
              className="w-32 h-32 rounded-full mb-4"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-200 rounded-full mb-4" />
          )}

          <ProfilePictureEdit
            onUploadSuccess={(url) => {
              setImageUrl(url);
              user.imageUrl = url;
              localStorage.setItem("user", JSON.stringify(user));
            }}
          />
        </div>
      );
    }
  }

  function IfTrainer_Bio() {
    if (user.isTrainer) {
      return (
        <div id={"bio"} className="pb-3">
          <div className="pb-3">Aprašas</div>
          <form method="post" onSubmit={handleSubmitForm}>
            <textarea
              name={"bioField"}
              placeholder={"Jūsų aprašas"}
              rows={6}
              className="pb-3 w-full resize-none border-2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
            <button className="rounded-lg radius-4 mt-3 hover:cursor-pointer w-25 h-10 hover:bg-gray-400 bg-gray-300">
              Išsaugoti
            </button>
          </form>
        </div>
      );
    }
  }

  function IfTrainer_GymSelect() {
    if (user.isTrainer) {
      return (
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Sporto salė</h3>
          {gymError && <p className="text-red-500 mb-1">{gymError}</p>}
          {gymLoading ? (
            <p>Kraunama...</p>
          ) : (
            <select
              value={selectedGymId}
              onChange={handleGymChange}
              className="p-2 border rounded w-full max-w-xs"
              disabled={gymLoading}
            >
              <option value={0}>Pasirinkite sporto salę</option>
              {gyms.map((gym) => (
                <option key={gym.id} value={gym.id}>
                  {gym.name.trim() ? `${gym.name} (${gym.address})` : gym.city}
                </option>
              ))}
            </select>
          )}
        </div>
      );
    }
    return null;
  }

  return (
    <>
      <title>Gymvenience | Profilis</title>

      <div className="flex flex-col min-h-screen">
        <Navbar />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 pb-70"
        >
          <div className="flex-nowrap columns-2 min-h-screen">
            {/*  Left side: basic profile information*/}
            <div className="absolute mt-10 left-1/20 w-4/10">
              <div className="text-[50px] pb-3">Mano Paskyra</div>
              <div className="pb-6">
                Peržiurėkite savo užsakymus ir valdykite savo paskyros
                informaciją
              </div>

              {/*Image*/}
              {IfTrainer_Image()}

              {/*Bio*/}
              {IfTrainer_Bio()}

              {IfTrainer_GymSelect()}

              {IfTrainer_Rate()}

              {/* Total earnings */}
              {user.isTrainer && (
                <div className="mt-4">
                  <div className="font-semibold mb-1">Iš viso uždirbta:</div>
                  <div className="text-2xl">
                    € {totalEarnings ? totalEarnings?.toFixed(2) : 0}
                  </div>
                </div>
              )}
            </div>

            {/* Right side: panels for extra info */}
            <div className="absolute flex flex-col mt-15 right-1/20 w-4/10 gap-2">
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
