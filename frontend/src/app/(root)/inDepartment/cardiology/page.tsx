import React from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import indepartmentData from "@/json/indepartmentData";
import { Card } from "@/components/ui/card";
import Title from "@/components/Title";
import Image from "next/image";

const page = () => {
  return (
    <div className="grid ">
      <div className="relative justify-self-center">
        <Image
          src="/hospital/speciality.png"
          alt="img"
          width={160}    // Adjust width as appropriate, e.g., half the height if square
          height={320}   // h-80 in Tailwind corresponds to 320px
          className="h-80"
        />
      </div>
      <div className="grid grid-cols-2 p-2 my-6 ">
        <div className=" bg-pattern5-bg min-w-[800px] space-y-2 mx-8 p-4  text-wrap ">
          <Title title={"Cardiology"} />

          <h2 className="font-medium">Cardiology(non-invasive):</h2>
          <p>
            The department of Cardiology at Shree Jagannath Hospital & Research
            Centre, Ranchi provides outstanding care for patients with highly
            qualified, skilled and dedicated professionals from various cardiac
            sub-specialities.
          </p>
        </div>
        {/* DOCTOR's Card */}
        <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          {indepartmentData.cardiology.map((doctor) => (
            <Card
              key={doctor.id}
              className="  h-96  max-w-60 grid grid-flow-row justify-center    border-2  "
            >
              <div className="min-h-24 min-w-full">
                <Image
                  src={doctor.doctorImg} // Assuming doctor.doctorImg is a valid path
                  alt="img"
                  width={500}    // Set width based on your design
                  height={224}   // Maintain the height for correct aspect ratio
                  layout="responsive" // Makes the image responsive
                  className="object-cover" // Use object-cover for maintaining the aspect ratio
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
                      <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                        {doctor.name}
                      </DialogTitle>
                      <DialogDescription className="grid justify-items-center gap-y-4">
                        <Image
                          src={doctor.doctorImg} // Assuming doctor.doctorImg is a valid path
                          alt="img"
                          width={500}    // Set width based on your design
                          height={224}   // Maintain the height for correct aspect ratio
                          layout="responsive" // Makes the image responsive
                          className="object-cover" // Use object-cover for maintaining the aspect ratio
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
