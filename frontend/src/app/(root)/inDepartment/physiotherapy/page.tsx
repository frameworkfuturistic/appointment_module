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
            Physiotherapy
          </h1>

          <h2 className="font-medium">Physiotherapy & Rehabilitation</h2>
          <p>
            Shree Jagannath Hospital & Research Centre provides an exceptional
            patient care in an environment where quality, respect, caring and
            compassion are key features within the centre.
          </p>
          <h2 className="font-medium">Professional Responsibilities :</h2>
          <p>
            Design, co-ordinate and deliver an effective and efficient
            physiotherapy services, in collaboration with the other ward
            seniors, based on assessment of needs. To work with these senior to
            ensure all hospital patients are seen within a timely manneras set
            out by the departmental policies.
          </p>
          <p>
            Develope the administer the highest quality of service by
            identifying and implementation operational procedure in line with
            best practice standard
          </p>
          <h2 className="font-medium">Services provides by us:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Undertake a comprehensive examination/assessment of the
              patient/client or needs of a client group.
            </li>
            <li>
              Evaluate the findings from the examination/assessment to make
              clinical judgments regarding patients.
            </li>
            <li>Formulate a diagnosis, prognosis and plan.</li>
            <li>
              Provide consultation within their expertise and determine when
              patients/clients need to be referred to another healthcare
              professional.
            </li>
            <li>
              Implement a physical therapist intervention/treatment programme.
            </li>
            <li>Determine the outcomes of any interventions/treatments.</li>
            <li>Make recommendations for self-management.</li>
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

          
        </div> */}
      </div>
    </div>
  );
};

export default page;
