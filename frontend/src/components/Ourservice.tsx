import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <section className="section">
      <div
        className=" bg-pattern3 bg-center bg-cover  sm:w-full lg:w-full grid grid-flow-col justify-center "
        id="Speciality"
      >
        <div className="">
          <div className="  flex flex-col items-center text-center   ">
            <Title title={"OUR SERVICES"} />
            <Subtitle subtitle={"We Care Our Patients"}/>
            {/* <img src="/activity.png" alt="icon" className="  h-10 w-10 py-2" /> */}
          </div>
          <div className="grid grid-cols-3 gap-x-20 gap-y-10">
            {service.map((index) => {
              const Icon = index.icon; // Assign the icon dynamically

              return (
                <Card
                  key={index.id}
                  className=" transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...  shadow-none border-none md:max-w-72 md:max-h-48 text-wrap  flex flex-col items-center hover:shadow-md  hover:shadow-rose-200  "
                >
                  <Icon
                    color="#0284c7"
                    strokeWidth={1.25}
                    className="size-16 rounded-full bg-white"
                  />

                  <div className="grid grid-flow-row text-center text-wrap gap-2 m-2">
                    <h1 className="text-lg font-medium">{index.title}</h1>
                    <p className="text-sm font-light  text-slate-800 hidden md:block ">
                      {index.description}
                    </p>
                  </div>
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
