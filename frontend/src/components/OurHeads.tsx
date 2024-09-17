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

const doctorData = [
  {
    id: 1,
    name: "Dr. Vandana Prasad",
    title: "Director",
    image: "/departmentHeads/vandana1.png",
    details: "M.B.B.S (B.H.U), M.S. Ophthalmology. (B.H.U)",
    former:
      "Lecturer, Dept. of Ophthalmology, (MGIMS), Sevagram, Wardha; H.O.D Dept. Eye, HEC Plant Hospital, Dhurwa, Ranchi",
  },
  {
    id: 2,
    name: "Dr. Sudhir Kumar",
    title: "Chairman Cum Managing director",
    image: "/departmentHeads/sudhir.png",
    details:
      "M.B.B.S (B.H.U), M.S. Ortho. (B.H.U) Fellow in Hand (Bombay ortho. Society) Fellow in spine (world Ortho. Concern) Consultant in Orthopedics & Traumatology Hand, Spine and Micro-reconstructive surgeon",
    former:
      " Professor in Orthopedics RIMS, Ranchi Specialist & Incharge in Orthopedics HEC Hospital, Ranchi Reader in Orthopedics Mahatma Gandhi Institute of Medical Science, Wardha Lecturer (Jr.) Hand Reconstructive Surgery CMC Vellore, Tamil Nadu ",
  },
  {
    id: 3,
    name: "Dr. Rakesh Arya",
    title: "Chief Medical Suprintendent",
    image: "/departmentHeads/rakesh.png",
    details: "M.B.B.S (G.R.M.C, Gwalior) M.D. (G.R.M.C, Gwalior)",
    former:
      "Teacher in G.R medical College, (Gwalior) Specialist in Coal India Ltd. Chief of Medical services, CCL, Ranchi Executive Director medical services Coal India Ltd.",
  },
  {
    id: 4,
    name: "Dr. S.P. Mishra",
    title: "Medical Superintendent",
    image: "/departmentHeads/spmishra.png",
    details: " H.O.D, CCL",
    former:
      " H.O.D (Dental), CCL Central Hospital, Gandhi Nagar, Ranchi Medical superintendent (CCL central Hospital, Ranchi) H.O.D, ISO CELL , CCL Hospital, Ranchi",
  },
];

const OurHeads = () => {
  return (
    <section className="section py-8">
      <div className="bg-pattern4 grid place-content-center w-full px-4">
        <div className="flex flex-col items-center text-center mb-8">
          <Title title={"OUR HEADS"} />
          <Subtitle subtitle={"Heads Of Medical Department"} />
          <img
            src="/activity.png"
            alt="icon"
            className="h-12 w-12 md:h-16 md:w-16"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-6">
          {doctorData.map((doctor) => (
            <Card className="flex flex-col shadow-xl justify-between border-2 transition-transform transform duration-700 ease-in-out hover:scale-105">
              <div className="relative w-full h-[300px] rounded-t-lg overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-fill bg-cover"
                />
                <div className="absolute inset-0 bg-black opacity-0 rounded-t-lg"></div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h1 className="text-lg font-semibold font-serif text-gray-800">
                  {doctor.name}
                </h1>
                <p className="text-sm text-gray-600 mb-4">{doctor.title}</p>
                <Dialog>
                  <DialogTrigger className="bg-rose-300 shadow-xl text-slate-800 py-2 px-4 hover:bg-rose-200 rounded-md font-medium">
                    Details
                  </DialogTrigger>
                  <DialogContent className="w-full max-w-xs sm:max-w-md lg:max-w-lg rounded-lg mx-4 md:mx-auto">
                    <DialogHeader>
                      <DialogTitle className="text-center text-lg sm:text-xl font-semibold text-gray-800 border-b-2 border-rose-500 py-2">
                        {doctor.name}
                      </DialogTitle>
                      <DialogDescription className="flex flex-col items-center gap-4 p-4">
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                        />
                        <div className="text-base sm:text-lg text-gray-700 leading-relaxed text-center">
                          <p>{doctor.details}</p>
                          <p className="mt-4">
                            <span className="font-semibold text-sky-700">
                              Formerly:
                            </span>{" "}
                            {doctor.former}
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
