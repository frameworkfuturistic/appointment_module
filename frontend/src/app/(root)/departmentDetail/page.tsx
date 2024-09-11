import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, HousePlus } from "lucide-react";

import React from "react";

import departmentData from "@/json/departmentData";
import Link from "next/link";

const page = () => {
  return (
    <section className="section">
    <div className="relative justify-self-center">
      <div className="relative">
        <img
          src="/hospital/speciality.png"
          alt="img"
          className="w-full h-96 object-fill"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-4xl sm:text-4xl font-semibold text-white">
          Department Details
          </h1>
        </div>
      </div>

      <div className="  grid items-center justify-center bg-pattern3    md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 ">
          {departmentData.map((item) => (
            <Card
              key={item?.id}
              className="h-full min-w-full md:min-w-80 p-4 grid justify-center bg-rose-50 hover:shadow-lg hover:shadow-rose-100"
            >
              <div className="grid   h-12 w-20  place-self-center justify-center">
                <HousePlus color="#e22222" size="60" strokeWidth={1.25} />
              </div>
              <div className="text-center py-2 px-4 grid grid-flow-row space-y-2 ">
                <h1 className="text-lg font-medium border-b-2">{item?.name}</h1>
                <p className="text-sm font-light text-slate-500 border-b-2 border-dotted ">
                  {item?.description}
                </p>
                <Link href={item?.indepartment?.redirect} className="grid">
                  <Button variant="hms" className="  shadow-md  place-self-center  hidden md:block">
                    Get In
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </section>
  );
};

export default page;
