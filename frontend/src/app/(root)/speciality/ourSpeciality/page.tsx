import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";

const generalSpeciality = [
  { name: " Internal Medician", href: "/ Internal Medician" },
  {
    name: "General & Laparoscopic Surgery",
    href: "/General & Laparoscopic Surgery",
  },
  { name: "Orthopedics", href: "/Orthopedics" },
  { name: "Ophthalmology", href: "/Ophthalmology" },
  { name: " Nephrology", href: "/ Nephrology" },
  { name: "Neurosurgery", href: "/Neurosurgery" },
  { name: " Cardiology", href: "/ Cardiology" },
  { name: " Anaesthesia", href: "/ Anaesthesia" },
  { name: "  Radiology", href: "/  Radiology" },
  { name: " Pathology", href: "/  Pathology" },
  { name: "  Physiotherapy", href: "/ Physiotherapy" },
];
const superSpeciality = [
  { name: "  Joint Replacement", href: "/  Joint Replacement" },
  { name: " Spine Surgery", href: "/  Spine Surgery" },
  { name: "  Micro vascular Surgery", href: "/  Micro vascular Surgery" },
  { name: "  All Trauma Cases", href: "/   All Trauma Cases" },
  {
    name: "  Retina & Vitreous Surgery -Medical Retina Diabetic Retinopathy Treatment, Intravitreal Injection, Laser Photocoagulation -ROP Treatment",
    href: "/ Retina & Vitreous Surgery -Medical Retina Diabetic Retinopathy Treatment, Intravitreal Injection, Laser Photocoagulation -ROP Treatment",
  },
];
const page = () => {
  return (
    <div className="bg-pattern5-bg  grid justify-items-center relative p-4 sm:p-6 md:p-8">
      <div className="relative ">
        <img
          src="/hospital/speciality.png"
          alt="img"
          className="w-full h-96 object-fill"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-4xl sm:text-4xl font-bold text-white">
            Our Speciality
          </h1>
        </div>
      </div>

      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 p-4">
        <Card
          id="CARD1"
          className="bg-rose-100 grid grid-flow-row text-wrap max-w-full sm:max-w-96 min-h-96 hover:shadow-2xl hover:shadow-rose-200"
        >
          <div className="place-items-start grid grid-flow-row m-4">
            <h1 className="text-xl font-medium border-b-2 place-self-center">
              General Speciality
            </h1>
            <ul className="grid gap-y-2 m-4">
              {generalSpeciality.map((speciality, index) => (
                <a
                  key={index}
                  href={speciality.href}
                  className="flex  font-light border-b-2 border-dotted"
                >
                  <Check size={16} color="#0284c7" strokeWidth={1.25} />
                  {speciality.name}
                </a>
              ))}
            </ul>
          </div>
        </Card>
        <Card
          id="CARD2"
          className="bg-rose-100 grid grid-flow-row text-wrap max-w-full sm:max-w-96 min-h-96 hover:shadow-2xl hover:shadow-rose-200"
        >
          <div className="place-items-start grid grid-flow-row m-4">
            <h1 className="text-xl font-medium border-b-2 place-self-center ">
              Super Speciality
            </h1>
            <ul className="grid gap-y-2 m-4">
              {superSpeciality.map((speciality, index) => (
                <a
                  key={index}
                  href={speciality.href}
                  className="flex font-light border-b-2 border-dotted"
                >
                  <Check size={16} color="#0284c7" strokeWidth={1.25} />
                  {speciality.name}
                </a>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default page;
