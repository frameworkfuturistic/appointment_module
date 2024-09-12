
import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import indepartmentData from "@/json/indepartmentData";
import { Card } from "@/components/ui/card";

const page = () => {
  return (
    <div className="grid ">
      <div className="relative justify-self-center">
        <img src="/hospital/speciality.png" alt="img" className="h-80" />
      </div>
      <div className="grid grid-cols-2 p-2 my-6 ">
        <div className=" bg-pattern5-bg min-w-[800px] space-y-2 mx-8 p-4  text-wrap ">
          <h1 className="text-4xl text-sky-700 font-serif text-wrap">
            Nephrology
          </h1>

          <h2 className="font-medium">Nephrology Unit</h2>
          <ul className="space-y-2">
            <li>
              Shree Jagannath Hospital & Research Centre, Ranchi operates an
              ultra modern Hemodialysis centre which comes under the purview of
              our Nephrology department under care of Nephrologists ,highly
              experienced technicians and equipped with a state of the art RO
              system, our dialysis unit is focused towards providing quality
              dialysis treatment.
            </li>
            <li>
              In addition to providing Haemodialysis, we are providing
              recreational facilities for patients such as TV’s and facility for
              music, so that patients have a good experience while undergoing
              dialysis.
            </li>
            <li>
              We understand your health is important and thus we have equipped
              our centre with the latest technology, advanced medical facilities
              and best Nephrologists or kidney doctors, for whom your kidney
              health is a priority.
            </li>
            <li>
              We offer the most advanced diagnostics, comprehensive
              pre-operative evaluation, dialysis support & complete care to
              minimize chances of infection.
            </li>
            <li>
              We provide comprehensive care across a spectrum of kidney
              diseases.. We provide dialysis services driven by an efficient
              team of nephrologists, nurses, haemodialysis technicians &
              dieticians .
            </li>
          </ul> 
          <h2 className="font-medium ">Facilities :</h2>
          <ul className="list-disc pl-6">
            <li>Hemodialysis Facility X24 hours</li>
            <li>Along With I.C.U. facility</li>
            <li>Well Qualified Nephrologists</li>
          </ul>
        </div>
       {/* DOCTOR's Card */}
       <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          {indepartmentData.nephrology.map((doctor) => (
            <Card
              key={doctor.id}
              className="  h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  "
            >
              <div className="min-h-24 min-w-full">
                <img
                  src={doctor.doctorImg}
                  alt="img"
                  className="w-full h-56 object-cover  "
                />
              </div>
              <div className="grid grid-flow-row p-2 gap-y-2 ">
                <h1 className="text-lg font-semibold font-serif">
                  {doctor.name}
                </h1>
                <p className="text-sm font-light  border-b-2">
                  Designation:{doctor.designation}
                </p>
                <Dialog>
                  <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24 ">
                    Details
                  </DialogTrigger>
                  <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg ">
                    <DialogHeader>
                      <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                        {doctor.name}
                      </DialogTitle>
                      <DialogDescription className="grid justify-items-center gap-y-4">
                        <img
                          src={doctor.doctorImg}
                          alt="img"
                          className="rounded-full h-56 min-w-56"
                        />
                        <div className=" m-8 text-lg space-y-4 text-wrap">
                          <p>
                            <p className="text-destructive">Qualification :</p>{" "}
                            {doctor.qualification}
                          </p>

                          <p>
                            <p className="text-destructive">Formerly :</p>{" "}
                            {doctor.formerly}
                          </p>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
