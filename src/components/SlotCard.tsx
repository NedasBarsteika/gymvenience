// src/components/ui/SlotCard.tsx
import React, { useState } from "react";

function SlotCard({ weekDay }: any){

    const [data, setData] = useState([{ time: new Date(Date.now()).toUTCString(), duration: "" }])

    const handleClick = () => {
        setData([...data, { time: new Date(Date.now()).toString(), duration: "0" }])
    }
    const handleChange = (e: any, i: any) => {
        const {name, value} = e.target
        console.log(weekDay)
        const onchangeVal = [...data]
        onchangeVal[i][name] = value
        setData(onchangeVal)
        localStorage.setItem("timetable" + weekDay, JSON.stringify(data));
    }
    const handleDelete = (i) => {
        if(i>0){
        const deleteVal = [...data]
        deleteVal.splice(i, 1)
        setData(deleteVal)
        localStorage.setItem("timetable" + weekDay, JSON.stringify(data));
        }
    }

    return (
            data.map((values, i) =>
                <div className="align-bottom">
                    <div className="grid grid-rows-2 opacity-55">
                        <p className="align-middle">Vizito laikas</p>
                        <p className="align-middle">Trukmė</p>
                    </div>
                    <div className="grid grid-cols-2">
                        <input onChange={(e) => handleChange(e, i)} name="date" value={values.time} id="startTime" type="time" placeholder="3:00" className="p-2 w-35"></input>
                        <input onChange={(e) => handleChange(e, i)} name="duration" value={values.duration} id="duration" type="number" form="nn" placeholder="0" className="p-2 w-30"></input>
                    </div>
                    <button onClick={handleClick} className="border-2 rounded-lg w-10 text-[20px]">+</button>
                    <button onClick={() => handleDelete(i)} className="border-2 rounded-lg w-10 text-[20px]">-</button>
                </div>
            )
    );
}

export default SlotCard;