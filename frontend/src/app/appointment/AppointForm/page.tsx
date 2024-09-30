"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import axios from "axios";
import ExistAppointment from "./ExistAppointment";
import { useAppointment } from "@/app/(root)/context/AppointmentContext";

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    department: "",
    doctor: "",
    shift: "",
    slot: "",
    fullName: "",
    guardianName: "",
    gender: "",
    dob: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    state: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch data and state from the useAppointment hook
  const { departments, doctors, shifts, slots, loading, error } = useAppointment();

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle select change for dropdowns
  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    console.log("POST DATA" ,formData);
    // Perform form submission logic here, e.g., API call to save the appointment
    try {
      // Replace with the actual API endpoint
      await axios.post("/api/appointments", formData);
      console.log("POST DATA" ,formData);
      
      setSuccessMessage("Appointment booked successfully!");
      setFormData({
        department: "",
        doctor: "",
        shift: "",
        slot: "",
        fullName: "",
        guardianName: "",
        gender: "",
        dob: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        district: "",
        state: "",
      });
    } catch (error) {
      setErrorMessage("Failed to book appointment. Please try again.");
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="grid grid-flow-col md:grid-flow-col justify-center gap-x-8 border items-center p-2 md:p-4">
        <img
          src="hospital/hospitallogo.png"
          alt="Hospital Logo"
          className="w-32 h-32 md:mb-0"
        />
        <div className="grid text-center space-y-2 sm:text-left md:text-left">
          <h1 className="font-bold text-xl md:text-2xl">
            Shree Jagannath Hospital & Research Center
          </h1>
          <p>sjhrc.ranchi@gmail.com</p>
          <a href="https://sjhrc.in">https://sjhrc.in</a>
          <p>+91 8987999200</p>
        </div>
      </div>
      <div className="flex mx-auto justify-center items-center content-center">
        <Card>
          <CardHeader></CardHeader>
          <CardContent>
            <Tabs defaultValue="newAppointment" className="w-full">
              <div className="flex justify-between mr-4">
                <TabsList>
                  <TabsTrigger value="newAppointment">New Appointment</TabsTrigger>
                  <TabsTrigger value="oldAppointment">Existing Appointment</TabsTrigger>
                </TabsList>
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft /> Back
                  </Button>
                </Link>
              </div>
              <div className="mt-4">
                <TabsContent value="newAppointment">
                  <form
                    className="grid w-full items-start gap-6 overflow-auto p-4 pt-0"
                    onSubmit={handleSubmit}
                  >
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">New Appointment</legend>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Department */}
                        <div className="flex flex-col">
                          <Label htmlFor="department">Department</Label>
                          <Select
                      onValueChange={(value) => handleSelectChange("department", value)}
                      disabled={loading || !departments.length}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((department) => (
                          <SelectItem
                            key={department.id}
                            value={department.id.toString()}
                          >
                            {department.department_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                        </div>
                        {/* Doctor */}
                        <div className="flex flex-col">
                          <Label htmlFor="doctor">Doctor</Label>
                          <Select
                      onValueChange={(value) => handleSelectChange("doctor", value)}
                      disabled={loading || !doctors.length}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Doctor" />
                      </SelectTrigger>
                      <SelectContent>
                        {doctors
                          .filter(
                            (doctor) =>
                              doctor.department_id ===
                              parseInt(formData.department)
                          )
                          .map((doctor) => (
                            <SelectItem
                              key={doctor.id}
                              value={doctor.id.toString()}
                            >
                              {doctor.doctor_name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                        </div>
                        {/* Shift */}
                        <div className="flex flex-col">
                          <Label htmlFor="shift">Shift</Label>
                          <Select
                      onValueChange={(value) => handleSelectChange("shift", value)}
                      disabled={loading || !shifts.length}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Shift" />
                      </SelectTrigger>
                      <SelectContent>
                        {shifts.map((shift) => (
                          <SelectItem key={shift.id} value={shift.id.toString()}>
                            {shift.shift_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                        </div>
                        {/* Slot */}
                        <div className="flex flex-col">
                          <Label htmlFor="slot">Available Slot</Label>
                          <Select
                      onValueChange={(value) => handleSelectChange("slot", value)}
                      disabled={loading || !slots.length}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select Slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {slots.map((slot) => (
                          <SelectItem key={slot.slot_id} value={slot.slot_id.toString()}>
                            {slot.slot_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                        </div>
                      </div>
                    </fieldset>

                    {/* Patient Details */}
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">Patient Details</legend>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter Full Name"
                            className="h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col">
                          <Label htmlFor="guardianName">Guardian Name</Label>
                          <Input
                            name="guardianName"
                            value={formData.guardianName}
                            onChange={handleChange}
                            className="h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                            placeholder="Enter Guardian Name"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <Label htmlFor="gender">Gender</Label>
                          <Select
                            onValueChange={(value) => handleSelectChange("gender", value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Select Gender" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="dob">Date of Birth</Label>
                          <Input
                            type="date"
                            name="dob"
                            value={formData.dob}
                            onChange={handleChange}
                            className="h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                            placeholder="Enter Email"
                          />
                        </div>
                      </div>
                    </fieldset>

                    {/* Address Details */}
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">Address</legend>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="flex flex-col">
                          <Label htmlFor="address">Address</Label>
                          <Input
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                            placeholder="Enter Address"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="city">City</Label>
                          <Input
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className="h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                            placeholder="Enter City"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="district">District</Label>
                          <Input
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            className="h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                            placeholder="Enter District"
                          />
                        </div>
                        <div className="flex flex-col">
                          <Label htmlFor="state">State</Label>
                          <Input
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                            placeholder="Enter State"
                          />
                        </div>
                      </div>
                    </fieldset>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        type="submit"
                        disabled={loading}
                      >
                        Book Appointment
                      </Button>
                    </div>

                    {successMessage && (
                      <p className="text-green-500 mt-4">{successMessage}</p>
                    )}
                    {errorMessage && (
                      <p className="text-red-500 mt-4">{errorMessage}</p>
                    )}
                  </form>
                </TabsContent>

                <TabsContent value="oldAppointment">
                  <ExistAppointment />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default AppointmentForm;
