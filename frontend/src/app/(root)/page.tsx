"use client";

import React from "react";

import SimpleImageSlider from "react-simple-image-slider";
import Ourmedical from "@/components/Ourmedical";
import Ourservice from "@/components/Ourservice";

import PatientsReview from "@/components/PatientReview";

import { CarouselDemo } from "@/components/sliderImg";
import OurHeads from "@/components/OurHeads";
import { NoticeSlider } from "@/components/NoticeSlider";
import BlogCards from "@/components/BlogCards";

import { GraduationCap } from "lucide-react";
import {EventDisplay} from "@/app/(root)/EventSlider/EventDisplay/page";
import WhatsAppWidget from "@/components/widget/WhatsApp";
import FetchData from "@/components/FetchData";
import AppointForm from "@/components/AppointFrom";

const Dashboard = () => {
  return (
    <section className="section">
      <main>
        <div className="sticky grid flex-1 items-start   mt-2 rounded-md sm:px-6 sm:py-0 md:gap-8   w-full inset to-background  overflow-hidden ">
          <CarouselDemo />
        </div>

        {/* Medical Cards Section */}
        <div className="py-2  sm:px-4 lg:px-4 ">
          <Ourmedical />
        </div>
      
        {/* Notice Slider */}
        <NoticeSlider />
        {/* <EventDisplay/> */}
        {/* Services Section */}
        <Ourservice />

        {/* Doctors Section */}
        <OurHeads />

        {/*Patient's Review */}
        <PatientsReview />

        {/* Price Board Section */}
        <BlogCards />

       <AppointForm/>

        
     <WhatsAppWidget/>
      </main>
    </section>
  );
};

export default Dashboard;
