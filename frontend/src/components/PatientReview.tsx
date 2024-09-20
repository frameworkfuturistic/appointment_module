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
        " Doctors took the time to thoroughly explain my treatment plan and answered all of my questions. I left the clinic feeling confident and well-cared for. I highly recommend this practice for anyone seeking top-notch medical care!",
      image: "/PROFPIC.png",
      name: "Asish Aggarwal",
    },
    {
      id: 2,
      review:
        "The staff was always punctual, and the facilities were clean and comfortable. Within a few weeks, I noticed significant improvements in my mobility. The entire process was seamless, and I’m so grateful for the care I received!",
      image: "/PROFPIC.png",
      name: "Raghu Singhania",
    },
    {
      id: 3,
      review:
        "My overall experience at the clinic was positive, though there were a few things that could be improved. While the staff was friendly and professional, I did experience a longer-than-expected wait time before my appointment. ",
      image: "/PROFPIC.png",
      name: "Ganga Mohini",
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
       

        <div className="bg-slate-50 bg-pattern4-bg rounded-md   h-[160px] w-[80%] sm:w-[1000px] text-center  place-self-center grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center ">
          <div className="grid grid-flow-row place-items-center py-4 bottom-2">
            <CalendarDays
              color="#e22222"
              strokeWidth={1.25}
              className="bg-white shadow-lg rounded-full h-16 w-16 p-2"
            />
            <p className="text-slate-700 font-medium">Years of Experience</p>
            <p className="text-2xl md:text-3xl">09</p>
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
            <p className="text-2xl md:text-3xl">30</p>
          </div>
          <div className="grid grid-flow-row place-items-center py-4">
            <User
              color="#e22222"
              strokeWidth={1.25}
              className="bg-white shadow-lg rounded-full h-16 w-16 p-2"
            />
            <p className="text-slate-700 font-medium">Happy Patients</p>
            <p className="text-2xl md:text-3xl">150+</p>
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
