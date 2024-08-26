"use client";

import React from "react";

import SimpleImageSlider from "react-simple-image-slider";
import Ourmedical from "@/components/Ourmedical";
import Ourservice from "@/components/Ourservice";

import Getappointment from "@/components/Getappointment";
import Priceboard from "@/components/Priceboard";
import { CarouselDemo } from "@/components/sliderImg";
import OurHeads from "@/components/OurHeads";
import { NoticeSlider } from "@/components/NoticeSlider";


const Dashboard = () => {
  return (
    <>
      <div className="sticky grid flex-1 items-start gap-2  mt-6 sm:px-6 sm:py-0 md:gap-8   w-full h-full">
        <div className="sticky   sm:px-6 sm:py-0     inset to-background h-[500px] w-full overflow-hidden  ">
          <CarouselDemo />
        </div>
      </div>
      {/* Medical Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <Ourmedical />
      </div>
      {/* Notice Slider */}
      <div>
        <NoticeSlider/>
      </div>

      {/* Services Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <Ourservice />
      </div>

      {/* Doctors Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <OurHeads />
      </div>

      {/* Appointment Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-white">
        <Getappointment />
      </div>

      {/* Price Board Section */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <Priceboard />
      </div>

      {/* <div>
        <Ourmedical />
      </div>
      <Ourservice />
      <Ourdoctor />
      <Getappointment />
      <Priceboard /> */}
    </>
  );
};

export default Dashboard;
