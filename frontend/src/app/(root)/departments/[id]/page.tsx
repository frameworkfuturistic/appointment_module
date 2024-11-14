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
import { departmentDetails, DepartmentDetail, Doctor } from '@/json/departmentData'

export default function DepartmentDetail({ params }: { params: { id: string } }) {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  // Remove the following line:
  // const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const [isSticky, setIsSticky] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })
  const [department, setDepartment] = useState<DepartmentDetail | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDepartment = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      const dept = departmentDetails[params.id]
      if (dept) {
        setDepartment(dept)
      }
      setIsLoading(false)
    }

    fetchDepartment()
  }, [params.id])

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        setIsSticky(window.scrollY > heroRef.current.offsetHeight - 80)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  if (!department) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white">Department not found</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Enhanced Hero Section */}
      <motion.div
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src={department.image}
          alt={`${department.name} Department`}
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/40 backdrop-blur-sm" />
        <div className="relative z-10 text-center text-white px-4 w-full max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
          >
            {department.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-8"
          >
            {department.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Book Appointment
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
              Learn More
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { icon: Users, label: "Specialists", value: "20+" },
              { icon: Award, label: "Years of Excellence", value: "25+" },
              { icon: Heart, label: "Success Rate", value: "99%" },
              { icon: Clock, label: "24/7 Care", value: "Always" },
            ].map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-md p-4"
              >
                <stat.icon className="h-8 w-8 mb-2 mx-auto text-blue-300" />
                <div className="text-2xl md:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <Badge 
          className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700"
          variant="secondary"
        >
          Featured Department
        </Badge>
      </motion.div>

      {/* Sticky Navigation */}
      <motion.nav 
        className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md transition-all duration-300`}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: isSticky ? 1 : 0, y: isSticky ? 0 : -100 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap justify-between items-center">
            <Link href="/departments" className="flex items-center text-blue-600 hover:text-blue-800 mb-2 sm:mb-0">
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Back to Departments</span>
            </Link>
            <nav className="flex-grow sm:flex-grow-0 w-full sm:w-auto">
              <ul className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6">
                {['overview', 'doctors', 'treatments', 'faqs'].map((section) => (
                  <li key={section}>
                    <a href={`#${section}`} className="text-sm text-gray-600 hover:text-blue-600 capitalize">
                      {section}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <Link href="/appointment" className="mt-2 sm:mt-0 w-full sm:w-auto">
              <Button className="w-full sm:w-auto">Book Appointment</Button>
            </Link>
          </div>
        </div>
      </motion.nav>

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
                    <ChevronRight className="h-5 w-5 text-blue-500 flex-shrink-0" />
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
                {[
                  { icon: Phone, text: department.contactInfo.phone },
                  { icon: Mail, text: department.contactInfo.email },
                  { icon: MapPin, text: department.contactInfo.location },
                  { icon: Clock, text: department.contactInfo.hours },
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon className="h-5 w-5 text-blue-500 flex-shrink-0" />
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
                <Button className="w-full mt-4">
                  Book Appointment
                </Button>
                <Button variant="outline" className="w-full mt-4">
                  Enquiry Now
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {department.doctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                layoutId={`doctor-${doctor.id}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedDoctor(doctor)}
                className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative h-64">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
                <div className="p-6 relative">
                  <h2 className="text-md font-bold text-gray-800 mb-2">{doctor.name}</h2>
                  <p className="text-primary text-sm font-medium mb-2">{doctor.title}</p>
                </div>
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
                      <div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
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
      <AnimatePresence>
        {selectedDoctor && (
          <Dialog open={!!selectedDoctor} onOpenChange={() => setSelectedDoctor(null)}>
            <DialogContent className="bg-white text-gray-900 max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-blue-600">{selectedDoctor.name}</DialogTitle>
                  <DialogDescription className="text-gray-700">{selectedDoctor.title}</DialogDescription>
                </DialogHeader>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Image
                      src={selectedDoctor.image}
                      alt={selectedDoctor.name}
                      width={400}
                      height={400}
                      className="rounded-lg"
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
                      <h4 className="font-semibold mb-2">Achievements</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedDoctor.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <Button variant="outline" onClick={() => setSelectedDoctor(null)}>Close</Button>
                  <Button>Book Appointment</Button>
                </div>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  )
}