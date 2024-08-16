"use client";

import React from "react";

import SimpleImageSlider from "react-simple-image-slider";
import Ourmedical from "@/components/Ourmedical";
import Ourservice from "@/components/Ourservice";
import Ourdoctor from "@/components/Ourdoctor";
import Getappointment from "@/components/Getappointment";
import Priceboard from "@/components/Priceboard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const images = [
  { url: "images/doctorimg1.png" },
  { url: "images/docotrimg2.png" },
];
const Dashboard = () => {
  return (
    <>

      <div className="sticky grid flex-1 items-start gap-2  mt-6 sm:px-6 sm:py-0 md:gap-8   w-full h-full"  >
        <div className="sticky hover:z-10  inset to-background h-screen w-full overflow-hidden ">
          <SimpleImageSlider
            width={1470}
            height={800}
            images={images}
            showBullets={true}
            showNavs={true}
          />
          
        </div>
        <div className="grid grid-flow-row place-items-center mr-96 -mt-[600px] z-30 gap-y-6 ">
          <h1 className="text-4xl ">
          SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE</h1>
          <h2 className="text-lg text-sky-700 ">MULTY SPECIALITY HOSPITAL AND TRAUMA CENTRE</h2>
          <p className="text-sm text-slate-600 ">ISO 9001 : 2015 Certified Hospital</p>
          <Link href="/aboutUs"><Button >About Us</Button></Link>
        </div>
        
      </div>
      <div>
        <Ourmedical />
      </div>
      <Ourservice />
      <Ourdoctor />
      <Getappointment />
      <Priceboard />
    </>
  );
};

export default Dashboard;
