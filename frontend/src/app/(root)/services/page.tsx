import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import React from "react";

const serviceTypes = [
  { name: "Emergency and Trauma Unit", href: "/" },
  { name: "BLS Ambulance", href: "/" },
  { name: "Dialysis(AKD)", href: "/" },
  { name: "Pharmacy", href: "/" },
  { name: "Front Office", href: "/" },
  { name: "Intensive Care Unit(ICU+HDU)", href: "/" },
  { name: "Ultra Modular Complex OT", href: "/" },
  { name: "Day Care Services", href: "/" },
  { name: "Cashless Services", href: "/" },
];
const roomTypes = [
  { name: "Suite Room", href: "/suite-room" },
  { name: "Deluxe Room", href: "/deluxe-room" },
  { name: "Super Deluxe Room", href: "/super-deluxe-room" },
  { name: "Single Room", href: "/single-room" },
  { name: "Twin Sharing Room", href: "/twin-sharing-room" },
  { name: "General Ward Male", href: "/general-ward-male" },
  { name: "General Ward Female", href: "/general-ward-female" },
];
const diagnosticTypes = [
  { name: " Color Doppler", href: "/" },
  { name: "  CT Scan", href: "/" },
  { name: "  Echocardiography", href: "/" },
  { name: "  Holter Monitoring", href: "/" },
  { name: " TMT", href: "/" },
  { name: "  USG", href: "/" },
  { name: " X-Ray Digital", href: "/" },
];
const pathologyTypes = [
  { name: "  Biochemistry", href: "/" },
  { name: "  Microbiology", href: "/" },
  { name: "  Haematology", href: "/" },
  { name: "  Histopathology", href: "/" },
  { name: "  Serology", href: "/" },
  { name: " Hormone Analysisy", href: "/" },
];
const otherTypes = [
  { name: " Bronchoscopy", href: "/" },
  { name: " Colonoscopy", href: "/" },
  { name: " Upper GI Endoscopy", href: "/" },
  { name: " Physiotherapy", href: "/" },
  { name: " Dietetics", href: "/" },
  { name: " Cafeteria", href: "/" },
];
const page = () => {
  return (
    <>
      <div className="bg-pattern5-bg  grid grid-cols-3 gap-6 justify-center m-10 p-10 ">
        {/* CARD-1 */}
        <Card className="bg-sky-100 grid grid-flow-row text-wrap max-w-72 min-h-96  hover:shadow-2xl hover:shadow-sky-700 ">
          <div className=" place-items-center grid grid-flow-row   ">
            <h1 className="text-lg font-medium border-b-2 place-self-center">
              24x7 Services
            </h1>
            <ul className="grid gap-y-2 px-6">
              {serviceTypes.map((service, index) => (
                <a
                  key={index}
                  href={service.href}
                  className="flex text-sm font-light border-b-2 border-dotted"
                >
                  <Check size={16} color="#0284c7" strokeWidth={1.25} />
                  {service.name}
                </a>
              ))}
            </ul>
          </div>
        </Card>

        {/* CARD-2 */}

        <Card className="bg-sky-100 grid grid-flow-row text-wrap max-w-72 min-h-96  hover:shadow-2xl hover:shadow-sky-700">
          <div className=" place-items-start grid grid-flow-row   ">
            <h1 className="text-lg font-medium border-b-2 place-self-center">
              Rooms & Bed Services
            </h1>
            <ul className="grid gap-y-2 px-6">
              {roomTypes.map((room, index) => (
                <a
                  key={index}
                  href={room.href}
                  className="flex text-sm font-light border-b-2 border-dotted"
                >
                  <Check size={16} color="#0284c7" strokeWidth={1.25} />
                  {room.name}
                </a>
              ))}
            </ul>
          </div>
        </Card>

        {/* CARD-3 */}
        <Card className="bg-sky-100 grid grid-flow-row text-wrap max-w-72 min-h-96   hover:shadow-2xl hover:shadow-sky-700">
          <div className=" place-items-start grid grid-flow-row   ">
            <h1 className="text-lg font-medium border-b-2 place-self-center">
              Diagnostic Services
            </h1>
            <ul className="grid gap-y-2 px-6">
              {diagnosticTypes.map((diagnostic, index) => (
                <a
                  key={index}
                  href={diagnostic.href}
                  className="flex text-sm font-light border-b-2 border-dotted"
                >
                  <Check size={16} color="#0284c7" strokeWidth={1.25} />
                  {diagnostic.name}
                </a>
              ))}
            </ul>
          </div>
        </Card>
        {/* CARD-4 */}
        <Card className="bg-sky-100 grid grid-flow-row text-wrap max-w-72 min-h-96  hover:shadow-2xl hover:shadow-sky-700">
          <div className=" place-items-start grid grid-flow-row   ">
            <h1 className="text-lg font-medium border-b-2 place-self-center">
              Pathology Services
            </h1>
            <ul className="grid gap-y-2 px-6">
              {pathologyTypes.map((pathology, index) => (
                <a
                  key={index}
                  href={pathology.href}
                  className="flex text-sm font-light border-b-2 border-dotted"
                >
                  <Check size={16} color="#0284c7" strokeWidth={1.25} />
                  {pathology.name}
                </a>
              ))}
            </ul>
          </div>
        </Card>
        {/* CARD-5 */}
        <Card className=" bg-sky-100 grid grid-flow-row text-wrap max-w-72 min-h-96  hover:shadow-2xl hover:shadow-sky-700">
          <div className=" place-items-start grid grid-flow-row   ">
            <h1 className="text-lg font-medium border-b-2 place-self-center">
              Other Services
            </h1>
            <ul className="grid gap-y-2 px-6">
              {otherTypes.map((other, index) => (
                <a
                  key={index}
                  href={other.href}
                  className="flex text-sm font-light border-b-2 border-dotted"
                >
                  <Check size={16} color="#0284c7" strokeWidth={1.25} />
                  {other.name}
                </a>
              ))}
            </ul>
          </div>
        </Card>
      </div>
      <div className="bg-sky-100 rounded-lg bg-pattern5-bg  bg-contain grid grid-flow-row max-w-[1000px] mx-64 my-10 p-4 space-y-4">
        <h1 className=" bg-sky-300 rounded-lg p-4 text-xl font-semibold text-sky-700">Emergency Services:-</h1>
        <ul className="list-disc pl-8 space-y-4">
          <li>
            {" "}
             The policy at SJHRC is to provide initial medical care to all
            emergency patients & also to guide transfer of patients who do not
            match with the scope of services to a suitable facility.The
            emergency protocol and procedure for emergency care is documented in
            Doc. No. SJHRC/COP/QSP/01. SJHRC do not issue death certificate for
            brought dead cases without a post mortem to ascertain the cause of
            death. Entry is made in brought death register.The policy at SJHRC
            is to handle medico-legal cases as per documented procedure and
            police intimation is also done.• The procedure for handling of
            medico-legal cases is documented in Doc. No. SJHRC/AAC/QSP/02..In
            emergency, resuscitation and stabilization of the patient will be
            carried out first and medico-legal formalities are performed
            subsequently.
          </li>
          <li>
            {" "}
             Patient care is provided in consonance with documented procedure
            described in Doc. No. SJHRC/COP/QSP/01. All the staffs working in
            emergency area are oriented to the policies & procedures through
            periodic internal training and EMOs and Nursing Staff in the
            emergency are trained in BLS as well as ACLS.
          </li>
          <li>
             Admission of patients is documented in patient’s records as well
            as in and Discharge Summary (SJHRC/RG/16).In case of transfer to
            another organization the evidence is documented in patient’s medical
            record.For emergency cases initial medical care is given & then the
            patient is admitted or transferred to another facility with a
            treatment Sheet (SJHRC /FM/03) or sent home as per patient condition
          </li>
          <li>
             The records are maintained in the Emergency Master Register Doc.
            No/ PATIENT TRANSFER RECORD (SJHRC/FM/23)
          </li>
          <li>
             SJHRC is having two in-house ambulances which are equipped with
            Basic Life Support (BLS) facilities. The outsourced ambulance is
            equipped with Advanced Cardiac Life Support (ACLS) facilities and
            MOU
          </li>
          <li>
             Personnel, allotted in the ambulance are trained in BLS and are
            competent to handle medical emergency situations. A critical care
            ambulance is arranged in case of patient is in a critical condition
            or the patient is on ventilator. A doctor & a nurse/GDA staff
            accompany the unstable or critically ill patient. The ambulance
            driver is having valid driving license.
          </li>
        </ul>
      </div>
    </>
  );
};

export default page;
