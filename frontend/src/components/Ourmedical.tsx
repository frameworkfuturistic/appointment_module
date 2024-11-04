"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Computer, HousePlus, Stethoscope, Award, Star, Users, Clock } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

interface Facility {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface Service {
  name: string;
  icon: string;
  description?: string;
}

interface Achievement {
  icon: React.ElementType;
  title: string;
  value: string;
}

const facilities: Facility[] = [
  {
    icon: HousePlus,
    title: "Quality & Safety",
    description: "Our hospital utilizes state-of-the-art technology and employs a team of true experts.",
  },
  {
    icon: Computer,
    title: "Leading Technology",
    description: "We leverage cutting-edge medical technology to provide the best care possible.",
  },
  {
    icon: Stethoscope,
    title: "Experts by Experience",
    description: "Our team of experienced doctors ensures the highest quality of care.",
  },
  {
    icon: Users,
    title: "Patient-Centered Care",
    description: "We prioritize patient needs and provide personalized care for better outcomes.",
  },
];

const services: Service[] = [
  { name: "NABH accredited hospital offering best-in-class services", icon: "/hospital/nabhlogo.png", description: "Ensuring quality and safety in healthcare delivery" },
  { name: "Latest high-end technology", icon: "/hospital/tech.png", description: "State-of-the-art equipment for accurate diagnosis and treatment" },
  { name: "Caring systems and processes", icon: "/hospital/care.png", description: "Streamlined processes for efficient patient care" },
]



function HospitalHero() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="min-h-fit bg-gradient-to-b from-blue-50 to-white ">
      <div className="container mx-auto px-4 py-12  ">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Your Health, <span className="text-primary">Our Priority</span>
            </h1>
            <p className="text-lg text-gray-600">
              Our superspecialist doctors provide the highest quality of care through a team-based, doctor-led model. Trained at some of
              the world's most renowned institutions, our highly experienced doctors are distinguished experts in their respective specialities.
            </p>
          </motion.div>
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <CardContent className="p-4 flex items-center">
                    <div className="mr-4 relative">
                      <Image
                        src={service.icon}
                        alt={service.name}
                        width={64}
                        height={64}
                        className="rounded-full transition-transform duration-300 group-hover:scale-110"
                      />
                      {hoveredIndex === index && (
                        <motion.div
                          className="absolute inset-0  bg-opacity-20 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:shadow-primary/20 hover:-translate-y-1 hover:scale-105 hover:bg-white">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <facility.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{facility.title}</h3>
                    <p className="text-gray-600">{facility.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

     
      </div>
    </div>
  )
}

export default HospitalHero;