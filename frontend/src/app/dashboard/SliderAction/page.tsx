"use client"
import React, { useState } from "react";
import ManageSliderImages from "@/app/dashboard/SliderAction/ManageSliderImages/ManageSliderImages";
import { CarouselDemo } from "@/app/dashboard/SliderAction/CarouselDemo/CarouselDemo";
import { NoticeInputPage } from "@/components/NoticeInputPage";
import ManageEvents from "@/app/dashboard/ManageEvents/page";

const App = () => {
  const [sliderImages, setSliderImages] = useState([
    { url: "/sliderPic/Dialysis.png" },
    { url: "/sliderPic/eyeopd.png" },
    { url: "/sliderPic/frontpage4.png" },
    { url: "/sliderPic/frontpage7.png" },
    { url: "/sliderPic/newicu.png" },
    { url: "/sliderPic/newreception.png" },
    { url: "/sliderPic/sjhrchos1.png" },
  ]);

  const handleUpdateImages = (updatedImages) => {
    setSliderImages(updatedImages);
  };
  const [notices, setNotices] = useState([]);
  return (
    <div>
      <ManageSliderImages userImages={sliderImages} onUpdateImages={handleUpdateImages} />
      {/* <CarouselDemo userImages={sliderImages} onUpdateImages={setSliderImages} /> */}
       <NoticeInputPage setNotices={setNotices} />
       <ManageEvents/>
    </div>
  );
};

export default App;
