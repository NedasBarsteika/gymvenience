import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Reservation {
    date: Date,
    startTime: Date,
    duration: number,
}

interface TimeTableContextProps {
  Reservations: Reservation[];
  addToTable: (item: Reservation) => void;
  clearTable: () => void;
}

const TimeTableContext = createContext<TimeTableContextProps | undefined>(undefined);

export const TimeTableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [Reservations, setReservations] = useState<Reservation[]>([]);

  const addToTable = (slot: Reservation) => {
    setReservations(prev => {
      const existing = prev.find(i => i.date === slot.date && i.startTime === slot.startTime);
      if (existing) {
        return prev.map(i =>
          i
        );
      }
      return [...prev, slot];
    });
  };


  const clearTable = () => {
    setReservations([]);
  };

  return (
    <TimeTableContext.Provider
      value={{
        Reservations,
        addToTable,
        clearTable,
      }}
    >
      {children}
    </TimeTableContext.Provider>
  );
};

export const useTimeTable = () => {
  const context = useContext(TimeTableContext);
  if (!context) {
    throw new Error('useTimeTable must be used within a TimeTableProvider');
  }
  return context;
};