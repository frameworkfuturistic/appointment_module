import React from "react";
import { Button } from "./ui/button";
import { CalendarDays, Hospital, Stethoscope, User, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const Getappointment = () => {
  return (
    <div className="sm:min-h-[700px] grid justify-center" >
      <div className="bg-sky-700 grid grid-flow-col pt-10 h-[450px] w-full">
        <div className=" text-white grid grid-flow-row pb-20 pl-56">
          <h1>Need a Doctor for Check-up?</h1>
          <h2 className="text-4xl font-semibold">
            Just Make an Appointment and You’re Done!
          </h2>
          <p>Get Your Quote or Call:</p>
          <p className="text-xl font-semibold">(0080) 123-453-789</p>
          <Button className="w-48 rounded-sm">Get an Appointment</Button>
        </div>
        <div className="grid">
          <img
            src="/doctors/image-4.png"
            alt="img"
            className="h-[400px] mr-96  -mt-20"
          />
        </div>
      </div>
      
      <div className=" bg-slate-50  bg-pattern4-bg  h-[200px] w-[1000px] -mt-[100px] place-self-center grid grid-cols-4 justify-items-center  ">
        <div className=" grid grid-flow-row place-items-center py-4 ">
          <CalendarDays
            color="#0284c7"
            strokeWidth={1.25}
            className="bg-white shadow-lg rounded-full size-20 p-2 "
          />
          <p className="text-slate-700 font-medium">Years of Experience</p>
          <p className="text-3xl">25</p>
        </div>
        <div className=" grid grid-flow-row place-items-center py-4">
          <Stethoscope
            color="#0284c7"
            strokeWidth={1.25}
            className="bg-white shadow-lg rounded-full h-20 w-20 p-2"
          />
          <p className="text-slate-700 font-medium">Medical Specialist</p>
          <p className="text-3xl">25</p>
        </div>
        <div className="grid grid-flow-row place-items-center py-4 ">
          <Hospital
            color="#0284c7"
            strokeWidth={1.25}
            className="bg-white shadow-lg rounded-full h-20 w-20 p-2"
          />
          <p className="text-slate-700 font-medium">Advance Treatment</p>
          <p className="text-3xl">25</p>
        </div>
        <div className="grid grid-flow-row place-items-center py-4">
          <User
            color="#0284c7"
            strokeWidth={1.25}
            className="bg-white shadow-lg rounded-full h-20 w-20 p-2 "
          />
          <p className="text-slate-700 font-medium">Happy Patients</p>
          <p className="text-3xl">25</p>
        </div>
      </div>

          {/* Happy Patient */}
      <div className="bg-dottedmap bg-cover bg-slate-200">
        <div className="  flex flex-col items-center text-center py-8 gap-2 ">
          <h1>Happy Patients</h1>
          <h2 className="text-2xl font-semibold">What Says Our Patients</h2>
          <img src="/activity.png" alt="icon" className="  h-10 w-10" />
          <Carousel className="h-52 w-[700px] ">
            <CarouselContent>
              <CarouselItem className="font-light grid grid-flow-row  ">
                "Medical Centre is a great place to get all of your medical
                needs. I came in for a check up and did not wait more than 5
                minutes before I was seen. I can only imagine the type of
                service you get for more serious issues. Thanks!"
                <img
                  src="/PROFPIC.jpg"
                  alt="img"
                  className=" size-24 rounded-full place-self-center  "
                />
                <h1 className="text-sky-700 font-medium">IRON MAN</h1>
                <p className="text-xs">Stark Owner</p>
              </CarouselItem>
              <CarouselItem className="font-light grid grid-flow-row  ">
                "Medical Centre is a great place to get all of your medical
                needs. I came in for a check up and did not wait more than 5
                minutes before I was seen. I can only imagine the type of
                service you get for more serious issues. Thanks!"
                <img
                  src="/PROFPIC.jpg"
                  alt="img"
                  className=" size-24 rounded-full place-self-center  "
                />
                <h1 className="text-sky-700 font-medium">IRON MAN</h1>
                <p className="text-xs">Stark Owner</p>
              </CarouselItem>
              <CarouselItem className="font-light grid grid-flow-row  ">
                "Medical Centre is a great place to get all of your medical
                needs. I came in for a check up and did not wait more than 5
                minutes before I was seen. I can only imagine the type of
                service you get for more serious issues. Thanks!"
                <img
                  src="/PROFPIC.jpg"
                  alt="img"
                  className=" size-24 rounded-full place-self-center  "
                />
                <h1 className="text-sky-700 font-medium">IRON MAN</h1>
                <p className="text-xs">Stark Owner</p>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Getappointment;
