import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarDays, Hospital, Stethoscope, User } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <>
      <div className="relative ">
        <img src="/contact-img/cover.png" alt="img" className="" />
        <div className="absolute inset-0 flex items-center justify-end mr-80">
          <h1 className="text-2xl font-semibold text-sky-700   ">About Us</h1>
        </div>
      </div>
      <div className=" grid grid-flow-row justify-items-center   bg-pattern4-bg   my-8  shadow-lg ">
        <div className="h-[400px] w-[1000px] py-8 px-20 space-y-6" >
          <h1 className="text-3xl text-sky-700 font-semibold">
            About Jagannath Hospital & Research Centre
          </h1>
          <p className="">
            Shree Jagannath Hospital & Research Centre is known for state of the
            art medical specialities.Using latest technologies both in IT and
            Healthcare, we have developed an advance system of treatment in
            diagnostic and therapeutic services. Shree Jagannath Hospital &
            Research Centre is a 100 bedded multispecialty hospital offering
            advanced healthcare services with special emphasis on, orthopedic
            surgery, Traumatology, ophthalmology and advanced clinical research.
            We offer comprehensive inpatient and outpatient services to
            patients. 34 physicians in all medical specialties cover all areas
            of care including orthopedics, physiotherapy, ophthalmology,
            noninvasive cardiology, general medicine, general surgery,
            nephrology, day care, dietetics, general and laparoscopic surgery,
            geriatric medicine, operation theatre, ICU etc. We have 12-hour OPD
            facilities of all major disciplines and also round-the-clock
            facilities for emergency & investigation, which includes Pathology
            and Imaging. The hospital has an excellent infrastructure, which
            includes five OTs with 100% fresh laminar air flow facilities,
            well-equipped intensive care units.
          </p>
        </div>
      </div>
      <div className="grid justify-center gap-y-14">
        <div className=" bg-slate-50 grid grid-flow-col  bg-pattern4-bg h-[200px] w-[1000px] shadow-lg  ">
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
        {/* Contact Form */}
        <div className="grid grid-flow-col justify-center bg-pattern5-bg shadow-lg my-4 ">
          <div className=" grid grid-rows-3  mx-4 ">
            <Input
              type="name"
              placeholder="Your Name"
              className="bg-white rounded-sm m-4 max-h-12 max-w-32 text-lg px-3 border-2"
            />
            <Input
              type="phone"
              placeholder="Your Phone"
              className="bg-white rounded-sm m-4 max-h-12 max-w-32 text-lg px-3 border-2"
            />
            <Input
              type="mail"
              placeholder="Email Address"
              className="bg-white rounded-sm m-4 max-h-12 max-w-32 text-lg px-3 border-2"
            />
            <Textarea
              placeholder="Type your message here."
              className="bg-white text-lg shadow-sm  rounded-sm m-4 min-w-72 max-h-32 "
            />
            <Button type="submit" className="place-self-center  ">
              Submit Query
            </Button>
          </div>
          <div className=" grid grid-flow-row text-wrap p-4  ">
            <ul className="space-y-2 ">
              <h1 className="text-sm text-sky-700">
                Need a Doctor for Check-up?{" "}
              </h1>
              <h1 className="text-2xl font-medium  ">
                Just Make an Appointment !
              </h1>
              <p className="font-medium">Call:</p>
              <p className="text-xl font-light">+91 8987999200</p>
            </ul>
            <ul className="space-y-2">
              <h2 className="text-3xl font-medium text-sky-700">
                Opening Hours
              </h2>
              <p className=" font-light">Monday - Saturday 08:00 - 20:00</p>
              <p className=" font-light"> Sunday 12:00 - 16:00</p>
            </ul>
          </div>
        </div>
      </div>
      {/* Happy Patient */}
      <div className="bg-dottedmap bg-cover bg-slate-200 my-6 shadow-md">
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
    </>
  );
};

export default page;
