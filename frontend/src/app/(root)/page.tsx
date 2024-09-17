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
import Marquee from "react-fast-marquee";
import { GraduationCap } from "lucide-react";

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
        {/* Notice Line  */}
        <Marquee className="bg-rose-300  text-slate-800 font-mono font-semibold text-xl w-56 h-10 ">
          <GraduationCap />
          NEWS Ayushman Bharat is available in Ophthalmology Department (All
          types of Retinal surgeries done by Retina specialist- under ayushman
          bharat and insurance)/ROP Screening & Treatment, Orthopedics
          Department , General Surgeon , General Physician .DNB Orthopaedics
          Course is offered at Shree Jagannath Hospital & Research Center.
          Admission is going on for the session 2023-25(Diploma Course) &
          2023-25(Certificate Course).
        </Marquee>
        {/* Notice Slider */}
        <NoticeSlider />
        {/* Services Section */}
        <Ourservice />

        {/* Doctors Section */}
        <OurHeads />

        {/*Patient's Review */}
        <PatientsReview />

        {/* Price Board Section */}
        <BlogCards />

        
     
      </main>
    </section>
  );
};

export default Dashboard;
