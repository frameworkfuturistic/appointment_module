"use client"

import React, { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Check, AlertCircle, ChevronRight, ChevronUp, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const serviceCategories = [
  {
    name: "24x7 Services",
    icon: "🏥",
    color: "bg-blue-100 text-blue-700",
    image: "/placeholder.svg?height=400&width=600&text=24x7+Services",
    about: "Our 24x7 services ensure round-the-clock care for all patients, providing continuous support and immediate attention when needed.",
    items: [
      {
        name: "Emergency and Trauma Unit",
        description: "24/7 emergency care for critical conditions and injuries.",
        image: "/placeholder.svg?height=300&width=400&text=Emergency+Unit",
        details: [
          "State-of-the-art emergency room equipped to handle all types of medical emergencies",
          "Dedicated trauma bay for immediate care of severely injured patients",
          "Triage system to ensure the most critical patients are seen first",
          "Direct access to on-call specialists in various fields",
          "Fully equipped ambulances for rapid response and patient transport"
        ]
      },
      {
        name: "BLS Ambulance",
        description: "Basic Life Support ambulances available round the clock.",
        image: "/placeholder.svg?height=300&width=400&text=BLS+Ambulance",
        details: [
          "Fleet of modern, well-equipped Basic Life Support ambulances",
          "Trained paramedics and EMTs available 24/7",
          "GPS-enabled for quick response and efficient routing",
          "Equipped with essential life-saving equipment and supplies",
          "Regular maintenance and sanitation to ensure readiness at all times"
        ]
      },
      {
        name: "Dialysis(AKD)",
        description: "Continuous renal replacement therapy for acute kidney disorders.",
        image: "/placeholder.svg?height=300&width=400&text=Dialysis+Unit",
        details: [
          "Advanced dialysis machines for efficient and comfortable treatment",
          "Specialized nephrologists available for consultation",
          "Dedicated nursing staff trained in renal care",
          "Flexible scheduling options for patient convenience",
          "Regular monitoring and adjustment of treatment plans"
        ]
      },
      {
        name: "Pharmacy",
        description: "Full-service pharmacy open 24 hours a day.",
        image: "/placeholder.svg?height=300&width=400&text=24/7+Pharmacy",
        details: [
          "Wide range of prescription and over-the-counter medications",
          "Experienced pharmacists available for consultation",
          "Computerized system for accurate prescription filling",
          "Direct coordination with hospital departments for inpatient medication needs",
          "Home delivery service for discharged patients"
        ]
      },
      {
        name: "Front Office",
        description: "Always available for inquiries and assistance.",
        image: "/placeholder.svg?height=300&width=400&text=Front+Office",
        details: [
          "24/7 reception desk for patient and visitor assistance",
          "Multilingual staff to cater to diverse patient needs",
          "Efficient admission and discharge processes",
          "Information center for hospital services and doctor schedules",
          "Complaint and feedback management system"
        ]
      }
    ],
  },
  {
    name: "Rooms & Bed Services",
    icon: "🛏️",
    color: "bg-green-100 text-green-700",
    image: "/placeholder.svg?height=400&width=600&text=Rooms+and+Bed+Services",
    about: "We offer a range of comfortable and well-equipped rooms to suit every patient's needs, ensuring a restful and healing environment during their stay.",
    items: [
      {
        name: "Suite Room",
        description: "Luxurious accommodations for patients who desire extra comfort.",
        image: "/placeholder.svg?height=300&width=400&text=Suite+Room",
        details: [
          "Spacious room with separate living area for visitors",
          "Private bathroom with premium amenities",
          "Advanced medical equipment integrated discreetly into the room design",
          "24/7 personalized nursing care",
          "Gourmet meal options prepared by our in-house chef"
        ]
      },
      {
        name: "Deluxe Room",
        description: "Comfortable private rooms with modern amenities.",
        image: "/placeholder.svg?height=300&width=400&text=Deluxe+Room",
        details: [
          "Private room with en-suite bathroom",
          "Adjustable bed with remote control",
          "Flat-screen TV and Wi-Fi access",
          "Comfortable seating for visitors",
          "Daily housekeeping and laundry services"
        ]
      },
      {
        name: "Twin Sharing Room",
        description: "Economical option with two beds per room.",
        image: "/placeholder.svg?height=300&width=400&text=Twin+Sharing+Room",
        details: [
          "Two adjustable beds with privacy curtains",
          "Shared bathroom facilities",
          "Individual storage spaces for personal belongings",
          "Common seating area for visitors",
          "TV with headphone options for each patient"
        ]
      },
      {
        name: "General Ward",
        description: "Multi-bed wards for male and female patients.",
        image: "/placeholder.svg?height=300&width=400&text=General+Ward",
        details: [
          "Separate male and female wards",
          "Efficient layout for easy monitoring by nursing staff",
          "Shared bathroom facilities",
          "Communal dining and recreation areas",
          "Regular rounds by doctors and nurses"
        ]
      }
    ],
  },
  {
    name: "Diagnostic Services",
    icon: "🔬",
    color: "bg-purple-100 text-purple-700",
    image: "/placeholder.svg?height=400&width=600&text=Diagnostic+Services",
    about: "Our state-of-the-art diagnostic services utilize cutting-edge technology to provide accurate and timely results, aiding in precise diagnosis and treatment planning.",
    items: [
      {
        name: "CT Scan",
        description: "Computerized tomography for detailed cross-sectional imaging.",
        image: "/placeholder.svg?height=300&width=400&text=CT+Scan",
        details: [
          "Latest multi-slice CT scanner for high-resolution imaging",
          "Rapid scan times to minimize radiation exposure",
          "3D reconstruction capabilities for complex cases",
          "Contrast-enhanced studies available when needed",
          "Immediate reporting by expert radiologists"
        ]
      },
      {
        name: "MRI",
        description: "Magnetic Resonance Imaging for detailed soft tissue visualization.",
        image: "/placeholder.svg?height=300&width=400&text=MRI",
        details: [
          "High-field strength MRI for superior image quality",
          "Open MRI option for claustrophobic patients",
          "Advanced software for functional and spectroscopic imaging",
          "Dedicated pediatric protocols",
          "Noise-reduction technology for patient comfort"
        ]
      },
      {
        name: "X-Ray Digital",
        description: "Digital radiography for quick and precise imaging.",
        image: "/placeholder.svg?height=300&width=400&text=Digital+X-Ray",
        details: [
          "Digital X-ray systems for instant image acquisition",
          "Reduced radiation exposure compared to traditional X-rays",
          "PACS integration for easy image sharing and storage",
          "Portable X-ray units for bedside imaging",
          "Specialized orthopedic and dental X-ray capabilities"
        ]
      },
      {
        name: "Ultrasound",
        description: "Non-invasive imaging using high-frequency sound waves.",
        image: "/placeholder.svg?height=300&width=400&text=Ultrasound",
        details: [
          "Advanced 4D ultrasound technology",
          "Color Doppler for blood flow analysis",
          "Specialized probes for various applications (cardiac, vascular, etc.)",
          "Elastography for tissue stiffness assessment",
          "Contrast-enhanced ultrasound studies available"
        ]
      }
    ],
  },
]

const emergencyServices = [
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
]

const ServiceCard = ({ category, isActive, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Card
        className={`cursor-pointer transition-all duration-300 ${
          isActive ? category.color : "bg-white hover:bg-gray-50"
        }`}
        onClick={onClick}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-3xl">{category.icon}</span>
            <span className="text-xl">{category.name}</span>
          </CardTitle>
        </CardHeader>
      </Card>
    </motion.div>
  )
}

const ServiceItem = ({ item, category }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex items-center space-x-2 ${category.color} rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer`}
        >
          <Check size={16} className="flex-shrink-0" />
          <span className="text-sm font-medium">{item.name}</span>
          <ChevronRight size={16} className="ml-auto" />
        </motion.div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60vw] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="relative h-48 sm:h-64 rounded-lg overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <p className="text-lg font-semibold">About this service:</p>
          <p>{item.description}</p>
          <p className="text-lg font-semibold">Key features:</p>
          <ul className="list-disc pl-5 space-y-1">
            {item.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
          <div className="flex items-center space-x-2">
            <span className="font-semibold">Category:</span>
            <Badge variant="secondary" className={category.color}>
              {category.name}
            </Badge>
          </div>
        </div>
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

const ServiceList = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`bg-rose-50  shadow-lg`}>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="text-3xl">{category.icon}</span>
            <span className="text-2xl">{category.name}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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



const EmergencyServicesAccordion = () => (
  <Accordion type="single" collapsible className="w-full">
    <AccordionItem value="emergency-services">
      <AccordionTrigger>
        <div className="flex items-center space-x-2 text-rose-600">
          <AlertCircle />
          <span className="text-lg font-semibold">Emergency Services</span>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <ScrollArea className="h-[300px]">
          <ul className="list-disc pl-6 space-y-2">
            {emergencyServices.map((service, index) => (
              <li key={index} className="text-sm">{service}</li>
            ))}
          </ul>
        </ScrollArea>
      </AccordionContent>
    </AccordionItem>
  </Accordion>
)

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0])
  const [view, setView] = useState("grid")

  return (
    <TooltipProvider>
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>
      
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {serviceCategories.map((category, index) => (
                  <Tooltip key={index}>
                    <TooltipTrigger asChild>
                      <div>
                        <ServiceCard
                          category={category}
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
                <ServiceList key={activeCategory.name} category={activeCategory} />
              </AnimatePresence>
              
            </div>
          </div>
       
        <div className="mt-12 flex justify-center">
          <EmergencyServicesAccordion />
        </div>
        
      </div>
    </TooltipProvider>
  )
}