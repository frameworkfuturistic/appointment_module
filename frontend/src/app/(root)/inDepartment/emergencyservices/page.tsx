import { Card } from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import React from "react";
import indepartmentData from "@/json/indepartmentData";
import Title from "@/components/Title";

const page = () => {
  return (
    <div className="grid ">
      <div className="relative justify-self-center">
        <img src="/hospital/speciality.png" alt="img" className="h-80" />
      </div>
      <div className="grid grid-cols-2 p-2 my-6 ">
        <div className=" bg-pattern5-bg min-w-[800px] space-y-2  mx-8 p-4  text-wrap">
          <Title title={"Emergency & Trauma Unit"}/>

          <h2 className="font-medium text-lg">
            Reasons why Shree Jagannath Hospital & Research Centre's emergency
            services are so effective:
            <p className="font-normal ">
              When someone experiences a serious injury or requires emergency
              surgery, the first thing you do is call an ambulance. But getting
              to the hospital is not all thats essential to ensure the patients
              survival and recovery. Whats's needed is constant care during
              evacuation, exceptional medical expertise, and comprehensive
              trauma care resources - all available immediately and round the
              clock. Here's how Shree Jagannath Hospital & Research Centres's
              emergency and Trauma care services are equipped to deliver all of
              it and more.
            </p>{" "}
          </h2>
          <h2>
            We are a Level 1 trauma facility:
            <p>
              {" "}
              Trauma Facility Centres are broadly classified into 5 levels on
              the basis of the quality of care they offer. Shree Jagannath
              Hospital & Research Centre is Level 1 Trauma Facility, the highest
              of all levels, as it has in-house surgical specialists and
              sub-specialists (surgeons, neurosurgeons, orthopedic surgeons,
              plastic surgeons, anesthesiologists) available to treat even the
              most severe cases.
            </p>
          </h2>
          <h2>
            We stabilize patients through specialized emergency care programmes:
            <p>
              After evaluating the nature of an emergency, we treat patients
              through specialized care programmes. Through quick intervention by
              our experts, we are able to identify the patient’s condition and
              immediately begin treatment.
            </p>
          </h2>
          <h2>
            We're equipped to handle any kind of emergency:{" "}
            <p>
              Our emergency units are assembled in a manner to have experts from
              various departments work collaboratively on each patient.
            </p>
          </h2>
          <h2>Complex Trauma & Industrial Injuries</h2>
          <p>
            All accident and trauma cases are treated here with expert hands &
            comprehensive care.
          </p>
          <p>We offer services including:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Pelvic and Acetabular Fracture Management</li>
            <li>Bone Transport for Gap Non-union</li>
            <li>Conventional and Ilizarov External Fixators</li>
            <li>
              Fracture Fixation using Interlocking Nails and Locking Plates
            </li>
            <li> Limb Lengthening</li>
            <li>Polytrauma</li>
          </ul>
        </div>
         {/* DOCTOR's Card */}
         {/* <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          {indepartmentData.map((doctor) => (
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
        </div> */}
      </div>
    </div>
  );
};

export default page;
