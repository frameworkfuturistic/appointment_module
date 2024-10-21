"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderBanner from "@/components/HeaderBanner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";

const services = {
  "General Speciality": [
    {
      id: "gen-1",
      title: "Internal Medicine",
      subtitle: "Comprehensive care for adult patients.",
      image: "/speciality/internal-med.png",
      details: [
        "Routine checkups",
        "Chronic disease management",
        "Preventive care",
      ],
    },
    {
      id: "gen-2",
      title: "General & Laparoscopic Surgery",
      subtitle: "Minimally invasive surgical options.",
      image: "/images/surgery.jpg",
      details: ["Appendectomy", "Hernia repair", "Cholecystectomy"],
    },
    {
      id: "gen-3",
      title: "Orthopedics",
      subtitle: "Bone and joint care specialists.",
      image: "/images/orthopedics.jpg",
      details: ["Fracture treatment", "Joint replacements", "Sports medicine"],
    },
    {
      id: "gen-4",
      title: "Ophthalmology",
      subtitle: "Eye care and surgeries.",
      image: "/images/ophthalmology.jpg",
      details: ["Cataract surgery", "Laser treatments", "Eye exams"],
    },
    {
      id: "gen-5",
      title: "Nephrology",
      subtitle: "Kidney health and disease management.",
      image: "/images/nephrology.jpg",
      details: ["Dialysis", "Kidney transplants", "Hypertension management"],
    },
    {
      id: "gen-6",
      title: "Neurosurgery",
      subtitle: "Surgical treatment for nervous system disorders.",
      image: "/images/neurosurgery.jpg",
      details: ["Brain surgery", "Spinal surgery", "Peripheral nerve surgery"],
    },
    {
      id: "gen-7",
      title: "Cardiology",
      subtitle: "Heart health and treatments.",
      image: "/images/cardiology.jpg",
      details: ["Echocardiograms", "Heart bypass surgery", "Angioplasty"],
    },
    {
      id: "gen-8",
      title: "Anaesthesia",
      subtitle: "Safe sedation during procedures.",
      image: "/images/anaesthesia.jpg",
      details: ["General anesthesia", "Sedation techniques", "Pain management"],
    },
    {
      id: "gen-9",
      title: "Radiology",
      subtitle: "Imaging services for diagnosis.",
      image: "/speciality/rad.png",
      details: ["X-rays", "MRIs", "CT scans"],
    },
    {
      id: "gen-10",
      title: "Pathology",
      subtitle: "Diagnostic lab services.",
      image: "/images/pathology.jpg",
      details: ["Blood tests", "Tissue analysis", "Microbiology"],
    },
    {
      id: "gen-11",
      title: "Physiotherapy",
      subtitle: "Rehabilitation and physical therapy.",
      image: "/images/physiotherapy.jpg",
      details: [
        "Rehabilitation after surgery",
        "Pain management",
        "Sports injury treatment",
      ],
    },
  ],
  "Super Speciality": [
    {
      id: "super-1",
      title: "Joint Replacement",
      subtitle: "Advanced orthopedic surgery.",
      image: "/images/joint_replacement.jpg",
      details: ["Knee replacement", "Hip replacement"],
    },
    {
      id: "super-2",
      title: "Spine Surgery",
      subtitle: "Comprehensive spine care.",
      image: "/images/spine_surgery.jpg",
      details: ["Discectomy", "Spinal fusion"],
    },
    {
      id: "super-3",
      title: "Microvascular Surgery",
      subtitle: "Precision surgical procedures.",
      image: "/images/microvascular.jpg",
      details: ["Reconstructive surgery", "Transplantation"],
    },
    {
      id: "super-4",
      title: "All Trauma Cases",
      subtitle: "Emergency trauma care.",
      image: "/images/trauma.jpg",
      details: ["Fractures", "Soft tissue injuries"],
    },
    {
      id: "super-5",
      title: "Retina & Vitreous Surgery",
      subtitle: "Specialized eye treatments.",
      image: "/images/retina_surgery.jpg",
      details: ["Retinal detachment surgery", "Vitrectomy"],
    },
  ],
};

const emergencyServices = [
  { id: 1, description: "Time for initial assessment of indoor patients" },
  {
    id: 2,
    description:
      "Time taken for initial assessment of patients attending Emergency services",
  },
  {
    id: 3,
    description:
      "Percentage of cases (IP) wherein care plan with desired outcomes is documented and countersigned by the clinician",
  },
  {
    id: 4,
    description:
      "Percentage of cases (in patients) wherein screening for nutritional needs has been done",
  },
  {
    id: 5,
    description:
      "Percentage of cases (in patients) wherein the nursing care plan is documented",
  },
  { id: 6, description: "Number of reporting errors per 1000 investigations" },
  { id: 7, description: "Rate of re-dos" },
  {
    id: 8,
    description: "Percentage of reports correlating with clinical diagnosis",
  },
  {
    id: 9,
    description:
      "Percentage of adherence to safety precautions by Employees working in Diagnostics",
  },
  {
    id: 10,
    description:
      "Incidence of medication errors (medication errors per patient days)",
  },
  {
    id: 11,
    description:
      "Percentage of admissions with adverse drug reaction(s) (adverse drug reactions per 100 separations)",
  },
  {
    id: 12,
    description:
      "Percentage of medication charts with error-prone abbreviations",
  },
  {
    id: 13,
    description:
      "Percentage of patients receiving high risk medications developing adverse drug event",
  },
  { id: 14, description: "Percentage of modifications of anesthesia plan" },
  {
    id: 15,
    description: "Percentage of unplanned ventilation following anesthesia",
  },
  { id: 16, description: "Percentage of adverse anesthesia events" },
  { id: 17, description: "Anaesthesia related mortality rate" },
  { id: 18, description: "Percentage of unplanned return to OT" },
  { id: 19, description: "Percentage of rescheduling of surgeries" },
  {
    id: 20,
    description:
      "Percentage of cases by the organization procedure to prevent adverse events like wrong site, wrong patient and wrong surgery have been adhered to",
  },
  {
    id: 21,
    description:
      "Percentage of cases who received appropriate prophylactic antibiotics within the specified time frame",
  },
  {
    id: 22,
    description:
      "Percentage of cases in which the planned surgery is changed intraoperatively",
  },
  { id: 23, description: "Re-exploration rate" },
  {
    id: 24,
    description:
      "Percentage of transfusion reactions recipients. The causes include red blood cells incompatibility sensitivity to the leukocytes, platelets, plasma protein components of the transfused blood; or potassium or citrate preservatives in the bank blood",
  },
  {
    id: 25,
    description: "Percentage of wastage of blood and blood components",
  },
  { id: 26, description: "Percentage of blood components usage" },
  {
    id: 27,
    description: "Turn-around time for issue of blood and blood components",
  },
  { id: 28, description: "Catheter associated urinary tract infection rate" },
  { id: 29, description: "Ventilator associated pneumonia rate" },
  {
    id: 30,
    description: "Central line associated blood stream infection rate",
  },
  { id: 31, description: "Surgical site infection rate" },
  { id: 32, description: "Mortality rate" },
  { id: 33, description: "Return to ICU within 48 hours" },
  {
    id: 34,
    description:
      "Return to the emergency department within 72 hours with similar presenting complaints",
  },
  { id: 35, description: "Re-intubation rate" },
  {
    id: 36,
    description:
      "Percentage of research activities approved by Ethics committee",
  },
  { id: 37, description: "Percentage of patients withdrawing from the study" },
  {
    id: 38,
    description: "Percentage of protocol violations/ deviations reported",
  },
  {
    id: 39,
    description:
      "Percentage of serious adverse events (which have occurred in the organization) reported to the ethics committee within the defined time frame",
  },
  {
    id: 40,
    description:
      "Percentage of drugs and consumables procured by local purchase",
  },
  { id: 41, description: "Percentage of stock outs including emergency drugs" },
  {
    id: 42,
    description:
      "Percentage of drugs and consumables rejected before preparation of Goods Receipt Note (GRN)",
  },
  {
    id: 43,
    description: "Percentage of variations from the procurement process",
  },
  { id: 44, description: "No. of variations observed in mock drills" },
  { id: 45, description: "Incidence of falls" },
  {
    id: 46,
    description:
      "Incidence of hospital associated pressure ulcers after admission (Bed Sore per 1000 patient days)",
  },
  {
    id: 47,
    description: "Percentage of staff provided pre-exposure prophylaxis",
  },
  { id: 48, description: "Bed occupancy rate and average length of stay" },
  { id: 49, description: "OT and ICU utilization rate" },
  { id: 50, description: "Critical equipment downtime" },
  { id: 51, description: "Nurse patient ratio for ICUs and wards" },
  { id: 52, description: "Our Patient Satisfaction index" },
  { id: 53, description: "In patient satisfaction index" },
  {
    id: 54,
    description:
      "Waiting time for services including diagnostics and out-patient consultation",
  },
  { id: 55, description: "Time taken for discharge" },
  { id: 56, description: "Employee satisfaction index" },
  { id: 57, description: "Employee attrition rate" },
  { id: 58, description: "Employee absenteeism rate" },
  {
    id: 59,
    description:
      "Percentage of employees who are aware of employee rights, responsibilities and welfare schemes",
  },
  {
    id: 60,
    description:
      "No. of sentinel events reported, collected and analyzed within the defined time frame",
  },
  { id: 61, description: "Percentage of near misses" },
  { id: 62, description: "Incidence of blood body fluid exposures" },
  { id: 63, description: "Incidence of needle stick injuries" },
  {
    id: 64,
    description: "Percentage of medical records not having discharge summary",
  },
  {
    id: 65,
    description:
      "Percentage of medical records not having codification as per International Classification of Diseases (ICD)",
  },
  {
    id: 66,
    description:
      "Percentage of medical records having incomplete and /or improper consent",
  },
  { id: 67, description: "Percentage of missing records" },
  {
    id: 68,
    description:
      "Appropriate handovers during shift change (to be done separately for doctors and nurses) (per patient per shift)",
  },
  { id: 69, description: "Incidence of patient identification errors" },
  { id: 70, description: "Compliance to hand hygiene practice" },
  {
    id: 71,
    description: "Compliance to rate to Medication Prescription in capitals",
  },
];

function OurSpecialties() {
  const [activeTab, setActiveTab] = useState("General Speciality");
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-repeat"
        style={{
          backgroundImage:
            "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      ></div>
      <HeaderBanner
        title="All Specialities"
        subtitle="Comprehensive care for your health and well-being"
        bgImage="/pattern8.png"
      />
      <div className="container mx-auto px-4 py-8 relative overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full h-full justify-center mb-4 overflow-x-auto flex-nowrap">
            {Object.keys(services).map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="whitespace-nowrap text-lg font-medium "
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(services).map(([category, categoryServices]) => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                {categoryServices.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    onClick={() => handleServiceClick(service)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="container mx-auto py-12 px-4 relative overflow-hidden">
        {/* Emergency Services Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Key performance
          </h2>
          <EmergencyServicesAccordion />
        </div>
      </div>
      {selectedService && (
        <ServiceDetailDialog
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </div>
  );
}

const EmergencyServicesAccordion = () => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="emergency-services"
    >
      <AccordionItem value="emergency-services">
        <AccordionTrigger>
          <div className="flex items-center space-x-2 text-rose-600">
            <AlertCircle />
            <span className="text-lg font-semibold">
              Our Key performance indicators:-
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-[600px]">
            <ol className="list-disc pl-6 space-y-2">
              {emergencyServices.map((service) => (
                <li key={service.id} className="text-sm text-gray-700">
                  {service.description}
                </li>
              ))}
            </ol>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

function ServiceCard({ service, onClick }) {
  return (
    <Card
      className="flex flex-row shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="w-1/3">
        <img
          src={service.image}
          alt={service.title}
          className="h-full w-full object-cover rounded-l-md"
        />
      </div>
      <div className="flex-grow p-4">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {service.title}
          </CardTitle>
          <p className="text-sm text-gray-500">{service.subtitle}</p>
        </CardHeader>
      </div>
    </Card>
  );
}

function ServiceDetailDialog({ service, onClose }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[70vw] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {service.title}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Centered Image */}
          <div className="relative w-full h-64 sm:h-80 lg:h-[400px] flex justify-center">
            <img
              src={service.image}
              alt={service.title}
              className="h-full w-auto max-w-full object-cover rounded-lg"
              style={{ maxWidth: '100%', height: 'auto' }} // Ensures full responsiveness
            />
          </div>

          {/* Service Details */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About this service:</h3>
            <p className="text-gray-700">{service.subtitle}</p>
            <h3 className="text-xl font-semibold">Key features:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {service.details.map((detail, index) => (
                <li key={index} className="text-gray-700">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <DialogClose asChild>
          <Button
            type="button"
            variant="outline"
            className="mt-4"
            onClick={onClose}
          >
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}


export default OurSpecialties;
