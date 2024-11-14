'use client'

import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { CalendarDays, Hospital, Stethoscope, User, ChevronLeft, ChevronRight, Star, Quote, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const patientReviews = [
  {
    id: 1,
    review: "The care I received was nothing short of exceptional. The doctors' expertise and the staff's compassion made a significant difference in my recovery journey.",
    image: "/people.png",
    name: "Asish Aggarwal",
    occupation: "Software Engineer",
    rating: 5,
    date: "2023-10-15"
  },
  {
    id: 2,
    review: "State-of-the-art facilities combined with a patient-first approach. I felt valued and well-cared for throughout my treatment.",
    image: "/people.png",
    name: "Raghu Singhania",
    occupation: "Business Analyst",
    rating: 5,
    date: "2023-10-20"
  },
  {
    id: 3,
    review: "The clinic's commitment to using cutting-edge technology while maintaining a warm, personal touch is truly commendable.",
    image: "/people.png",
    name: "Ganga Mohini",
    occupation: "Teacher",
    rating: 4,
    date: "2023-10-25"
  },
  {
    id: 4,
    review: "From diagnosis to aftercare, every step was handled with utmost professionalism. I couldn't have asked for better medical attention.",
    image: "/people.png",
    name: "Vikram Mehta",
    occupation: "Architect",
    rating: 5,
    date: "2023-10-30"
  },
  {
    id: 5,
    review: "The follow-up care I received was exceptional. Even after my treatment was complete, the staff checked in regularly to ensure my recovery was on track.",
    image: "/people.png",
    name: "Priya Sharma",
    occupation: "Marketing Executive",
    rating: 5,
    date: "2023-11-05"
  },
]

const stats = [
  { icon: CalendarDays, label: "Years of Experience", value: "09" },
  { icon: Stethoscope, label: "Medical Specialists", value: "25" },
  { icon: Hospital, label: "Advanced Treatments", value: "30" },
  { icon: User, label: "Happy Patients", value: "150+" },
]

export function AdvancedPatientReview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const containerRef = useRef(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const nextTestimonial = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
    }
  }

  const prevTestimonial = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/medical-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: backgroundY
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white to-blue-50 z-10" />
      
      <div className="relative z-20 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          style={{ y: textY }}
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Transforming Lives</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience world-class healthcare backed by years of expertise and thousands of satisfied patients.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 rounded-2xl blur-lg transition-all duration-300 group-hover:from-white/30 group-hover:to-white/10" />
              <Card className="relative shadow-xl rounded-xl border overflow-hidden transition-all duration-300 group-hover:bg-white/20">
                <CardContent className="p-6 flex flex-col items-center">
                  <motion.div 
                    className="mb-4 relative"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full blur-md" />
                    <div className="relative bg-white rounded-full p-3">
                      <stat.icon className="h-8 w-8 text-indigo-600" />
                    </div>
                  </motion.div>
                  <p className="text-gray-900 font-medium text-center mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold text-primary">{stat.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mb-8">
          <h2 className="text-4xl font-bold text-center mb-2 text-gray-900">Patient Stories</h2>
          <p className="text-xl text-center mb-12 text-gray-600">Hear from those we've had the privilege to serve</p>
          <div className="relative">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80"
              onClick={prevTestimonial}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {patientReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 snap-center px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  <Card className={`h-full border-none overflow-hidden transition-all duration-300 ${
                    hoveredIndex === index ? 'shadow-2xl shadow-indigo-500/20' : ''
                  }`}>
                    <CardContent className="p-6 h-full flex flex-col">
                      <Quote className="text-indigo-300 mb-4 h-8 w-8" />
                      <p className="text-gray-900 mb-4 flex-grow">{review.review}</p>
                      <div className="flex items-center mt-auto">
                        <Image
                          src={review.image}
                          alt={review.name}
                          width={50}
                          height={50}
                          className="rounded-full mr-4"
                        />
                        <div>
                          <h3 className="font-semibold text-black">{review.name}</h3>
                          <p className="text-gray-600 text-sm">{review.occupation}</p>
                        </div>
                      </div>
                      <div className="flex mt-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80"
              onClick={nextTestimonial}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300"
            onClick={() => window.open('https://www.google.com/maps/place/Your+Clinic+Name', '_blank')}
          >
            View More on Google Reviews
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AdvancedPatientReview