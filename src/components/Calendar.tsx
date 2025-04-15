import React, { useState } from "react";

type CalendarProps = {
  onDateSelect: (date: Date) => void;
};

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
  const today = new Date();

  // Šio ir kito mėnesio pradžios datos
  const currentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

  // Rodoma data (gali būti tik šis arba kitas mėnuo)
  const [shownDate, setShownDate] = useState(currentMonth);

  // Mėnesio metaduomenys
  const year = shownDate.getFullYear();
  const month = shownDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay(); // savaitės diena (0 = sekmadienis)
  const daysInMonth = lastDay.getDate();

  // Funkcijos pereiti tarp mėnesių
  const isCurrentMonth = shownDate.getMonth() === currentMonth.getMonth();
  const isNextMonth = shownDate.getMonth() === nextMonth.getMonth();

  const goToNextMonth = () => {
    if (isCurrentMonth) setShownDate(nextMonth);
  };

  const goToCurrentMonth = () => {
    if (isNextMonth) setShownDate(currentMonth);
  };

  const monthName = shownDate.toLocaleString("lt-LT", { month: "long" });

  // Sugeneruojam kalendoriaus langelius
  const calendarDays = [];
  for (let i = 0; i < startDay; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="p-4" />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dateObj = new Date(year, month, d);
    const isFutureDate = dateObj >= new Date(today.setHours(0, 0, 0, 0)); // tiksliai nuo šiandien
  
    calendarDays.push(
      <div
        key={d}
        onClick={isFutureDate ? () => onDateSelect(dateObj) : undefined}
        className={`p-4 border text-center font-medium rounded cursor-pointer ${
          isFutureDate
            ? "bg-white hover:bg-blue-100"
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
          disabled={isCurrentMonth}
          className={`px-3 py-1 rounded text-sm ${
            isCurrentMonth
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          ⬅ Šis
        </button>

        <h2 className="text-2xl font-bold capitalize text-center">
          {monthName} {year}
        </h2>

        <button
          onClick={goToNextMonth}
          disabled={isNextMonth}
          className={`px-3 py-1 rounded text-sm ${
            isNextMonth
              ? "bg-blue-100 text-blue-300 cursor-not-allowed"
              : "bg-blue-200 hover:bg-blue-300"
          }`}
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
