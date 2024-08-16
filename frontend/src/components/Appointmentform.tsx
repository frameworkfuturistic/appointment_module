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

const Appointmentform = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const selectedDoctor = doctorData.find((doctor) => doctor?.id === 1);

  return (
    // FORM AREA

    <ScrollArea className="">
      <div className="grid grid-flow-col justify-between shadow-md shadow-sky-700">
        <img
          src="hospital/hospitallogo.png"
          alt="img"
          className="mx-8 size-32"
        />
        <ul className="mx-8">
          <h1 className="font-semibold text-lg">
            Shree Jagannath Hospital & Research Center
          </h1>
          <p>sjhrc.ranchi@gmail.com</p>
          <p>https://sjhrc.in</p>
          <p>+91 8987999200</p>
        </ul>
      </div>
      <div className=" h-96 w-[1200px]">
        <div className="  px-8 py-2  ">
          <h1 className="text-2xl font-medium ">Make an Appointment</h1>
        </div>
        {/* OLD PATIENT OPTION */}
        <div className="grid  justify-center m-4">
          <h1 className="text-lg ">
            Have you ever applied to our facility before?
          </h1>
          <RadioGroup defaultValue="option-one " className="grid grid-flow-col">
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

        <div className=" grid grid-cols-2  mx-4 ">
          <Input
            type="name"
            placeholder="Your Name"
            className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg px-3"
          />
          <Input
            type="phone"
            placeholder="Your Phone"
            className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg px-3"
          />
          <Input
            type="mail"
            placeholder="Email Address"
            className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg px-3"
          />

          <Select>
            <SelectTrigger className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className="text-slate-500 ">
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
                variant={"outline"}
                className={cn(
                  " justify-start text-left font-normal bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 " />
                {date ? format(date, "PPP") : <span>DOB</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 ">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Input
            type="postal zip code"
            placeholder=" pin code"
            className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg px-3"
          />

          <Textarea
            placeholder="Your Address"
            className="bg-white text-lg shadow-sm  rounded-sm m-4 max-w-[1130px] max-h-[14px] col-span-2 "
          />

          <Select>
            <SelectTrigger className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500">
              <SelectValue placeholder="-select state-" />
            </SelectTrigger>
            <SelectContent className="text-slate-500 ">
              <SelectGroup>
                <SelectLabel>STATE</SelectLabel>
                <SelectItem value="Jharkhand">Jharkhand</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500">
              <SelectValue placeholder="-select city-" />
            </SelectTrigger>
            <SelectContent className="text-slate-500 ">
              <SelectGroup>
                <SelectLabel>CITY</SelectLabel>
                <SelectItem value="ranchi">Ranchi</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent className="text-slate-500 ">
              <SelectGroup>
                <SelectLabel>Select Department</SelectLabel>
                {selectedDoctor?.speciality.map((item) => (
                  <SelectItem value={String(item?.id)}>{item?.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className=" bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500">
              <SelectValue placeholder="Choose Shift" />
            </SelectTrigger>
            <SelectContent className="text-slate-500 ">
              <SelectGroup>
                <SelectLabel>Select Time</SelectLabel>
                {selectedDoctor?.timing.map((item) => (
                  <SelectItem value={String(item?.id)}>
                    {item?.shift}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className=" bg-white rounded-sm m-4   ">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground min-h-full"
                  )}
                >
                  {date ? format(date, "PPP") : <span>dd-mm-yyyy</span>}
                  <CalendarIcon className="ml-96" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 ">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Select>
            <SelectTrigger className="bg-white rounded-sm m-4 h-14 w-[550px] text-lg text-slate-500">
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>
            <SelectContent className="text-slate-500 ">
              <SelectGroup>
                <SelectLabel>Select Doctor</SelectLabel>
                {selectedDoctor?.speciality.map((item) => (
                  <SelectItem value={String(item?.id)}>{item?.name}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="m-8">
          Submit Now
        </Button>
      </div>
    </ScrollArea>
  );
};

export default Appointmentform;
