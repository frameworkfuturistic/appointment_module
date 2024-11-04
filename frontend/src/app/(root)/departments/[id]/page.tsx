'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, MapPin, Phone, Mail, ArrowLeft, Star, Users, Award, ChevronRight, ChevronDown, Heart, Brain, Bone, Microscope, Baby, Eye, Stethoscope } from 'lucide-react'
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
import { departmentDetails } from '@/json/departmentData'


export default function DepartmentDetail({ params }: { params: { id: string } }) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const [isSticky, setIsSticky] = useState(false)
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const [department, setDepartment] = useState<DepartmentDetail | null>(null)

  useEffect(() => {
    const dept = departmentDetails[params.id]
    if (dept) {
      setDepartment(dept)
    }
  }, [params.id])

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

  if (!department) {
    return <div>Loading...</div>
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
          src={department.image}
          alt={`${department.name} Department`}
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
            {department.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto"
          >
            {department.description}
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
                {department.overview}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {department.features.map((feature) => (
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
                  <span>{department.contactInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span>{department.contactInfo.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  <span>{department.contactInfo.location}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock  className="h-5 w-5 text-blue-500" />
                  <span>{department.contactInfo.hours}</span>
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
            {department.doctors.map((doctor, index) => (
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
          <Tabs defaultValue={department.treatments[0].name} className="w-full">
            <TabsList className="mb-4 flex flex-wrap justify-start">
              {department.treatments.map((treatment) => (
                <TabsTrigger key={treatment.name} value={treatment.name} className="mr-2 mb-2">
                  {treatment.name}
                </TabsTrigger>
              ))}
            </TabsList>
            {department.treatments.map((treatment) => (
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
                          {treatment.preparation.map((step, index) => (
                            <li key={index}>{step}</li>
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
                {department.faqs.map((faq, index) => (
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
          <h2  className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            Take the First Step Towards Better Health
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Our team of expert specialists is here to provide you with world-class care. Don't wait to prioritize your health.
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
                      {selectedDoctor.education.map((edu, index) => (
                        <li key={index}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Availability</h4>
                    {selectedDoctor.availability.map((slot, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{slot.days}</span>
                        <span>{slot.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedDoctor.languages.map((lang, index) => (
                        <Badge key={index} variant="secondary">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Achievements</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedDoctor.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
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