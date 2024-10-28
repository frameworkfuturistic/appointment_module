"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  Award,
  Heart,
  Brain,
  Users,
  ArrowRight,
} from "lucide-react";

const FadeInSection = ({ children }: { children: any }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      transition={{ duration: 0.5 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 20 },
      }}
    >
      {children}
    </motion.div>
  );
};

const DualImageCube = () => {
  return (
    <div className="relative w-full h-96 md:h-[500px]">
      <div className="absolute top-0 left-0 w-3/4 h-3/4 z-10">
        <Image
          src="/sliderPic/sjhrchos1.png?height=600&width=800"
          alt="Hospital exterior"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-xl"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-3/4 h-3/4 z-20">
        <Image
          src="/departmentHeads/vandana.png?height=600&width=800"
          alt="Medical team in action"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-xl"
        />
      </div>
    </div>
  );
};

export default function AdvancedAboutUs() {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Dotted background */}
      <div
        className="absolute inset-0 bg-repeat "
        style={{
          backgroundImage:
            "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        aria-hidden="true"
      ></div>

      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image
          src="/bg-about.png?height=1080&width=1920"
          alt="Advanced medical equipment"
          layout="fill"
          objectFit="cover"
          className="object-center"
          priority
        />
        <div className="absolute inset-0 bg-blue-900 bg-opacity-60 flex flex-col items-center justify-center text-white">
          <motion.h1
            className="text-3xl md:text-3xl lg:text-6xl font-bold text-center px-4 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Pioneering Healthcare Excellence
          </motion.h1>
          <motion.p
            className="text-md md:text-xl lg:text-2xl text-center px-4 max-w-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
           ISO 9001 : 2015 Certified Hospital
          </motion.p>
        </div>
      </section>

      {/* About Us content with Dual Image */}
      <FadeInSection>
        <div className="container mx-auto px-4 py-16 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">
                Providing Exceptional Care Since 1950
              </h2>
              <p className="text-md text-gray-600">
                <strong>Shree Jagannath Hospital & Research Centre</strong> is
                known for state of the art medical specialities.Using latest
                technologies both in IT and Healthcare, we have developed an
                advance system of treatment in diagnostic and therapeutic
                services.{" "}
              </p>
              <p className="text-md text-gray-600">
                Shree Jagannath Hospital & Research Centre is a 100 bedded
                multispecialty hospital offering advanced healthcare services
                with special emphasis on, orthopedic surgery, Traumatology,
                ophthalmology and advanced clinical research. We offer
                comprehensive inpatient and outpatient services to patients.34
                physicians in all medical specialties cover all areas of care
                including orthopedics, physiotherapy, ophthalmology, noninvasive
                cardiology, general medicine, general surgery, gynecology,
                nephrology, day care, dietetics, general and laparoscopic
                surgery, geriatric medicine, operation theatre, ICU etc.
              </p>
              <p className="text-md text-gray-600">
              We have 12-hour OPD facilities of all major disciplines and also round-the-clock facilities for emergency & investigation, which includes Pathology and Imaging.
              </p>
              <p className="text-md text-gray-600">
              The hospital has an excellent infrastructure, which includes five OTs with 100% fresh laminar air flow facilities, well-equipped intensive care units.
              </p>
            </div>
            <DualImageCube />
          </div>
        </div>
      </FadeInSection>

      {/* Mission Statement */}
      <FadeInSection>
        <section className="py-16 md:py-32 bg-blue-50 relative">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-12">
              Our Mission
            </h2>
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-2xl text-gray-700 leading-relaxed">
                To revolutionize healthcare through innovation, compassion, and
                excellence. We are committed to improving lives, advancing
                medical science, and fostering a healthier community for
                generations to come.
              </p>
              <p className=" text-center py-4 font-bold text-lg">***</p>
              <p className="text-2xl text-gray-700 leading-relaxed">
              To create a chain of hospitals, specialized clinics and diagnostic centers for health care delivery to the fullest satisfaction of the users and stake-holders.
              </p>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Core Values */}
      <FadeInSection>
        <section className="py-16 md:py-32 bg-white relative">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-16">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              {[
                {
                  icon: Award,
                  title: "Excellence",
                  description:
                    "Striving for the highest standards in medical care and service.",
                },
                {
                  icon: Heart,
                  title: "Compassion",
                  description:
                    "Treating every patient with kindness, empathy, and respect.",
                },
                {
                  icon: Brain,
                  title: "Innovation",
                  description:
                    "Embracing new technologies and methods to improve patient outcomes.",
                },
                {
                  icon: Users,
                  title: "Collaboration",
                  description:
                    "Working together to achieve the best results for our patients and community.",
                },
              ].map((value, index) => (
                <Card
                  key={index}
                  className="bg-blue-50 border-none hover:shadow-xl transition-shadow duration-300"
                >
                  <CardContent className="p-8 text-center">
                    <value.icon className="h-16 w-16 mx-auto mb-6 text-blue-600" />
                    <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 text-lg">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

    

      {/* Call to Action */}
      {/* <FadeInSection>
        <section className="py-16 md:py-32 bg-blue-900 text-white relative">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Experience World-Class Healthcare
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Whether you're seeking routine care or specialized treatment, our
              doors are open. Let us be your partner in health and wellness.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Button
                size="lg"
                className="bg-white text-blue-900 hover:bg-blue-100 text-lg px-8 py-6"
              >
                Schedule an Appointment
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-blue-800 text-lg px-8 py-6"
              >
                Take a Virtual Tour
              </Button>
            </div>
          </div>
        </section>
      </FadeInSection> */}
    </div>
  );
}
