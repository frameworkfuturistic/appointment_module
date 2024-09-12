"use client"
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue
} from "@/components/ui/select"; // Assuming this is your select component


const departmentsData = {
  departments: [
    {
      id: 1,
      name: "Symptom 1",
      doctors: [
        {
          id: 101,
          name: "Dr.A",
          availableSlots: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"]
        },
        {
          id: 102,
          name: "Dr.B",
          availableSlots: ["11:00 AM - 12:00 PM", "1:00 PM - 2:00 PM"]
        }
      ]
    },
    {
      id: 2,
      name: "Symptom 2",
      doctors: [
        {
          id: 103,
          name: "Dr.Aditya Singh",
          availableSlots: ["9:00 AM - 10:00 AM", "2:00 PM - 3:00 PM"]
        },
        {
          id: 104,
          name: "Dr. Prabhu",
          availableSlots: ["10:00 AM - 11:00 AM", "3:00 PM - 4:00 PM"]
        }
      ]
    }
  ]
};

const MyComponent = () => {
  const [selectedDepartment, setDepartment] = useState(null);
  const [selectedDoctor, setDoctor] = useState(null);

  // Find selected department and doctor
  const department = departmentsData.departments.find(
    (dept) => dept.id === Number(selectedDepartment)
  );
  const doctor = department?.doctors.find(
    (doc) => doc.id === Number(selectedDoctor)
  );

  return (
    <>
      {/* Select Department */}
      <Select onValueChange={(value) => setDepartment(value)}>
        <SelectTrigger className="bg-white rounded-sm h-14 text-lg text-slate-500 border-2">
          <SelectValue placeholder="Select Department" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Department</SelectLabel>
            {departmentsData.departments.map((item) => (
              <SelectItem key={item.id} value={String(item.id)}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* Select Doctor */}
      {department && (
        <Select onValueChange={(value) => setDoctor(value)}>
          <SelectTrigger className="bg-white rounded-sm h-14 text-lg text-slate-500 border-2">
            <SelectValue placeholder="Select Doctor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Doctor</SelectLabel>
              {department.doctors.map((doc) => (
                <SelectItem key={doc.id} value={String(doc.id)}>
                  {doc.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {/* Select Slot */}
      {doctor && (
        <Select onValueChange={(value) => console.log(`Selected slot: ${value}`)}>
          <SelectTrigger className="bg-white rounded-sm h-14 text-lg text-slate-500 border-2">
            <SelectValue placeholder="Book Slot" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Book Slot</SelectLabel>
              {doctor.availableSlots.map((slot, index) => (
                <SelectItem key={index} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    </>
  );
};

export default MyComponent;
