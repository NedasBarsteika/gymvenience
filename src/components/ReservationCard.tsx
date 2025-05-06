// src/components/ReservationCard.tsx
import axios from 'axios';
import { useState } from "react";

interface ReservationCardProps {
    slotId: string
    trainerName: string;
    clientName: string;
    isTrainer: boolean;
    gymAddress: string;
    date: string;
    time: string;
    done: boolean
}

const ReservationCard: React.FC<ReservationCardProps> = ({slotId, trainerName, clientName, isTrainer, gymAddress, date, time, done}) => {

    function buttonIfNotDone(){
        if(!done){
            return (<button onClick={(e) => handleDelete()} className="mt-2 text-red-600 font-semibold hover:cursor-pointer hover:text-red-300">ATŠAUKTI VIZITĄ &gt;</button>);
        }
    }
    console.log(slotId)

    function isUserOrTrainer(){
        if(isTrainer){
            return (<p className="font-bold">KLIENTAS: {clientName}</p>)
        }
        else return (<p className="font-bold">TRENERIS: {trainerName}</p>)
    }
    async function handleDelete() {
        try{
            await axios.delete(`https://localhost:7296/api/Reservation/${slotId}`);
            alert("Rezervacija sėkmingai ištrinta!");
            window.location.reload();
        }
        catch{
            alert("Rezervacijos ištrinti nepavyko");
        }
    }
    return (
        <div className="bg-white border-2 p-4 rounded-lg shadow max-h-50">
            {isUserOrTrainer()}
            <p>{gymAddress}</p>
            <p>DATA IR LAIKAS: {date} {time}</p>
            {buttonIfNotDone()}
        </div>
    );
};

export default ReservationCard;