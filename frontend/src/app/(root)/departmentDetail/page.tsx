import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, HousePlus } from "lucide-react";

import React from "react";

import departmentData from "@/json/departmentData";

const page = () => {
  return (
    <div className="grid w-full md:max-w-full ">
      <div className="relative justify-self-center">
        <img src="/hospital/speciality.png" alt="img" className="w-full h-64 md:h-80 object-cover" />
        <div className="  grid items-center justify-center bg-pattern5-bg   md:p-8">
          <h1 className="text-2xl font-bold text-sky-700 text-center">
            Departments Details
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 ">
            {departmentData.map((item) => (
              <Card
                key={item?.id}
                className="h-full min-w-full md:min-w-80 p-4 grid justify-center hover:shadow-lg hover:shadow-sky-700"
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
                   <a href={item?.indepartment?.redirect}> 
                    <Button className=" bg-sky-600  shadow-md  place-self-center rounded-md">
                      Get In
                    </Button>
                   </a> 
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
