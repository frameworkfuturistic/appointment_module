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
import { GraduationCap } from "lucide-react";
import Marquee from "react-fast-marquee";
import Title from "./Title";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

export function NoticeSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayInterval = 3000; 
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [events, setEvents] = useState([]);

  const images = [
    { url: "/noticeBoard/AdmissionNotice.png" },
    { url: "/noticeBoard/Ayushman.png" },
    { url: "/noticeBoard/CourseDetail.png" },
    { url: "/noticeBoard/notice.png" },
  ];

  const itemLength = images.length;

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === itemLength - 1 ? 0 : prevIndex + 1
        );
      }, autoPlayInterval);

      return () => clearInterval(interval); 
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

  useEffect(() => {
    const fetchEvents = async () => {
      const fetchedEvents = [
        {
          date: "20 May",
          title: "Annual Health Checkup Camp",
          description: "Join us for our annual health checkup camp offering free health assessments.",
          author: "Admin",
          link: "/events/annual-health-checkup",
        },
        {
          date: "15 June",
          title: "Webinar on Nutrition",
          description: "Learn about healthy eating habits in our upcoming nutrition webinar.",
          author: "Dr. Smith",
          link: "/events/nutrition-webinar",
        },
        {
          date: "10 July",
          title: "Community Fitness Day",
          description: "Participate in fun fitness activities and learn about staying active.",
          author: "Fitness Team",
          link: "/events/community-fitness",
        },
      ];
      setEvents(fetchedEvents);
      setLoading(false); 
    };

    fetchEvents();
  }, []);

  return (
    <section className="section">
      <Marquee className="bg-rose-300 text-slate-800 font-mono font-semibold text-xl w-56 h-10">
        <GraduationCap />
        NEWS: Ayushman Bharat is available in Ophthalmology Department...
      </Marquee>

      <Title title={"EVENTS"} />

      <div className="grid justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl h-full">
          {/* Carousel Section */}
          <div className="relative px-4 flex items-center justify-center max-w-full">
            <Carousel
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <CarouselContent
                style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
                  transition: "transform 0.8s ease-in-out",
                }}
              >
                {images.map((image, index) => (
                  <CarouselItem key={index} className="min-w-full">
                    <div className="p-1">
                      <Card className="shadow-lg">
                        <CardContent className="flex items-center justify-center p-0 h-full">
                          <img
                            src={image.url}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-[400px] sm:h-[500px] lg:h-[600px] object-cover rounded-lg transition-transform duration-500 hover:scale-105"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {/* <CarouselPrevious onClick={handlePrevious} />
              <CarouselNext onClick={handleNext} /> */}
            </Carousel>
          </div>

          {/* News & Events List Section */}
          <div className="overflow-y-auto max-h-[600px] shadow-md rounded-lg border border-gray-300 p-4 bg-white">
            {loading ? (
              <Skeleton count={3} height={80} className="mb-4" />
            ) : (
              events.map((event, index) => (
                <Card key={index} className="mb-2 shadow-sm bg-green-50 hover:shadow-md transition-shadow duration-300">
                  <CardContent className="flex">
                    <div className="w-20 flex-shrink-0 flex flex-col justify-center items-center border-r-2 border-gray-300 pr-4">
                      <span className="text-2xl font-bold text-gray-700">{event.date.split(' ')[0]}</span>
                      <span className="text-sm font-medium text-gray-500">{event.date.split(' ')[1]}</span>
                    </div>
                    <div className="flex flex-col ml-4 w-full">
                      <h4 className="text-md font-semibold">{event.title}</h4>
                      <p className="text-sm text-gray-600">{event.description}</p>
                      <div className="flex justify-between items-center mt-0">
                        <span className="text-xs text-gray-400">by {event.author}</span>
                        <Link href={event.link} className="text-blue-600 text-xs font-semibold">
                          View
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
