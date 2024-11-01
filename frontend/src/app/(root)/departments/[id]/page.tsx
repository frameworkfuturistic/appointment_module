"use client"

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Phone, Mail, ArrowLeft, Star, Users, Award, ChevronRight, ChevronDown, Heart } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Doctor {
  id: string;
  name: string;
  title: string;
  image: string;
  specialization: string;
  experience: string;
  education: string[];
  availability: {
    days: string;
    hours: string;
  }[];
  languages: string[];
  achievements: string[];
}

interface Treatment {
  name: string;
  description: string;
  duration: string;
  preparation: string[];
}

interface FAQ {
  question: string;
  answer: string;
}

const doctors: Doctor[] = [
  {
    id: "dr-smith",
    name: "Dr. Sarah Smith",
    title: "Senior Consultant",
    image: "/placeholder.svg?height=400&width=400",
    specialization: "Cardiology",
    experience: "15+ years",
    education: [
      "MBBS - Harvard Medical School",
      "MD - Johns Hopkins University",
      "Fellowship in Cardiology - Mayo Clinic"
    ],
    availability: [
      { days: "Monday - Friday", hours: "9:00 AM - 5:00 PM" },
      { days: "Saturday", hours: "9:00 AM - 1:00 PM" }
    ],
    languages: ["English", "Spanish", "French"],
    achievements: [
      "Best Cardiologist Award 2022",
      "Published 50+ research papers",
      "Performed 1000+ successful surgeries"
    ]
  },
  {
    id: "dr-johnson",
    name: "Dr. Michael Johnson",
    title: "Interventional Cardiologist",
    image: "/placeholder.svg?height=400&width=400",
    specialization: "Interventional Cardiology",
    experience: "12+ years",
    education: [
      "MBBS - Stanford University",
      "MD - Yale School of Medicine",
      "Fellowship in Interventional Cardiology - Cleveland Clinic"
    ],
    availability: [
      { days: "Monday - Thursday", hours: "10:00 AM - 6:00 PM" },
      { days: "Friday", hours: "10:00 AM - 2:00 PM" }
    ],
    languages: ["English", "German"],
    achievements: [
      "Pioneer in minimally invasive cardiac procedures",
      "Developed new stent technology",
      "Trained over 100 cardiologists"
    ]
  },
  {
    id: "dr-patel",
    name: "Dr. Anita Patel",
    title: "Electrophysiologist",
    image: "/placeholder.svg?height=400&width=400",
    specialization: "Cardiac Electrophysiology",
    experience: "10+ years",
    education: [
      "MBBS - University of California, San Francisco",
      "MD - Duke University School of Medicine",
      "Fellowship in Cardiac Electrophysiology - Massachusetts General Hospital"
    ],
    availability: [
      { days: "Tuesday - Friday", hours: "9:00 AM - 5:00 PM" },
      { days: "Saturday", hours: "9:00 AM - 1:00 PM" }
    ],
    languages: ["English", "Hindi", "Gujarati"],
    achievements: [
      "Innovator in cardiac rhythm management",
      "Recipient of Young Investigator Award",
      "Performed 500+ complex ablation procedures"
    ]
  }
]

const treatments: Treatment[] = [
  {
    name: "Coronary Angioplasty",
    description: "A procedure to open blocked or narrowed heart arteries",
    duration: "1-2 hours",
    preparation: [
      "Fast for 6-8 hours before the procedure",
      "Stop certain medications as advised",
      "Arrange for someone to drive you home"
    ]
  },
  {
    name: "Echocardiogram",
    description: "An ultrasound test to evaluate heart structure and function",
    duration: "30-60 minutes",
    preparation: [
      "No special preparation needed",
      "Wear comfortable, loose-fitting clothing",
      "Avoid caffeinated beverages 24 hours before the test"
    ]
  },
  {
    name: "Cardiac Catheterization",
    description: "A procedure to diagnose and treat heart conditions",
    duration: "1-3 hours",
    preparation: [
      "Fast for 6-8 hours before the procedure",
      "Inform your doctor about all medications you're taking",
      "Arrange for someone to drive you home",
      "Plan to stay in the hospital overnight"
    ]
  }
]

const faqs: FAQ[] = [
  {
    question: "What are the common symptoms of heart disease?",
    answer: "Common symptoms include chest pain, shortness of breath, irregular heartbeat, fatigue, and dizziness. However, symptoms can vary between individuals and some people may not show any symptoms at all."
  },
  {
    question: "How often should I have my heart checked?",
    answer: "It's recommended to have a heart health check-up at least once a year, especially if you're over 40 or have risk factors such as high blood pressure, high cholesterol, or a family history of heart disease. Your doctor can advise on the appropriate frequency based on your individual health status."
  },
  {
    question: "Can lifestyle changes really make a difference in heart health?",
    answer: "Absolutely. Lifestyle changes can significantly improve heart health. Regular exercise, a balanced diet low in saturated fats and high in fruits and vegetables, maintaining a healthy weight, not smoking, and managing stress can all contribute to better heart health and reduce the risk of heart disease."
  },
  {
    question: "What's the difference between a heart attack and cardiac arrest?",
    answer: "A heart attack occurs when blood flow to the heart is blocked, usually by a build-up of plaque in the coronary arteries. Cardiac arrest is when the heart suddenly stops beating altogether, often due to electrical disturbances in the heart. While a heart attack can lead to cardiac arrest, they are different conditions requiring different treatments."
  }
]

export default function DepartmentDetail({ params }: { params: { id: string } }) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const [isSticky, setIsSticky] = useState(false)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > window.innerHeight - 80)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Cardiology Department"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/40" />
        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            Cardiology Department
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto"
          >
            World-class cardiac care with advanced technology and expert physicians
          </motion.p>
         
        </div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-10 w-10 text-white" />
        </motion.div>
      </motion.div>

      {/* Sticky Navigation */}
      <div className={`sticky top-0 z-50 bg-white shadow-md transition-all duration-300 ${isSticky ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-between items-center">
            <Link href="/departments" className="flex items-center text-blue-600 hover:text-blue-800 mb-2 sm:mb-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Back to Departments</span>
            </Link>
            <nav className="flex-grow sm:flex-grow-0">
              <ul className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
                <li><a href="#overview" className="text-sm text-gray-600 hover:text-blue-600">Overview</a></li>
                <li><a href="#doctors" className="text-sm text-gray-600 hover:text-blue-600">Doctors</a></li>
                <li><a href="#treatments" className="text-sm text-gray-600 hover:text-blue-600">Treatments</a></li>
                <li><a href="#faqs" className="text-sm text-gray-600 hover:text-blue-600">FAQs</a></li>
              </ul>
            </nav>
            <Button className="mt-2 sm:mt-0 w-full sm:w-auto">Book Appointment</Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        {/* Overview Section */}
        <motion.section
          id="overview"
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
            Department Overview
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Our Cardiology Department is equipped with state-of-the-art technology and staffed by world-renowned heart specialists. We provide comprehensive care for all types of cardiovascular conditions, from preventive screenings to complex surgical procedures.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Advanced Cardiac Imaging",
                  "24/7 Emergency Care",
                  "Minimally Invasive Procedures",
                  "Cardiac Rehabilitation",
                  "Heart Failure Management",
                  "Electrophysiology Services"
                ].map((feature) => (
                  <motion.div
                    key={feature}
                    className="flex items-center space-x-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span>cardiology@hospital.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>Floor 3, East Wing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock  className="h-5 w-5 text-blue-500" />
                  <span>Mon-Fri: 9:00 AM - 5:00 PM</span>
                </div>
                <Button className="w-full mt-4">
                  Book Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.section>

        {/* Doctors Section */}
        <motion.section
          id="doctors"
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
            Our Expert Doctors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="relative h-48 w-48 mx-auto mb-4 rounded-full overflow-hidden">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <CardTitle className="text-center">{doctor.name}</CardTitle>
                    <CardDescription className="text-center">{doctor.title}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Award className="h-4 w-4 text-blue-500" />
                        <span>{doctor.specialization}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>{doctor.experience}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardContent className="pt-0">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setSelectedDoctor(doctor)}
                    >
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Treatments Section */}
        <motion.section
          id="treatments"
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
            Our Treatments
          </h2>
          <Tabs defaultValue={treatments[0].name} className="w-full">
            <TabsList className="mb-4 flex flex-wrap justify-start">
              {treatments.map((treatment) => (
                <TabsTrigger key={treatment.name} value={treatment.name} className="mr-2 mb-2">
                  {treatment.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {treatments.map((treatment) => (
              <TabsContent key={treatment.name} value={treatment.name}>
                <Card>
                  <CardHeader>
                    <CardTitle>{treatment.name}</CardTitle>
                    <CardDescription>{treatment.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span className="font-semibold">Duration:</span>
                        <span>{treatment.duration}</span>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Preparation:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {treatment.preparation.map((step) => (
                            <li key={step}>{step}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.section>

        {/* FAQs Section */}
        <motion.section
          id="faqs"
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
            Frequently Asked Questions
          </h2>
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          className="text-center py-16 bg-blue-50 rounded-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Take the First Step Towards a Healthier Heart
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Our team of expert cardiologists is here to provide you with world-class care. Don't wait to prioritize your heart health.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            Schedule Your Consultation
          </Button>
        </motion.section>
      </div>

      {/* Doctor Details Dialog */}
      <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedDoctor && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedDoctor.name}</DialogTitle>
                <DialogDescription>{selectedDoctor.title}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="relative h-64 w-64 mx-auto rounded-lg overflow-hidden">
                  <Image
                    src={selectedDoctor.image}
                    alt={selectedDoctor.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Education</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedDoctor.education.map((edu) => (
                        <li key={edu}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Availability</h4>
                    {selectedDoctor.availability.map((slot) => (
                      <div key={slot.days} className="flex justify-between text-sm">
                        <span>{slot.days}</span>
                        <span>{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.languages.map((lang) => (
                        <Badge key={lang} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Achievements</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedDoctor.achievements.map((achievement) => (
                        <li key={achievement}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setSelectedDoctor(null)}>Close</Button>
                <Button>Book Appointment</Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}