// eslint-disable-next-line
// @ts-nocheck
'use client'

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Check,
  AlertCircle,
  ChevronRight,
  ChevronUp,
  X,
  ArrowRight,
  Heart,
  Activity,
  Pill,
  UserPlus,
  Bed,
  Microscope,
  Zap,
  Scan,
  Magnet,
  BrainCircuit,
  Radiation,
  HeartPulse,
  CreditCard,
  Clock,
  Hospital,
  Syringe,
  FlaskConical,
  Salad,
  MilkOff,
  Footprints,
  Cog,
  Bone,
  Droplet,
  LucideIcon,
  PillIcon,
  Stethoscope,
  SyringeIcon,
  ActivityIcon,
  Music
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { FaBacteria } from "react-icons/fa"
import HeaderBanner from "@/components/HeaderBanner"

interface ServiceCategory {
  name: string
  icon: LucideIcon
  color: string
  image: string
  about: string
  items: ServiceItem[]
}

interface ServiceItem {
  name: string
  icon: LucideIcon
  description: string
  image: string
  details: string[]
}

const serviceCategories: ServiceCategory[] = [
  {
    name: "24x7 Services",
    icon: Heart,
    color: "bg-blue-100 text-blue-700",
    image: "/placeholder.svg?height=400&width=600&text=24x7+Services",
    about:
      "Our 24x7 services ensure round-the-clock care for all patients, providing continuous support and immediate attention when needed.",
    items: [
      {
        name: "Emergency and Trauma Unit",
        icon: Zap,
        description:
          "24/7 emergency care for critical conditions and injuries.",
        image: "/placeholder.svg?height=300&width=400&text=Emergency+Unit",
        details: [
          "State-of-the-art emergency room equipped to handle all types of medical emergencies",
          "Dedicated trauma bay for immediate care of severely injured patients",
          "Triage system to prioritize critical patients",
          "Direct access to on-call specialists",
          "Fully equipped ambulances for rapid response",
        ],
      },
      {
        name: "BLS Ambulance",
        icon: Activity,
        description: "Basic Life Support ambulances available round the clock.",
        image: "/placeholder.svg?height=300&width=400&text=BLS+Ambulance",
        details: [
          "Modern fleet of ambulances equipped for emergency response",
          "Trained paramedics and EMTs available 24/7",
          "GPS-enabled for quick routing",
          "Essential life-saving equipment on board",
          "Regular maintenance for full readiness",
        ],
      },
      {
        name: "Dialysis (AKD)",
        icon: Activity,
        description:
          "Continuous renal replacement therapy for acute kidney disorders.",
        image: "/placeholder.svg?height=300&width=400&text=Dialysis+Unit",
        details: [
          "Advanced dialysis machines for effective treatment",
          "Consultations with specialized nephrologists",
          "Trained nursing staff in renal care",
          "Flexible scheduling for convenience",
          "Ongoing monitoring for optimized care",
        ],
      },
      {
        name: "Pharmacy",
        icon: Pill,
        description: "Full-service pharmacy open 24 hours a day.",
        image: "/placeholder.svg?height=300&width=400&text=24/7+Pharmacy",
        details: [
          "Wide range of medications available",
          "Experienced pharmacists for consultations",
          "Accurate prescription filling system",
          "Coordination with hospital departments",
          "Home delivery for discharged patients",
        ],
      },
      {
        name: "Front Office",
        icon: UserPlus,
        description: "Always available for inquiries and assistance.",
        image: "/placeholder.svg?height=300&width=400&text=Front+Office",
        details: [
          "24/7 reception for patient and visitor assistance",
          "Multilingual staff for diverse needs",
          "Efficient admission and discharge processes",
          "Information center for services and schedules",
          "Complaint and feedback system",
        ],
      },
      {
        name: "Intensive Care Unit (ICU+HDU)",
        icon: Heart,
        description:
          "Advanced critical care facilities with High Dependency Units.",
        image: "/placeholder.svg?height=300&width=400&text=ICU",
        details: [
          "24/7 monitoring by trained specialists",
          "Cutting-edge medical equipment",
          "Private rooms for patient comfort",
          "Seamless access to diagnostics and specialists",
          "Dedicated infection control measures",
        ],
      },
      {
        name: "Ultra Modular Complex OT",
        icon: Hospital,
        description:
          "Fully equipped operation theatres for all types of surgeries.",
        image: "/placeholder.svg?height=300&width=400&text=Complex+OT",
        details: [
          "Latest surgical technology for precision and safety",
          "Sterile environment with infection control",
          "Advanced anesthesia monitoring systems",
          "Specialized teams for various surgeries",
          "24/7 availability for emergency surgeries",
        ],
      },
      {
        name: "Day Care Services",
        icon: Clock,
        description: "Daycare facilities for minor procedures and surgeries.",
        image: "/placeholder.svg?height=300&width=400&text=Day+Care",
        details: [
          "Efficient procedures with same-day discharge",
          "Dedicated nursing care for post-procedure recovery",
          "State-of-the-art equipment for minor surgeries",
          "Flexible appointment scheduling",
          "Comfortable recovery spaces",
        ],
      },
      {
        name: "Cashless Services",
        icon: CreditCard,
        description:
          "Cashless treatment options available through partner insurance providers.",
        image: "/placeholder.svg?height=300&width=400&text=Cashless+Services",
        details: [
          "Cashless claims for a hassle-free experience",
          "Network of partner insurance providers",
          "Assistance with claim processing",
          "24/7 support for insurance-related queries",
          "Seamless coordination with finance department",
        ],
      },
    ],
  },
  {
    name: "Rooms & Bed Services",
    icon: Bed,
    color: "bg-green-100 text-green-700",
    image: "/placeholder.svg?height=400&width=600&text=Rooms+and+Bed+Services",
    about:
      "We offer a range of comfortable and well-equipped rooms to suit every patient's needs, ensuring a restful and healing environment during their stay.",
    items: [
      {
        name: "Suite Room",
        icon: Bed,
        description:
          "Luxurious accommodations for patients who desire extra comfort.",
        image: "/placeholder.svg?height=300&width=400&text=Suite+Room",
        details: [
          "Spacious room with a living area for visitors",
          "Private bathroom with premium amenities",
          "24/7 personalized nursing care",
          "Gourmet meal options available",
          "Comfortable and restful environment",
        ],
      },
      {
        name: "Deluxe Room",
        icon: Bed,
        description: "Comfortable private rooms with modern amenities.",
        image: "/placeholder.svg?height=300&width=400&text=Deluxe+Room",
        details: [
          "Private room with en-suite bathroom",
          "Adjustable bed for patient comfort",
          "TV and Wi-Fi for entertainment",
          "Daily housekeeping services",
          "Visitor seating for comfort",
        ],
      },
      {
        name: "Super Deluxe Room",
        icon: Bed,
        description: "Extra-spacious room with luxury amenities.",
        image: "/placeholder.svg?height=300&width=400&text=Super+Deluxe+Room",
        details: [
          "Enhanced room size for added comfort",
          "Advanced medical equipment for safety",
          "Private living area and dining space",
          "Personalized meal services",
          "24/7 nursing and doctor care",
        ],
      },
      {
        name: "Single Room",
        icon: Bed,
        description: "Private room for a more personal and quiet environment.",
        image: "/placeholder.svg?height=300&width=400&text=Single+Room",
        details: [
          "Private space with single occupancy",
          "En-suite bathroom for convenience",
          "Television and comfortable seating",
          "Daily maintenance for hygiene",
          "24/7 nursing and doctor rounds",
        ],
      },
      {
        name: "Twin Sharing Room",
        icon: Bed,
        description: "Economical option with two beds per room.",
        image: "/placeholder.svg?height=300&width=400&text=Twin+Sharing+Room",
        details: [
          "Two beds separated by privacy curtains",
          "Shared bathroom and seating area",
          "Visitor space for each patient",
          "Daily maintenance and sanitation",
          "24/7 nursing care",
        ],
      },
      {
        name: "General Ward (Male)",
        icon: Bed,
        description: "Multi-bed wards for male patients.",
        image: "/placeholder.svg?height=300&width=400&text=General+Ward+Male",
        details: [
          "Efficient ward layout for easy monitoring",
          "Shared bathroom and dining area",
          "Communal space for recreation",
          "Regular medical rounds by doctors",
          "Round-the-clock nursing care",
        ],
      },
      {
        name: "General Ward (Female)",
        icon: Bed,
        description: "Multi-bed wards for female patients.",
        image: "/placeholder.svg?height=300&width=400&text=General+Ward+Female",
        details: [
          "Separate ward for female patients",
          "Communal recreation and dining areas",
          "24/7 nursing and medical staff",
          "Privacy measures for comfort",
          "Daily monitoring by doctors",
        ],
      },
    ],
  },
  {
    name: "Diagnostic Services",
    icon: Microscope,
    color: "bg-purple-100 text-purple-700",
    image: "/placeholder.svg?height=400&width=600&text=Diagnostic+Services",
    about:
      "Our state-of-the-art diagnostic services utilize cutting-edge technology to provide accurate and timely results, aiding in precise diagnosis and treatment planning.",
    items: [
      {
        name: "Color Doppler",
        icon: Scan,
        description: "High-resolution imaging for blood flow assessment.",
        image: "/placeholder.svg?height=300&width=400&text=Color+Doppler",
        details: [
          "Real-time color Doppler imaging",
          "Specialized for vascular and cardiac evaluations",
          "Non-invasive and safe procedure",
          "Detailed blood flow assessment",
          "Immediate reporting by specialists",
        ],
      },
      {
        name: "CT Scan",
        icon: Scan,
        description:
          "High-precision imaging for detailed internal assessments.",
        image: "/placeholder.svg?height=300&width=400&text=CT+Scan",
        details: [
          "Advanced multi-slice CT scanner for rapid imaging",
          "3D reconstruction for accurate diagnosis",
          "Non-invasive procedure with quick results",
          "Ideal for trauma, neurological, and vascular imaging",
          "Available 24/7 for emergency cases",
        ],
      },
      {
        name: "MRI",
        icon: Magnet,
        description: "Magnetic resonance imaging for detailed internal scans.",
        image: "/placeholder.svg?height=300&width=400&text=MRI",
        details: [
          "High-definition MRI scanner for detailed imaging",
          "Non-invasive method using magnetic fields",
          "Ideal for soft tissue, brain, and spine analysis",
          "Safe procedure without radiation",
          "Immediate interpretation by experienced radiologists",
        ],
      },
      {
        name: "Ultrasound",
        icon: BrainCircuit,
        description: "Sound wave imaging for a variety of medical conditions.",
        image: "/placeholder.svg?height=300&width=400&text=Ultrasound",
        details: [
          "Non-invasive ultrasound technology",
          "Useful for abdominal, pelvic, and vascular assessments",
          "Safe for all patients including pregnant women",
          "Real-time imaging for quick diagnostics",
          "24/7 availability for emergency diagnostics",
        ],
      },
      {
        name: "X-Ray",
        icon: Radiation,
        description: "Digital X-ray imaging for quick diagnostics.",
        image: "/placeholder.svg?height=300&width=400&text=X-Ray",
        details: [
          "Advanced digital X-ray technology for clearer images",
          "Rapid results for bone fractures and internal injuries",
          "Safe procedure with minimal radiation exposure",
          "Portable X-ray machines for bed-side imaging",
          "24/7 service for emergency cases",
        ],
      },
      {
        name: "ECG",
        icon: HeartPulse,
        description: "Electrocardiogram for monitoring heart activity.",
        image: "/placeholder.svg?height=300&width=400&text=ECG",
        details: [
          "Non-invasive procedure to monitor heart rhythms",
          "Useful for diagnosing heart attacks and arrhythmias",
          "Instant results with real-time monitoring",
          "Performed by trained cardiologists",
          "Available 24/7 for emergency cardiac care",
        ],
      },
    ],
  },
  {
    name: "Pathology Services",
    icon: Microscope,
    color: "bg-red-100 text-red-700",
    image: "/placeholder.svg?height=400&width=600&text=Pathology+Services",
    about:
      "Our comprehensive pathology services are equipped with state-of-the-art diagnostic tools and highly qualified pathologists to ensure accurate and timely results for various tests and analyses. We offer a wide range of pathology services, including biochemistry, microbiology, hematology, histopathology, serology, and hormone analysis to support diagnosis and treatment plans.",
    items: [
      {
        name: "Biochemistry",
        icon: FlaskConical,
        description:
          "Comprehensive biochemical testing for diagnostic purposes.",
        image: "/placeholder.svg?height=300&width=400&text=Biochemistry",
        details: [
          "Analysis of blood and body fluids for metabolic and organ function assessment",
          "Testing for glucose, cholesterol, enzymes, and electrolytes",
          "Advanced equipment for precise and quick results",
          "Vital for diagnosing conditions like diabetes, liver disorders, and kidney diseases",
          "Routine and specialized tests available round the clock",
        ],
      },
      {
        name: "Microbiology",
        icon: Music,
        description:
          "Laboratory analysis of infections and microbial cultures.",
        image: "/placeholder.svg?height=300&width=400&text=Microbiology",
        details: [
          "Detection and identification of bacteria, viruses, fungi, and parasites",
          "Antibiotic sensitivity testing to guide treatment plans",
          "Specialized tests for infectious diseases like tuberculosis, COVID-19, and HIV",
          "State-of-the-art equipment for rapid culture and diagnostic analysis",
          "Infection control and epidemiology services available",
        ],
      },
      {
        name: "Haematology",
        icon: Droplet,
        description:
          "Advanced blood testing for a wide range of medical conditions.",
        image: "/placeholder.svg?height=300&width=400&text=Haematology",
        details: [
          "Complete blood count (CBC) and blood coagulation profiles",
          "Detection and monitoring of blood disorders like anemia, leukemia, and clotting disorders",
          "Specialized equipment for accurate and quick analysis",
          "Bone marrow biopsy services available",
          "Routine and emergency services available 24/7",
        ],
      },
      {
        name: "Histopathology",
        icon: Bone,
        description:
          "Microscopic examination of tissue samples for disease diagnosis.",
        image: "/placeholder.svg?height=300&width=400&text=Histopathology",
        details: [
          "Analysis of biopsies and surgical specimens for cancer and other conditions",
          "Highly trained pathologists for accurate diagnosis",
          "Immunohistochemistry and molecular pathology services",
          "Quick turnaround time for critical diagnostic results",
          "Comprehensive reporting to assist in treatment planning",
        ],
      },
      {
        name: "Serology",
        icon: Syringe,
        description: "Blood tests for detecting antibodies and antigens.",
        image: "/placeholder.svg?height=300&width=400&text=Serology",
        details: [
          "Testing for viral infections like HIV, hepatitis, and dengue",
          "Immunological tests for autoimmune diseases",
          "Accurate and rapid results for infectious disease detection",
          "Safe procedures with highly skilled laboratory technicians",
          "Regular screening tests and diagnostic services available",
        ],
      },
      {
        name: "Hormone Analysis",
        icon: PillIcon,
        description:
          "Specialized testing for endocrine disorders and hormone levels.",
        image: "/placeholder.svg?height=300&width=400&text=Hormone+Analysis",
        details: [
          "Assessment of thyroid, adrenal, and reproductive hormones",
          "Tests for conditions like diabetes, PCOS, and infertility",
          "Advanced technology for accurate and timely results",
          "Routine and specialized tests available for men and women",
          "Consultation with endocrinologists for tailored treatment plans",
        ],
      },
    ],
  },
  {
    name: "Other Services",
    icon: Cog,
    color: "bg-yellow-100 text-yellow-700",
    image: "/placeholder.svg?height=400&width=600&text=Other+Services",
    about:
      "Our hospital provides a variety of additional specialized services to ensure comprehensive care. From diagnostic procedures like endoscopies and bronchoscopies to support services like physiotherapy, dietetics, and even an in-house cafeteria, we cater to every aspect of patient well-being.",
    items: [
      {
        name: "Bronchoscopy",
        icon: Stethoscope,
        description: "A diagnostic procedure to examine the lungs and airways.",
        image: "/placeholder.svg?height=300&width=400&text=Bronchoscopy",
        details: [
          "Minimally invasive procedure using a bronchoscope",
          "Used to diagnose lung infections, blockages, and other conditions",
          "Performed by skilled pulmonologists in a sterile environment",
          "Real-time imaging to guide diagnosis and treatment",
          "Safe procedure with quick recovery time",
        ],
      },
      {
        name: "Colonoscopy",
        icon: SyringeIcon,
        description:
          "Endoscopic examination of the large intestine (colon) for diagnostic purposes.",
        image: "/placeholder.svg?height=300&width=400&text=Colonoscopy",
        details: [
          "Procedure to detect colon polyps, cancer, and other abnormalities",
          "Real-time visualization using a flexible colonoscope",
          "Performed by experienced gastroenterologists",
          "Early detection of colorectal issues for timely intervention",
          "Minimal recovery time and high patient safety",
        ],
      },
      {
        name: "Upper GI Endoscopy",
        icon: ActivityIcon,
        description:
          "Endoscopic procedure to examine the upper gastrointestinal tract.",
        image: "/placeholder.svg?height=300&width=400&text=Upper+GI+Endoscopy",
        details: [
          "Used to diagnose conditions like ulcers, GERD, and esophageal issues",
          "Performed by expert gastroenterologists",
          "Real-time imaging for accurate diagnosis and treatment",
          "Minimally invasive with quick recovery",
          "Safe and efficient procedure with sedation available",
        ],
      },
      {
        name: "Physiotherapy",
        icon: Footprints,
        description:
          "Therapeutic exercises and treatments to aid recovery and improve mobility.",
        image: "/placeholder.svg?height=300&width=400&text=Physiotherapy",
        details: [
          "Personalized treatment plans for musculoskeletal, neurological, and cardiovascular conditions",
          "Specialized in post-operative rehabilitation and injury recovery",
          "Experienced physiotherapists using advanced equipment",
          "Focus on restoring mobility, strength, and functionality",
          "One-on-one sessions and group therapy options available",
        ],
      },
      {
        name: "Dietetics",
        icon: MilkOff,
        description:
          "Nutritional counseling and personalized diet plans for patients.",
        image: "/placeholder.svg?height=300&width=400&text=Dietetics",
        details: [
          "Customized meal plans for various health conditions",
          "Expert dieticians providing nutritional guidance for diabetes, heart disease, obesity, and more",
          "Nutritional support for patients undergoing treatments like chemotherapy and dialysis",
          "Focus on healthy eating habits to improve patient outcomes",
          "Inpatient and outpatient diet consultation services available",
        ],
      },
      {
        name: "Cafeteria",
        icon: Salad,
        description:
          "On-site cafeteria offering healthy meals for patients and visitors.",
        image: "/placeholder.svg?height=300&width=400&text=Cafeteria",
        details: [
          "Wide variety of nutritious and freshly prepared meals",
          "Special dietary options available for patients (low sodium, diabetic, gluten-free, etc.)",
          "Comfortable seating area for patients, visitors, and staff",
          "Open daily with convenient hours",
          "Strict hygiene and quality standards to ensure safe food preparation",
        ],
      },
    ],
  },
];


const emergencyServices: string[] = [
  "The policy at SJHRC is to provide initial medical care to all emergency patients & also to guide transfer of patients who do not match with the scope of services to a suitable facility.",
  "The emergency protocol and procedure for emergency care is documented in Doc. No. SJHRC/COP/QSP/01.",
  "SJHRC do not issue death certificate for brought dead cases without a post mortem to ascertain the cause of death. Entry is made in brought death register.",
  "The policy at SJHRC is to handle medico-legal cases as per documented procedure and police intimation is also done.",
  "The procedure for handling of medico-legal cases is documented in Doc. No. SJHRC/AAC/QSP/02.",
  "In emergency, resuscitation and stabilization of the patient will be carried out first and medico-legal formalities are performed subsequently.",
  "Patient care is provided in consonance with documented procedure described in Doc. No. SJHRC/COP/QSP/01.",
  "All the staffs working in emergency area are oriented to the policies & procedures through periodic internal training and EMOs and Nursing Staff in the emergency are trained in BLS as well as ACLS.",
  "Admission of patients is documented in patient's records as well as in and Discharge Summary (SJHRC/RG/16).",
  "In case of transfer to another organization the evidence is documented in patient's medical record.",
  "For emergency cases initial medical care is given & then the patient is admitted or transferred to another facility with a treatment Sheet (SJHRC /FM/03) or sent home as per patient condition.",
  "The records are maintained in the Emergency Master Register Doc. No/ PATIENT TRANSFER RECORD (SJHRC/FM/23)",
  "SJHRC is having two in-house ambulances which are equipped with Basic Life Support (BLS) facilities. The outsourced ambulance is equipped with Advanced Cardiac Life Support (ACLS) facilities and MOU",
  "Personnel, allotted in the ambulance are trained in BLS and are competent to handle medical emergency situations.",
  "A critical care ambulance is arranged in case of patient is in a critical condition or the patient is on ventilator.",
  "A doctor & a nurse/GDA staff accompany the unstable or critically ill patient.",
  "The ambulance driver is having valid driving license.",
];

interface ServiceCardProps {
  category: ServiceCategory
  isActive: boolean
  onClick: () => void
}

const ServiceCard: React.FC<ServiceCardProps> = ({ category, isActive, onClick }) => {
  const Icon = category.icon
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card
        className={`cursor-pointer transition-all duration-300 ${isActive ? category.color : "bg-white hover:bg-gray-50"
          }`}
        onClick={onClick}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Icon className="w-6 h-6" />
            <span className="text-xl">{category.name}</span>
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

interface ServiceItemProps {
  item: ServiceItem
  category: ServiceCategory
}

const ServiceItem: React.FC<ServiceItemProps> = ({ item, category }) => {
  const Icon = item.icon
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex flex-col items-center p-4 ${category.color} rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}
        >
          <Icon className="w-10 h-10 mb-2" />
          <h3 className="text-lg font-semibold text-center mb-2">
            {item.name}
          </h3>
          <p className="text-sm text-center">{item.description}</p>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[70vw] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            <Icon className="w-8 h-8 mr-2" />
            {item.name}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">About this service:</h3>
            <p className="text-gray-700">{item.description}</p>
            <h3 className="text-xl font-semibold">Key features:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {item.details.map((detail, index) => (
                <li key={index} className="text-gray-700">
                  {detail}
                </li>
              ))}
            </ul>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Category:</span>
              <Badge
                variant="secondary"
                className={`${category.color} text-sm`}
              >
                {category.name}
              </Badge>
            </div>
          </div>
        </div>
        <DialogClose asChild>
          <Button type="button" variant="outline" className="mt-4">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

interface ServiceListProps {
  category: ServiceCategory
}

const ServiceList: React.FC<ServiceListProps> = ({ category }) => {
  const Icon = category.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-white to-gray-100 shadow-lg overflow-hidden">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center space-x-2 text-xl font-bold">
            <Icon className="w-8 h-8" />
            <span>{category.name}</span>
          </CardTitle>
          <CardDescription className="text-sm">
            {category.about}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, index) => (
                <ServiceItem key={index} item={item} category={category} />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </motion.div>
  )
}

const EmergencyServicesAccordion: React.FC = () => {
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
            <span className="text-lg font-semibold">Emergency Services</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ScrollArea className="h-[600px]">
            <ul className="list-disc pl-6 space-y-2">
              {emergencyServices.map((service, index) => (
                <li key={index} className="text-sm text-gray-700">
                  {service}
                </li>
              ))}
            </ul>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(serviceCategories[0])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <HeaderBanner
          title="Our Services"
          subtitle="Comprehensive care for your health and well-being"
          bgImage="/path-to-your-bg-image.jpg"
        />

        <div className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-4 sticky top-4">
                {serviceCategories.map((category, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div>
                        <ServiceCard
                          category={category as Category}
                          isActive={activeCategory.name === category.name}
                          onClick={() => setActiveCategory(category)}
                        />

                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Click to view {category.name}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <ServiceList
                  key={activeCategory.name}
                  category={activeCategory}
                />
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Emergency Services
            </h2>
            <EmergencyServicesAccordion />
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}