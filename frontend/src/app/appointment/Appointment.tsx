"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

// Department, Doctor, and Slot Data
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

// Function to generate a random booking ID
const generateBookingId = () => {
  return `BOOK-${Math.floor(100000 + Math.random() * 900000)}`;
};

// Parent Component to manage multi-screen state
const AppointmentForm = () => {
  const [currentStep, setCurrentStep] = useState(1); // Step control (1 or 2)
  const [selectedDepartment, setDepartment] = useState(null);
  const [selectedDoctor, setDoctor] = useState(null);
  const [selectedSlot, setSlot] = useState(null);
  const [bookingId, setBookingId] = useState(""); // State for booking ID

  const handleNext = () => {
    if (
      currentStep === 1 &&
      selectedDepartment &&
      selectedDoctor &&
      selectedSlot
    ) {
      const newBookingId = generateBookingId();
      setBookingId(newBookingId); // Generate and set booking ID
      setCurrentStep(2); // Move to patient details screen
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1); // Back to department, doctor, and slot selection
    }
  };

  return (
    <section className="py-10">
      {currentStep === 1 ? (
        <DepartmentDoctorSlotSelection
          selectedDepartment={selectedDepartment}
          setDepartment={setDepartment}
          selectedDoctor={selectedDoctor}
          setDoctor={setDoctor}
          selectedSlot={selectedSlot}
          setSlot={setSlot}
          handleNext={handleNext}
        />
      ) : (
        <PatientDetailsForm handleBack={handleBack} bookingId={bookingId} />
      )}
    </section>
  );
};

// Screen 1: Department, Doctor, and Slot Selection Component
const DepartmentDoctorSlotSelection = ({
  selectedDepartment,
  setDepartment,
  selectedDoctor,
  setDoctor,
  selectedSlot,
  setSlot,
  handleNext,
}) => {
  const department = departmentsData.departments.find(
    (dept) => dept.id === Number(selectedDepartment)
  );
  const doctor = department?.doctors.find(
    (doc) => doc.id === Number(selectedDoctor)
  );

  return (
    <section className="">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-2 p-6">
        <h1 className="text-2xl font-medium text-center mb-6">
          Select Department, Doctor, and Slot
        </h1>

        <div className="grid grid-cols-1 gap-6">
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
            <Select onValueChange={(value) => setSlot(value)}>
              <SelectTrigger className="bg-white rounded-sm h-14 text-lg text-slate-500 border-2">
                <SelectValue placeholder="Select Slot" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Slots</SelectLabel>
                  {doctor.availableSlots.map((slot, index) => (
                    <SelectItem key={index} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}

          <div className="text-center mt-8">
            <Button variant="hms" onClick={handleNext} disabled={!selectedSlot}>
              Next
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

// Screen 2: Patient Details Form Component
interface PatientDetailsFormProps {
  handleBack: () => void;
  bookingId: string | number;
}

const PatientDetailsForm: React.FC<PatientDetailsFormProps> = ({
  handleBack,
  bookingId,
}) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState<Date | undefined>(undefined);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPinCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit form logic
    const patientData = {
      bookingId, // Including booking ID in the data
      name,
      dob: dob ? dob.toISOString() : "", // Example format for the DOB
      phone,
      email,
      state,
      city,
      address,
      pincode,
    };
    console.log(patientData);
  };
  // const PatientDetailsForm = ({ handleBack, bookingId }) => {
  //   const [name, setName] = useState("");
  //   const [gender, setGender] = useState("");
  //   const [dob, setDob] = useState<Date | undefined>(undefined);
  //   const [phone, setPhone] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [state, setState] = useState("");
  //   const [city, setCity] = useState("");
  //   const [address, setAddress] = useState("");
  //   const [pincode, setPinCode] = useState("");

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Submit form logic
  //     const patientData = {
  //       bookingId,
  //       name,
  //       dob: dob ? format(dob, "yyyy-MM-dd") : "",
  //       phone,
  //       email,
  //       state,
  //       city,
  //       address,
  //       pincode,
  //     };
  //     console.log(patientData);
  //   };

  return (
    <section>
      {/* <div className="grid grid-flow-col md:grid-flow-col justify-center gap-x-10 items-center shadow-md shadow-slate-400 p-2 md:p-4">
        <img
          src="hospital/hospitallogo.png"
          alt="Hospital Logo"
          className="w-32 h-32 md:mb-0"
        />
        <div className="grid text-center sm:text-left md:text-left">
          <h1 className="font-bold text-xl md:text-2xl">
            Shree Jagannath Hospital & Research Center
          </h1>
          <p>sjhrc.ranchi@gmail.com</p>
          <a href="https://sjhrc.in">https://sjhrc.in</a>
          <p>+91 8987999200</p>
        </div>
      </div> */}

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-2 p-6 ">
        <ScrollArea>
          <form onSubmit={handleSubmit} className="h-[400px] p-4">
            <h1 className="text-2xl font-medium text-center mb-6">
              Patient Details (Booking ID: {bookingId})
            </h1>
            <div className="grid grid-cols-1 gap-6">
              <Input
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white rounded-sm h-14 text-lg px-3 border-2"
              />

              <Select onValueChange={(value) => setGender(value)}>
                <SelectTrigger className="h-14 text-lg">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Gender</SelectLabel>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal h-14",
                      !dob && "text-muted-foreground"
                    )}
                  >
                    {dob ? format(dob, "PPP") : "Pick a Date of Birth"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dob} onSelect={setDob} />
                </PopoverContent>
              </Popover>

              <Input
                type="tel"
                placeholder="Enter Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white rounded-sm h-14 text-lg px-3 border-2"
              />

              <Input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white rounded-sm h-14 text-lg px-3 border-2"
              />

              <Input
                placeholder="Enter Your State"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="bg-white rounded-sm h-14 text-lg px-3 border-2"
              />

              <Input
                placeholder="Enter Your City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="bg-white rounded-sm h-14 text-lg px-3 border-2"
              />

              <Textarea
                placeholder="Enter Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-white rounded-sm h-14 text-lg px-3 border-2"
              />

              <Input
                placeholder="Enter Your Pin Code"
                value={pincode}
                onChange={(e) => setPinCode(e.target.value)}
                className="bg-white rounded-sm h-14 text-lg px-3 border-2"
              />
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="ghost" onClick={handleBack}>
                Back
              </Button>
              <Button variant="hms" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </ScrollArea>
      </div>
    </section>
  );
};

export default AppointmentForm;
