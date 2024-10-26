"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Ourmedical from "@/components/Ourmedical";
import Ourservice from "@/components/Ourservice";
import PatientsReview from "@/components/PatientReview";
import { CarouselDemo } from "@/components/sliderImg";
import OurHeads from "@/components/OurHeads";
import { NoticeSlider } from "@/components/NoticeSlider";
import BlogCards from "@/components/BlogCards";
import WhatsAppWidget from "@/components/widget/WhatsApp";
import { Button } from "@/components/ui/button";
import { ChevronUp } from "lucide-react";

// Animation variants for scroll effects
const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Enhanced parallax effect for the hero section
const parallaxHeroVariants = {
  hidden: { opacity: 0, scale: 1.1 },
  visible: { opacity: 1, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const Dashboard = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.85, 0]);

  return (
    <section className="bg-gray-50 overflow-hidden">
      <main className="w-full p-0.5">
        {/* Hero Section with parallax effect */}
        <motion.div
          className="sticky grid flex-1 items-start  rounded-md shadow-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={parallaxHeroVariants}
        >
          <motion.div style={{ y, opacity, scale }}>
            <CarouselDemo />
          </motion.div>
        </motion.div>

        {/* Medical Cards Section */}
        <motion.div
          className="py-10 sm:py-16 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Ourmedical />
        </motion.div>

       

        {/* Services Section with staggered animations */}
        <motion.div
          className=" w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <Ourservice />
        </motion.div>

        {/* Doctors Section with fade from the right */}
        <motion.div
          className=" w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInRight}
        >
          <OurHeads />
        </motion.div>

         {/* Notice Slider */}
         <motion.div
          className=" w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInLeft}
        >
          <NoticeSlider />
        </motion.div>

        {/* Patient's Review Section with interactive hover effects */}
        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInUp}
          // whileHover={{ scale: 1.05, }}
          // transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <PatientsReview />
        </motion.div>

        {/* Blog Cards Section with staggered animations */}
        <motion.div
          className=" w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          <BlogCards />
        </motion.div>

        {/* WhatsApp Widget */}
        <div className="mb-6 w-full">
          <WhatsAppWidget />
        </div>
       
       
      </main>
    </section>
  );
};

export default Dashboard;
