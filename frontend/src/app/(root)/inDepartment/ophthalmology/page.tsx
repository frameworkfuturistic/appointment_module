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
            Ophthalmology
          </h1>

          <p>
            In Shree Jagannath Hospital & Research Centre,the department of
            Ophthalmology is dedicated to providing state of the art medical and
            surgical care in all aspects of adult and pediatric ophthalmology.
            We provide patient oriented management of ophthalmic problems by
            integrating and leveraging our combined expertise. The centre
            performs advanced surgical procedures which include most current
            surgical and reconstructive techniques. We have a team of highly
            experienced surgeons which are supported by most advanced medical
            equipment and techniques. Ophthalmology is the branch of medicine
            which deals with the diseases and surgery of the visual pathways,
            including the eye, brain and areas surrounding the eye such as the
            lacrimal system and eyelids.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>IOL MICS for Cataract (PHACO-Infinity Alcon).</li>
            <li>Squint Surgery.</li>
            <li>Oculoplastic Surgery.</li>
            <li>Glaucoma Surgery.</li>
            <li>Perimetry.</li>
            <li>Gonioscopy.</li>
            <li>Non Contact Tonometry.</li>
            <li>Nd Yag Laser (Capsulotomy / Iridotomy).</li>
            <li>Fundus Photography & Fluorescein Angiography.</li>
            <li>Retinal Laser Photo Coagulation with Green Laser.</li>
            <li>Intravitreal Injections.</li>
            <li>Retinal Surgery.</li>
            <li>Special Diabetic Clinic.</li>
            <li>O.C.T. (Topcon).</li>
            <li>Retinopathy of Permaturity Screening with Retcam.</li>
            <li>Laser for ROP.</li>
          </ul>
          <h2 className="font-medium">Equipped With :</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Autorefractokeratometer</li>
            <li>Non Contact Tonometer (Topcon)</li>
            <li>Slit Lamp Biomicroscope</li>
            <li>Perimeter (Zeiss)</li>
            <li>IOL Master (Zeiss)</li>
            <li>A-Scan Biometry</li>
            <li>OCT (Topcon)</li>
            <li>Yag Laser (Nidek)</li>
            <li>Green Laser (Nidek)</li>
            <li>Fundus Fluorescein Angiography (Topcon)</li>
            <li>Indirect Green Laser</li>
            <li>ROP Screening RetCam (Trinethra)</li>
            <li>Zeiss Operating Microscope</li>
            <li>Alcon Infinity phacoemulsification Machine</li>
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
