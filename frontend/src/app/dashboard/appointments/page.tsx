"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { format, parseISO, isToday, isPast, isFuture } from "date-fns"
import {
  Calendar,
  Clock,
  Filter,
  Search,
  
  RefreshCw,
 
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

interface Doctor {
  id: string
  name: string
  specialty: string
  avatar: string
  color: string
}

interface Appointment {
  id: string
  patientName: string
  patientAvatar: string
  date: string
  time: string
  type: string
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled"
  notes?: string
}

interface DoctorWithAppointments extends Doctor {
  appointments: Appointment[]
}

const mockDoctors: DoctorWithAppointments[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    avatar: "https://i.pravatar.cc/150?img=1",
    color: "bg-pink-500 dark:bg-pink-600",
    appointments: [
      {
        id: "a1",
        patientName: "John Doe",
        patientAvatar: "https://i.pravatar.cc/150?img=2",
        date: "2023-09-25",
        time: "09:00 AM",
        type: "Check-up",
        status: "Scheduled",
        notes: "Patient has reported chest pain.",
      },
      {
        id: "a2",
        patientName: "Jane Smith",
        patientAvatar: "https://i.pravatar.cc/150?img=3",
        date: "2023-09-25",
        time: "10:30 AM",
        type: "Follow-up",
        status: "In Progress",
        notes: "Review of recent ECG results.",
      },
    ],
  },
  {
    id: "2",
    name: "Dr. Michael Lee",
    specialty: "Pediatrician",
    avatar: "https://i.pravatar.cc/150?img=4",
    color: "bg-blue-500 dark:bg-blue-600",
    appointments: [
      {
        id: "a3",
        patientName: "Emily Brown",
        patientAvatar: "https://i.pravatar.cc/150?img=5",
        date: "2023-09-25",
        time: "11:00 AM",
        type: "Vaccination",
        status: "Scheduled",
        notes: "Routine childhood vaccination.",
      },
    ],
  },
  {
    id: "3",
    name: "Dr. Emma Wilson",
    specialty: "Dermatologist",
    avatar: "https://i.pravatar.cc/150?img=6",
    color: "bg-purple-500 dark:bg-purple-600",
    appointments: [
      {
        id: "a4",
        patientName: "Oliver Taylor",
        patientAvatar: "https://i.pravatar.cc/150?img=7",
        date: "2023-09-26",
        time: "02:00 PM",
        type: "Consultation",
        status: "Scheduled",
        notes: "New patient consultation for acne treatment.",
      },
      {
        id: "a5",
        patientName: "Sophia Martinez",
        patientAvatar: "https://i.pravatar.cc/150?img=8",
        date: "2023-09-26",
        time: "03:30 PM",
        type: "Follow-up",
        status: "Scheduled",
        notes: "Follow-up on recent skin treatment.",
      },
    ],
  },
]

export default function AdvancedResponsiveAppointmentsPage() {
  const [doctors, setDoctors] = useState<DoctorWithAppointments[]>(mockDoctors)
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorWithAppointments | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<Appointment["status"] | "All">("All")
  const [isLoading, setIsLoading] = useState(false)

  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    setSelectedDoctor(doctors[0])
  }, [doctors])

  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode)
  }, [isDarkMode])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    const filteredDoctors = mockDoctors.filter(
      (doctor) =>
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(query.toLowerCase())
    )
    setDoctors(filteredDoctors)
  }

  const handleStatusFilter = (status: Appointment["status"] | "All") => {
    setStatusFilter(status)
  }

  const filteredAppointments = selectedDoctor
    ? selectedDoctor.appointments.filter(
        (appointment) =>
          (statusFilter === "All" || appointment.status === statusFilter) &&
          (appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            appointment.type.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : []

  const handleRefresh = () => {
    setIsLoading(true)
    // Simulating API call
    setTimeout(() => {
      setDoctors(mockDoctors)
      setIsLoading(false)
    }, 1000)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const renderDoctorList = () => (
    <div className="space-y-2 ">
      {doctors.map((doctor) => (
        <button
          key={doctor.id}
          className={`w-full text-left p-3 rounded-lg transition-all transform hover:scale-105 ${
            selectedDoctor?.id === doctor.id
              ? `${doctor.color} text-white shadow-lg`
              : " dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
          }`}
          onClick={() => {
            setSelectedDoctor(doctor)
            setIsSidebarOpen(false)
          }}
        >
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10 ring-2 ring-white dark:ring-gray-800">
              <AvatarImage src={doctor.avatar} alt={doctor.name} />
              <AvatarFallback>{doctor.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{doctor.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialty}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  )

  return (
    <div className={`flex h-screen  dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
      {/* Sidebar for larger screens */}
      <aside className="hidden md:block w-72 bg-white/30 dark:bg-gray-800 backdrop-blur-md shadow-lg border-r border-white/10 rounded-lg border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4">
         
          <div className="relative mb-4">
            <Input
              type="text"
              placeholder="Search doctors..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <ScrollArea className="h-[calc(100vh-12rem)]">
            {renderDoctorList()}
          </ScrollArea>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex flex-col">
    

        <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
          {selectedDoctor && (
            <>
              <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <CardHeader className={`${selectedDoctor.color} text-white`}>
                  <CardTitle>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16 ring-4 ring-white dark:ring-gray-800">
                        <AvatarImage src={selectedDoctor.avatar} alt={selectedDoctor.name} />
                        <AvatarFallback>{selectedDoctor.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedDoctor.name}</h2>
                        <p className="text-lg">{selectedDoctor.specialty}</p>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Total Appointments</p>
                      <p className="text-3xl font-bold mt-2">{selectedDoctor.appointments.length}</p>
                      <Progress value={75} className="mt-2" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Completed</p>
                      <p className="text-3xl font-bold mt-2">
                        {selectedDoctor.appointments.filter((a) => a.status === "Completed").length}
                      </p>
                      <Progress value={50} className="mt-2" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-lg font-medium text-gray-600 dark:text-gray-300">Upcoming</p>
                      <p className="text-3xl font-bold mt-2">
                        {selectedDoctor.appointments.filter((a) => a.status === "Scheduled").length}
                      </p>
                      <Progress value={25} className="mt-2" />
                    </div>
                  </div>
                 
                </CardContent>
              </Card>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <Select value={statusFilter} onValueChange={(value: any) => handleStatusFilter(value)}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">All Statuses</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <Input
                    type="text"
                    placeholder="Search appointments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full md:w-64"
                  />
                  <Button variant="outline" size="icon">
                    <Search className="h-4 w-4" />
                  
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleRefresh}>
                      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </Button>
                </div>
              </div>

              <Tabs defaultValue="list" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                </TabsList>
                <TabsContent value="list">
                  <Card>
                    <CardHeader>
                      <CardTitle>Appointments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[calc(100vh-24rem)]">
                        <AnimatePresence>
                          {filteredAppointments.map((appointment) => (
                            <motion.div
                              key={appointment.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                            >
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-10 w-10">
                                  <AvatarImage src={appointment.patientAvatar} alt={appointment.patientName} />
                                  <AvatarFallback>
                                    {appointment.patientName.split(" ").map((n) => n[0]).join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-medium">{appointment.patientName}</p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.type}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <p className="text-sm font-medium">
                                    {format(parseISO(appointment.date), "MMM d, yyyy")}
                                  </p>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.time}</p>
                                </div>
                                <Badge
                                  variant="outline"
                                  className={`
                                    ${appointment.status === "Scheduled" && "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"}
                                    ${appointment.status === "In Progress" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"}
                                    ${appointment.status === "Completed" && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"}
                                    ${appointment.status === "Cancelled" && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"}
                                  `}
                                >
                                  {appointment.status}
                                </Badge>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="calendar">
                  <Card>
                    <CardHeader>
                      <CardTitle>Calendar View</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        <Calendar className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg font-medium">Calendar view coming soon!</p>
                        <p className="mt-2">We're working on bringing you a beautiful and intuitive calendar interface.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </main>
    </div>
  )
}