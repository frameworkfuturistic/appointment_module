"use client";

// Import necessary hooks, types, and fetch
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define your types based on the data structure
interface Department {
  id: number;
  department_name: string;
}

interface Doctor {
  id: number;
  doctor_name: string;
  department_id: number;
  is_active: boolean;
}

interface Shift {
  id: number;
  shift_name: string;
}

interface Slot {
  slot_id: number;
  slot_name: string;
}

interface AppointmentContextType {
  departments: Department[];
  doctors: Doctor[];
  shifts: Shift[];
  slots: Slot[];
  fetchData: () => void; // For fetching the data
}

// Create the context
const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

// Hook to use the context
export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error('useAppointment must be used within an AppointmentProvider');
  }
  return context;
};

// Provider component
export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);

  // Fetch the data
  const fetchData = async () => {
    try {
      const res = await fetch('https://8fc9-115-245-226-37.ngrok-free.app/api/v1/book/prefill');
  
      if (!res.ok) {
        const errorText = await res.text(); // Get the error response as text
        console.error(`HTTP error! status: ${res.status}, response: ${errorText}`);
        return; // Exit if there was an error
      }
  
      const data = await res.json(); // This line may fail if the response is HTML
      console.log("dataaaa", data);
      
      if (data.status === "true") {
        setDepartments(data.data.departments);
        setDoctors(data.data.doctors.filter((doctor: Doctor) => doctor.is_active));
        setShifts(data.data.shifts);
        setSlots(data.data.slots);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppointmentContext.Provider value={{ departments, doctors, shifts, slots, fetchData }}>
      {children}
    </AppointmentContext.Provider>
  );
};
