import React from "react";

import { Computer, HousePlus, Stethoscope } from "lucide-react";

import { Card } from "./ui/card";

const Ourmedical = () => {
  return (
    <section className="section">
      {/* FACILITY INFO CARDS */}
      <div className="grid  justify-center" >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 space-y-2 space-x-6 items-center   w-full h-full">
        
        <Card className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300 group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-rose-100 hover:ring-rose-100 hover:shadow-2xl hover:shadow-rose-200">
          <div className="flex items-center space-x-3 ">
            <HousePlus
              size={56}
              color="#e22222"
              strokeWidth={1.5}
              className=""
            />
            <h3 className="text-slate-900  text-lg font-semibold">
              Quality & Safety
            </h3>
          </div>
          <p className="text-slate-500  text-sm">
            Our Delmont hospital utilizes state-of-the-art technology and
            employs a team of true experts.
          </p>
        </Card>

        <Card className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300 group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-rose-100 hover:ring-rose-100 hover:shadow-2xl hover:shadow-rose-200">
          <div className="flex items-center space-x-3">
            <Computer
              size={56}
              color="#e22222"
              strokeWidth={1.5}
              className=""
            />
            <h3 className="text-slate-900  text-lg font-semibold">
              Leading Technology
            </h3>
          </div>
          <p className="text-slate-500  text-sm">
            Our Delmont hospital utilizes state-of-the-art technology and
            employs a team of true experts.
          </p>
        </Card>

        <Card className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300 group block max-w-xs mx-auto rounded-lg p-6 bg-white ring-1 ring-slate-900/5 shadow-lg space-y-3 hover:bg-rose-100 hover:ring-rose-100 hover:shadow-2xl hover:shadow-rose-200">
          <div className="flex items-center space-x-3">
            <Stethoscope
              size={56}
              color="#e22222"
              strokeWidth={1.5}
              className=""
            />
            <h3 className="text-slate-900  text-lg font-semibold">
              Experts by Experience
            </h3>
          </div>
          <p className="text-slate-500  text-sm">
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
