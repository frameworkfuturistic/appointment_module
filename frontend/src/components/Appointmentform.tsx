// eslint-disable-next-line
// @ts-nocheck

"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select"; // Assuming this is your select component
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";

const departmentsData = {
  departments: [
    {
      id: 1,
      name: "Symptom 1",
      doctors: [
        {
          id: 101,
          name: "Dr.A",
          availableSlots: ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM"],
        },
        {
          id: 102,
          name: "Dr.B",
          availableSlots: ["11:00 AM - 12:00 PM", "1:00 PM - 2:00 PM"],
        },
      ],
    },
    {
      id: 2,
      name: "Symptom 2",
      doctors: [
        {
          id: 103,
          name: "Dr.Aditya Singh",
          availableSlots: ["9:00 AM - 10:00 AM", "2:00 PM - 3:00 PM"],
        },
        {
          id: 104,
          name: "Dr. Prabhu",
          availableSlots: ["10:00 AM - 11:00 AM", "3:00 PM - 4:00 PM"],
        },
      ],
    },
  ],
};

const AppointmentForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [selectedDepartment, setDepartment] = useState(null);
  const [selectedDoctor, setDoctor] = useState(null);

  // Find selected department and doctor
  const department = departmentsData.departments.find(
    (dept) => dept.id === Number(selectedDepartment)
  );
  const doctor = department?.doctors.find((doc) => doc.id === Number(selectedDoctor));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      name,
      phone,
      email,
      gender,
      dob: dob ? format(dob, "yyyy-MM-dd") : "",
      pinCode,
      address,
      state,
      city,
      department: department?.name,
      doctor: doctor?.name,
      slot: doctor?.availableSlots.find((slot) => slot === selectedDoctor),
    };

    // Submit logic here (with Axios or fetch)
    console.log(appointmentData);
  };

  return (
    <section className="py-10">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-flow-col md:grid-flow-col justify-center gap-x-10 items-center shadow-md shadow-slate-400 p-2 md:p-4">
        <Image
  src="/hospital/hospitallogo.png" // Corrected path to include leading slash
  alt="Hospital Logo"                // Alt text for accessibility
  width={128}                        // Set width (32px * 4 for 1 rem)
  height={128}                       // Set height (32px * 4 for 1 rem)
  className="w-32 h-32 md:mb-0"     // Use Tailwind CSS classes for styling
/>
          <div className="grid text-center sm:text-left md:text-left">
            <h1 className="font-bold text-xl md:text-2xl">
              Shree Jagannath Hospital & Research Center
            </h1>
            <p>sjhrc.ranchi@gmail.com</p>
            <a href="https://sjhrc.in">https://sjhrc.in</a>
            <p>+91 8987999200</p>
          </div>
        </div>

        <ScrollArea className="py-4">
          <section className="h-[500px]">
            <div className="max-w-5xl mx-auto bg-white shadow-lg border-b-4 border-slate-300 rounded-lg mt-2 p-6">
              <h1 className="text-2xl font-medium text-center mb-6">
                Make an Appointment
              </h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Form Fields */}
                <Input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white rounded-sm h-14 text-lg px-3 border-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Your Phone"
                  className="bg-white rounded-sm h-14 text-lg px-3 border-2"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="bg-white rounded-sm h-14 text-lg px-3 border-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Select onValueChange={(value) => setGender(value)}>
                  <SelectTrigger className="bg-white rounded-sm h-14 text-lg text-slate-500 border-2">
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Gender</SelectLabel>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "bg-white rounded-sm h-14 w-full text-lg text-left text-slate-500 px-3 border-2",
                        !dob && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dob ? format(dob, "PPP") : <span>DOB</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar mode="single" selected={dob} onSelect={setDob} />
                  </PopoverContent>
                </Popover>

                <Input
                  type="text"
                  placeholder="Pin Code"
                  className="bg-white rounded-sm h-14 text-lg px-3 border-2"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />

                <Textarea
                  placeholder="Your Address"
                  className="bg-white rounded-sm text-lg px-3 py-2 h-32 col-span-1 md:col-span-2 border-2"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />

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
              </div>

              {/* Submit Button */}
              <div className="text-center mt-8">
                <Button type="submit" variant="hms">
                  Submit Now
                </Button>
              </div>
            </div>
          </section>
        </ScrollArea>
      </form>
    </section>
  );
};

export default AppointmentForm;
