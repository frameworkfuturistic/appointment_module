import React from "react";
import { Computer, HousePlus, Stethoscope } from "lucide-react";
import { Card } from "./ui/card";

const Ourmedical = () => {
  return (
    <section className="section py-8 px-4 sm:px-6 lg:px-8">
      {/* FACILITY INFO CARDS */}
      <div className="flex flex-col items-center">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 gap-x-0 lg:grid-cols-3 max-w-6xl w-full">
          
          <Card className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 group block w-full max-w-xs rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-rose-100 hover:ring-rose-100 hover:shadow-2xl hover:shadow-rose-200">
            <div className="flex items-center space-x-3">
              <HousePlus
                size={56}
                color="#db9e9e"
                strokeWidth={1.5}
                className=""
              />
              <h3 className="text-slate-900 text-lg font-semibold">
                Quality & Safety
              </h3>
            </div>
            <p className="text-slate-500 text-sm">
              Our Delmont hospital utilizes state-of-the-art technology and
              employs a team of true experts.
            </p>
          </Card>

          <Card className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 group block w-full max-w-xs rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-rose-100 hover:ring-rose-100 hover:shadow-2xl hover:shadow-rose-200">
            <div className="flex items-center space-x-3">
              <Computer
                size={56}
                color="#db9e9e"
                strokeWidth={1.5}
                className=""
              />
              <h3 className="text-slate-900 text-lg font-semibold">
                Leading Technology
              </h3>
            </div>
            <p className="text-slate-500 text-sm">
              Our Delmont hospital utilizes state-of-the-art technology and
              employs a team of true experts.
            </p>
          </Card>

          <Card className="transition-transform transform hover:-translate-y-2 hover:scale-105 duration-300 group block w-full max-w-xs rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-rose-100 hover:ring-rose-100 hover:shadow-2xl hover:shadow-rose-200">
            <div className="flex items-center space-x-3">
              <Stethoscope
                size={56}
                color="#db9e9e"
                strokeWidth={1.5}
                className=""
              />
              <h3 className="text-slate-900 text-lg font-semibold">
                Experts by Experience
              </h3>
            </div>
            <p className="text-slate-500 text-sm">
              Our Delmont hospital utilizes state-of-the-art technology and
              employs a team of true experts.
            </p>
          </Card>

        </div>
      </div>
    </section>
  );
};

export default Ourmedical;
