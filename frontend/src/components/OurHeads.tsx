'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Search, X, ChevronLeft, ChevronDown, Phone, Mail, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Doctor {
  id: number
  name: string
  title: string
  image: string
  specialization: string
  study: string
  email: string
  website: string
  featured: boolean
}

const doctorData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Ajay Ghosh",
    title: "Chairman Cum Managing director",
    image: "/departmentHeads/sudhir.png",
    specialization: "Orthopedics ",
    study: "M.B.B.S (B.H.U), M.S. Ortho",
    email: "ajay.ghosh@example.com",
    website: "www.drajayghosh.com",
    featured: true
  },
  {
    id: 2,
    name: "Dr. Vandana Prasad",
    title: "director",
    image: "/departmentHeads/vandana.png",
    specialization: "Ophthalmology",
    study: "M.B.B.S (B.H.U), M.S. Ophthalmology. (B.H.U)",
    email: "shailesh.chandra@example.com",
    website: "www.drshaileshchandra.com",
    featured: true
  },
  {
    id: 3,
    name: "Dr. Rakesh Arya",
    title: "Chief Medical Suprintendent",
    image: "/departmentHeads/rakesh.png",
    specialization: "medical ",
    study: "M.B.B.S (G.R.M.C, Gwalior) M.D. (G.R.M.C, Gwalior)",
    email: "prem.kumar@example.com",
    website: "www.drpremkumar.com",
    featured: false
  },
  {
    id: 4,
    name: "Dr. S.P. Mishra",
    title: "Medical Superintendent",
    image: "/departmentHeads/spmishra.png",
    specialization: "Medical ",
    study: "H.O.D (Dental), CCL Central Hospital, Gandhi Nagar, Ranchi",
    email: "prem.kumar@example.com",
    website: "www.drpremkumar.com",
    featured: false
  },
 
]

const AdvancedMedicalExperts: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [filteredDoctors, setFilteredDoctors] = useState(doctorData)
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    const filtered = doctorData.filter(doctor => 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (specialization === '' || doctor.specialization === specialization)
    )
    setFilteredDoctors(filtered)
  }, [searchTerm, specialization])

  const featuredDoctors = doctorData.filter(doctor => doctor.featured)

  const nextCarousel = () => {
    setCarouselIndex((prevIndex) => (prevIndex + 1) % featuredDoctors.length)
  }

  const prevCarousel = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 1 + featuredDoctors.length) % featuredDoctors.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Medical Experts</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rani Hospital is home to 50 eminent doctors in India, most of whom are pioneers in their
            respective fields. Our experts are renowned for developing innovative and revolutionary
            clinical procedures.
          </p>
        </motion.div>

        {/* <div className="mb-12 relative">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Featured Doctors</h2>
          <div className="relative overflow-hidden">
            <motion.div
              className="flex transition-all duration-300 ease-in-out"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {featuredDoctors.map((doctor) => (
                <div key={doctor.id} className="w-full flex-shrink-0">
                  <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex">
                    <div className="w-1/3 relative">
                      <Image
                        src={doctor.image}
                        alt={doctor.name}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="w-2/3 p-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-2">{doctor.name}</h3>
                      <p className="text-xl text-blue-600 mb-4">{doctor.title}</p>
                      <p className="text-gray-600 mb-6">{doctor.specialization}</p>
                      <Button
                        onClick={() => setSelectedDoctor(doctor)}
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-full hover:from-blue-600 hover:to-indigo-700 transition duration-300"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
            <button
              onClick={prevCarousel}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              aria-label="Previous doctor"
            >
              <ChevronLeft className="text-gray-800" size={24} />
            </button>
            <button
              onClick={nextCarousel}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"
              aria-label="Next doctor"
            >
              <ChevronRight className="text-gray-800" size={24} />
            </button>
          </div>
        </div> */}

       

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              layoutId={`doctor-${doctor.id}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative h-64">
                
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute right-0 bg-teal-500 text-white px-4 py-2 rounded-bl-xl text-sm font-semibold">
                  {doctor.specialization}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
              <div className="p-6 relative">
                
                <h2 className="text-xl font-bold text-gray-800 mb-2">{doctor.name}</h2>
                <p className="text-primary text-sm font-medium mb-2">({doctor.title})</p>
                <p className="text-black text-sm font-medium ">{doctor.study}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdvancedMedicalExperts