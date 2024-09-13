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
        <Title title={"UROLOGY"}/>

          <p>
            Urology services encompass a range of medical specialties focusing
            on the urinary tract system, including the kidneys, bladder,
            ureters, and urethra, as well as male reproductive organs like the
            prostate, testes, and penis. Here are some common urology services
            and types of surgeries:
          </p>

          <ol className="list-decimal pl-6 space-y-2">
            <li>
              Diagnostic Services :
              <ul className="list-disc pl-4">
                <li>Urinalysis and urine culture.</li>
                <li>Imaging studies (ultrasound, CT scan, MRI)</li>
                <li>Cystoscopy (visual examination of the bladder)</li>
                <li>
                  Urodynamic testing (assessing bladder and urethral function).
                </li>
              </ul>
            </li>
            <li>
              Medical Management:
              <ul className="list-disc pl-4">
                <li>Urinalysis and urine culture.</li>
                <li>Treatment of urinary tract infections (UTIs)</li>
                <li>Management of urinary incontinence</li>
                <li>
                  Medication management for kidney stones, prostate issues, and
                  other urological conditions .
                </li>
              </ul>
            </li>
            <li>
              Surgical Services :
              <ul className="pl-4">
                <li>
                  Prostate Surgery-
                  <ul className="list-disc pl-4">
                    <li>Transurethral resection of the prostate (TURP)</li>
                    <li>
                      Prostatectomy (partial or complete removal of the
                      prostate)
                    </li>
                  </ul>
                </li>
                <li>
                Kidney Surgery-
                <ul  className="list-disc pl-4">
                    <li>Nephrectomy (partial or complete removal of the kidney)</li>
                    <li>Kidney stone removal (lithotripsy, ureteroscopy)</li>
                </ul>
                </li>
              </ul>
            </li>
          </ol>
        </div>
        {/* DOCTOR's Card */}
          <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          {indepartmentData.urology.map((doctor) => (
            <Card
              key={doctor.id}
              className="  h-96  max-w-60 grid grid-flow-row justify-center    border-2   "
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
                  <DialogTrigger className="bg-rose-300 shadow-xl text-slate-800  px-4 hover:bg-rose-200 rounded-md font-medium ">
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
