// import * as React from "react";
// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// export function CarouselDemo({ userImages = [] }) {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const autoPlayInterval = 3000; // Interval for autoplay in milliseconds
//   const [isHovered, setIsHovered] = useState(false);
//   const [images, setImages] = useState(userImages.length > 0 ? userImages : [
//     { url: "/sliderPic/Dialysis.png" },
//     // { url: "/sliderPic/eyeopd.png" },
//     { url: "/sliderPic/frontpage4.png" },
//     { url: "/sliderPic/frontpage7.png" },
//     { url: "/sliderPic/newicu.png" },
//     { url: "/sliderPic/newreception.png" },
//     { url: "/sliderPic/sjhrchos1.png" },
//   ]);
//   const [newImageUrl, setNewImageUrl] = useState("");

//   const itemLength = images.length;

//   useEffect(() => {
//     if (!isHovered) {
//       const interval = setInterval(() => {
//         setActiveIndex((prevIndex) =>
//           prevIndex === itemLength - 1 ? 0 : prevIndex + 1
//         );
//       }, autoPlayInterval);

//       return () => clearInterval(interval); // Cleanup the interval on unmount
//     }
//   }, [itemLength, isHovered]);

//   const handlePrevious = () => {
//     setActiveIndex(activeIndex === 0 ? itemLength - 1 : activeIndex - 1);
//   };

//   const handleNext = () => {
//     setActiveIndex(activeIndex === itemLength - 1 ? 0 : activeIndex + 1);
//   };

//   const handleMouseEnter = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   return (
//     <div className="section">
//     <div className="w-full max-w-full relative">

//       {/* Carousel Section */}
//       <Carousel
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         <CarouselContent
//           style={{
//             transform: `translateX(-${activeIndex * 100}%)`,
//             transition: "transform 0.8s ease-in-out", // Smoother transition
//           }}
//         >
//           {images.map((image, index) => (
//             <CarouselItem key={index} className="min-w-full">
//               <div className="p-1">
//                 <Card className="rounded-lg shadow-lg overflow-hidden">
//                   <CardContent className="flex items-center justify-center p-0 h-[450px]">
//                     <img
//                       src={image.url}
//                       alt={`Slide ${index + 1}`}
//                       className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
//                     />
//                   </CardContent>
//                 </Card>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//         <CarouselPrevious onClick={handlePrevious} />
//         <CarouselNext onClick={handleNext} />
//       </Carousel>
//     </div>
//     </div>
//   );
// }

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

export function CarouselDemo({ userImages = [], textInfo = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayInterval = 3000; // Interval for autoplay in milliseconds
  const [isHovered, setIsHovered] = useState(false);
  const [images, setImages] = useState(
    userImages.length > 0
      ? userImages
      : [
          { url: "/sliderPic/Dialysis.png" },
          { url: "/sliderPic/frontpage4.png" },
          { url: "/sliderPic/frontpage7.png" },
          { url: "/sliderPic/newicu.png" },
          { url: "/sliderPic/newreception.png" },
          { url: "/sliderPic/sjhrchos1.png" },
        ]
  );

  const itemLength = images.length;

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === itemLength - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);

      return () => clearInterval(interval); // Cleanup the interval on unmount
    }
  }, [itemLength, isHovered]);

  const handlePrevious = () => {
    setActiveIndex(activeIndex === 0 ? itemLength - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === itemLength - 1 ? 0 : activeIndex + 1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="flex justify-between items-center w-full max-w-5xl mx-auto gap-x-16">
      {/* Carousel Section */}
      <div className="w-2/3 relative">
        <Carousel
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselContent
            style={{
              transform: `translateX(-${activeIndex * 100}%)`,
              transition: "transform 0.8s ease-in-out", // Smoother transition
            }}
          >
            {images.map((image, index) => (
              <CarouselItem key={index} className="min-w-full">
                <div className="p-1">
                  <Card className="rounded-lg shadow-lg overflow-hidden">
                    <CardContent className="flex items-center justify-center p-0 h-[350px]">
                      <img
                        src={image.url}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 ease-in-out transform hover:scale-105"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious onClick={handlePrevious} />
          <CarouselNext onClick={handleNext} />
        </Carousel>
      </div>

      {/* Text Section */}
      <div className="w-1/3  flex-col justify-center p-4 bg-white shadow-lg rounded-lg h-[350px] hidden md:block">
        {/* <h3 className="text-xl font-semibold mb-4">Information</h3>
        <p className="text-md text-gray-600">
          {textInfo[activeIndex] || "No additional information available."}
        </p> */}
         <div className="bg-rose-300 grid grid-cols-1 md:grid-cols-2  w-full items-center">
        <div className="text-white grid grid-flow-row px-6  ">
          <h1 className="text-xl md:text-2xl">Need a Doctor for Check-up?</h1>
          <h2 className="text-2xl md:text-4xl font-semibold">
            Just Make an Appointment and You’re Done!
          </h2>
          <p className="text-lg md:text-xl">Get Your Quote or Call:</p>
          <p className="text-lg md:text-xl font-semibold">+91 8987999200</p>
        </div>
        {/* <div className="grid justify-center md:justify-end">
          <img
            src="/doctors/image-4.png"
            alt="img"
            className="h-[300px] md:h-[400px] md:mr-60 lg:-mt-40  md:-mt-20"
          />
        </div> */}
      </div> 
      </div>
    </div>
  );
}
