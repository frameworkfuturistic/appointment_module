"use client";
import React, { useState, useEffect } from "react";
import { CalendarDays, Hospital, Stethoscope, User } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Title from "./Title";
import Subtitle from "./Subtitle";

export function PatientReview() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayInterval = 3000;
  const patientReview = [
    {
      id: 1,
      review:
        "Medical Centre is a great place to get all of your medical needs. I came in for a check-up and did not wait more than 5 minutes before I was seen. I can only imagine the type of service you get for more serious issues. Thanks!",
      image: "/PROFPIC.png",
      name: "Bantu",
    },
    {
      id: 2,
      review:
        "Medical Centre is a great place to get all of your medical needs. I came in for a check-up and did not wait more than 5 minutes before I was seen. I can only imagine the type of service you get for more serious issues. Thanks!",
      image: "/PROFPIC.png",
      name: "Chantu",
    },
    {
      id: 3,
      review:
        "Medical Centre is a great place to get all of your medical needs. I came in for a check-up and did not wait more than 5 minutes before I was seen. I can only imagine the type of service you get for more serious issues. Thanks!",
      image: "/PROFPIC.png",
      name: "Ghantu",
    },
  ];

  const itemLength = patientReview.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === itemLength - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [itemLength]);

  const handlePrevious = () => {
    setActiveIndex(activeIndex === 0 ? itemLength - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === itemLength - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div className="section">
      <div className="sm:min-h-[500px] grid justify-center space-y-2">
        {/* <div className="bg-rose-300 grid grid-cols-1 md:grid-cols-2 pt-10 h-[450px] w-full items-center">
        <div className="text-white grid grid-flow-row pb-20 md:pl-56 px-6">
          <h1 className="text-xl md:text-2xl">Need a Doctor for Check-up?</h1>
          <h2 className="text-2xl md:text-4xl font-semibold">
            Just Make an Appointment and You’re Done!
          </h2>
          <p className="text-lg md:text-xl">Get Your Quote or Call:</p>
          <p className="text-lg md:text-xl font-semibold">+91 8987999200</p>
        </div>
        <div className="grid justify-center md:justify-end">
          <img
            src="/doctors/image-4.png"
            alt="img"
            className="h-[300px] md:h-[400px] md:mr-60 lg:-mt-40  md:-mt-20"
          />
        </div>
      </div> */}

        <div className="bg-slate-50 bg-pattern4-bg rounded-md   h-[160px] w-[80%] sm:w-[1000px] text-center  place-self-center grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center ">
          <div className="grid grid-flow-row place-items-center py-4 bottom-2">
            <CalendarDays
              color="#e22222"
              strokeWidth={1.25}
              className="bg-white shadow-lg rounded-full h-16 w-16 p-2"
            />
            <p className="text-slate-700 font-medium">Years of Experience</p>
            <p className="text-2xl md:text-3xl">25</p>
          </div>
          <div className="grid grid-flow-row place-items-center py-4">
            <Stethoscope
              color="#e22222"
              strokeWidth={1.25}
              className="bg-white shadow-lg rounded-full h-16 w-16 p-2"
            />
            <p className="text-slate-700 font-medium">Medical Specialist</p>
            <p className="text-2xl md:text-3xl">25</p>
          </div>
          <div className="grid grid-flow-row place-items-center py-4">
            <Hospital
              color="#e22222"
              strokeWidth={1.25}
              className="bg-white shadow-lg rounded-full h-16 w-16 p-2"
            />
            <p className="text-slate-700 font-medium">Advance Treatment</p>
            <p className="text-2xl md:text-3xl">25</p>
          </div>
          <div className="grid grid-flow-row place-items-center py-4">
            <User
              color="#e22222"
              strokeWidth={1.25}
              className="bg-white shadow-lg rounded-full h-16 w-16 p-2"
            />
            <p className="text-slate-700 font-medium">Happy Patients</p>
            <p className="text-2xl md:text-3xl">25</p>
          </div>
        </div>

        {/*  Patient's Review */}
        <div className="bg-dottedmap bg-cover bg-slate-200">
          <div className="flex flex-col items-center text-center gap-2">
            <Title title={"HAPPY PATIENTS"} />
            <Subtitle subtitle={" What says our Patients"} />
            <img
              src="/activity.png"
              alt="icon"
              className="h-6 w-8 md:h-6 md:w-10"
            />
            <Carousel className="sm:h-64 w-[90%] sm:w-[500px]">
              <CarouselContent
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                  transition: "transform 0.5s ease-in-out",
                }}
              >
                {patientReview.map((reviews, id) => (
                  <CarouselItem
                    key={id}
                    className="font-light grid grid-flow-row"
                  >
                    <p>{reviews.review}</p>
                    <img
                      src={reviews.image}
                      alt="img"
                      className="h-12 w-12 rounded-full place-self-center"
                    />
                    <h1 className="text-black font-medium">Patient</h1>
                    <p className="text-xs">{reviews.name}</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious onClick={handlePrevious} />
              <CarouselNext onClick={handleNext} />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientReview;
