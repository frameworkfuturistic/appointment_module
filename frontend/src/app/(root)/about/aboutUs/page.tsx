import React from "react";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

import { CalendarDays, Hospital, Stethoscope, User } from "lucide-react";
import { PatientReview } from "@/components/PatientReview";

const Page = () => {
  return (
    <>
     
      <div className="relative">
        <img
          src="/contact-img/cover.png"
          alt="Contact Cover"
          className="w-full h-96 object-fill"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-4xl sm:text-4xl font-bold text-white">
           About Us
          </h1>
        </div>
      </div>

      <div className="grid grid-flow-row justify-items-center bg-pattern4-bg my-8 shadow-lg">
        <div className="max-w-screen-lg w-full py-8 px-4 lg:px-20 space-y-6">
          <h1 className="text-3xl text-rose-700 font-semibold text-center lg:text-left">
            About Jagannath Hospital & Research Centre
          </h1>
          <p className="text-justify">
            Shree Jagannath Hospital & Research Centre is known for state of the
            art medical specialities. Using latest technologies both in IT and
            Healthcare, we have developed an advanced system of treatment in
            diagnostic and therapeutic services. Shree Jagannath Hospital &
            Research Centre is a 100 bedded multispecialty hospital offering
            advanced healthcare services with special emphasis on orthopedic
            surgery, Traumatology, ophthalmology, and advanced clinical
            research. We offer comprehensive inpatient and outpatient services
            to patients. 34 physicians in all medical specialties cover all
            areas of care including orthopedics, physiotherapy, ophthalmology,
            noninvasive cardiology, general medicine, general surgery,
            nephrology, day care, dietetics, general and laparoscopic surgery,
            geriatric medicine, operation theatre, ICU, etc. We have 12-hour OPD
            facilities of all major disciplines and also round-the-clock
            facilities for emergency & investigation, which includes Pathology
            and Imaging. The hospital has an excellent infrastructure, which
            includes five OTs with 100% fresh laminar air flow facilities,
            well-equipped intensive care units.
          </p>

          <h2 className="text-lg font-semibold">Orthopedic Surgery:</h2>
          <p className="text-justify">
            ARTHROPLASTY, Primary and Revision- Hip, Knee, Shoulder, Elbow
            TRAUMA, Complex trauma and reconstructive surgery Flaps, Ilizarov,
            Reimplantation, Interlocking and surface device, External Fixation
            Hand and reconstructive Microvascular surgery. Oncology, Tumour
            excision and reconstruction Megaprosthesis replacement. SPINE,
            Spinal Instrumentation of all segments of spine, Minimally invasive
            Spine Surgery, Sagittal balancing of spine and corrective surgery,
            Endoscopic spinal procedures, Deformities correction of spine.
          </p>

          <div className="bg-rose-100 rounded-lg bg-pattern5-bg bg-contain grid grid-flow-row m-4 lg:m-8 p-10 text-wrap">
            <ol className=" space-y-4 font-medium">
              <li>
                <p>
                  <strong> SJHRC</strong> is a corporate hospital managed by two
                  eminent and very competent medical specialists Dr. Sudhir
                  Kumar, Orthopedic Surgeon and Dr. Vandana Prasad, Ophthalmic
                  Surgeon. Both have mentored entire SJHRC health care team to
                  render medical services to patients with personal care.
                </p>
              </li>
              <li>
                <p>
                  <strong>SJHRC </strong> team respects the rights of patients
                  and their attendants and is ready to share all required
                  information.
                </p>
              </li>
              <li>
                <p>
                  <strong>SJHRC</strong> had trained its staff in ethical values
                  of health care and to serve the patients in professional
                  manner so that the patients gets the best health care.
                </p>
              </li>
              <li>
                <p>
                  <strong>SJHRC</strong> extends its services with Professional
                  Approach And Personal Care irrespective of the admission type.
                </p>
              </li>
            </ol>
          </div>
        </div>
      </div>

      <div className="grid justify-center gap-y-14 px-4 lg:hidden">
        <div className="bg-slate-50 grid grid-flow-col auto-cols-fr bg-pattern4-bg h-auto w-full max-w-screen-lg shadow-lg gap-4 p-4 ">
          <div className="grid grid-flow-row place-items-center py-4 ">
            <CalendarDays
              color="#0284c7"
              strokeWidth={1.25}
              className="bg-white shadow-lg rounded-full h-16 w-16 p-2"
            />
            <p className="text-slate-700 font-medium text-center">
              Years of Experience
            </p>
            <p className="text-3xl">25</p>
          </div>

          <div className="grid grid-flow-row place-items-center py-4">
            <Stethoscope
              color="#0284c7"
              strokeWidth={1.25}
              className="bg-white shadow-lg rounded-full h-16 w-16 p-2"
            />
            <p className="text-slate-700 font-medium text-center">
              Medical Specialist
            </p>
            <p className="text-3xl">25</p>
          </div>
          <div className="grid grid-flow-row place-items-center py-4">
            <Hospital
              color="#0284c7"
              strokeWidth={1.25}
              className="bg-white shadow-lg rounded-full h-16 w-16 p-2"
            />
            <p className="text-slate-700 font-medium text-center">
              Advance Treatment
            </p>
            <p className="text-3xl">25</p>
          </div>
          <div className="grid grid-flow-row place-items-center py-4">
            <User
              color="#0284c7"
              strokeWidth={1.25}
              className="bg-white shadow-lg rounded-full h-16 w-16 p-2"
            />
            <p className="text-slate-700 font-medium text-center">
              Happy Patients
            </p>
            <p className="text-3xl">25</p>
          </div>
        </div>
      </div>
      {/*  Patient Feedback carausel */}
      <PatientReview />
    </>
  );
};

export default Page;
