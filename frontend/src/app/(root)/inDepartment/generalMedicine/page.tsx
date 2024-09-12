import React from "react";
import { Card } from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import indepartmentData from "@/json/indepartmentData";

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
        {/* DOCTOR's Card */}
        <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          {indepartmentData.generalMedicine.map((doctor) => (
            <Card
              key={doctor.id}
              className="  h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  "
            >
              <div className="min-h-24 min-w-full">
                <img
                  src={doctor.doctorImg}
                  alt="img"
                  className="w-full h-56 object-cover  "
                />
              </div>
              <div className="grid grid-flow-row p-2 gap-y-2 ">
                <h1 className="text-lg font-semibold font-serif">
                  {doctor.name}
                </h1>
                <p className="text-sm font-light  border-b-2">
                  Designation:{doctor.designation}
                </p>
                <Dialog>
                  <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24 ">
                    Details
                  </DialogTrigger>
                  <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg ">
                    <DialogHeader>
                      <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                        {doctor.name}
                      </DialogTitle>
                      <DialogDescription className="grid justify-items-center gap-y-4">
                        <img
                          src={doctor.doctorImg}
                          alt="img"
                          className="rounded-full h-56 min-w-56"
                        />
                        <div className=" m-8 text-lg space-y-4 text-wrap">
                          <p>
                            <p className="text-destructive">Qualification :</p>{" "}
                            {doctor.qualification}
                          </p>

                          <p>
                            <p className="text-destructive">Formerly :</p>{" "}
                            {doctor.formerly}
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
      </div>
    </div>
  );
};

export default page;
