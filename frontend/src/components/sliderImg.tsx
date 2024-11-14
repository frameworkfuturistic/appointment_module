'use client'

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Star, Clock, MapPin, Phone, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const heroImages = [
  "/sliderPic/min.png",
  "/sliderPic/newreception.png",
  "/sliderPic/sjhrchos1.png",
]

const specialties = [
  { name: "Cardiac Care", icon: "/speciality/SVG.svg" },
  { name: "Renal Care", icon: "/speciality/SVG (1).svg" },
  { name: "Neurosciences", icon: "/speciality/SVG (2).svg" },
  { name: "Gastrosciences", icon: "/speciality/SVG (3).svg" },
  { name: "Orthopaedics", icon: "/speciality/SVG (4).svg" },
]

export function CarouselDemo() {
  const [currentHeroImage, setCurrentHeroImage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMobile, setIsMobile] = useState(true)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentHeroImage((prev) => (prev + 1) % heroImages.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentHeroImage((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }, [])

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(nextSlide, 5000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, nextSlide])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleDotClick = (index: number) => {
    setCurrentHeroImage(index)
    setIsPlaying(false)
  }

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  return (
    <div className="text-white bg-gradient-to-br from-blue-900 to-indigo-900 ">
      <div className=" mx-auto ">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch ">
          {/* Left side - Information */}
          <div className="w-full lg:w-4/12 space-y-4 sm:space-y-6 p-4 sm:p-8 lg:p-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
              Shree Jagannath Hospital & Research Center
            </h1>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="text-yellow-400 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 fill-current" />
                ))}
                <Star className="text-yellow-400 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <span className="text-xl sm:text-2xl font-semibold">4.3</span>
            </div>
            <div className="space-y-2 sm:space-y-4 text-sm sm:text-base md:text-lg">
              <div className="flex items-center">
                <Clock className="mr-2 sm:mr-4 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0 text-blue-300" />
                <span>Open 24/7 for Your Care</span>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 sm:mr-4 h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 flex-shrink-0 text-blue-300" />
                <span>Mayor Road, Behind Machhli Ghar, Ranchi</span>
              </div>
            </div>
            <Link href="/find-doctor" className="block w-full sm:w-auto">
              <Button className="bg-white text-blue-900 hover:bg-blue-100 px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base md:text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl w-full">
                Find a Doctor
              </Button>
            </Link>
          </div>

          {/* Right side - Advanced Carousel */}
          <div className="w-full lg:w-8/12 relative overflow-hidden">
            <div
              className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]"
              style={{
                clipPath: isMobile ? "none" : "polygon(12% 0, 100% 0, 100% 35%, 100% 70%, 100% 100%, 50% 100%, 0 100%)",
              }}
            >
              <AnimatePresence initial={false} custom={currentHeroImage}>
                <motion.div
                  key={currentHeroImage}
                  custom={currentHeroImage}
                  variants={{
                    enter: (direction: number) => ({
                      x: direction > 0 ? '100%' : '-100%',
                      opacity: 0,
                      scale: 1.2,
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1,
                      scale: 1,
                    },
                    exit: (direction: number) => ({
                      zIndex: 0,
                      x: direction < 0 ? '100%' : '-100%',
                      opacity: 0,
                      scale: 0.8,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroImages[currentHeroImage]}
                    alt={`Hospital Facility ${currentHeroImage + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-lg shadow-2xl"
                  />

                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              {/* <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 left-4 transform -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-900 z-10 transition-all duration-300"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute top-1/2 right-4 transform -translate-y-1/2 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-blue-900 z-10 transition-all duration-300"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6" />
                <span className="sr-only">Next slide</span>
              </Button> */}
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentHeroImage ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
                    }`}
                  onClick={() => handleDotClick(index)}
                >
                  <span className="sr-only">Go to slide {index + 1}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specialties Navigation */}
      <div className="bg-white text-blue-900 py-6 shadow-lg ">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {specialties.map((specialty) => (
              <Link
                key={specialty.name}
                href="#"
                className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-100 rounded-md transition-all duration-300 group"
              >
                <Image
                  src={specialty.icon}
                  alt={specialty.name}
                  width={48}
                  height={48}
                  className="mb-2 transition-transform group-hover:scale-110"
                />
                <span className="font-medium text-gray-800 text-center text-sm md:text-base">{specialty.name}</span>
              </Link>
            ))}
            <Link
              href="/speciality/ourSpeciality"
              className="flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-md transition-all duration-300 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-1"
            >
              <span className="font-medium">All Specialities</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Appointment CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-6 px-4 md:px-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <span className="font-semibold text-xl md:text-2xl mb-4 md:mb-0 text-center md:text-left">Ready to Book Your Appointment?</span>
          <Button className="bg-white text-blue-900 hover:bg-blue-100 flex items-center px-6 py-3 rounded-full transition-all duration-300 shadow-md hover:shadow-xl w-full md:w-auto justify-center text-lg">
            <Phone className="mr-2 h-5 w-5" />
            Call Us +91 92688 80303
          </Button>
        </div>
      </div>
    </div>
  )
}