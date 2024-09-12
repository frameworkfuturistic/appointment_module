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
import Title from "./Title";
import Link from "next/link";

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
    <section className="section">
      <Title title={"EVENTS"}/>
      <div className="grid justify-center ">
        <div className="  grid sm:grid-cols-1 md:grid-cols-2 space-x-6 space-y-4  max-w-7xl h-full">
          <div className="relative px-8 flex  items-center justify-center   max-w-full">
            <Carousel>
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
          <div className="px-8 py-4 shadow-md  flex flex-col justify-center">
            <h3 className="text-slate-800 text-2xl sm:text-3xl font-medium mb-4">
              We're Setting Standards in Research & Clinical Care.
            </h3>
            <img src="/activity.png" alt="icon" className="size-20" />
            <p className="text-slate-600 mb-4">
              We provide the most complete medical services, so every person has
              the opportunity to receive high-quality medical care.
            </p>
            <p className="text-slate-600 mb-4">
              Our clinic has grown to provide a world-class facility for the
              treatment of tooth loss, dental cosmetics, and advanced
              restorative dentistry. With over 30 years of experience, we are
              among the most qualified implant providers in Australia.
            </p>
            <div className="flex justify-center">
              <Button variant="hms" >
                <Link href="/about/aboutUs">More About</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
