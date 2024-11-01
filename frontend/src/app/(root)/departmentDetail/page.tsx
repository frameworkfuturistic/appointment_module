"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Search, School } from "lucide-react"
import Image from "next/image"
import HeaderBanner from "@/components/HeaderBanner"
import { Input } from "@/components/ui/input"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Consultant {
  ConsultantID: number;
  ConsultantName: string;
  ProfessionalDegree: string;
  Fee: string | null;
  Department: string | null;
}

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState<Consultant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")



  const specialties = ["All", ...Array.from(new Set(doctors.map(doctor => doctor.Department || "Unknown")))];

  const filteredDoctors = doctors.filter(doctor =>
    (selectedSpecialty === "All" || doctor.Department === selectedSpecialty) &&
    (doctor.ConsultantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (doctor.Department?.toLowerCase() || "").includes(searchTerm.toLowerCase()))
  )

  if (loading) return <strong className="text-center justify-center">Loading...</strong>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HeaderBanner
        title="Our Doctors"
        subtitle="Meet Our Expert Medical Team"
        bgImage="/hospital/doctors-banner.png"
      />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 max-w-md mx-auto">
          <Input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4"
           
          />
          <div className="flex overflow-x-auto whitespace-nowrap mb-2">
            {specialties.map(specialty => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                onClick={() => setSelectedSpecialty(specialty)}
                className="mb-2 mr-2 flex-shrink-0"
              >
                {specialty}
              </Button>
            ))}
          </div>
        </div>

        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {filteredDoctors.map((doctor) => (
              <motion.div
                key={doctor.ConsultantID}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">
                  <div className="p-6 flex flex-col h-full items-center">
                    <div className="mb-4 relative w-24 h-24 mx-auto rounded-full overflow-hidden flex items-center justify-center bg-gray-300">
                      <span className="text-3xl font-bold text-white">
                        {doctor.ConsultantName.charAt(0)}
                      </span>
                    </div>
                    <h2 className="text-xl font-semibold text-center mb-2 text-gray-800">ss</h2>
                    <p className="text-sm text-gray-600 text-center mb-4">{doctor.Department || "Unknown Department"}</p>
                    <div className="text-sm text-center text-gray-600 mb-4">
                      {doctor.Fee ? `Consultation Fee: ${doctor.Fee}` : "Fee details unavailable"}
                    </div>
                    <div className="mt-auto space-y-2">
                      <div className="flex items-center text-sm text-gray-600">
                        <School className="h-4 w-4 mr-2" />
                        {doctor.ProfessionalDegree}
                      </div>
                    </div>
                    <Button variant="default" className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-300">
                      Book Appointment
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default DoctorsPage;
