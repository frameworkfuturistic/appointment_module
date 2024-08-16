import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, HousePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="grid">
      <div className="relative justify-self-center">
        <img src="/hospital/speciality.png" alt="img" className="h-72" />
        <div className="  grid items-center justify-center bg-pattern5-bg ">
          <h1 className="text-2xl font-semibold text-sky-700">
            Departments Details
          </h1>
          <div className="">
            <Card className="max-h-48 min-w-80 grid  justify-center hover:shadow-lg hover:shadow-sky-700">
              <div className="grid bg-slate-200  h-14 w-24  place-self-center justify-center">
                <HousePlus color="#0284c7" size="60" strokeWidth={1.25} />
              </div>
              <div className="text-center py-2 px-4 grid grid-flow-row space-y-2 ">
                <h1 className="text-lg font-medium border-b-2">ORTHOPEDICS</h1>
                <p className="text-sm font-light text-slate-500 border-b-2 border-dotted ">
                  The correction of deformities of bones or muscles.
                </p>
                <Link href="/inDepartment">
                <Button className=" bg-sky-600  shadow-md  place-self-center rounded-md">
                 Get In
                </Button>
                </Link> 
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default page;
