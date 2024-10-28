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
          <Title title={" Ophthalmology"} />

          <p>
            In Shree Jagannath Hospital & Research Centre,the department of
            Ophthalmology is dedicated to providing state of the art medical and
            surgical care in all aspects of adult and pediatric ophthalmology.
            We provide patient oriented management of ophthalmic problems by
            integrating and leveraging our combined expertise. The centre
            performs advanced surgical procedures which include most current
            surgical and reconstructive techniques. We have a team of highly
            experienced surgeons which are supported by most advanced medical
            equipment and techniques. Ophthalmology is the branch of medicine
            which deals with the diseases and surgery of the visual pathways,
            including the eye, brain and areas surrounding the eye such as the
            lacrimal system and eyelids.
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>IOL MICS for Cataract (PHACO-Infinity Alcon).</li>
            <li>Squint Surgery.</li>
            <li>Oculoplastic Surgery.</li>
            <li>Glaucoma Surgery.</li>
            <li>Perimetry.</li>
            <li>Gonioscopy.</li>
            <li>Non Contact Tonometry.</li>
            <li>Nd Yag Laser (Capsulotomy / Iridotomy).</li>
            <li>Fundus Photography & Fluorescein Angiography.</li>
            <li>Retinal Laser Photo Coagulation with Green Laser.</li>
            <li>Intravitreal Injections.</li>
            <li>Retinal Surgery.</li>
            <li>Special Diabetic Clinic.</li>
            <li>O.C.T. (Topcon).</li>
            <li>Retinopathy of Permaturity Screening with Retcam.</li>
            <li>Laser for ROP.</li>
          </ul>
          <h2 className="font-medium">Equipped With :</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Autorefractokeratometer</li>
            <li>Non Contact Tonometer (Topcon)</li>
            <li>Slit Lamp Biomicroscope</li>
            <li>Perimeter (Zeiss)</li>
            <li>IOL Master (Zeiss)</li>
            <li>A-Scan Biometry</li>
            <li>OCT (Topcon)</li>
            <li>Yag Laser (Nidek)</li>
            <li>Green Laser (Nidek)</li>
            <li>Fundus Fluorescein Angiography (Topcon)</li>
            <li>Indirect Green Laser</li>
            <li>ROP Screening RetCam (Trinethra)</li>
            <li>Zeiss Operating Microscope</li>
            <li>Alcon Infinity phacoemulsification Machine</li>
          </ul>
        </div>
        {/* DOCTOR's Card */}
        < div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          {indepartmentData.ophthalmology.map((doctor) => (
            <Card
              key={doctor.id}
              className="   h-96  max-w-60 grid grid-flow-row justify-center    border-2 "
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
