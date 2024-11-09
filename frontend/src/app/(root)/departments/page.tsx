"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ChevronRight, Heart, Brain, Bone, Microscope, Baby, Eye } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { departments } from '@/json/departmentData'
import HeaderBanner from '@/components/HeaderBanner'



export default function DepartmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [hoveredDept, setHoveredDept] = useState<string | null>(null)

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
         <HeaderBanner
        title=" Our Departments"
        subtitle=" Discover world-class healthcare across our specialized departments."
        bgImage="/images/hospital-banner.jpg"
      />
      <div className="container mx-auto px-4 py-16">
       

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative max-w-md mx-auto">
            <Input
              type="search"
              placeholder="Search departments or specialties..."
              className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-full focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredDepartments.map((dept, index) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredDept(dept.id)}
                onMouseLeave={() => setHoveredDept(null)}
              >
                <Link href={`/departments/${dept.id}`}>
                  <Card className="overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                    <div className="relative h-48">
                      <Image
                        src={dept.image}
                        alt={dept.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-all duration-500 ease-in-out transform hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h2 className="text-2xl font-bold text-white mb-1">{dept.name}</h2>
                        <p className="text-sm text-gray-200">{dept.description}</p>
                      </div>
                    </div>
                    <CardContent className="relative">
                      <div className="absolute -top-8 right-4 bg-white rounded-full p-3 shadow-lg">
                        {dept.icon}
                      </div>
                      <ul className="space-y-1 py-2">
                        {dept.specialties.map((specialty, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <ChevronRight className="h-4 w-4 mr-2 text-blue-500" />
                            {specialty}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredDepartments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-600">
              No departments found matching your search criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}