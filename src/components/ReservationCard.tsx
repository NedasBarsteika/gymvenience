// src/components/ReservationCard.tsx
import axios from 'axios';
import { useState } from "react";

interface ReservationCardProps {
    slotId: string
    trainerName: string;
    gymAddress: string;
    date: string;
    time: string;
    done: boolean
}

const ReservationCard: React.FC<ReservationCardProps> = ({slotId, trainerName, gymAddress, date, time, done}) => {

    function buttonIfNotDone(){
        if(!done){
            return (<button onClick={handleDelete} className="mt-2 text-red-600 font-semibold">ATŠAUKTI VIZITĄ &gt;</button>);
        }
    }
    function handleDelete() {
        axios.delete(`https://localhost:7296/api/Reservation/${slotId}`, {});
    }
    return (
        <div className="bg-white border-2 p-4 rounded-lg shadow max-h-50">
            <p className="font-bold">TRENERIS: {trainerName}</p>
            <p>{gymAddress}</p>
            <p>DATA IR LAIKAS: {date} {time}</p>
                   {buttonIfNotDone()}
        </div>
    );
};

export default ReservationCard;