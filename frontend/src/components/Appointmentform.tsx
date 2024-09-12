  // API FORM

  "use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScrollArea } from "@/components/ui/scroll-area";

import doctorData from "@/json/doctorData";
import Link from "next/link";
import Appointment from "@/app/(root)/Appointment/page";

const Appointmentform = () => {
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
  const [department, setDepartment] = useState("");
  const [shift, setShift] = useState("");
  const [doctor, setDoctor] = useState("");

  const selectedDoctor = doctorData.find((doctor) => doctor?.id === 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      name,
      phone,
      email,
      gender,
      dob: dob ? format(dob, "yyyy-mm-dd") : "",
      pinCode,
      address,
      state,
      city,
      department,
      shift,
      doctor,
    };

    try {
      const response = await fetch("hhttps://f82e-115-245-226-37.ngrok-free.app", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        // Handle success (e.g., display a success message)
        console.log("Appointment booked successfully");
      } else {
        // Handle error (e.g., display an error message)
        console.error("Failed to book appointment");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
   
    // <ScrollArea className=" bg-rose-50 bg-opacity-90 bg-cover ">
    //   <form onSubmit={handleSubmit}>
    //     <div className="grid grid-flow-col justify-between shadow-md shadow-rose-200 ">
    //       <img
    //         src="hospital/hospitallogo.png"
    //         alt="img"
    //         className="mx-8 size-44"
    //       />
    //       <div className="mx-8 py-8">
    //         <h1 className="font-bold text-lg">
    //           Shree Jagannath Hospital & Research Center
    //         </h1>
    //         <p>sjhrc.ranchi@gmail.com</p>
    //         <p>https://sjhrc.in</p>
    //         <p>+91 8987999200</p>
    //       </div>
    //     </div>
    //     <div className=" h-96 w-[1200px]   ">
    //       <div className="  px-8 py-2  ">
    //         <h1 className="text-2xl font-medium ">Make an Appointment</h1>
    //       </div>
    //       <div className="grid  justify-center m-4 ">
    //         <h1 className="text-lg ">
    //           Have you ever applied to our facility before?
    //         </h1>
    //         <RadioGroup defaultValue="option-one " className="grid grid-flow-col">
    //           <div className="flex items-center space-x-2">
    //             <RadioGroupItem value="option-one" id="option-one" />
    //             <Label htmlFor="option-one">Yes</Label>
    //           </div>
    //           <div className="flex items-center space-x-2">
    //             <RadioGroupItem value="option-two" id="option-two" />
    //             <Label htmlFor="option-two">No</Label>
    //           </div>
    //         </RadioGroup>
    //       </div>

    //       <div className=" grid grid-cols-2  mx-4  ">
    //         <Input
    //           type="name"
    //           placeholder="Your Name"
    //           className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg px-3 border-2"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //         />
    //         <Input
    //           type="phone"
    //           placeholder="Your Phone"
    //           className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg px-3 border-2"
    //           value={phone}
    //           onChange={(e) => setPhone(e.target.value)}
    //         />
    //         <Input
    //           type="mail"
    //           placeholder="Email Address"
    //           className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg px-3 border-2"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />

    //         <Select onValueChange={(value) => setGender(value)}>
    //           <SelectTrigger className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500 border-2  ">
    //             <SelectValue placeholder="Select Gender" />
    //           </SelectTrigger>
    //           <SelectContent className="text-slate-500 ">
    //             <SelectGroup>
    //               <SelectLabel>Gender</SelectLabel>
    //               <SelectItem value="male">Male</SelectItem>
    //               <SelectItem value="female">Female</SelectItem>
    //               <SelectItem value="other">Other</SelectItem>
    //             </SelectGroup>
    //           </SelectContent>
    //         </Select>

    //         <Popover>
    //           <PopoverTrigger asChild>
    //             <Button
    //               variant={"outline"}
    //               className={cn(
    //                 " justify-start text-left font-normal bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500 border-2",
    //                 !dob && "text-muted-foreground"
    //               )}
    //             >
    //               <CalendarIcon className="mr-2 h-4 w-4 " />
    //               {dob ? format(dob, "PPP") : <span>DOB</span>}
    //             </Button>
    //           </PopoverTrigger>
    //           <PopoverContent className="w-auto p-0 ">
    //             <Calendar
    //               mode="single"
    //               selected={dob}
    //               onSelect={setDob}
    //               initialFocus
    //             />
    //           </PopoverContent>
    //         </Popover>

    //         <Input
    //           type="postal zip code"
    //           placeholder=" pin code"
    //           className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg px-3 border-2"
    //           value={pinCode}
    //           onChange={(e) => setPinCode(e.target.value)}
    //         />

    //         <Textarea
    //           placeholder="Your Address"
    //           className="bg-white text-lg shadow-sm  rounded-sm m-4 max-w-[1130px] max-h-[14px] col-span-2 border-2"
    //           value={address}
    //           onChange={(e) => setAddress(e.target.value)}
    //         />

    //         <Select onValueChange={(value) => setState(value)}>
    //           <SelectTrigger className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500 border-2">
    //             <SelectValue placeholder="-select state-" />
    //           </SelectTrigger>
    //           <SelectContent className="text-slate-500 ">
    //             <SelectGroup>
    //               <SelectLabel>STATE</SelectLabel>
    //               <SelectItem value="Jharkhand">Jharkhand</SelectItem>
    //             </SelectGroup>
    //           </SelectContent>
    //         </Select>

    //         <Select onValueChange={(value) => setCity(value)}>
    //           <SelectTrigger className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500 border-2">
    //             <SelectValue placeholder="-select city-" />
    //           </SelectTrigger>
    //           <SelectContent className="text-slate-500 ">
    //             <SelectGroup>
    //               <SelectLabel>CITY</SelectLabel>
    //               <SelectItem value="ranchi">Ranchi</SelectItem>
    //             </SelectGroup>
    //           </SelectContent>
    //         </Select>

    //         <Select onValueChange={(value) => setDepartment(value)}>
    //           <SelectTrigger className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500 border-2">
    //             <SelectValue placeholder="Select Department" />
    //           </SelectTrigger>
    //           <SelectContent className="text-slate-500 ">
    //             <SelectGroup>
    //               <SelectLabel>Select Department</SelectLabel>
    //               {selectedDoctor?.speciality.map((item) => (
    //                 <SelectItem key={item?.id} value={String(item?.id)}>{item?.name}</SelectItem>
    //               ))}
    //             </SelectGroup>
    //           </SelectContent>
    //         </Select>

    //         <Select onValueChange={(value) => setShift(value)}>
    //           <SelectTrigger className=" bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500 border-2">
    //             <SelectValue placeholder="Choose Shift" />
    //           </SelectTrigger>
    //           <SelectContent className="text-slate-500 ">
    //             <SelectGroup>
    //               <SelectLabel>Select Time</SelectLabel>
    //               {selectedDoctor?.timing.map((item) => (
    //                 <SelectItem key={item?.id} value={String(item?.id)}>
    //                   {item?.shift}
    //                 </SelectItem>
    //               ))}
    //             </SelectGroup>
    //           </SelectContent>
    //         </Select>

    //         <div className=" bg-white rounded-sm m-4 border-2   ">
    //           <Popover>
    //             <PopoverTrigger asChild>
    //               <Button
    //                 variant={"outline"}
    //                 className={cn(
    //                   "w-full justify-start text-left font-normal",
    //                   !date && "text-muted-foreground min-h-full"
    //                 )}
    //               >
    //                 {date ? format(date, "PPP") : <span>dd-mm-yyyy</span>}
    //                 <CalendarIcon className="ml-96 " />
    //               </Button>
    //             </PopoverTrigger>
    //             <PopoverContent className="w-auto p-0 ">
    //               <Calendar
    //                 mode="single"
    //                 selected={date}
    //                 onSelect={setDate}
    //                 initialFocus
    //               />
    //             </PopoverContent>
    //           </Popover>
    //         </div>

    //         <Select onValueChange={(value) => setDoctor(value)}>
    //           <SelectTrigger className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500">
    //             <SelectValue placeholder="Select Doctor" />
    //           </SelectTrigger>
    //           <SelectContent className="text-slate-500 ">
    //             <SelectGroup>
    //               <SelectLabel>Select Doctor</SelectLabel>
    //               {selectedDoctor?.speciality.map((item) => (
    //                 <SelectItem key={item?.id} value={String(item?.id)}>{item?.name}</SelectItem>
    //               ))}
    //             </SelectGroup>
    //           </SelectContent>
    //         </Select>
    //       </div>
    //       <Button type="submit" className="m-8">
    //         Submit Now
    //       </Button>
    //     </div>
    //   </form>
    // </ScrollArea>
    // </section>
    // <section className="bg-rose-50 bg-opacity-90 bg-cover py-10">
  
    <form onSubmit={handleSubmit} >
      {/* Header Section */}
      <div className="grid grid-flow-col md:grid-flow-col  justify-center gap-x-10  items-center shadow-md shadow-slate-400 p-2 md:p-4">
        <img
          src="hospital/hospitallogo.png"
          alt="Hospital Logo"
          className="w-32 h-32 md:mb-0"
        />
        <div className=" grid text-center sm:text-left md:text-left">
          <h1 className="font-bold text-xl md:text-2xl">
            Shree Jagannath Hospital & Research Center
          </h1>
          <p>sjhrc.ranchi@gmail.com</p>
          <Link href="https://sjhrc.in">https://sjhrc.in</Link>
          <p>+91 8987999200</p>
        </div>
      </div>

      {/* Appointment Section */}
      <ScrollArea className="py-4" >
        <section className="h-[500px]   ">
      <div className="max-w-5xl mx-auto bg-white   shadow-lg border-b-4 border-slate-300 rounded-lg mt-2  p-6">
        <h1 className="text-2xl font-medium text-center mb-6">
          Make an Appointment
        </h1>

        {/* RadioGroup for Previous Application */}
        <div className="text-center mb-6">
          <h1 className="text-lg mb-4">
            Have you ever applied to our facility before?
          </h1>
          <RadioGroup defaultValue="option-one" className="flex justify-center space-x-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="option-one">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="option-two">No</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2   gap-6 ">
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

          {/* Date of Birth */}
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
              <Calendar
                mode="single"
                selected={dob}
                onSelect={setDob}
              />
            </PopoverContent>
          </Popover>

          <Input
            type="text"
            placeholder="Pin Code"
            className="bg-white rounded-sm h-14 text-lg px-3 border-2"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />

          {/* Address Field */}
          <Textarea
            placeholder="Your Address"
            className="bg-white rounded-sm text-lg px-3 py-2 h-32 col-span-1 md:col-span-2 border-2"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* State, City, Department Select Fields */}
          <Select onValueChange={(value) => setState(value)}>
            <SelectTrigger className="bg-white rounded-sm h-14 text-lg text-slate-500 border-2">
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>State</SelectLabel>
                <SelectItem value="Jharkhand">Jharkhand</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setCity(value)}>
            <SelectTrigger className="bg-white rounded-sm h-14 text-lg text-slate-500 border-2">
              <SelectValue placeholder="Select City" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>City</SelectLabel>
                <SelectItem value="Ranchi">Ranchi</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Date Selection */}
          <Popover >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "bg-white rounded-sm h-14 w-full text-lg text-left text-slate-500 border-2",
                  !date && "text-muted-foreground"
                )}
              >
                {date ? format(date, "PPP") : <span>dd-mm-yyyy</span>}
                <CalendarIcon className="ml-2" />
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
              />
            </PopoverContent>
          </Popover>

          {/* <Select onValueChange={(value) => setDepartment(value)}>
            <SelectTrigger className="bg-white rounded-sm h-14 text-lg text-slate-500 border-2">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Department</SelectLabel>
                {selectedDoctor?.departments.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          

          <Select onValueChange={(value) => setDoctor(value)}>
            <SelectTrigger className="bg-white rounded-sm h-14 text-lg text-slate-500 border-2">
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Doctor</SelectLabel>
                {selectedDoctor?.departments.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

         
          <Select onValueChange={(value) => setDoctor(value)}>
            <SelectTrigger className="bg-white rounded-sm h-14 text-lg text-slate-500 border-2">
              <SelectValue placeholder="Book Slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Book Slot</SelectLabel>
                {selectedDoctor?.speciality.map((item) => (
                  <SelectItem key={item.id} value={String(item.id)}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <Appointment/>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8 ">
          <Button type="submit" variant="hms">
            Submit Now
          </Button>
        </div>
      </div>
      </section>
      </ScrollArea>
    </form>
 


  );
};

export default Appointmentform;


