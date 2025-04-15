// src/components/ui/SlotCard.tsx
import React from "react";

const SlotCard = () => {
    
    return(
        <div className=" flex-row align-bottom">
            <div className="grid grid-cols-2 opacity-55">
                <p className="align-middle">Vizito laikas</p>
                <p className="align-middle">Trukmė</p>
            </div>
            <div className="grid grid-cols-2">
                <input id="startTime" type="time" placeholder="3:00" className="p-2 w-35"></input>
                <input id="duration" type="number" form="nn" placeholder="30" className="p-2 w-30"></input>
            </div>
        </div>
    );
};

export default SlotCard;