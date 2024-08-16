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
        <img src="/hospital/speciality.png" alt="img" className="h-72" />
      </div>
      <div className="grid p-4 ">
        <div className="grid bg-pattern5-bg max-w-[1000px] place-self-center space-y-2 p-4 ">
          <h1 className="text-4xl text-sky-700 font-serif">Orthopaedics</h1>
          <h2 className="text-2xl font-medium">Our Orthopaedics Surgeons</h2>
          <p className="font-medium">
            Our orthopaedics surgeons will take a history of your illness or
            injury and then do a physical examination. This may be followed by
            diagnostic studies such as x-rays or blood tests. He/She will then
            discuss your diagnosis and help you select the best treatment plan
            so that you can live an active and functional life.
          </p>
          <h2>
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
          <h2>Equipped With :</h2>
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
        <div className="grid grid-cols-5 gap-4 ">
          {/* CARD-1 */}
          <Card className=" lg:max-w-60  grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  ">
            <img
              src="/departmentHeads/sudhir.png"
              alt="img"
              className="rounded-t-lg min-w-60 "
            />
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
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg text-wrap">
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
          {/* CARD-2 */}
          <div className="  lg:max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  ">
            <img
              src="/orthopaedics/Drverma.png"
              alt="img"
              className="rounded-t-lg min-w-60 "
            />
            <div className="grid grid-flow-row place-content-center px-2">
              <h1 className="text-lg font-semibold font-serif">
                Prof. (Dr.) Ajay Kumar Verma
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: Senior Consultant (Orthopedics)
              </p>
              <Dialog>
                <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24 ">
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
                        className="rounded-sm min-w-56"
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
          </div>
          {/* CARD-3 */}
          <Card className=" lg:min-h-64 lg:max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  ">
            <img
              src="/orthopaedics/Dr Nilay.png"
              alt="img"
              className="rounded-t-lg min-w-60 "
            />
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr. Nilay Kumar
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: Specialist & Consultant (Orthopedics)
              </p>
              <Dialog>
                <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24 ">
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
                        className="rounded-sm min-w-56"
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
          {/* CARD-4 */}
          <Card className=" lg:min-h-64 lg:max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  ">
            <img
              src="/orthopaedics/bksingh.png"
              alt="img"
              className="rounded-t-lg min-w-60 "
            />
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
                        className="rounded-sm min-w-56"
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
          {/* CARD-5 */}

          {/* CARD-6 */}
          <Card className=" lg:min-h-64 lg:max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  ">
            <img
              src="/orthopaedics/hargave.png"
              alt="img"
              className="rounded-t-lg min-w-60 "
            />
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr Danish Ejaj
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation:(MBBS DNB Resident)
              </p>
              {/* <Dialog>
              <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24 ">
                Details
              </DialogTrigger>
              <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg text-wrap">
                <DialogHeader>
                  <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                  Dr Danish Ejaj
                  </DialogTitle>
                  <DialogDescription className="grid justify-items-center gap-y-4">
                    <img
                      src="/"
                      alt="img"
                      className="rounded-sm min-w-56"
                    />
                    <div className=" m-8 text-lg space-y-4 text-wrap">
                      <p>
                        <p className="text-destructive">Qualification :</p>{" "}
                       
                      </p>
                      <p>
                        <p className="text-destructive">Formerly :</p>
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}
            </div>
          </Card>
          {/* CARD-7 */}
          <Card className=" lg:min-h-64 lg:max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  ">
            <img
              src="/orthopaedics/Dr Satyam Kr Singh (MBBS DNB Resident).png"
              alt="img"
              className="rounded-t-lg min-w-60 "
            />
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr.Satyam kr Singh
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation:(MBBS,DNB Resident)
              </p>
              {/* <Dialog>
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
                      className="rounded-sm min-w-56"
                    />
                    <div className=" m-8 text-lg space-y-4 text-wrap">
                      <p>
                        <p className="text-destructive">Qualification :</p>{" "}
                        M.B.B.S.Magadh University
                      </p>
                      <p>
                        <p className="text-destructive">Formerly :</p>Medical
                        Officer (Sanctoria Hospital, West Bengal), Medical
                        Supritendent (CCL, Central Hospital Ramgarh), Dy. Chief
                        Medical Officer (CCL Central Hospital, Ramgarh), HOD,
                        Central Medical Stores (CCL Central Hospital, Ramgarh),
                        Member of various Medical Boards of ECL and CCL
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}
            </div>
          </Card>
          {/* CARD-8 */}
          <Card className=" lg:min-h-64 lg:max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  ">
            <img
              src="/PROFPIC.png"
              alt="img"
              className="rounded-t-lg min-w-60 "
            />
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr. Nand Kishore Tirkey
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation:(MBBS,DNB Resident)
              </p>
              {/* <Dialog>
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
                      className="rounded-sm min-w-56"
                    />
                    <div className=" m-8 text-lg space-y-4 text-wrap">
                      <p>
                        <p className="text-destructive">Qualification :</p>{" "}
                        M.B.B.S.Magadh University
                      </p>
                      <p>
                        <p className="text-destructive">Formerly :</p>Medical
                        Officer (Sanctoria Hospital, West Bengal), Medical
                        Supritendent (CCL, Central Hospital Ramgarh), Dy. Chief
                        Medical Officer (CCL Central Hospital, Ramgarh), HOD,
                        Central Medical Stores (CCL Central Hospital, Ramgarh),
                        Member of various Medical Boards of ECL and CCL
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default page;
