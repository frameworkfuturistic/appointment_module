import HeaderBanner from "@/components/HeaderBanner";
import React from "react";

const policies = [
  {
    title: "Quality Policy",
    description:
      "We are committed to providing excellent care to our patients in the most personal, sympathetic, confidential, and dignified manner possible.",
  },
  {
    title: "Environmental Policy",
    commitments: [
      {
        subtitle: "Our Commitments",
        description:
          "We will make every effort to be responsive to the psychosocial and cultural values of our patients and their families and honor their rights.",
      },
      {
        subtitle: "Our Responsibilities",
        description:
          "To ensure the environmental impacts of our activities and services are kept to a minimum. Safe disposal of waste and recycling whenever possible.",
      },
      {
        subtitle: "Our Strategies",
        points: [
          "Integration of policies, programs, and practices into the management of our business.",
          "Efficient use of resources, technology, and effective management practices to prevent pollution.",
          "Manage the wastes in an environmentally acceptable manner that prevents pollution.",
          "Comply with all applicable legal and corporate requirements relating to the environment and adopt current best practices to increase environmental performance.",
          "Attempt to improve our environmental performance through innovations and self-discipline.",
          "Consciously attempt to make continual improvement, considering the expectations of the community and regulators.",
          "Communicate the policy to our patrons, employees, visitors, contractors, and the public.",
        ],
      },
    ],
  },
  {
    title: "Safety Policy",
    description: [
      "We are committed to the health and safety of our employees and patients and to the safety of their environment.",
      "Establish and maintain adequate standards, policies, procedures, work practices, and maintenance of all the equipment to ensure a safe working environment.",
      "Maintenance of good housekeeping of the hospital.",
      "Orient and train all staff in safe work practices and procedures.",
    ],
  },
];

const Page = () => {
  return (
    <div className="relative justify-center">
      {/* Header Image Section */}
      <HeaderBanner
        title="Our Policy"
        subtitle="Providing Exceptional Healthcare with Compassion and Excellence"
        bgImage="/hospital/facility.png" // Replace with your actual image path
      />

      {/* Values and Policy Section */}
      <div className="grid grid-cols-1 mx-0 md:mx-28 gap-8 items-center justify-center bg-pattern5-bg p-8">
        {/* OUR POLICY */}
        <div className="bg-rose-100 rounded-lg p-6">
          <ol className="list-decimal space-y-6 text-lg p-4">
            {policies.map((policy, index) => (
              <li key={index}>
                <strong>{policy.title}:</strong>
                {policy.description ? (
                  Array.isArray(policy.description) ? (
                    policy.description.map((desc, idx) => (
                      <p key={idx} className="text-base">{desc}</p>
                    ))
                  ) : (
                    <p className="text-base">{policy.description}</p>
                  )
                ) : null}

                {policy.commitments && policy.commitments.length > 0 && (
                  policy.commitments.map((commitment, idx) => (
                    <div key={idx} className="mt-4">
                      <h3 className="text-lg font-semibold">{commitment.subtitle}</h3>
                      <p className="text-base">{commitment.description}</p>
                      {commitment.points && (
                        <ul className="list-disc ml-5 space-y-1">
                          {commitment.points.map((point, pointIdx) => (
                            <li key={pointIdx} className="text-base">{point}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Page;
