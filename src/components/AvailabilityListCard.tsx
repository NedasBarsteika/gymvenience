// src/components/ReservationCard.tsx
import axios from "axios";

interface AvailabilityListCardProps {
  slotId: string;
  date: string;
  time: string;
  duration: string;
}

const AvailabilityListCard: React.FC<AvailabilityListCardProps> = ({
  slotId,
  date,
  time,
  duration,
}) => {
  async function handleDelete() {
    try {
      await axios.delete(
        `https://localhost:7296/api/TrainerAvailability/${slotId}`
      );
      alert("Rezervuotinas laikas sėkmingai ištrintas!");
    } catch {
      alert("Rezervuotino laiko ištrinti nepavyko. Bandykite vėliau");
    }
    window.location.reload();
  }

  return (
    <div className="bg-white border-2 p-4 rounded-lg shadow max-h-50">
      <p>
        <b>DATA IR LAIKAS:</b> {date.slice(0, 10)} {time}
      </p>
      <p>
        <b>TRUKMĖ:</b> {duration}
      </p>
      <button
        onClick={(e) => handleDelete()}
        className="mt-2 text-red-600 font-semibold hover:cursor-pointer hover:text-red-300"
      >
        PAŠALINTI LAIKĄ &gt;
      </button>
    </div>
  );
};

export default AvailabilityListCard;
