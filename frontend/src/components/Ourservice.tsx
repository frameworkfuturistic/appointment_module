'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import Image from "next/image"

const services = [
  { icon: "/speciality/icons/cardiology_icon.svg.svg", name: "Cardiology", description: "Expert care for heart health and cardiovascular diseases." },
  { icon: "/speciality/icons/neurology.svg.svg", name: "Neurology", description: "Specialized treatment for neurological disorders and brain health." },
  { icon: "/speciality/icons/gastroenterology.svg.svg", name: "Gastroenterology", description: "Comprehensive care for digestive system disorders." },
  { icon: "/speciality/icons/orthopaedic.svg.svg", name: "Orthopedic", description: "Advanced treatments for bone and joint conditions." },
  { icon: "/speciality/icons/oncology_icon.svg.svg", name: "Oncology", description: "Cutting-edge cancer treatments and personalized care." },
  { icon: "/speciality/icons/gynecology.svg.svg", name: "Gynecology", description: "Specialized care for women's reproductive health." },
  { icon: "/speciality/icons/dermatology.svg.svg", name: "Dermatology", description: "Expert skincare and treatment for skin conditions." },
  { icon: "/speciality/icons/ophthalmology.svg.svg", name: "Ophthalmology", description: "Comprehensive eye care and vision correction services." },
  { icon: "/speciality/icons/paediatricurology.svg.svg", name: "Pediatrics", description: "Specialized healthcare for infants, children, and adolescents." },
  { icon: "/speciality/icons/endocrinology.svg.svg", name: "Endocrinology", description: "Treatment for hormonal imbalances and related disorders." },
  { icon: "/speciality/icons/urology.svg.svg", name: "Urology", description: "Specialized care for urinary tract and male reproductive system." },
  { icon: "/speciality/icons/nephrology.svg.svg", name: "Nephrology", description: "Expert care for kidney diseases and disorders." },
  { icon: "/speciality/icons/pulmonology.svg.svg", name: "Pulmonology", description: "Specialized treatment for respiratory and lung conditions." },
  { icon: "/speciality/icons/rheumatology.svg.svg", name: "Rheumatology", description: "Care for autoimmune and inflammatory disorders." },
  { icon: "/speciality/icons/neurology.svg.svg", name: "Neurosurgery", description: "Advanced surgical treatments for neurological conditions." },

  { icon: "/speciality/icons/radiology.svg fill.svg", name: "Radiology", description: "Advanced surgical treatments for neurological conditions." },
  { icon: "/speciality/icons/plasticsurgery.svg.svg", name: "Plastic surgery", description: "Advanced surgical treatments for neurological conditions." },
  { icon: "/speciality/icons/neonatology.svg.svg", name: "Neonatology", description: "Advanced surgical treatments for neurological conditions." },
  { icon: "/speciality/icons/vascularsurgery.svg.svg", name: "Vascular Surgery", description: "Advanced surgical treatments for neurological conditions." },
  { icon: "/speciality/icons/psychiatry.svg.svg", name: "Psychiatry", description: "Advanced surgical treatments for neurological conditions." },
  { icon: "/speciality/icons/dermatology.svg.svg", name: "Dentistry", description: "Advanced surgical treatments for neurological conditions." },
  { icon: "/speciality/icons/ent.svg.svg", name: "ENT ", description: "Advanced surgical treatments for neurological conditions." },
]

const PremiumServices = () => {
  const [selectedService, setSelectedService] = useState(services[0])

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore our Centre of Clinical Excellence
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Shree Jagannath Hospital has dedicated Centres of Excellence for several key specialties and super specialties. They are unique and state-of-the-art facilities spread across several Apollo hospital locations, each standing out as a citadel of world-class clinical outcomes.
          </p>
          <p className="text-lg text-gray-500 mt-4">
            Learn about the world-class healthcare we provide
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-12">
          <div className="w-full lg:w-1/3 hidden lg:flex">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/speciality/speci.png"
                alt="Doctor"
                width={400}
                height={600}
                className="rounded-2xl shadow-2xl object-cover w-full h-[600px]"
              />
            </motion.div>
          </div>
          <div className="w-full lg:w-2/3">
            
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  <AnimatePresence>
                    {services.map((service, index) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Card 
                          className="hover:shadow-lg transition-all duration-300 cursor-pointer"
                          onClick={() => setSelectedService(service)}
                        >
                          <CardContent className="p-4 text-center">
                            <Image
                              src={service.icon}
                              alt={service.name}
                              width={48}
                              height={48}
                              className="mx-auto mb-3"
                            />
                            <h3 className="text-sm font-medium text-gray-900">{service.name}</h3>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              
          </div>
        </div>

        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 bg-white p-8 rounded-2xl shadow-xl"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4">{selectedService.name}</h3>
          <p className="text-lg text-gray-600">{selectedService.description}</p>
        </motion.div> */}
      </div>
    </section>
  )
}

export default PremiumServices