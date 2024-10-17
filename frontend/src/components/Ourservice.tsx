import React from "react";
import { Card } from "@/components/ui/card";
import {
  Ambulance,
  BriefcaseMedical,
  ClipboardPlus,
  HeartPulse,
  Hospital,
  Pill,
} from "lucide-react";
import Title from "./Title";
import Subtitle from "./Subtitle";

const service = [
  {
    id: 1,
    icon: HeartPulse,
    title: "Health Check",
    description:
      "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff",
  },
  {
    id: 2,
    icon: Hospital,
    title: "Operation Theater",
    description:
      "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff.",
  },
  {
    id: 3,
    icon: Pill,
    title: "Pharmacy Support",
    description:
      "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff.",
  },
  {
    id: 4,
    icon: Ambulance,
    title: "Ambulance Car",
    description:
      "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff.",
  },
  {
    id: 5,
    icon: ClipboardPlus,
    title: "Lab Tests",
    description:
      "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff",
  },
  {
    id: 6,
    icon: BriefcaseMedical,
    title: "Intensive Care",
    description:
      "We offer extensive medical procedures to outbound & inbound patients what it is and we are very proud achievement staff",
  },
];

const Ourservice = () => {
  return (
    <section className="section py-8">
      <div
        className="bg-pattern3 bg-center bg-cover sm:w-full lg:w-full flex justify-center"
        id="Speciality"
      >
        <div className="container mx-auto px-4 min-h-fit">
          <div className="flex flex-col items-center text-center mb-8">
            <Title title={"OUR SERVICES"} />
            <Subtitle subtitle={"We Care About Our Patients"} />
            {/* <img src="/activity.png" alt="icon" className="h-10 w-10 py-2" /> */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {service.map((index) => {
              const Icon = index.icon; // Assign the icon dynamically

              return (
                <Card
                  key={index.id}
                  className="transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-white shadow-md border-none flex flex-col items-center text-center p-4 min-h-[250px] hover:shadow-rose-200 "
                >
                  <Icon
                    color="#847575"
                    strokeWidth={1.25}
                    className="size-16 rounded-full bg-white p-2 mb-2"
                  />
                  <h1 className="text-lg font-medium">{index.title}</h1>
                  <p className="text-sm font-light text-slate-800 ">
                    {index.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ourservice;
