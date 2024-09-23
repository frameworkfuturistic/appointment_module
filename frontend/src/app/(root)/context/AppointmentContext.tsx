"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Define types based on the data structure
interface Department {
  id: number;
  department_name: string;
  is_active: boolean;
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
  start_time: string;
  end_time: string;
}

interface Slot {
  slot_id: number;
  slot_name: string;
}

interface ApiResponse {
  status: string;
  data: {
    departments: Department[];
    doctors: Doctor[];
    shifts: Shift[];
    slots: Slot[];
  };
}

interface AppointmentContextType {
  departments: Department[];
  doctors: Doctor[];
  shifts: Shift[];
  slots: Slot[];
  loading: boolean; // Add loading state
  error: string | null; // Add error state
  fetchData: () => void; // Function to fetch the data
}

// Create the context
const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

// Hook to use the context
export const useAppointment = () => {
  const context = useContext(AppointmentContext);
  if (!context) {
    throw new Error("useAppointment must be used within an AppointmentProvider");
  }
  return context;
};

// Provider component
export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch the data
  const fetchData = async () => {
    setLoading(true);
    setError(null); // Reset error state

    try {
      const res = await fetch("http://localhost:8000/api/v1/book/prefill");

      if (!res.ok) {
        const errorText = await res.text();
        console.error(`HTTP error! status: ${res.status}, response: ${errorText}`);
        setError("Failed to fetch data.");
        return;
      }

      const data: ApiResponse = await res.json();
      console.log("Fetched Data:", data);

      if (data.status === "true" && data.data) {
        setDepartments(data.data.departments.filter((dept: Department) => dept.is_active));
        setDoctors(data.data.doctors.filter((doc: Doctor) => doc.is_active));
        setShifts(data.data.shifts);
        setSlots(data.data.slots);
      } else {
        console.warn("Unexpected data format or missing fields:", data);
        setError("Unexpected data format.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppointmentContext.Provider value={{ departments, doctors, shifts, slots, loading, error, fetchData }}>
      {children}
    </AppointmentContext.Provider>
  );
};
