import React, { useEffect, useState } from "react";
import axios from "axios";

type CalendarProps = {
  onDateSelect: (date: Date) => void;
  trainerId: string;
};

type TrainerAvailability = {
  id: string;
  trainerId: string;
  date: string; // ISO format: "2025-05-09T00:00:00"
  startTime: string;
  duration: string;
  reserved: boolean;
  gymId: string;
};

const Calendar: React.FC<CalendarProps> = ({ onDateSelect, trainerId }) => {
  const today = new Date();
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [shownDate, setShownDate] = useState(currentMonth);
  const [availableDates, setAvailableDates] = useState<Date[]>([]);

  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        const response = await axios.get<TrainerAvailability[]>(
          `https://localhost:7296/api/TrainerAvailability/${trainerId}/all`
        );

        const availableSlots = response.data.filter((slot) => !slot.reserved);

        const dateSet = new Set<string>();
        availableSlots.forEach((slot) => {
          const dateOnly = new Date(slot.date);
          dateOnly.setHours(0, 0, 0, 0);
          dateSet.add(dateOnly.toISOString());
        });

        const uniqueDates = Array.from(dateSet).map((iso) => new Date(iso));
        console.log("Galimos datos:", uniqueDates.map(d => d.toDateString()));
        setAvailableDates(uniqueDates);
      } catch (error) {
        console.error("Nepavyko gauti trenerio datų:", error);
      }
    };

    if (trainerId) {
      fetchAvailableDates();
    }
  }, [trainerId]);

  const year = shownDate.getFullYear();
  const month = shownDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const goToNextMonth = () => {
    const nextMonthDate = new Date(shownDate);
    nextMonthDate.setMonth(shownDate.getMonth() + 1);
    setShownDate(nextMonthDate);
  };

  const goToCurrentMonth = () => {
    setShownDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const monthName = shownDate.toLocaleString("lt-LT", { month: "long" });

  const isAvailable = (date: Date) =>
    availableDates.some((d) => d.toDateString() === date.toDateString());

  const calendarDays = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="p-4" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    dateObj.setHours(0, 0, 0, 0);
    const future = dateObj >= new Date(new Date().setHours(0, 0, 0, 0));
    const available = future && isAvailable(dateObj);

    calendarDays.push(
      <div
        key={d}
        onClick={available ? () => onDateSelect(dateObj) : undefined}
        className={`p-4 border text-center font-medium rounded ${
          available
            ? "cursor-pointer bg-white hover:bg-blue-100"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {d}
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={goToCurrentMonth}
          className="px-3 py-1 rounded text-sm bg-gray-200 hover:bg-gray-300"
        >
          ⬅ Praeitas
        </button>

        <h2 className="text-2xl font-bold capitalize text-center">
          {monthName} {year}
        </h2>

        <button
          onClick={goToNextMonth}
          className="px-3 py-1 rounded text-sm bg-blue-200 hover:bg-blue-300"
        >
          Kitas ➡
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-sm text-center font-semibold text-gray-700">
        <div>P</div>
        <div>A</div>
        <div>T</div>
        <div>K</div>
        <div>Pn</div>
        <div>Š</div>
        <div>S</div>
      </div>

      <div className="grid grid-cols-7 gap-1 mt-2">{calendarDays}</div>
    </div>
  );
};

export default Calendar;
