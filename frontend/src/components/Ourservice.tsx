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

const Ourservice = () => {
  return (
    <div className="section">
    <div className=" bg-slate-100 bg-pattern2-bg sm:w-full lg:w-full grid grid-flow-col justify-center bg-center bg-cover" id='Speciality'>
      <div className="mb-12">
        <div className="  flex flex-col items-center text-center my-8 gap-2">
         <h1 className="text-xl font-semibold text-gray-800">OUR SERVICES</h1>
        <h2 className="text-2xl font-semibold text-black">
          We Care our Patients
        </h2>
          <img src="/activity.png" alt="icon" className="  h-10 w-10" />
        </div>
        <div>
          <div className="grid grid-cols-3 gap-x-20 gap-y-16  ">
            <Card className="  transition ease-in-out delay-150 bg-slate-100  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...  shadow-none border-none md:max-w-72 md:max-h-48 text-wrap  flex flex-col items-center hover:shadow-md hover:shadow-gray-300  ">
              <HeartPulse
                color="#0284c7"
                strokeWidth={1.25}
                className="size-16 rounded-full bg-white"
              />

              <div className="grid grid-flow-row text-center text-wrap gap-2 m-2">
                <h1 className="text-lg font-medium">Health Check</h1>
                <p className="text-sm font-extralight  text-slate-800 ">
                  We offer extensive medical procedures to outbound & inbound
                  patients what it is and we are very proud achievement staff.
                </p>
              </div>
            </Card>
            <Card className=" transition ease-in-out delay-150 bg-slate-100  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...  shadow-none border-none md:max-w-72 md:max-h-48 text-wrap  flex flex-col items-center hover:shadow-md hover:shadow-gray-300   ">
              <Hospital
                color="#0284c7"
                strokeWidth={1.25}
                className="size-16 rounded-full bg-white   "
              />

              <div className="grid grid-flow-row text-center text-wrap gap-2 m-2">
                <h1 className="text-lg font-medium">Operation Theater</h1>
                <p className="text-sm font-extralight text-slate-800">
                  We offer extensive medical procedures to outbound & inbound
                  patients what it is and we are very proud achievement staff.
                </p>
              </div>
            </Card>
            <Card className=" transition ease-in-out delay-150 bg-slate-100  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...  shadow-none border-none md:max-w-72 md:max-h-48 text-wrap  flex flex-col items-center  hover:shadow-md hover:shadow-gray-300    ">
              <Pill
                color="#0284c7"
                strokeWidth={1.25}
                className="size-16 rounded-full bg-white   "
              />

              <div className="grid grid-flow-row text-center text-wrap gap-2 m-2">
                <h1 className="text-lg font-medium">Pharmacy Support</h1>
                <p className="text-sm font-extralight text-slate-800">
                  We offer extensive medical procedures to outbound & inbound
                  patients what it is and we are very proud achievement staff.
                </p>
              </div>
            </Card>
            <Card className=" transition ease-in-out delay-150 bg-slate-100  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...  shadow-none border-none md:max-w-72 md:max-h-48 text-wrap  flex flex-col items-center  hover:shadow-md hover:shadow-gray-300   ">
              <Ambulance
                color="#0284c7"
                strokeWidth={1.25}
                className="size-16 rounded-full bg-white   "
              />

              <div className="grid grid-flow-row text-center text-wrap  gap-2 m-2">
                <h1 className="text-lg font-medium">Ambulance Car</h1>
                <p className="text-sm font-extralight text-slate-800">
                  We offer extensive medical procedures to outbound & inbound
                  patients what it is and we are very proud achievement staff.
                </p>
              </div>
            </Card>
            <Card className=" transition ease-in-out delay-150 bg-slate-100  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...  shadow-none border-none md:max-w-72 md:max-h-48 text-wrap  flex flex-col items-center  hover:shadow-md hover:shadow-gray-300   ">
              <ClipboardPlus
                color="#0284c7"
                strokeWidth={1.25}
                className="size-16  rounded-full bg-white   "
              />

              <div className="grid grid-flow-row text-center text-wrap gap-2 m-2">
                <h1 className="text-lg font-medium">Lab Tests</h1>
                <p className="text-sm font-extralight text-slate-800">
                  We offer extensive medical procedures to outbound & inbound
                  patients what it is and we are very proud achievement staff.
                </p>
              </div>
            </Card>
            <Card className=" transition ease-in-out delay-150 bg-slate-100  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...  shadow-none border-none md:max-w-72 md:max-h-48 text-wrap  flex flex-col items-center hover:shadow-md hover:shadow-gray-300   ">
              <BriefcaseMedical
                color="#0284c7"
                strokeWidth={1.25}
                className="size-16  rounded-full bg-white"
              />

              <div className="grid grid-flow-row text-center text-wrap gap-2 m-2">
                <h1 className="text-lg font-medium">Intensive Care</h1>
                <p className="text-sm font-extralight text-slate-800">
                  We offer extensive medical procedures to outbound & inbound
                  patients what it is and we are very proud achievement staff.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Ourservice;
