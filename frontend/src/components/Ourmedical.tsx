"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { ChevronRight, Computer, HousePlus, Stethoscope } from 'lucide-react'

import { Card, CardContent } from "@/components/ui/card"

const facilities = [
  {
    icon: HousePlus,
    title: "Quality & Safety",
    description:
      " Our Delmont hospital utilizes state-of-the-art technology and employs a team of true experts.",
  },
  {
    icon: Computer,
    title: " Leading Technology",
    description:
      "Our Delmont hospital utilizes state-of-the-art technology and employs a team of true experts.",
  },
  {
    icon: Stethoscope,
    title: "Experts by Experience",
    description:
      " Our Delmont hospital utilizes state-of-the-art technology and employs a team of true experts.",
  },
  {
    icon: Stethoscope,
    title: "e- Specialist",
    description:
      " Our Delmont hospital utilizes state-of-the-art technology and employs a team of true experts.",
  },
];

const testimonials = [
  { name: "World-class infrastructure", text: "The care I received was exceptional. Thank you!" },
  { name: "Latest high-end technology", text: "Professional staff and state-of-the-art facilities." },
  { name: "Caring systems and processes", text: "Quick, efficient, and compassionate service." },
  { name: "Trust-based compassionate care", text: "Quick, efficient, and compassionate service." },
]

function HospitalHero() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-fit bg-gradient-to-b from-blue-50 to-white ">

<AnimatePresence>
        <Card className="py-16 md:py-32 bg-rose-800 text-white relative m-8 rounded-2xl">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Experience World-Class Healthcare
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Whether you're seeking routine care or specialized treatment, our
              doors are open. Let us be your partner in health and wellness.
            </p>
          </div>
        </Card>
      </AnimatePresence>


      <div className="container mx-auto px-4 py-12">

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl md:text-4xl font-bold text-rose-800 mb-4">
              Your Health, Our Priority
            </h1>
            <p className="text-md text-gray-600 mb-6">
              Our superspecialist doctors provide the highest quality of care through a team-based, doctor-led model. Trained at some of
              the world's most renowned institutions, our highly experienced doctors are distinguished experts in their respective specialities.
              Our doctors work full-time and exclusively across Medanta hospitals. In addition to offering superspecialised care in their own field,
              the Medanta organisational structure enables every doctor to help create a culture of collaboration and multispecialty care integration.
            </p>

          </motion.div>
          <motion.div
            className="relative h-64 md:h-96"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/sliderpic/sjhrchos1.png?height=400&width=600"
              alt="Hospital Staff"
              className="rounded-lg shadow-lg object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-blue-800 bg-opacity-20 rounded-lg" />
            {/* <Card className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 backdrop-blur-xl">
              <CardContent className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >   <p className="text-sm font-semibold text-blue-800 mt-2">{testimonials[currentTestimonial].name}</p>
                    <p className="text-sm text-gray-600 italic">{testimonials[currentTestimonial].text}</p>

                  </motion.div>
                </AnimatePresence>
              </CardContent>
            </Card> */}
          </motion.div>
        </div>

        <motion.div
          className="mt-16  "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg  transition-shadow   ease-in-out delay-150 hover:shadow-rose-200  hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 ...  shadow-none">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <service.icon className="w-12 h-12 text-rose-600 mb-4" />
                    <h3 className="text-xl font-semibold text-rose-800 mb-2">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
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