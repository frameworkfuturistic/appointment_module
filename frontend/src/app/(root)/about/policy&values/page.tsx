import React from "react";

const page = () => {
  return (
    <div className="grid relative justify-self-center">
      <img src="/hospital/facility.png" alt="img" className="h-80" />
      <div className="  grid grid-cols-2 items-center justify-center bg-pattern5-bg ">
        {/* OUR VALUES */}
       
        <div className="bg-sky-100 rounded-lg bg-pattern5-bg bg-contain grid grid-flow-row min-w-72  m-8 px-4  text-wrap">
          <h1 className=" bg-sky-300 rounded-lg p-4 text-xl h-16 font-semibold text-sky-700 text-center m-4">
            Our Values
          </h1>
          <ol className="list-decimal flex gap-x-10 place-self-center text-lg">
            <li>Quality</li>
            <li>Compassion</li>
            <li>Integrity</li>
            <li>Dignity</li>
            <li>Responsibility</li>
          </ol>
          <ol className="list-decimal grid grid-flow-row m-8 font-medium">
            <li>
              <strong>Quality:</strong>
              <p className="font-normal">
                We value quality and strive for excellence in everything that we
                do, working together as a team to deliver services exceeding
                expectations. A multidisciplinary committee of physicians,
                nurses, administrators, and board members continuously monitor
                the quality of care.
              </p>
            </li>
            <li>
              <strong>Compassion:</strong>
              <p className="font-normal">
                We deliver our services with care, treating those we serve with
                professionalism, concern, and kindness. We believe that each
                patient is unique and deserves personalized care, respect, and
                appreciation.
              </p>
            </li>
            <li>
              <strong>Integrity:</strong>
              <p className="font-normal">
                We adhere to strong moral principles, operating with honesty and
                ethics in all that we do. Integrity guides our actions and
                decisions, ensuring that we earn the trust of those we serve.
              </p>
            </li>
            <li>
              <strong>Dignity:</strong>
              <p className="font-normal">
                We value the dignity of human life , which is scared and deserve
                respect and fairness. We display care and concern for our
                patient , their families and loved ones , as well as our
                professional colleagues.
              </p>
            </li>
            <li>
              <strong>Responsibility:</strong>
              <p className="font-normal">
                We communicate honestly, operate ethically, and assume
                responsibility for our actions. We are committed to fostering an
                environment that supports learning, adaptation, and growth.
              </p>
            </li>
          </ol>
        </div>

        {/* OUR POLICY */}
     
        <div className="bg-sky-100 rounded-lg bg-pattern5-bg bg-contain grid grid-flow-row min-w-72 m-8 px-4 text-wrap">
          <h1 className="bg-sky-300 rounded-lg p-4 text-xl font-semibold text-sky-700 text-center m-4">
            Our Policy
          </h1>

          <ol className="list-decimal grid grid-flow-row m-8 font-medium">
            <li>
              <strong>Quality Policy::</strong>
              <p className="font-normal">
                We are committed to provide excellent care to our patients in
                the most personal, sympathetic and confidential and dignified
                manner possible.
              </p>
            </li>
            <li>
              <strong>Environmental Policies:</strong>
              <h2>Our Commitments</h2>
              <p className="font-normal">
                We will make every effort to be responsive to the psychosocial
                and cultural values of our patients and their families and honor
                their rights.
              </p>
              <h2>Our Responsibilities</h2>
              <p className="font-normal">
                To ensure the environmental impacts of our activities and
                services are kept to a minimum. Safe disposal of the waste and
                recycling whenever possible.
              </p>
              <h2>Our Strategies</h2>

              <p className="font-normal">
                Integration of the policies, programs, and practices into the
                management of our business.
              </p>
              <p className="font-normal">
                Efficient use of resources, technology, and effective management
                practices to prevent pollution.
              </p>
              <p className="font-normal">
                Manage the wastes in an environmentally acceptable manner that
                prevents pollution.
              </p>
              <p className="font-normal">
                Comply with all applicable legal and corporate requirements
                relating to the environment and adopt current best practices to
                increase environmental performance.
              </p>
              <p className="font-normal">
                Attempt to improve our environmental performances through
                innovations and self-discipline. Conscious attempt to make
                continual improvement, taking into account the expectations of
                the community and the regulators.
              </p>
              <p className="font-normal">
                {" "}
                Communicate the policy to our patrons, employees, visitors,
                contractors, and the public.
              </p>
            </li>
            <li>
              <strong>Safety Policy:</strong>

              <p className="font-normal">
                We are committed to the health and safety of our employees and
                patients and to the safety of their environment.
              </p>
              <p className="font-normal">
                Establish and maintain adequate standards, policies, procedures,
                work practices and maintenance of all the equipment to ensure a
                safe working environment.
              </p>
              <p className="font-normal">
                Maintenance of good housekeeping of the Hospital.
              </p>
              <p className="font-normal">
                Orient and train all staff in safe work practices and procedures
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default page;
