import Link from "next/link";
import React from "react";
import { Card } from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Title from "./Title";
import Subtitle from "./Subtitle";
import { Button } from "./ui/button";



const OurHeads = () => {
  return (
    <section className="section">
      <div className="bg-pattern4 grid place-content-center   w-full">
        <div className="flex flex-col items-center text-center  ">
          <Title title={"OUR HEADS"} />
          <Subtitle subtitle={"Heads Of Medical Department"} />
          <img src="/activity.png" alt="icon" className="h-10 w-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 py-2">
          {/* CARD-1 */}
          <Card className="lg:min-h-64 lg:max-w-60 grid grid-flow-row justify-center   border-2   duration-700 ease-in-out hover:scale-110">
            <img
              src="/departmentHeads/sudhir.png"
              alt="Dr. Sudhir Kumar"
              className="rounded-t-lg min-w-60"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold font-serif text-gray-800">
                Dr. Sudhir Kumar
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                Chairman Cum Managing Director
              </p>
              <Dialog>
                <DialogTrigger className=" bg-rose-300 shadow-xl text-slate-800 py-2 px-4 hover:bg-rose-200 rounded-md font-medium  hidden md:block">
                  Details
                </DialogTrigger>
                <DialogContent className="w-full  max-w-xl rounded-lg  ">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold text-gray-800 border-b-2 border-rose-500 py-2">
                      Dr. Sudhir Kumar
                    </DialogTitle>
                    <DialogDescription className="flex flex-col items-center gap-4 p-4">
                      <img
                        src="/departmentHeads/sudhir.png"
                        alt="Dr. Sudhir Kumar"
                        className="w-40 h-40 rounded-full object-cover"
                      />
                      <div className="text-lg text-gray-700 leading-relaxed">
                        <p>
                          M.B.B.S (B.H.U), M.S. Ortho. (B.H.U) Fellow in Hand
                          (Bombay Ortho. Society) Fellow in Spine (World Ortho.
                          Concern) Consultant in Orthopedics & Traumatology
                          Hand, Spine, and Micro-reconstructive Surgeon
                        </p>
                        <p className="mt-4">
                          <span className="font-semibold text-sky-700">
                            Formerly:
                          </span>{" "}
                          Professor in Orthopedics RIMS, Ranchi; Specialist &
                          Incharge in Orthopedics HEC Hospital, Ranchi; Reader
                          in Orthopedics Mahatma Gandhi Institute of Medical
                          Science, Wardha; Lecturer (Jr.) Hand Reconstructive
                          Surgery CMC Vellore, Tamil Nadu
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          {/* Repeat similar structure for CARD-2, CARD-3, and CARD-4 */}

          {/* CARD-2 */}
          <Card className="lg:min-h-64 lg:max-w-60 grid grid-flow-row justify-center   border-2   duration-700 ease-in-out hover:scale-110">
            <img
              src="/departmentHeads/vandana1.png"
              alt="Dr. Vandana Prasad"
              className="rounded-t-lg min-w-60"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold font-serif text-gray-800">
                Dr. Vandana Prasad
              </h1>
              <p className="text-sm text-gray-600 ">Director</p>
              <Dialog>
              <DialogTrigger className=" bg-rose-300 shadow-xl text-slate-800 py-2 px-4 hover:bg-rose-200 rounded-md font-medium  hidden md:block">
                  Details
                </DialogTrigger>
                <DialogContent className="w-full max-w-4xl rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold text-gray-800 border-b-2 border-rose-500 py-2">
                      Dr. Vandana Prasad
                    </DialogTitle>
                    <DialogDescription className="flex flex-col items-center gap-4 p-4">
                      <img
                        src="/departmentHeads/vandana.png"
                        alt="Dr. Vandana Prasad"
                        className="w-40 h-40 rounded-full object-cover"
                      />
                      <div className="text-lg text-gray-700 leading-relaxed">
                        <p>M.B.B.S (B.H.U), M.S. Ophthalmology. (B.H.U)</p>
                        <p className="mt-4">
                          <span className="font-semibold text-sky-700">
                            Formerly:
                          </span>{" "}
                          Lecturer, Dept. of Ophthalmology, (MGIMS), Sevagram,
                          Wardha; H.O.D Dept. Eye, HEC Plant Hospital, Dhurwa,
                          Ranchi
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          {/* CARD-3 */}
          <Card className="lg:min-h-64 lg:max-w-60 grid grid-flow-row justify-center   border-2   duration-700 ease-in-out hover:scale-110">
            <img
              src="/departmentHeads/rakesh.png"
              alt="Dr. Rakesh Arya"
              className="rounded-t-lg min-w-60"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold font-serif text-gray-800">
                Dr. Rakesh Arya
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                Chief Medical Superintendent
              </p>
              <Dialog>
              <DialogTrigger className=" bg-rose-300 shadow-xl text-slate-800 py-2 px-4 hover:bg-rose-200 rounded-md font-medium  hidden md:block">
                  Details
                </DialogTrigger>
                <DialogContent className="w-full max-w-4xl rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold text-gray-800 border-b-2 border-rose-500 py-2">
                      Dr. Rakesh Arya
                    </DialogTitle>
                    <DialogDescription className="flex flex-col items-center gap-4 p-4">
                      <img
                        src="/departmentHeads/rakesh.png"
                        alt="Dr. Rakesh Arya"
                        className="w-40 h-40 rounded-full object-cover"
                      />
                      <div className="text-lg text-gray-700 leading-relaxed">
                        <p>
                          M.B.B.S (G.R.M.C, Gwalior) M.D. (G.R.M.C, Gwalior)
                        </p>
                        <p className="mt-4">
                          <span className="font-semibold text-sky-700">
                            Formerly:
                          </span>{" "}
                          Teacher in G.R. Medical College, Gwalior; Specialist
                          in Coal India Ltd.; Chief of Medical Services, CCL,
                          Ranchi; Executive Director Medical Services, Coal
                          India Ltd.
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          {/* CARD-4 */}
          <Card className="lg:min-h-64 lg:max-w-60 grid grid-flow-row justify-center   border-2   duration-700 ease-in-out hover:scale-110">
            <img
              src="/departmentHeads/spmishra.png"
              alt="Dr. S.P. Mishra"
              className="rounded-t-lg min-w-60  object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold font-serif text-gray-800">
                Dr. S.P. Mishra
              </h1>
              <p className="text-sm text-gray-600 mb-4">
                Medical Superintendent
              </p>
              <Dialog>
              <DialogTrigger className=" bg-rose-300 shadow-xl text-slate-800 py-2 px-4 hover:bg-rose-200 rounded-md font-medium  hidden md:block">
                  Details
                </DialogTrigger>
                <DialogContent className="w-full max-w-4xl rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl font-semibold text-gray-800 border-b-2 border-rose-500 py-2">
                      Dr. S.P. Mishra
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/departmentHeads/spmishra.png"
                        alt="img"
                        className="rounded-sm min-w-60"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Formerly :</p> H.O.D
                          (Dental), CCL Central Hospital, Gandhi Nagar, Ranchi
                        </p>
                        <p>
                          Medical superintendent (CCL central Hospital, Ranchi)
                          H.O.D, ISO CELL , CCL Hospital, Ranchi
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>

        <p className="text-center my-10 text-xs font-extralight">
          Don’t hesitate, contact us for better help and services{" "}
          <Link href="" className="text-sky-600">
            Explore all Dr. Team
          </Link>
        </p>
      </div>
    </section>
  );
};

export default OurHeads;
