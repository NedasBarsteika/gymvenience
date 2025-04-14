import React, { createContext, useState, useContext, ReactNode } from 'react';

export interface Reservation {
    id: number,
    description: string,
    startTime: Date,
    duration: number,
    endTimeDuration: number
}

interface TimeTableContextProps {
  Reservations: Reservation[];
  addToTable: (item: Reservation) => void;
  removeFromTable: (id: number) => void;
  clearTable: () => void;
}

const TimeTableContext = createContext<TimeTableContextProps | undefined>(undefined);

export const TimeTableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [Reservations, setReservations] = useState<Reservation[]>([]);

  const addToTable = (slot: Reservation) => {
    setReservations(prev => {
      const existing = prev.find(i => i.startTime === slot.startTime && i.id === slot.id);
      if (existing) {
        return prev.map(i =>
          i
        );
      }
      return [...prev, slot];
    });
  };

  const removeFromTable = (id: number) => {
    setReservations(prev => prev.filter(i => i.id !== id));
  };

  const clearTable = () => {
    setReservations([]);
  };

  return (
    <TimeTableContext.Provider
      value={{
        Reservations,
        addToTable,
        removeFromTable,
        clearTable,
      }}
    >
      {children}
    </TimeTableContext.Provider>
  );
};

function getEndDate(date: Date, duration: number) {
    
    return new Date(date.getTime() + duration*60000);
}

export const useTimeTable = () => {
  const context = useContext(TimeTableContext);
  if (!context) {
    throw new Error('useTimeTable must be used within a TimeTableProvider');
  }
  return context;
};