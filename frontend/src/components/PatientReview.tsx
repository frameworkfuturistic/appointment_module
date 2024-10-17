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
        "Doctors took the time to thoroughly explain my treatment plan and answered all of my questions. I left the clinic feeling confident and well-cared for. I highly recommend this practice for anyone seeking top-notch medical care!",
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
        "My overall experience at the clinic was positive, though there were a few things that could be improved. While the staff was friendly and professional, I did experience a longer-than-expected wait time before my appointment.",
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
    <div className="min-h-fit bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="bg-slate-50 rounded-md shadow-md p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <CalendarDays className="bg-white shadow-lg rounded-full h-16 w-16 p-2 text-red-500" />
            <p className="text-slate-700 font-medium">Years of Experience</p>
            <p className="text-2xl md:text-3xl">09</p>
          </div>
          <div className="flex flex-col items-center">
            <Stethoscope className="bg-white shadow-lg rounded-full h-16 w-16 p-2 text-red-500" />
            <p className="text-slate-700 font-medium">Medical Specialists</p>
            <p className="text-2xl md:text-3xl">25</p>
          </div>
          <div className="flex flex-col items-center">
            <Hospital className="bg-white shadow-lg rounded-full h-16 w-16 p-2 text-red-500" />
            <p className="text-slate-700 font-medium">Advanced Treatments</p>
            <p className="text-2xl md:text-3xl">30</p>
          </div>
          <div className="flex flex-col items-center">
            <User className="bg-white shadow-lg rounded-full h-16 w-16 p-2 text-red-500" />
            <p className="text-slate-700 font-medium">Happy Patients</p>
            <p className="text-2xl md:text-3xl">150+</p>
          </div>
        </div>

        {/* Patient's Review Section */}
        <div className="bg-dottedmap bg-cover bg-slate-200 my-10 p-6 rounded-md">
          <div className="flex flex-col items-center text-center gap-2">
            <Title title={"HAPPY PATIENTS"} />
            <Subtitle subtitle={"What our Patients say"} />
            <img
              src="/activity.png"
              alt="icon"
              className="h-6 w-8 md:h-6 md:w-10"
            />
            <Carousel className="sm:h-64 w-full md:w-[600px]">
              <CarouselContent
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                  transition: "transform 0.5s ease-in-out",
                }}
              >
                {patientReview.map((review) => (
                  <CarouselItem key={review.id} className="flex flex-col items-center p-4">
                    <p className="text-center text-lg font-light mb-4">{review.review}</p>
                    <img
                      src={review.image}
                      alt="Patient"
                      className="h-20 w-20 rounded-full border-4 border-white shadow-md"
                    />
                    <h1 className="text-black font-medium mt-2">{review.name}</h1>
                    <p className="text-xs text-gray-500">Patient</p>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-between mt-4">
                <CarouselPrevious onClick={handlePrevious} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition" />
                <CarouselNext onClick={handleNext} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition" />
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientReview;
