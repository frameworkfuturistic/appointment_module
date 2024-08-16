"use client";

import React from "react";

import SimpleImageSlider from "react-simple-image-slider";
import Ourmedical from "@/components/Ourmedical";
import Ourservice from "@/components/Ourservice";
import Ourdoctor from "@/components/Ourdoctor";
import Getappointment from "@/components/Getappointment";
import Priceboard from "@/components/Priceboard";

const images = [
  { url: "/sliderPic/Dialysis.png" },
  { url: "/sliderPic/eyeopd.png." },
  { url: "/sliderPic/frontpage4.png" },
  { url: "/sliderPic/frontpage7.png" },
  { url: "/sliderPic/newicu.png" },
  { url: "/sliderPic/newreception.png" },
  { url: "/sliderPic/sjhrchos1.png" },
];
const Dashboard = () => {
  return (
    <>
      {/* <div className="sticky grid flex-1 items-start gap-2  mt-6 sm:px-6 sm:py-0 md:gap-8   w-full h-full"> */}
        <div className="sticky  mt-6 sm:px-6 sm:py-0     inset to-background h-full w-full overflow-hidden  ">
          <SimpleImageSlider
            width={1470}
            height={800}
            images={images}
            showBullets={true}
            showNavs={true}
          />
        </div>
      {/* </div> */}
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
