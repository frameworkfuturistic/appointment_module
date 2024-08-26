import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "./ui/button";
import { GraduationCap } from "lucide-react";
import Marquee from "react-fast-marquee";

export function NoticeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayInterval = 3000; // Interval for autoplay in milliseconds

  const images = [
    { url: "/noticeBoard/AdmissionNotice.png" },
    { url: "/noticeBoard/Ayushman.png" },
    { url: "/noticeBoard/CourseDetail.png" },
    { url: "/noticeBoard/notice.png" },
  ];

  const itemLength = images.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) =>
        prevIndex === itemLength - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, [itemLength]);

  const handlePrevious = () => {
    setActiveIndex(activeIndex === 0 ? itemLength - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === itemLength - 1 ? 0 : activeIndex + 1);
  };
  

  return (
    // <>
    // <h1 className="text-xl font-semibold text-gray-800 text-center p-8">NOTICE BOARD</h1>
    // <div className="bg-pattern5-bg  grid grid-cols-2 sm:w-full sm:h-full lg:w-full lg:h-full ">
        
    //   <Carousel className="grid w-[800px] max-w-full   relative p-8   ">
      
    
    //     <CarouselContent
    //       style={{
    //         transform: `translateX(-${activeIndex * 100}%)`,
    //         transition: "transform 0.5s ease-in-out",
    //       }}
    //     >
    //       {images.map((image, index) => (
    //         <CarouselItem key={index} className="min-w-full">
    //           <div className="p-1">
    //             <Card>
    //               <CardContent className="flex  items-center justify-center p-0">
    //                 <img
    //                   src={image.url}
    //                   alt={`Slide ${index + 1}`}
    //                   className="w-full h-[600px] object-fill"
    //                 />
    //               </CardContent>
    //             </Card>
    //           </div>
    //         </CarouselItem>
    //       ))}
    //     </CarouselContent>
    //     <CarouselPrevious onClick={handlePrevious} />
    //     <CarouselNext onClick={handleNext} />
    //   </Carousel>
   
    //      {/* About Area */}
    //      <div className="p-8">
    //      {/* <h1 className="text-2xl font-semibold text-sky-700 text-center">Our Medical</h1> */}
    //       <h3 className="text-slate-800 text-4xl font-medium m-8">
    //         We're setting Standards in Research what's more, Clinical Care.
    //       </h3>
    //       <img src="/activity.png" alt="icon" className="mx-8" />
    //       <p className="text-slate-600 m-8">
    //         We provide the most full medical services, so every person could
    //         have the opportunity o receive qualitative medical help.
    //       </p>
    //       <p className="text-slate-600 m-8 ">
    //         Our Clinic has grown to provide a world class facility for the
    //         treatment of tooth loss, dental cosmetics and bore advanced
    //         restorative dentistry. We are among the most qualified implant
    //         providers in the AUS with over 30 years of uality training and
    //         experience.
    //       </p>
    //       <div className="grid grid-flow-col m-8 ">
    //         {/* <img src="/signature.png" alt="sign" /> */}
    //         <Button className="bg-sky-700 rounded-md h-12 w-36  mt-6 ">
    //           <a href="/about/aboutUs">More About</a>
    //         </Button>
    //       </div>
        
    //   </div>
    // </div>
    // </>
    <>
    <Marquee className="bg-sky-700 text-white text-xl h-16 ">
     <GraduationCap />
     NEWS Ayushman Bharat is available in Ophthalmology Department (All types of Retinal surgeries done by Retina specialist- under ayushman bharat and insurance)/ROP Screening & Treatment, Orthopedics Department , General Surgeon , General Physician .DNB Orthopaedics Course is offered at Shree Jagannath Hospital & Research Center. Admission is going on for the session 2023-25(Diploma Course) & 2023-25(Certificate Course).
</Marquee>
  <h1 className="text-2xl font-semibold text-gray-800 text-center py-8">NOTICE BOARD</h1>
  <div className="bg-pattern5-bg grid sm:grid-cols-1 md:grid-cols-2 w-full h-full">
    <div className="relative p-8 flex justify-center items-center">
      <Carousel className="w-full max-w-full">
        <CarouselContent
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {images.map((image, index) => (
            <CarouselItem key={index} className="min-w-full">
              <Card className="shadow-lg">
                <CardContent className="flex items-center justify-center p-0">
                  <img
                    src={image.url}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-fill"
                  />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={handlePrevious} />
        <CarouselNext onClick={handleNext} />
      </Carousel>
    </div>

    {/* About Area */}
    <div className="p-8 flex flex-col justify-center">
      <h3 className="text-slate-800 text-3xl sm:text-4xl font-medium mb-8">
        We're Setting Standards in Research & Clinical Care.
      </h3>
      <img src="/activity.png" alt="icon" className="size-28" />
      <p className="text-slate-600 mb-4">
        We provide the most complete medical services, so every person has the
        opportunity to receive high-quality medical care.
      </p>
      <p className="text-slate-600 mb-8">
        Our clinic has grown to provide a world-class facility for the treatment
        of tooth loss, dental cosmetics, and advanced restorative dentistry.
        With over 30 years of experience, we are among the most qualified
        implant providers in Australia.
      </p>
      <div className="flex justify-center">
        <Button className="bg-sky-700 text-white rounded-md h-12 w-36">
          <a href="/about/aboutUs">More About</a>
        </Button>
      </div>
    </div>
  </div>
</>

  );
}
