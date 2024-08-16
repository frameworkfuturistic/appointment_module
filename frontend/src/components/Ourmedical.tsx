import React from "react";
import { Button } from "@/components/ui/button";
import { Computer, HousePlus, Stethoscope } from "lucide-react";

const Ourmedical = () => {
  return (
    <>
      {/* FACILITY INFO CARDS */}
      <div className="grid grid-flow-col md:w-full md:h-full  ">
        <div>
          <a
            href="#"
            className="transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-110 duration-300  ... group block max-w-xs mx-auto rounded-lg p-8 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-600  hover:shadow-2xl hover:shadow-sky-600  "
          >
            <div className="flex items-center space-x-3">
              <HousePlus
                size={56}
                color="#0284c7"
                strokeWidth={1.5}
                className=" group-hover:stroke-white"
              />

              <h3 className="text-slate-900 group-hover:text-white text-lg font-semibold">
                Quality & Safety
              </h3>
            </div>
            <p className="text-slate-500 group-hover:text-white text-sm">
              Our Delmont hospital utilizes state of the art technology and
              employs a team of true experts.
            </p>
          </a>
        </div>

        <div>
          <a
            href="#"
            className="transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-110 duration-300 ... group block max-w-xs mx-auto rounded-lg p-8 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-600 hover:ring-sky-600 hover:shadow-2xl hover:shadow-sky-600 "
          >
            <div className="flex items-center space-x-3">
              <Computer
                size={56}
                color="#0284c7"
                strokeWidth={1.5}
                className=" group-hover:stroke-white"
              />

              <h3 className="text-slate-900 group-hover:text-white text-lg font-semibold">
                Leading Technology
              </h3>
            </div>
            <p className="text-slate-500 group-hover:text-white text-sm">
              Our Delmont hospital utilizes state of the art technology and
              employs a team of true experts.
            </p>
          </a>
        </div>

        <div>
          <a
            href="#"
            className="transition ease-in-out delay-100  hover:-translate-y-1 hover:scale-110 duration-300 ... group block max-w-xs mx-auto rounded-lg p-8 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-sky-600 hover:ring-sky-600 hover:shadow-2xl hover:shadow-sky-600 "
          >
            <div className="flex items-center space-x-3">
              <Stethoscope
                size={56}
                color="#0284c7"
                strokeWidth={1.5}
                className=" group-hover:stroke-white"
              />

              <h3 className="text-slate-900 group-hover:text-white text-lg font-semibold">
                Experts by Exprience
              </h3>
            </div>
            <p className="text-slate-500 group-hover:text-white text-sm">
              Our Delmont hospital utilizes state of the art technology and
              employs a team of true experts.
            </p>
          </a>
        </div>
      </div>
      {/* Our Medical */}
      <div className="grid grid-cols-2 sm:w-full sm:h-full lg:w-full lg:h-full ">
        <div className=" w-full  bg-pattern-bg grid grid-flow-col ">
          <div className=" static size-[500px] ml-56">
            <img src="/sthethescope.png" alt="img" />
            <div className="relative bottom-80 -ml-20  size-[350px]  ">
              <img src="/doc-2.png" alt="img" />
              <div className=" relative size-[250px] bottom-80 ml-96    ">
                <img src="/doc-3.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
        <div className="p-8">
          <h2 className="text-slate-600 text-xl m-8 ">OUR MEDICAL</h2>
          <h3 className="text-slate-800 text-4xl font-medium m-8">
            We're setting Standards in Research what's more, Clinical Care.
          </h3>
          <img src="/activity.png" alt="icon" className="mx-8" />
          <p className="text-slate-600 m-8">
            We provide the most full medical services, so every person could
            have the pportunity o receive qualitative medical help.
          </p>
          <p className="text-slate-600 m-8">
            Our Clinic has grown to provide a world class facility for the
            treatment of tooth loss, dental cosmetics and bore advanced
            restorative dentistry. We are among the most qualified implant
            providers in the AUS with over 30 years of uality training and
            experience.
          </p>
          <div className="grid grid-flow-col m-8 ">
            <img src="/signature.png" alt="sign" />
            <Button className="bg-sky-700 rounded-md h-12 w-36 -ml-36 mt-6 ">
              More About
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ourmedical;
