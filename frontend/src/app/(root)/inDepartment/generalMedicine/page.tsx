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
import Title from "@/components/Title";
import Image from "next/image";

const page = () => {
  return (
    <div className="grid ">
      <div className="relative justify-self-center">

        <Image
          src="/hospital/speciality.png"
          alt="img"
          width={200}    // Set the width as appropriate to match the image’s aspect ratio
          height={320}   // h-80 in Tailwind corresponds to 320px
          className="h-80"
        />
      </div>
      <div className="grid grid-cols-2 p-2 my-6 ">
        <div className=" bg-pattern5-bg min-w-[800px] space-y-2  mx-8 p-4  text-wrap">
          <Title title={"Internal Medicine Department"} />

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
              className="  h-96  max-w-60 grid grid-flow-row justify-center    border-2 "
            >
              <div className="min-h-24 min-w-full">
                <Image
                  src={doctor.doctorImg}
                  alt="img"
                  width={500}   // Adjust width to match the aspect ratio or intended layout
                  height={224}  // h-56 in Tailwind corresponds to 224px
                  className="w-full h-56 object-cover"
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
                  <DialogTrigger className="bg-rose-300 shadow-xl text-slate-800  px-4 hover:bg-rose-200 rounded-md font-medium ">
                    Details
                  </DialogTrigger>
                  <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg ">
                    <DialogHeader>
                      <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2   ">
                        {doctor.name}
                      </DialogTitle>
                      <DialogDescription className="grid justify-items-center gap-y-4">
                        <Image
                          src={doctor.doctorImg}
                          alt="img"
                          width={224}   // Adjust width to maintain the aspect ratio (h-56 corresponds to 224px)
                          height={224}  // Setting both width and height to the same value for a circle
                          className="rounded-full h-56 min-w-56"  // Use h-56 for height, and min-w-56 will be handled by width
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
