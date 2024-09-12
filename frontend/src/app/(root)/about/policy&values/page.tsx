import React from "react";

const Page = () => {
  return (
    <div className="grid relative justify-center">
      {/* Header Image Section */}
      <div className="relative">
        <img
          src="/hospital/facility.png"
          alt="img"
          className="w-full h-96 sm:h-[32rem] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            Policy & Values
          </h1>
        </div>
      </div>

      {/* Values and Policy Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-center bg-pattern5-bg p-8">
        {/* OUR VALUES */}
        <div className="bg-rose-100 rounded-lg p-6">
          <h2 className="bg-rose-200 rounded-lg p-4 text-xl font-semibold text-black text-center mb-6">
            Our Values
          </h2>
          <ol className="list-decimal space-y-4 text-lg">
            <li>
              <strong>Quality:</strong> 
              <p className="text-base">
                We value quality and strive for excellence in everything that we do, working together as a team to deliver services exceeding expectations. A multidisciplinary committee of physicians, nurses, administrators, and board members continuously monitor the quality of care.
              </p>
            </li>
            <li>
              <strong>Compassion:</strong>
              <p className="text-base">
                We deliver our services with care, treating those we serve with professionalism, concern, and kindness. Each patient is unique and deserves personalized care, respect, and appreciation.
              </p>
            </li>
            <li>
              <strong>Integrity:</strong>
              <p className="text-base">
                We adhere to strong moral principles, operating with honesty and ethics in all that we do. Integrity guides our actions and decisions, ensuring we earn the trust of those we serve.
              </p>
            </li>
            <li>
              <strong>Dignity:</strong>
              <p className="text-base">
                We value the dignity of human life, which is sacred and deserves respect and fairness. We show care and concern for patients, their families, and professional colleagues.
              </p>
            </li>
            <li>
              <strong>Responsibility:</strong>
              <p className="text-base">
                We communicate honestly, operate ethically, and assume responsibility for our actions. We are committed to fostering an environment that supports learning, adaptation, and growth.
              </p>
            </li>
          </ol>
        </div>

        {/* OUR POLICY */}
        <div className="bg-rose-100 rounded-lg p-6">
          <h2 className="bg-rose-200 rounded-lg p-4 text-xl font-semibold text-black text-center mb-6">
            Our Policy
          </h2>
          <ol className="list-decimal space-y-4 text-lg">
            <li>
              <strong>Quality Policy:</strong>
              <p className="text-base">
                We are committed to providing excellent care to our patients in the most personal, sympathetic, and dignified manner possible.
              </p>
            </li>
            <li>
              <strong>Environmental Policies:</strong>
              <h3 className="text-lg font-semibold">Our Commitments</h3>
              <p className="text-base">
                We will make every effort to be responsive to the psychosocial and cultural values of our patients and their families and honor their rights.
              </p>
              <h3 className="text-lg font-semibold">Our Responsibilities</h3>
              <p className="text-base">
                To ensure the environmental impacts of our activities and services are kept to a minimum. Safe disposal of waste and recycling whenever possible.
              </p>
              <h3 className="text-lg font-semibold">Our Strategies</h3>
              <p className="text-base">
                Integration of policies, programs, and practices into the management of our business. Efficient use of resources, technology, and effective management practices to prevent pollution.
              </p>
            </li>
            <li>
              <strong>Safety Policy:</strong>
              <p className="text-base">
                We are committed to the health and safety of our employees and patients and to the safety of their environment. We maintain high standards to ensure a safe working environment.
              </p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Page;
