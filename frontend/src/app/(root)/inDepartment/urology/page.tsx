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

const page = () => {
  return (
    <div className="grid ">
      <div className="relative justify-self-center">
        <img src="/hospital/speciality.png" alt="img" className="h-80" />
      </div>
      <div className="grid grid-cols-2 p-2 my-6 ">
        <div className=" bg-pattern5-bg min-w-[800px] space-y-2  mx-8 p-4  text-wrap">
          <h1 className="text-4xl text-sky-700 font-serif text-wrap">
            UROLOGY
          </h1>

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
        {/* DOCTOR's CARDS */}
        {/* <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          <Card
            id="card1"
            className="  h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  "
          >
            <div className="min-h-24 min-w-full">
              <img
                src="/departmentHeads/sudhir.png"
                alt="img"
                className="w-full h-56 object-cover  "
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Prof.(Dr.) Sudhir Kumar
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: Senior Consultant (Orthopaedics)
              </p>
              <Dialog>
                <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24 ">
                  Details
                </DialogTrigger>
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg ">
                  <DialogHeader>
                    <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                      Dr. Sudhir Kumar
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/departmentHeads/sudhir.png"
                        alt="img"
                        className="rounded-sm min-w-56"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Qualification :</p>{" "}
                          M.B.B.S (B.H.U), M.S. Ortho. (B.H.U) Fellow in Hand
                          (Bombay ortho. Society) Fellow in spine (world Ortho.
                          Concern) Consultant in Orthopedics & Traumatology
                          Hand, Spine and Micro-reconstructive surgeon
                        </p>

                        <p>
                          <p className="text-destructive">Formerly :</p>{" "}
                          Professor in Orthopedics RIMS, Ranchi Specialist &
                          Incharge in Orthopedics HEC Hospital, Ranchi Reader in
                          Orthopedics Mahatma Gandhi Institute of Medical
                          Science, Wardha Lecturer (Jr.) Hand Reconstructive
                          Surgery CMC Vellore, Tamil Nadu
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card
            id="card2"
            className=" h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4   "
          >
            <div className="min-h-24 min-w-full">
              <img
                src="orthopaedics/Drverma.png"
                alt="img"
                className="  w-full h-56 object-cover  "
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2">
              <h1 className="text-lg font-semibold font-serif">
                Prof. (Dr.) Ajay Kumar Verma
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: Senior Consultant (Orthopedics)
              </p>
              <Dialog>
                <DialogTrigger className=" bg-sky-700 rounded-sm place-self-center text-white min-w-24">
                  Details
                </DialogTrigger>
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg text-wrap">
                  <DialogHeader>
                    <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                      Prof. (Dr.) Ajay Kumar Verma
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/orthopaedics/Drverma.png"
                        alt="img"
                        className="rounded-sm max-h-48"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Qualification :</p>{" "}
                          M.B.B.S.(L.N.M.University), M.S.(Ranchi University)
                        </p>

                        <p>
                          <p className="text-destructive">Formerly :</p>Medical
                          Officer(Orthopaedics) in Bihar/Jharkhand,
                          Registrar(RIMS), Assistant Professor in Orthopaedics
                          (RIMS), Associate Professor in Orthopaedics (RIMS),
                          Professor Orthopaedics (RIMS)
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          
        </div> */}
      </div>
    </div>
  );
};

export default page;
