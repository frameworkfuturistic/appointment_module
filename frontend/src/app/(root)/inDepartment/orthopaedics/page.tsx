import React from "react";
import { Card } from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { redirect } from "next/dist/server/api-utils";
import indepartmentData from "@/json/indepartmentData";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
const departmentDoctors = [
  {
    id: 1,
    image: "",
    name: "Prof.(Dr.) Sudhir Kumar",
    designation: "",
    details: {
      redirect: "/",
    },
  },
];

const page = () => {
  // const department = indepartmentData.find((department) => department?.id === 1);
  return (
    <div className="grid ">
      <div className="relative justify-self-center">
        <img src="/hospital/speciality.png" alt="img" className="h-80" />
      </div>
      <div className="grid grid-cols-2 p-2 my-6 ">
        <div className=" bg-pattern5-bg min-w-[800px] space-y-2  mx-8 p-4  text-wrap">
          <Title title={" Orthopaedics"}/>
          <h2 className="text-2xl font-medium">Our Orthopaedics Surgeons</h2>
          <p>
            Our orthopaedics surgeons will take a history of your illness or
            injury and then do a physical examination. This may be followed by
            diagnostic studies such as x-rays or blood tests. He/She will then
            discuss your diagnosis and help you select the best treatment plan
            so that you can live an active and functional life.
          </p>
          <h2 className="font-medium">
            Orthopaedic surgeons treat problems of the musculoskeletal system.
            This involves:
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Key Hole Fracture Fixation.</li>
            <li>
              Complex Trauma Surgery for Bones & Joints, including: Acetabulum,
              Pelvis, Scapula.
            </li>
            <li>Hand Reconstructive Surgery.</li>
            <li>Spine Surgery.</li>
            <li>Endoscopic Assisted Spinal Surgery.</li>
            <li>Minimal Invasive Fixation of Spine.</li>
            <li>Video Assisted Thoracic Spine Surgery.</li>
            <li>Deformities Correction for Spine</li>
            <li>Tumor Surgery for Reconstruction.</li>
            <li>Micro Vascular and Micro Neural Surgery.</li>
            <li>Complex Reconstructive Surgery for Composite Tissue loss.</li>
            <li>Endoscopic Assisted Surgery for Joint and Cavities.</li>
            <li>Deformities Correction/Limb Lengthening.</li>
            <li>Total Knee and Hip Replacement/Small Joint Replacement.</li>
            <li>Revision Total Knee and Hip Replacement Arthoplasty.</li>
          </ul>
          <h2 className="font-medium">Equipped With :</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Ultramodern Endoscope and International Quality Implants Assuring
              Quality Specification.
            </li>
            <li>
              Multiple C-arm to Reduce the Duration of Surgery and to Improve
              3-D precision for implant Placement.
            </li>
            <li>
              Multiple C-arm to Reduce the Duration of Surgery and to Improve
              3-D precision for implant Placement.
            </li>
          </ul>
        </div>
        {/*  Doctor Card */}
        <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          {indepartmentData.orthopaedics.map((doctor) => (
            <Card
              key={doctor.id}
              className="  h-96  max-w-60 grid grid-flow-row justify-center    border-2  "
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
                  {doctor.designation}
                </p>
                <Dialog>
                 
                  <DialogTrigger className="bg-rose-300 shadow-xl text-slate-800  px-4 hover:bg-rose-200 rounded-md font-medium">
                    Details
                  </DialogTrigger>
                  
                  <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg ">
                    <DialogHeader>
                      <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 ">
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
