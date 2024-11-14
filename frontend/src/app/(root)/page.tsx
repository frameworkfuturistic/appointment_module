"use client"

import { useEffect, useState, Suspense } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"
import { ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

// Lazy-loaded components
const Ourmedical = dynamic(() => import("@/components/Ourmedical"), { ssr: false })
const Ourservice = dynamic(() => import("@/components/Ourservice"), { ssr: false })
const PatientsReview = dynamic(() => import("@/components/PatientReview"), { ssr: false })
const CarouselDemo = dynamic(() => import("@/components/sliderImg").then((mod) => mod.CarouselDemo), { ssr: false })
const OurHeads = dynamic(() => import("@/components/OurHeads"), { ssr: false })
const NoticeSlider = dynamic(() => import("@/components/NoticeSlider").then((mod) => mod.NoticeSlider), { ssr: false })
const BlogCards = dynamic(() => import("@/components/BlogCards"), { ssr: false })
const WhatsAppWidget = dynamic(() => import("@/components/widget/WhatsApp"), { ssr: false })

// Loading placeholders
const LoadingPlaceholder = () => (
  <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md"></div>
)

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

const parallaxHeroVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
}

const Dashboard = () => {
  const [isClient, setIsClient] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "15%"]))
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 1.05]))
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0]))
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const [heroRef, heroInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="bg-gray-50 overflow-hidden">
      <main className="w-full p-0.5">
        {/* Hero Section with parallax effect */}
        <motion.div
          ref={heroRef}
          className="sticky grid flex-1 items-start rounded-md shadow-lg overflow-hidden"
          initial="hidden"
          animate={heroInView ? "visible" : "hidden"}
          variants={parallaxHeroVariants}
        >
          <motion.div style={{ y, opacity, scale }}>
            <Suspense fallback={<LoadingPlaceholder />}>
              <CarouselDemo />
            </Suspense>
          </motion.div>
        </motion.div>

        {/* Medical Cards Section */}
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Suspense fallback={<LoadingPlaceholder />}>
            <Ourmedical />
          </Suspense>
        </motion.div>

        {/* Services Section with staggered animations */}
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <Suspense fallback={<LoadingPlaceholder />}>
            <Ourservice />
          </Suspense>
        </motion.div>

        {/* Doctors Section with fade from the right */}
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInRight}
        >
          <Suspense fallback={<LoadingPlaceholder />}>
            <OurHeads />
          </Suspense>
        </motion.div>

        {/* Notice Slider */}
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
        >
          <Suspense fallback={<LoadingPlaceholder />}>
            <NoticeSlider />
          </Suspense>
        </motion.div>

        {/* Patient's Review Section with interactive hover effects */}
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <Suspense fallback={<LoadingPlaceholder />}>
            <PatientsReview />
          </Suspense>
        </motion.div>

        {/* Blog Cards Section with staggered animations */}
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <Suspense fallback={<LoadingPlaceholder />}>
            <BlogCards />
          </Suspense>
        </motion.div>

        {/* WhatsApp Widget */}
        {isClient && (
          <div className="mb-6 w-full">
            <WhatsAppWidget />
          </div>
        )}

       
      </main>
    </section>
  )
}

export default Dashboard