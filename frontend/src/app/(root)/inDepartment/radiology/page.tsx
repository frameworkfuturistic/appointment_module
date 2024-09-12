import { Card } from "@/components/ui/card";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import React from "react";
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
            Radiology & Imaging
          </h1>

          <h2 className="font-medium text-lg">Radiology</h2>
          <p>
            The Radiology Department offers its services, to those who come for
            OPD services to patients admitted in Hospital & to those getting
            treatment elsewhere who come to the SJHRC hospital for diagnostic
            services. The Department is is at par with best available in our
            county in terms of systems and personnel. With two full time
            experienced Radiologists the Radiology department is equipped with a
            host of state of the art systems which include-
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>
              Digital Radiography
              <p>
                The SJHRC is equipped with state of the art Digital Radiography
                system , which provides excellent image quality of X-ray films
                instantly for immediate diagnosis and further treatment purpose.
              </p>
            </li>
            <li>
              CT Scan
              <p>
                This ultra fast high resolution CT Scan helps us diagnose
                illnesses accurately and quickly thus ensuring our patients
                receive the right therapy in the shortest possible amount of
                time when they reach the Hospital.
              </p>
            </li>
            <li>
              Ultrasound and colour Doppler
              <p>
                The department is equipped with two numbers of state of the art
                Ultasonography and Doppler systems, to scan different parts of
                the body for detection and assessment of diseases including for
                the , abdomen, chest, limbs / extremities etc.
              </p>
            </li>
            <li>
              ECHO
              <p>
                An echocardiogram, or echo, is a type of ultrasound or sonogram
                imaging test. It uses a transducing device that translates sound
                wave echoes into moving images of the heart. Our doctor uses an
                echocardiogram to look at the heart’s size and structure, and to
                see how well it pumps blood. An echocardiogram evaluates many
                heart problems, including heart murmurs, heart failure, and
                heart valve disease. An echocardiogram is only one method used
                to monitor and diagnose heart conditions.
              </p>
            </li>
          </ul>
        </div>
        {/* DOCTOR's Card */}
        <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          {indepartmentData.radiology.map((doctor) => (
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
