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
            Internal Medicine Department
          </h1>

          <p>
            At Shree Jagannath Hospital & Research Centre, in the department of
            internal medicine / general medicine, we are providing comprehensive
            medical care for the treatment of various medical coditions which
            incorporates medical diagnosis and treatment of mediacal diseases
            which covers a wide range of conditions affecting the internal
            organs of the body including prevention of various medical
            conditions.
          </p>
          <h2 className="font-medium">
            The facilities under Internal Medicine are :
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>General Medicine clinic</li>
            <li>
              Non-Invasive Cardiology (ECG, ECHO, TMT, HOLTER Monitor,
              Biochemical monitoring)
            </li>
            <li>Temporary & Permanent Pacemaker Implatation</li>
            <li>Critical care</li>
            <li>
              Intensive care treatment and management of critically
              ill/compromised patients, infectious diseases, drug overdose and
              poisoning and other medical emergencies like Septicaemia, diabetic
              ketoacidosis, shock of any kind, meningitis, pneumonia etc.
            </li>
            <li>Management of chronic diseases</li>
            <li>
              Infectious diseases like Malaria, Typhoid fever, Tuberculosis,
              HIV/AIDS, Dengue fever, influenza etc.
            </li>
            <li>
              Management of drug overdoses and poisoning: Efficient nursing care
            </li>
            <li>Pre-employment checks</li>
          </ul>
          <h2 className="font-medium">Preventive Health:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li> It deals with various types of preventive health checkups</li>
            <li>
              A comprehensive and extremely personalized health check for you
              and your family have been designed
            </li>
          </ul>
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

          <Card
            id="card3"
            className=" h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4    "
          >
            <div className="min-h-24 min-w-full ">
              <img
                src="/orthopaedics/Dr Nilay.png"
                alt="img"
                className=" w-full h-56 object-cover  "
              />
            </div>

            <div className="grid grid-flow-row p-2 gap-y-2">
              <h1 className="text-lg font-semibold font-serif">
                Dr. Nilay Kumar
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: Specialist & Consultant (Orthopedics)
              </p>
              <Dialog>
                <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24">
                  Details
                </DialogTrigger>
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg text-wrap">
                  <DialogHeader>
                    <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                      Dr. Nilay Kumar
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/orthopaedics/Dr Nilay.png"
                        alt="img"
                        className="rounded-sm size-48"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Qualification :</p>{" "}
                          M.B.B.S.(M.U.H.S. Nashik), M.S.()
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card
            id="card4"
            className=" h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  "
          >
            <div className="  min-h-24 min-w-full border-2">
              <img
                src="/orthopaedics/bksingh.png"
                alt="img"
                className=" w-full h-full  object-cover"
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr. B.K. Sinha
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: Senior Medical Officer (Orhtopedics)
              </p>
              <Dialog>
                <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24 ">
                  Details
                </DialogTrigger>
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg text-wrap">
                  <DialogHeader>
                    <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                      Dr. B.K. Sinha
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/orthopaedics/bksingh.png"
                        alt="img"
                        className="rounded-sm size-48"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Qualification :</p>{" "}
                          M.B.B.S.Magadh University
                        </p>
                        <p>
                          <p className="text-destructive">Formerly :</p>Medical
                          Officer (Sanctoria Hospital, West Bengal), Medical
                          Supritendent (CCL, Central Hospital Ramgarh), Dy.
                          Chief Medical Officer (CCL Central Hospital, Ramgarh),
                          HOD, Central Medical Stores (CCL Central Hospital,
                          Ramgarh), Member of various Medical Boards of ECL and
                          CCL
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card
            id="card5"
            className=" h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4    "
          >
            <div className="min-h-24 min-w-full ">
              <img
                src="/orthopaedics/hargave.png"
                alt="img"
                className=" w-full h-56 object-cover  "
              />
            </div>

            <div className="grid grid-flow-row p-2 gap-y-2">
              <h1 className="text-lg font-semibold font-serif">
                Dr. B.V. Hargave
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: (MBBS, DNB Resident) (Orhtopedics)
              </p>
              <Dialog>
                <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24">
                  Details
                </DialogTrigger>
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg text-wrap">
                  <DialogHeader>
                    <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                      Dr. B.V. Hargave
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/orthopaedics/hargave.png"
                        alt="img"
                        className="rounded-sm size-48"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Qualification :</p>{" "}
                          M.B.B.S.(Magadh University)
                        </p>
                        <p>
                          <p className="text-destructive">Formerly:</p> Medical
                          Supritendent in Gandhi Nagar Hospital, Ranchi
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card
            id="card6"
            className=" h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4    "
          >
            <div className=" min-h-24 min-w-full border-2">
              <img
                src="/orthopaedics/Dr Danish Ejaz (MBBS DNB Resident).png"
                alt="img"
                className=" w-full h-full  object-cover "
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr Danish Ejaj
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation:(MBBS DNB Resident)
              </p>
            </div>
          </Card>

          <Card
            id="card7"
            className="  h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4"
          >
            <div className="min-h-24 min-w-full border-2">
              <img
                src="/orthopaedics/Dr Satyam Kr Singh (MBBS DNB Resident).png"
                alt="img"
                className="w-full h-full  object-cover "
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr.Satyam kr Singh
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation:(MBBS,DNB Resident)
              </p>
            </div>
          </Card>

          <Card
            id="card8"
            className="  h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  "
          >
            <div className="min-h-24 min-w-full border-2">
              <img
                src="/PROFPIC.png"
                alt="img"
                className="w-full h-full  object-cover"
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr. Nand Kishore Tirkey
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation:(MBBS,DNB Resident)
              </p>
            </div>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default page;
