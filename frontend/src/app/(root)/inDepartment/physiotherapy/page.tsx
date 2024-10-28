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
          width={200}   // Adjust based on the desired aspect ratio
          height={320}  // Maintain the height for responsiveness
          layout="responsive" // Makes the image responsive
          className="h-80" // This will not apply directly since layout="responsive" takes precedence
        />

      </div>
      <div className="grid grid-cols-2 p-2 my-6 ">
        <div className=" bg-pattern5-bg min-w-[800px] space-y-2  mx-8 p-4  text-wrap">
          <Title title={" Physiotherapy"} />

          <h2 className="font-medium">Physiotherapy & Rehabilitation</h2>
          <p>
            Shree Jagannath Hospital & Research Centre provides an exceptional
            patient care in an environment where quality, respect, caring and
            compassion are key features within the centre.
          </p>
          <h2 className="font-medium">Professional Responsibilities :</h2>
          <p>
            Design, co-ordinate and deliver an effective and efficient
            physiotherapy services, in collaboration with the other ward
            seniors, based on assessment of needs. To work with these senior to
            ensure all hospital patients are seen within a timely manneras set
            out by the departmental policies.
          </p>
          <p>
            Develope the administer the highest quality of service by
            identifying and implementation operational procedure in line with
            best practice standard
          </p>
          <h2 className="font-medium">Services provides by us:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Undertake a comprehensive examination/assessment of the
              patient/client or needs of a client group.
            </li>
            <li>
              Evaluate the findings from the examination/assessment to make
              clinical judgments regarding patients.
            </li>
            <li>Formulate a diagnosis, prognosis and plan.</li>
            <li>
              Provide consultation within their expertise and determine when
              patients/clients need to be referred to another healthcare
              professional.
            </li>
            <li>
              Implement a physical therapist intervention/treatment programme.
            </li>
            <li>Determine the outcomes of any interventions/treatments.</li>
            <li>Make recommendations for self-management.</li>
          </ul>
        </div>
        {/* DOCTOR's Card */}
        <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          {indepartmentData.physiotherapy.map((doctor) => (
            <Card
              key={doctor.id}
              className="  h-96  max-w-60 grid grid-flow-row justify-center    border-2 "
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
