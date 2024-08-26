import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { CalendarDays, Hospital, Stethoscope, User } from "lucide-react";


const Page = () => {
  return (
    <>
      <div className="relative">
        <img src="/contact-img/cover.png" alt="img" className="w-full h-auto" />
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:mr-80">
          <h1 className="text-2xl font-semibold text-sky-700">About Us</h1>
        </div>
      </div>

      <div className="grid grid-flow-row justify-items-center bg-pattern4-bg my-8 shadow-lg">
        <div className="max-w-screen-lg w-full py-8 px-4 lg:px-20 space-y-6">
          <h1 className="text-3xl text-sky-700 font-semibold text-center lg:text-left">
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

          <div className="bg-sky-100 rounded-lg bg-pattern5-bg bg-contain grid grid-flow-row m-4 lg:m-8 p-10 text-wrap">
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

      <div className="grid justify-center gap-y-14 px-4">
        <div className="bg-slate-50 grid grid-flow-col auto-cols-fr bg-pattern4-bg h-auto w-full max-w-screen-lg shadow-lg gap-4 p-4">
          <div className="grid grid-flow-row place-items-center py-4">
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

      {/* Happy Patient */}
      <div className="bg-dottedmap bg-cover bg-slate-200 my-6 shadow-md">
        <div className="flex flex-col items-center text-center py-8 gap-2">
          <h1>Happy Patients</h1>
          <h2 className="text-2xl font-semibold">What Says Our Patients</h2>
          <img src="/activity.png" alt="icon" className="h-10 w-10" />
          <Carousel className="h-52 w-full max-w-lg">
            <CarouselContent>
              <CarouselItem className="font-light grid grid-flow-row text-center">
                "Medical Centre is a great place to get all of your medical
                needs. I came in for a check-up and did not wait more than 5
                minutes before I was seen. I can only imagine the type of
                service you get for more serious issues. Thanks!"
                <img
                  src="/PROFPIC.jpg"
                  alt="img"
                  className="h-24 w-24 rounded-full place-self-center"
                />
                <h1 className="text-sky-700 font-medium">Patient</h1>
                <p className="text-xs">User</p>
              </CarouselItem>
              <CarouselItem className="font-light grid grid-flow-row text-center">
                "Medical Centre is a great place to get all of your medical
                needs. I came in for a check-up and did not wait more than 5
                minutes before I was seen. I can only imagine the type of
                service you get for more serious issues. Thanks!"
                <img
                  src="/PROFPIC.jpg"
                  alt="img"
                  className="h-24 w-24 rounded-full place-self-center"
                />
                <h1 className="text-sky-700 font-medium">Patient</h1>
                <p className="text-xs">User</p>
              </CarouselItem>
              <CarouselItem className="font-light grid grid-flow-row text-center">
                "Medical Centre is a great place to get all of your medical
                needs. I came in for a check-up and did not wait more than 5
                minutes before I was seen. I can only imagine the type of
                service you get for more serious issues. Thanks!"
                <img
                  src="/PROFPIC.jpg"
                  alt="img"
                  className="h-24 w-24 rounded-full place-self-center"
                />
                <h1 className="text-sky-700 font-medium">Patient</h1>
                <p className="text-xs">User</p>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default Page;
