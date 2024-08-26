import React from "react";

const page = () => {
  return (
    <div className="grid ">
      <div className="relative justify-self-center">
        <img src="/hospital/speciality.png" alt="img" className="h-80" />
      </div>
      <div className="grid grid-cols-2 p-2 my-6 ">
        <div className=" bg-pattern5-bg min-w-[800px] space-y-2 mx-8 p-4  text-wrap ">
          <h1 className="text-4xl text-sky-700 font-serif text-wrap">
            Cardiology
          </h1>

          <h2 className="font-medium">Cardiology(non-invasive):</h2>
          <p>
            The department of Cardiology at Shree Jagannath Hospital & Research
            Centre, Ranchi provides outstanding care for patients with highly
            qualified, skilled and dedicated professionals from various cardiac
            sub-specialities.
          </p>
        </div>
        {/* DOCTOR's CARDS */}
        {/* <div className="grid grid-cols-2 gap-2 p-2 place-items-end ">
          <Card
            id="card1"
            className="  h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  "
          >
            <div className="min-h-24 min-w-full">
              <img
                src="/departmentHeads/sudhir.png"
                alt="img"
                className="w-full h-56 object-cover  "
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Prof.(Dr.) Sudhir Kumar
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: Senior Consultant (Orthopaedics)
              </p>
              <Dialog>
                <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24 ">
                  Details
                </DialogTrigger>
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg ">
                  <DialogHeader>
                    <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                      Dr. Sudhir Kumar
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/departmentHeads/sudhir.png"
                        alt="img"
                        className="rounded-sm min-w-56"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Qualification :</p>{" "}
                          M.B.B.S (B.H.U), M.S. Ortho. (B.H.U) Fellow in Hand
                          (Bombay ortho. Society) Fellow in spine (world Ortho.
                          Concern) Consultant in Orthopedics & Traumatology
                          Hand, Spine and Micro-reconstructive surgeon
                        </p>

                        <p>
                          <p className="text-destructive">Formerly :</p>{" "}
                          Professor in Orthopedics RIMS, Ranchi Specialist &
                          Incharge in Orthopedics HEC Hospital, Ranchi Reader in
                          Orthopedics Mahatma Gandhi Institute of Medical
                          Science, Wardha Lecturer (Jr.) Hand Reconstructive
                          Surgery CMC Vellore, Tamil Nadu
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card
            id="card2"
            className=" h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4   "
          >
            <div className="min-h-24 min-w-full">
              <img
                src="orthopaedics/Drverma.png"
                alt="img"
                className="  w-full h-56 object-cover  "
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2">
              <h1 className="text-lg font-semibold font-serif">
                Prof. (Dr.) Ajay Kumar Verma
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: Senior Consultant (Orthopedics)
              </p>
              <Dialog>
                <DialogTrigger className=" bg-sky-700 rounded-sm place-self-center text-white min-w-24">
                  Details
                </DialogTrigger>
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg text-wrap">
                  <DialogHeader>
                    <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                      Prof. (Dr.) Ajay Kumar Verma
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/orthopaedics/Drverma.png"
                        alt="img"
                        className="rounded-sm max-h-48"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Qualification :</p>{" "}
                          M.B.B.S.(L.N.M.University), M.S.(Ranchi University)
                        </p>

                        <p>
                          <p className="text-destructive">Formerly :</p>Medical
                          Officer(Orthopaedics) in Bihar/Jharkhand,
                          Registrar(RIMS), Assistant Professor in Orthopaedics
                          (RIMS), Associate Professor in Orthopaedics (RIMS),
                          Professor Orthopaedics (RIMS)
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card
            id="card3"
            className=" h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4    "
          >
            <div className="min-h-24 min-w-full ">
              <img
                src="/orthopaedics/Dr Nilay.png"
                alt="img"
                className=" w-full h-56 object-cover  "
              />
            </div>

            <div className="grid grid-flow-row p-2 gap-y-2">
              <h1 className="text-lg font-semibold font-serif">
                Dr. Nilay Kumar
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: Specialist & Consultant (Orthopedics)
              </p>
              <Dialog>
                <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24">
                  Details
                </DialogTrigger>
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg text-wrap">
                  <DialogHeader>
                    <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                      Dr. Nilay Kumar
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/orthopaedics/Dr Nilay.png"
                        alt="img"
                        className="rounded-sm size-48"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Qualification :</p>{" "}
                          M.B.B.S.(M.U.H.S. Nashik), M.S.()
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card
            id="card4"
            className=" h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  "
          >
            <div className="  min-h-24 min-w-full border-2">
              <img
                src="/orthopaedics/bksingh.png"
                alt="img"
                className=" w-full h-full  object-cover"
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr. B.K. Sinha
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: Senior Medical Officer (Orhtopedics)
              </p>
              <Dialog>
                <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24 ">
                  Details
                </DialogTrigger>
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg text-wrap">
                  <DialogHeader>
                    <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                      Dr. B.K. Sinha
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/orthopaedics/bksingh.png"
                        alt="img"
                        className="rounded-sm size-48"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Qualification :</p>{" "}
                          M.B.B.S.Magadh University
                        </p>
                        <p>
                          <p className="text-destructive">Formerly :</p>Medical
                          Officer (Sanctoria Hospital, West Bengal), Medical
                          Supritendent (CCL, Central Hospital Ramgarh), Dy.
                          Chief Medical Officer (CCL Central Hospital, Ramgarh),
                          HOD, Central Medical Stores (CCL Central Hospital,
                          Ramgarh), Member of various Medical Boards of ECL and
                          CCL
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card
            id="card5"
            className=" h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4    "
          >
            <div className="min-h-24 min-w-full ">
              <img
                src="/orthopaedics/hargave.png"
                alt="img"
                className=" w-full h-56 object-cover  "
              />
            </div>

            <div className="grid grid-flow-row p-2 gap-y-2">
              <h1 className="text-lg font-semibold font-serif">
                Dr. B.V. Hargave
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation: (MBBS, DNB Resident) (Orhtopedics)
              </p>
              <Dialog>
                <DialogTrigger className="bg-sky-700 rounded-sm place-self-center text-white min-w-24">
                  Details
                </DialogTrigger>
                <DialogContent className="min-h-[500px] min-w-[1000px] rounded-lg text-wrap">
                  <DialogHeader>
                    <DialogTitle className="place-self-center m-4 p-2 text-xl  border-b-2 border-sky-700  ">
                      Dr. B.V. Hargave
                    </DialogTitle>
                    <DialogDescription className="grid justify-items-center gap-y-4">
                      <img
                        src="/orthopaedics/hargave.png"
                        alt="img"
                        className="rounded-sm size-48"
                      />
                      <div className=" m-8 text-lg space-y-4 text-wrap">
                        <p>
                          <p className="text-destructive">Qualification :</p>{" "}
                          M.B.B.S.(Magadh University)
                        </p>
                        <p>
                          <p className="text-destructive">Formerly:</p> Medical
                          Supritendent in Gandhi Nagar Hospital, Ranchi
                        </p>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </Card>

          <Card
            id="card6"
            className=" h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4    "
          >
            <div className=" min-h-24 min-w-full border-2">
              <img
                src="/orthopaedics/Dr Danish Ejaz (MBBS DNB Resident).png"
                alt="img"
                className=" w-full h-full  object-cover "
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr Danish Ejaj
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation:(MBBS DNB Resident)
              </p>
            </div>
          </Card>

          <Card
            id="card7"
            className="  h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4"
          >
            <div className="min-h-24 min-w-full border-2">
              <img
                src="/orthopaedics/Dr Satyam Kr Singh (MBBS DNB Resident).png"
                alt="img"
                className="w-full h-full  object-cover "
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr.Satyam kr Singh
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation:(MBBS,DNB Resident)
              </p>
            </div>
          </Card>

          <Card
            id="card8"
            className="  h-96  max-w-60 grid grid-flow-row justify-center  hover:border-b-4  hover:border-t-sky-600 hover:border-b-sky-600 border-4  "
          >
            <div className="min-h-24 min-w-full border-2">
              <img
                src="/PROFPIC.png"
                alt="img"
                className="w-full h-full  object-cover"
              />
            </div>
            <div className="grid grid-flow-row p-2 gap-y-2 ">
              <h1 className="text-lg font-semibold font-serif">
                Dr. Nand Kishore Tirkey
              </h1>
              <p className="text-sm font-light  border-b-2">
                Designation:(MBBS,DNB Resident)
              </p>
            </div>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default page;
