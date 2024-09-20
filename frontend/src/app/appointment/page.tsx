"use client";
import { useState , useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader,  } from "@/components/ui/card";

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
import React from "react";
import ExistAppointment from "./ExistAppointment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import axios from "axios";

const page = () => {
  const [formData, setFormData] = useState({
    department: "",
    doctor: "",
    preferredDate: "",
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

  
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [slots, setSlots] = useState([]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

   // Fetch department, doctor, and slot data from the API
  //  useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://a00e-115-245-226-37.ngrok-free.app/api/v1/book/prefill"
  //       );
  //       const { doctors, departments, slots } = response.data;
  //       setDoctors(doctors || []);
  //       setDepartments(departments || []);
  //       setSlots(slots || []);
  //     } catch (error) {
  //       console.error("Failed to fetch data", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const getappointmentList = () => {
    axios.get(" https://a00e-115-245-226-37.ngrok-free.app/api/v1/book/prefill")
      .then((res) => {
        if (res?.data) {
          console.log("Data:", res.data); // Handle the successful response
        } else {
          console.log("No data returned.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Handle error
      });
  };

  // Use useEffect to call the function
  useEffect(() => {
    getappointmentList();
  }, []); // The empty dependency array ensures it runs once after the component mounts


  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Select changes
  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Here you would handle submitting the form data to another endpoint
      console.log(formData); // You can send this data to your booking endpoint
      setSuccessMessage("Appointment booked successfully!");
    } catch (error) {
      setErrorMessage("Failed to book appointment. Please try again.");
      console.error(error); // Handle error
    } finally {
      setLoading(false);
    }
  };

  //   try {
  //     const response = await axios.post(
  //       "https://abbf-47-247-129-42.ngrok-free.app/api/v1/appointments",
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setSuccessMessage("Appointment booked successfully!");
  //     console.log(response.data); // Handle success response as needed
  //   } catch (error) {
  //     setErrorMessage("Failed to book appointment. Please try again.");
  //     console.error(error); // Handle error
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="grid grid-flow-col md:grid-flow-col justify-center gap-x-8 border  items-center  p-2 md:p-4">
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
        <div className="flex mx-auto justify-center items-center content-center ">
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <Tabs defaultValue="newAppointment" className="w-full">
                <div className=" flex justify-between mr-4">
                  <TabsList>
                    <TabsTrigger value="newAppointment">
                      New Appointment
                    </TabsTrigger>
                    <TabsTrigger value="oldAppointment">
                      Existing Appointment
                    </TabsTrigger>
                  </TabsList>
                  <Link href="/">
                    <Button variant="outline">
                      <ArrowLeft /> Back
                    </Button>
                  </Link>
                </div>
                <div className="  mt-4">
                  <TabsContent value="newAppointment">
                    <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                        New Appointment
                        </legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* Department */}
                          <div className="flex flex-col">
                            <Label htmlFor="department">Department</Label>
                            <Select onValueChange={(value) => handleSelectChange("department", value)}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select Department" />
                              </SelectTrigger>
                              <SelectContent>
                                {departments.map((department, index) => (
                                  <SelectItem key={index} value={department}>
                                    {department}
                                  </SelectItem>
                                ))}
                                {/* <option value="">gfbbsn</option> */}
                              </SelectContent>
                            </Select>
                          </div>
                           {/* Doctor */}
                           <div className="flex flex-col">
                            <Label htmlFor="doctor">Doctor</Label>
                            <Select onValueChange={(value) => handleSelectChange("doctor", value)}>
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select Doctor" />
                              </SelectTrigger>
                              <SelectContent>
                                {doctors.map((doctor, index) => (
                                  <SelectItem key={index} value={doctor}>
                                    {doctor}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Preferred Date */}
                          <div className="flex flex-col">
                            <Label htmlFor="preferredDate">
                              Preferred Date
                            </Label>
                            <Input
                              type="date"
                              name="preferredDate"
                              value={formData.preferredDate}
                              onChange={handleChange}
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              id="content"
                              placeholder=""
                            />
                          </div>

                          {/* Slot */}
                          <div className="flex flex-col">
                            <Label htmlFor="slot">Available Slot</Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("slot", value)
                              }
                            >
                              <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select Slot" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Morning">Morning</SelectItem>
                                <SelectItem value="Afternoon">
                                  Afternoon
                                </SelectItem>
                                <SelectItem value="Evening">Evening</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid gap-3"></div>
                      {/* </fieldset> */}

                      {/* Patient Details */}
                      <fieldset className="grid gap-6 rounded-lg border p-4">
                        <legend className="-ml-1 px-1 text-sm font-medium">
                          Patient Details
                        </legend>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex flex-col">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              placeholder="Enter Full Name"
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="flex flex-col">
                            <Label htmlFor="guardianName">Gaurdian Name</Label>
                            <Input
                              name="guardianName"
                              value={formData.guardianName}
                              onChange={handleChange}
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter Gaurdian Name"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex flex-col">
                            <Label htmlFor="gender">Gender</Label>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange("gender", value)
                              }
                            >
                              <SelectTrigger
                                id="gender"
                                className="items-start [&_[data-description]]:hidden mt-1"
                              >
                                <SelectValue placeholder="Select Gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Male">Male</SelectItem>
                                <SelectItem value="Female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex flex-col">
                            <Label htmlFor="dob">DOB</Label>
                            <Input
                              type="date"
                              name="dob"
                              value={formData.dob}
                              onChange={handleChange}
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter Phone Number"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter Email"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter Address"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="city">City</Label>
                            <Input
                              name="city"
                              value={formData.city}
                              onChange={handleChange}
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter City"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="district">District</Label>
                            <Input
                              name="district"
                              value={formData.district}
                              onChange={handleChange}
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter District"
                            />
                          </div>
                          <div className="flex flex-col">
                            <Label htmlFor="state">State</Label>
                            <Input
                             name="state"
                             value={formData.state}
                             onChange={handleChange}
                              className=" h-9 border rounded-lg p-2 text-sm font-medium mt-1"
                              placeholder="Enter State"
                            />
                          </div>
                        </div>

                        <div className="grid gap-3"></div>
                      </fieldset>
                      {/* Action Buttons */}
                      <div className=" bottom-0  py-4 mt-2 flex justify-end space-x-4">
                        <Button  type="submit" disabled={loading} className="w-24"> {loading ? "Saving..." : "Save"}</Button>
                        <Button variant="outline" className="w-24">
                          Cancel
                        </Button>
                      </div>
                        {/* Success and Error Messages */}
                        {successMessage && (
                          <p className="text-green-600 mt-2">{successMessage}</p>
                        )}
                        {errorMessage && (
                          <p className="text-red-600 mt-2">{errorMessage}</p>
                        )}
                        </fieldset>
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
    </>
  );
};

export default page;
