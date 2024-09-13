
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import indepartmentData from "@/json/indepartmentData";
import { Card } from "@/components/ui/card";
import Title from "@/components/Title";

const page = () => {
  return (
    <div className="grid ">
      <div className="relative justify-self-center">
        <img src="/hospital/speciality.png" alt="img" className="h-80" />
      </div>
      <div className="grid grid-cols-2 p-2 my-6 ">
        <div className=" bg-pattern5-bg min-w-[800px] space-y-2  mx-8 p-4  text-wrap">
          <Title title={"General & Laparoscopic Surgery"}/>

          <p>
            The field of general surgery involves evaluation and surgery of the
            full range of complex general surgery problems including surgical
            conditions of the breast, endocrine system, gastrointestinal tract,
            colon, liver, pancreas and rectum. Services includes:
          </p>

          <div className="list-disc pl-6 space-y-2">
            <h2 className="font-medium">
              Surgery:
              <ol className="list-disc pl-6 font-normal">
                <li>All types of Minimal Invasive & General Surgeries.</li>
                <li> Laparoscopic procedures.</li>
                <li>Endo-urological procedures</li>
                <li>Thoracic Endoscopy and thoracic procedures.</li>
                <li> Surgical Oncology.</li>
                <li>Upper and Lower GI Endoscopy(Diagnostic/Biopsy)</li>
                <li>Therapeutic Endoscopy.</li>
              </ol>
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          {indepartmentData.generalSurgery.map((doctor) => (
            <Card
              key={doctor.id}
              className=" h-96  max-w-60 grid grid-flow-row justify-center    border-2  "
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
