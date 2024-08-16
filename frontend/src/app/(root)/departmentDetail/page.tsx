import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, HousePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

import departmentData from "@/json/departmentData";

const page = () => {
  return (
    <div className="grid">
      <div className="relative justify-self-center">
        <img src="/hospital/speciality.png" alt="img" className="h-80" />
        <div className="  grid items-center justify-center bg-pattern5-bg ">
          <h1 className="text-2xl font-bold text-sky-700 text-center">
            Departments Details
          </h1>
          <div className="grid grid-cols-4 p-4  mx-8 gap-8">
            {departmentData.map((item) => (
              <Card
                key={item?.id}
                className="max-h-48 min-w-80 grid  justify-center hover:shadow-lg hover:shadow-sky-700"
              >
                <div className="grid bg-slate-200  h-14 w-24  place-self-center justify-center">
                  <HousePlus color="#0284c7" size="60" strokeWidth={1.25} />
                </div>
                <div className="text-center py-2 px-4 grid grid-flow-row space-y-2 ">
                  <h1 className="text-lg font-medium border-b-2">
                    {item?.name}
                  </h1>
                  <p className="text-sm font-light text-slate-500 border-b-2 border-dotted ">
                    {item?.description}
                  </p>
                  <Link href="/inDepartment/orthopaedics">
                    <Button className=" bg-sky-600  shadow-md  place-self-center rounded-md">
                      Get In
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
