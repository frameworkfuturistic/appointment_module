"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, AlertCircle, ChevronDown, Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import HeaderBanner from '@/components/HeaderBanner'

interface Department {
  name: string;
  phone: string;
  email: string;
}

const departments: Department[] = [
  { name: "Emergency", phone: "+1 (555) 911-1234", email: "emergency@hospital.com" },
  { name: "Cardiology", phone: "+1 (555) 123-4567", email: "cardiology@hospital.com" },
  { name: "Neurology", phone: "+1 (555) 234-5678", email: "neurology@hospital.com" },
  { name: "Pediatrics", phone: "+1 (555) 345-6789", email: "pediatrics@hospital.com" },
  { name: "Oncology", phone: "+1 (555) 456-7890", email: "oncology@hospital.com" },
]

export default function ContactPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { ...formData, department: selectedDepartment })
    // Here you would typically send the form data to your backend
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <motion.div 
        className="absolute inset-0 bg-blue-200 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1 }}
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#0099ff" fillOpacity="0.2" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,117.3C960,107,1056,149,1152,154.7C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </motion.div>
      <HeaderBanner
        title="  Get in Touch"
        subtitle="Expert Insights for Your Well-being"
        bgImage="/images/hospital-banner.jpg"
      />

      <div className="container mx-auto px-4 py-12 relative z-10">
     

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-xl p-8"
          >
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border-0 border-b-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
              />
              <Input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border-0 border-b-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Your Phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="border-0 border-b-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
              />
              <Select onValueChange={setSelectedDepartment}>
                <SelectTrigger className="border-0 border-b-2 border-gray-200 focus:border-blue-500 transition-colors duration-300">
                  <SelectValue placeholder="Select Department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept.name} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                required
                className="min-h-[150px] border-0 border-b-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
              />
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors duration-300">
                <Send className="mr-2 h-5 w-5" /> Send Message
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">Hospital Information</h2>
              <div className="space-y-6">
                <motion.div className="flex items-center space-x-4" whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <MapPin className="text-blue-600 h-6 w-6" />
                  </div>
                  <span className="text-lg">123 Hospital Street, Medical City, HC 12345</span>
                </motion.div>
                <motion.div className="flex items-center space-x-4" whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Phone className="text-blue-600 h-6 w-6" />
                  </div>
                  <span className="text-lg">+1 (555) 123-4567</span>
                </motion.div>
                <motion.div className="flex items-center space-x-4" whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Mail className="text-blue-600 h-6 w-6" />
                  </div>
                  <span className="text-lg">contact@hospital.com</span>
                </motion.div>
                <motion.div className="flex items-center space-x-4" whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Clock className="text-blue-600 h-6 w-6" />
                  </div>
                  <span className="text-lg">Open 24/7 for emergencies</span>
                </motion.div>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 text-red-700">Emergency Contact</h2>
              <div className="flex items-center space-x-4">
                <AlertCircle className="h-8 w-8 text-red-500" />
                <div>
                  <p className="font-semibold text-lg text-red-700">Emergency Hotline:</p>
                  <p className="text-2xl font-bold text-red-600">+1 (555) 911-1234</p>
                </div>
              </div>
            </div>

           
          </motion.div>
        </div>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Find Us</h2>
          <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-xl">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d3662.1559012644075!2d85.3203445!3d23.3825767!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x39f4e1cabc58c68b%3A0xacb8529b237fb943!2sShree%20Jagannath%20Hospital%2C%20Mayor&#39;s%20Road%20-%20Booty%20Road%2C%20Radium%20Rd%2C%20behind%20Machali%20Ghar%20(Aqua%20World)%20and%20Nakshatra%20Van%2C%20Ranchi%20University%2C%20Morabadi%2C%20Ranchi%2C%20Jharkhand%20834001!3m2!1d23.3824796!2d85.32252129999999!5e0!3m2!1sen!2sin!4v1723537495368!5m2!1sen!2sin" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">Connect With Us</h2>
          <div className="flex justify-center space-x-6">
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="text-blue-600 hover:text-blue-700">
              <Facebook className="h-8 w-8" />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="text-blue-400 hover:text-blue-500">
              <Twitter className="h-8 w-8" />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="text-pink-600 hover:text-pink-700">
              <Instagram className="h-8 w-8" />
            </motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }} className="text-blue-700 hover:text-blue-800">
              <Linkedin className="h-8 w-8" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}