"use client";

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Leaf, HardHat } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Link from "next/link"
import HeaderBanner from '@/components/HeaderBanner'

interface PolicySection {
  title: string
  icon: React.ReactNode
  content: {
    subtitle?: string
    text: string[]
  }[]
}

const policySections: PolicySection[] = [
  {
    title: "Quality Policy",
    icon: <Shield className="w-12 h-12 text-blue-300" />,
    content: [
      {
        text: [
          "We are committed to provide excellent care to our patients in the most personal, sympathetic and confidential and dignified manner possible."
        ]
      }
    ]
  },
  {
    title: "Environmental Policy",
    icon: <Leaf className="w-12 h-12 text-green-300" />,
    content: [
      {
        subtitle: "Our Commitments",
        text: [
          "We will make every effort to be responsive to the psychosocial and cultural values of our patients and their families and honor their rights."
        ]
      },
      {
        subtitle: "Our Responsibilities",
        text: [
          "To ensure the environmental impacts of our activities and services are kept minimum.",
          "Safe disposal of the waste and recycle whenever possible."
        ]
      },
      {
        subtitle: "Our Strategies",
        text: [
          "Integration of the policies programs and practices into the management of our business.",
          "Efficient use of resources, technology and effective management practices to prevent pollution.",
          "Manage the wastes in an environmentally acceptable manner that prevents pollution.",
          "Comply with all the applicable legal and corporate requirements relating to environment and adopt current best practices to increase environmental performance.",
          "Attempt to improve our environmental performances through innovations and self-discipline.",
          "Conscious attempt to make continual improvement, taking into account the exceptions of the community and the regulators.",
          "Communicate the policy to our patrons, employees, visitors, contractors and the public."
        ]
      }
    ]
  },
  {
    title: "Safety Policy",
    icon: <HardHat className="w-12 h-12 text-yellow-300" />,
    content: [
      {
        text: [
          "We are committed to the health and safety of our employees and patients and to the safety of their environment.",
          "Establish and maintain adequate standards, policies, procedures, work practices and maintenance of all the equipment to ensure a safe working environment.",
          "Maintenance of good housekeeping of the Hospital.",
          "Orient and train all staff in safe work practices and procedures"
        ]
      }
    ]
  }
]

function HospitalPolicies() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
         <HeaderBanner
        title="Policy and Privacy"
        subtitle="At Shree Jagannath Hospital, we are committed to protecting your
          privacy and ensuring the security of your personal information. This
          policy outlines how we collect, use, and safeguard your data."
        bgImage="/pattern-5.png"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      

        <div className="space-y-16">
          {policySections.map((section, index) => (
            <motion.div
            key={`section-${index}`}
              className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start mb-6">
                  <div className="bg-gradient-to-br from-blue-400 to-indigo-400 p-4 rounded-full mb-4 sm:mb-0 sm:mr-6">
                    {section.icon}
                  </div>
                  <h2 className="text-3xl font-bold text-center sm:text-left">{section.title}</h2>
                </div>
                <div className="space-y-6">
                  {section.content.map((contentItem, contentIndex) => (
                    <div key={contentIndex}>
                      {contentItem.subtitle && (
                        <h3 className="text-xl font-semibold mb-3 text-primary">{contentItem.subtitle}</h3>
                      )}
                      <ul className="list-disc list-inside space-y-2">
                        {contentItem.text.map((paragraph, paraIndex) => (
                          <li key={paraIndex} className="text-sm sm:text-base leading-relaxed">
                            {paragraph}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <div className="h-2 bg-gradient-to-r from-blue-400 to-indigo-400" />
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className="bg-clip-text text-black bg-gradient-to-r from-blue-200 to-indigo-200">
              Questions about our policies?
            </span>
          </h2>
          <p className="mb-10 text-lg sm:text-xl max-w-2xl mx-auto">
            Our team is here to help you understand our commitment to quality, environmental responsibility, and safety. We're dedicated to transparency and continuous improvement.
          </p>
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Contact Our Policy Team
            </Button>
          </Link>
        </motion.div>

        {/* <motion.footer 
          className="mt-24 text-center text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <p>&copy; 2024 Shree Jagannath Hospital. All rights reserved.</p>
          <p className="mt-2">
            These policies were last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
          </p>
        </motion.footer> */}
      </div>
    </div>
  )
}

export default HospitalPolicies