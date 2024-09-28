"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Activity,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Plus,
  Search,
  Loader2,
  RefreshCcw,
  Heart,
  Thermometer,
  Droplet,
  Edit3,
  Trash2,
  X,
  Check,
} from "lucide-react"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, isPast, isFuture, parseISO, differenceInYears } from "date-fns"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface Appointment {
  id: number
  patientName: string
  patientId: string
  age: number
  gender: string
  time: string
  duration: number
  type: string
  status: "Confirmed" | "Pending" | "Cancelled"
  avatar: string
  date: string
  notes: string
  vitalSigns: {
    bloodPressure: string
    heartRate: number
    temperature: number
  }
  previousVisit: string | null
  insuranceProvider: string
  allergies: string[]
}

const appointmentsData: Appointment[] = [
  {
    id: 1,
    patientName: "Alice Johnson",
    patientId: "P001",
    age: 32,
    gender: "Female",
    time: "09:00 AM",
    duration: 30,
    type: "Annual Check-up",
    status: "Confirmed",
    avatar: "https://i.pravatar.cc/150?img=1",
    date: "2023-09-25",
    notes: "Patient reported mild headaches. Need to check blood pressure and stress levels.",
    vitalSigns: {
      bloodPressure: "120/80",
      heartRate: 72,
      temperature: 98.6
    },
    previousVisit: "2022-09-20",
    insuranceProvider: "HealthGuard Inc.",
    allergies: ["Penicillin", "Peanuts"]
  },
  {
    id: 2,
    patientName: "Bob Smith",
    patientId: "P002",
    age: 45,
    gender: "Male",
    time: "10:30 AM",
    duration: 45,
    type: "Follow-up",
    status: "Pending",
    avatar: "https://i.pravatar.cc/150?img=3",
    date: "2023-09-25",
    notes: "Follow-up on recent lab results. Discuss diet and exercise plan.",
    vitalSigns: {
      bloodPressure: "130/85",
      heartRate: 68,
      temperature: 98.4
    },
    previousVisit: "2023-08-15",
    insuranceProvider: "MediCare Plus",
    allergies: ["Sulfa drugs"]
  },
  {
    id: 3,
    patientName: "Carol Williams",
    patientId: "P003",
    age: 28,
    gender: "Female",
    time: "11:45 AM",
    duration: 60,
    type: "New Patient Consultation",
    status: "Confirmed",
    avatar: "https://i.pravatar.cc/150?img=5",
    date: "2023-09-26",
    notes: "Initial consultation for new patient. Comprehensive health assessment required.",
    vitalSigns: {
      bloodPressure: "118/75",
      heartRate: 70,
      temperature: 98.2
    },
    previousVisit: null,
    insuranceProvider: "GlobalHealth",
    allergies: []
  },
  {
    id: 4,
    patientName: "David Brown",
    patientId: "P004",
    age: 60,
    gender: "Male",
    time: "02:00 PM",
    duration: 45,
    type: "Chronic Condition Check",
    status: "Confirmed",
    avatar: "https://i.pravatar.cc/150?img=7",
    date: "2023-09-26",
    notes: "Monitoring diabetes management. Review medication efficacy and discuss lifestyle adjustments.",
    vitalSigns: {
      bloodPressure: "135/88",
      heartRate: 75,
      temperature: 98.8
    },
    previousVisit: "2024-09-21",
    insuranceProvider: "SeniorCare",
    allergies: ["Aspirin"]
  },
  {
    id: 5,
    patientName: "Eva Davis",
    patientId: "P005",
    age: 35,
    gender: "Female",
    time: "03:30 PM",
    duration: 30,
    type: "Prenatal Check-up",
    status: "Confirmed",
    avatar: "https://i.pravatar.cc/150?img=9",
    date: "2024-09-27",
    notes: "Second trimester check-up. Discuss nutrition and prepare for upcoming tests.",
    vitalSigns: {
      bloodPressure: "110/70",
      heartRate: 80,
      temperature: 98.6
    },
    previousVisit: "2023-08-30",
    insuranceProvider: "FamilyFirst",
    allergies: ["Latex"]
  },
]

export default function AdvancedDoctorDashboard() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentView, setCurrentView] = useState<"day" | "week" | "month">("month")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [filter, setFilter] = useState<"all" | "confirmed" | "pending" | "cancelled">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedAppointment, setEditedAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    fetchAppointments()
  }, [selectedDate])

  const fetchAppointments = async () => {
    setIsLoading(true)
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would fetch data from an API here
      // For now, we'll use our dummy data
      setAppointments(appointmentsData)
    } catch (error) {
      console.error("Failed to fetch appointments:", error)
      toast({
        title: "Error",
        description: "Failed to fetch appointments. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredAppointments = useMemo(() => {
    return appointments
      .filter((appointment) => {
        if (filter === "all") return true
        return appointment.status.toLowerCase() === filter
      })
      .filter((appointment) =>
        appointment.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.patientId.toLowerCase().includes(searchQuery.toLowerCase())
      )
  }, [appointments, filter, searchQuery])

  const getAppointmentsForDate = (date: Date) => {
    return filteredAppointments.filter(
      (appointment) => isSameDay(parseISO(appointment.date), date)
    )
  }

  const getAppointmentsForWeek = (date: Date) => {
    const start = startOfWeek(date)
    const end = endOfWeek(date)
    return filteredAppointments.filter(
      (appointment) => {
        const aptDate = parseISO(appointment.date)
        return aptDate >= start && aptDate <= end
      }
    )
  }

  const getAppointmentsForMonth = (date: Date) => {
    return filteredAppointments.filter(
      (appointment) => {
        const aptDate = parseISO(appointment.date)
        return aptDate.getMonth() === date.getMonth() &&
               aptDate.getFullYear() === date.getFullYear()
      }
    )
  }

  const handleEditAppointment = (appointment: Appointment) => {
    setEditedAppointment({ ...appointment })
    setIsEditing(true)
  }

  const handleSaveAppointment = async () => {
    if (!editedAppointment) return

    setIsLoading(true)
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would send a PUT request to update the appointment
      // For now, we'll just update the local state
      setAppointments(appointments.map(apt => 
        apt.id === editedAppointment.id ? editedAppointment : apt
      ))
      setIsEditing(false)
      setSelectedAppointment(null)
      toast({
        title: "Success",
        description: "Appointment updated successfully.",
      })
    } catch (error) {
      console.error("Failed to update appointment:", error)
      toast({
        title: "Error",
        description: "Failed to update appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteAppointment = async (appointmentId: number) => {
    setIsLoading(true)
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would send a DELETE request to remove the appointment
      // For now, we'll just update the local state
      setAppointments(appointments.filter(apt => apt.id !== appointmentId))
      setSelectedAppointment(null)
      toast({
        title: "Success",
        description: "Appointment deleted successfully.",
      })
    } catch (error) {
      console.error("Failed to delete appointment:", error)
      toast({
        title: "Error",
        description: "Failed to delete appointment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderAppointmentList = (appointmentsList: Appointment[]) => {
    return (
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-4">
        <AnimatePresence>
          {appointmentsList.length > 0 ? (
            appointmentsList.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className={`flex justify-between items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer ${
                  isPast(parseISO(appointment.date)) ? 'bg-gray-100' :
                  isToday(parseISO(appointment.date)) ? 'bg-blue-100' : 'bg-green-100'
                }`}
                onClick={() => setSelectedAppointment(appointment)}
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={appointment.avatar}
                      alt={appointment.patientName}
                    />
                    <AvatarFallback>
                      {appointment.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-gray-900">
                      {appointment.patientName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {appointment.type}
                    </p>
                    <p className="text-xs text-gray-400">
                      {appointment.time} ({appointment.duration} min)
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge
                    variant={
                      appointment.status === "Confirmed"
                        ? "default"
                        : appointment.status === "Pending"
                        ? "secondary"
                        : "destructive"
                    }
                    className="rounded-full px-2 py-0.5"
                  >
                    {appointment.status}
                  </Badge>
                  <span className="text-sm font-medium text-gray-500">
                    Patient ID: {appointment.patientId}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No appointments found.
            </p>
          )}
        </AnimatePresence>
      </div>
    )
  }

  const renderDayView = () => {
    const dayAppointments = getAppointmentsForDate(selectedDate)
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          Appointments for {format(selectedDate, "MMMM d, yyyy")}
        </h3>
        {renderAppointmentList(dayAppointments)}
      </div>
    )
  }

  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate)
    const weekEnd = endOfWeek(selectedDate)
    const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd })
    const weekAppointments = getAppointmentsForWeek(selectedDate)

    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          Week of {format(weekStart, "MMMM d, yyyy")}
        </h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center">
              <div className="font-medium">{format(day, "EEE")}</div>
              <div className="text-sm">{format(day, "d")}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div key={index} className="min-h-[100px] border rounded-md p-2 overflow-y-auto">
              <h4 className="text-sm font-semibold mb-2">{format(day, "MMM d")}</h4>
              {renderAppointmentList(getAppointmentsForDate(day))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMonthView = () => {
    const monthAppointments = getAppointmentsForMonth(selectedDate)
    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">
          {format(selectedDate, "MMMM yyyy")}
        </h3>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-medium">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => {
            const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i - selectedDate.getDay() + 1)
            const appointmentsForDay = getAppointmentsForDate(date)
            return (
              <div
                key={i}
                className={`min-h-[100px] border rounded-md p-2 ${
                  !isSameMonth(date, selectedDate) ? "bg-gray-100" :
                  isToday(date) ? "bg-blue-100" :
                  isFuture(date) ? "bg-green-100" : ""
                }`}
              >
                <div className="text-right">
                  <span className={`text-sm ${isToday(date) ? "font-bold" : ""}`}>
                    {format(date, "d")}
                  </span>
                </div>
                <div className="mt-1">
                  {appointmentsForDay.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="text-xs truncate cursor-pointer hover:text-blue-600"
                      onClick={() => setSelectedAppointment(appointment)}
                    >
                      {appointment.time} - {appointment.patientName}
                    </div>
                  ))}
                  {appointmentsForDay.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{appointmentsForDay.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          Welcome, Dr. Smith
        </h1>
       
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-purple-400 to-indigo-600 text-white transform hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Total Appointments
            </CardTitle>
            <CalendarIcon className="h-5 w-5 text-purple-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{appointments.length}</div>
            <p className="text-sm text-purple-200">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-pink-400 to-rose-600 text-white transform hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              New Patients
            </CardTitle>
            <Users className="h-5 w-5 text-pink-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">18</div>
            <p className="text-sm text-pink-200">+15% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-400 to-amber-600 text-white transform hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Avg. Consultation Time
            </CardTitle>
            <Clock className="h-5 w-5 text-orange-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {Math.round(appointments.reduce((sum, apt) => sum + apt.duration, 0) / appointments.length)} min
            </div>
            <p className="text-sm text-orange-200">-2m from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-400 to-emerald-600 text-white transform hover:scale-105 transition-transform duration-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">
              Satisfaction Rate
            </CardTitle>
            <Activity className="h-5 w-5 text-green-200" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">98%</div>
            <p className="text-sm text-green-200">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Appointment Calendar</CardTitle>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full md:w-auto">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-800">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Appointments</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative w-full sm:w-auto">
            <Input
              type="text"
              placeholder="Search patients or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button variant="outline" size="icon" onClick={fetchAppointments}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
         
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            <Tabs defaultValue={currentView} onValueChange={(value: any) => setCurrentView(value)} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
              <div className="flex justify-between items-center mb-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 1)))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h2 className="text-lg font-semibold">
                  {format(selectedDate, "MMMM d, yyyy")}
                </h2>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 1)))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <TabsContent value="day">{renderDayView()}</TabsContent>
              <TabsContent value="week">{renderWeekView()}</TabsContent>
              <TabsContent value="month">{renderMonthView()}</TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!selectedAppointment} onOpenChange={() => {
        setSelectedAppointment(null)
        setIsEditing(false)
        setEditedAppointment(null)
      }}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              View and manage appointment information
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="mt-4 space-y-4">
              {isEditing ? (
                <>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={selectedAppointment.avatar}
                        alt={selectedAppointment.patientName}
                      />
                      <AvatarFallback>
                        {selectedAppointment.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <Input
                        value={editedAppointment?.patientName || ""}
                        onChange={(e) => setEditedAppointment(prev => ({ ...prev!, patientName: e.target.value }))}
                        className="font-semibold text-lg"
                      />
                      <div className="flex space-x-2">
                        <Input
                          value={editedAppointment?.age || ""}
                          onChange={(e) => setEditedAppointment(prev => ({ ...prev!, age: parseInt(e.target.value) }))}
                          className="w-20"
                          type="number"
                        />
                        <Select
                          value={editedAppointment?.gender || ""}
                          onValueChange={(value) => setEditedAppointment(prev => ({ ...prev!, gender: value }))}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <Input
                        type="date"
                        value={editedAppointment?.date || ""}
                        onChange={(e) => setEditedAppointment(prev => ({ ...prev!, date: e.target.value }))}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time</p>
                      <Input
                        type="time"
                        value={editedAppointment?.time || ""}
                        onChange={(e) => setEditedAppointment(prev => ({ ...prev!, time: e.target.value }))}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Duration (minutes)</p>
                      <Input
                        type="number"
                        value={editedAppointment?.duration || ""}
                        onChange={(e) => setEditedAppointment(prev => ({ ...prev!, duration: parseInt(e.target.value) }))}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <Input
                        value={editedAppointment?.type || ""}
                        onChange={(e) => setEditedAppointment(prev => ({ ...prev!, type: e.target.value }))}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <Select
                        value={editedAppointment?.status}
                        onValueChange={(value: "Confirmed" | "Pending" | "Cancelled") => 
                          setEditedAppointment(prev => ({ ...prev!, status: value }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Confirmed">Confirmed</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <Textarea
                      value={editedAppointment?.notes || ""}
                      onChange={(e) => setEditedAppointment(prev => ({ ...prev!, notes: e.target.value }))}
                      className="mt-1"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={selectedAppointment.avatar}
                        alt={selectedAppointment.patientName}
                      />
                      <AvatarFallback>
                        {selectedAppointment.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {selectedAppointment.patientName}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {selectedAppointment.age} years old, {selectedAppointment.gender}
                      </p>
                      <p className="text-sm text-gray-500">
                        Patient ID: {selectedAppointment.patientId}
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p>{format(parseISO(selectedAppointment.date), "MMMM d, yyyy")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time</p>
                      <p>{selectedAppointment.time} ({selectedAppointment.duration} min)</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <p>{selectedAppointment.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Status</p>
                      <Badge
                        variant={
                          selectedAppointment.status === "Confirmed"
                            ? "default"
                            : selectedAppointment.status === "Pending"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {selectedAppointment.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Insurance Provider</p>
                      <p>{selectedAppointment.insuranceProvider}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Previous Visit</p>
                      <p>{selectedAppointment.previousVisit ? format(parseISO(selectedAppointment.previousVisit), "MMMM d, yyyy") : "N/A"}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Allergies</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedAppointment.allergies.length > 0 ? (
                        selectedAppointment.allergies.map((allergy, index) => (
                          <Badge key={index} variant="outline">{allergy}</Badge>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No known allergies</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vital Signs</p>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        <p>{selectedAppointment.vitalSigns.heartRate} bpm</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Thermometer className="h-5 w-5 text-orange-500" />
                        <p>{selectedAppointment.vitalSigns.temperature}°F</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Droplet className="h-5 w-5 text-blue-500" />
                        <p>{selectedAppointment.vitalSigns.bloodPressure} mmHg</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Notes</p>
                    <p className="mt-1 text-sm text-gray-700">
                      {selectedAppointment.notes}
                    </p>
                  </div>
                </>
              )}
              <DialogFooter>
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSaveAppointment}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
                      Close
                    </Button>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="destructive" onClick={() => handleDeleteAppointment(selectedAppointment.id)}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete this appointment</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Button onClick={() => {
                      setIsEditing(true)
                      setEditedAppointment({ ...selectedAppointment })
                    }}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Edit Appointment
                    </Button>
                  </>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}