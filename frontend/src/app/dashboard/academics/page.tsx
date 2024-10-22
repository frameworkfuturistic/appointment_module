'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm, Controller } from 'react-hook-form'
import { Calendar, Clock, Printer, User, X, Plus, Check, Mail, Phone, MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { format } from 'date-fns'
import axios from 'axios'

interface Appointment {
  id: string
  patientName: string
  date: string
  time: string
  status: 'scheduled' | 'completed' | 'cancelled'
  type: string
}

interface Slot {
  time: string
  isBooked: boolean
}

const appointments: Appointment[] = [
  { id: '1', patientName: 'John Doe', date: '2023-05-15', time: '09:00 AM', status: 'scheduled', type: 'Check-up' },
  { id: '2', patientName: 'Jane Smith', date: '2023-05-15', time: '10:30 AM', status: 'scheduled', type: 'Consultation' },
  { id: '3', patientName: 'Alice Johnson', date: '2023-05-15', time: '02:00 PM', status: 'scheduled', type: 'Follow-up' },
  { id: '4', patientName: 'Bob Brown', date: '2023-05-15', time: '03:30 PM', status: 'scheduled', type: 'New Patient' },
  { id: '5', patientName: 'Charlie Davis', date: '2023-05-15', time: '05:00 PM', status: 'scheduled', type: 'Check-up' },
]

export default function DoctorDashboard() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [slots, setSlots] = useState<Slot[]>([])
  const [slotDate, setSlotDate] = useState<Date>(new Date())
  const [totalSlots, setTotalSlots] = useState(6)
  const [isAddSlotDialogOpen, setIsAddSlotDialogOpen] = useState(false)
  const { register, handleSubmit, control, reset } = useForm()

  useEffect(() => {
    const fetchAppointmentsAndSlots = async () => {
      try {
        const appointmentResponse = await axios.get('/api/appointments')  // Replace with correct API
        const slotResponse = await axios.get(`/api/slots?date=${format(slotDate, 'yyyy-MM-dd')}`)  // Replace with correct API

        const initialSlots = slotResponse.data.map((slot: any) => ({
          time: format(new Date(slot.date), 'hh:mm a'),
          isBooked: slot.isBooked,
        }))

        setSlots(initialSlots)
        setTotalSlots(slotResponse.data.length)
      } catch (err) {
        console.error('Error fetching appointments and slots:', err)
      }
    }

    fetchAppointmentsAndSlots()
  }, [slotDate])

  const openAppointmentDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
  }

  const closeAppointmentDetails = () => {
    setSelectedAppointment(null)
  }

  const handleReschedule = async (data: any) => {
    try {
      await axios.put(`/api/appointments/${selectedAppointment?.id}/reschedule`, data)  // Replace with correct API
      console.log('Rescheduled appointment:', selectedAppointment?.id)
      closeAppointmentDetails()
    } catch (err) {
      console.error('Error rescheduling appointment:', err)
    }
  }

  const handleCancel = async () => {
    try {
      await axios.put(`/api/appointments/${selectedAppointment?.id}/cancel`)  // Replace with correct API
      console.log('Cancelled appointment:', selectedAppointment?.id)
      closeAppointmentDetails()
    } catch (err) {
      console.error('Error cancelling appointment:', err)
    }
  }

  const handlePrint = () => {
    console.log('Printing appointment details:', selectedAppointment?.id)
    window.print()
  }

  const addSlot = async (data: any) => {
    try {
      const newDate = new Date(data.date)
      const [hours, minutes] = data.time.split(':').map(Number)
      newDate.setHours(hours, minutes, 0, 0)

      const newSlot = {
        date: newDate.toISOString(),
        isBooked: false,
      }

      // Save slot to backend
      const response = await axios.post('/api/slots', newSlot)  // Replace with correct API

      const formattedSlot: Slot = {
        time: format(newDate, 'hh:mm a'),
        isBooked: false
      }

      setSlots([...slots, formattedSlot])
      setTotalSlots(totalSlots + 1)
      setIsAddSlotDialogOpen(false)
      reset()
    } catch (err) {
      console.error('Error adding slot:', err)
    }
  }

  const nextDay = () => {
    const nextDate = new Date(slotDate)
    nextDate.setDate(nextDate.getDate() + 1)
    setSlotDate(nextDate)
  }

  const previousDay = () => {
    const prevDate = new Date(slotDate)
    prevDate.setDate(prevDate.getDate() - 1)
    setSlotDate(prevDate)
  }

  return (
    <div className="container overflow-auto mx-auto p-4 space-y-6">
     

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-purple-100 to-indigo-100">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-primary">Doctor Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Dr. Sarah Johnson" />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <Badge className="absolute bottom-0 right-0 text-sm px-2 py-1 bg-green-500">Online</Badge>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-semibold text-primary mb-2">Dr. Sarah Johnson</h2>
              <p className="text-lg text-muted-foreground mb-2">Cardiologist</p>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary">Medical License: 12345678</Badge>
                  <Badge variant="secondary">10 years experience</Badge>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>sarah.johnson@example.com</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>123 Medical Center, New York, NY 10001</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardContent>
            <h3 className="text-xl font-semibold mb-2">Bio</h3>
            <p className="text-muted-foreground">
              Dr. Sarah Johnson is a board-certified cardiologist with over 10 years of experience in treating various heart conditions. She specializes in preventive cardiology and heart failure management. Dr. Johnson is known for her patient-centered approach and dedication to providing the highest quality of care.
            </p>
          </CardContent>
        </Card>

        <Card className="col-span-1 bg-gradient-to-br from-blue-100 to-cyan-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold text-primary">Today&apos;s Slots</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={previousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{format(slotDate, 'MMM dd, yyyy')}</span>
              <Button variant="outline" size="icon" onClick={nextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total Slots: {totalSlots}</span>
              <Button variant="outline" size="sm" onClick={() => setIsAddSlotDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add Slot
              </Button>
            </div>
            <ScrollArea className="h-[300px] pr-4">
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                <AnimatePresence>
                  {slots.map((slot, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={`w-full h-16 rounded-md flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                                slot.isBooked
                                  ? 'bg-green-500 text-white shadow-md hover:bg-green-600'
                                  : 'border-2 border-gray-300 text-gray-600 hover:border-primary hover:text-primary'
                              }`}
                            >
                              <span className="text-xs font-semibold mb-1">{slot.time}</span>
                              {slot.isBooked ? (
                                <Check className="h-4 w-4" />
                              ) : (
                                <span className="text-xs">Available</span>
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{slot.time} - {slot.isBooked ? 'Booked' : 'Available'}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="today">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            <TabsContent value="today">
              <ScrollArea className="h-[300px]">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-2">Patient</th>
                      <th className="text-left p-2">Time</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <motion.tr
                        key={appointment.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="border-t"
                      >
                        <td className="p-2">{appointment.patientName}</td>
                        <td className="p-2">{appointment.time}</td>
                        <td className="p-2">{appointment.type}</td>
                        <td className="p-2">
                          <Badge variant={appointment.status === 'scheduled' ? 'default' : 'secondary'}>
                            {appointment.status}
                          </Badge>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" onClick={() => openAppointmentDetails(appointment)}>
                            View Details
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </ScrollArea>
            </TabsContent>
            <TabsContent value="upcoming">
              <p>Upcoming appointments will be displayed here.</p>
            </TabsContent>
            <TabsContent value="past">
              <p>Past appointments will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={!!selectedAppointment} onOpenChange={closeAppointmentDetails}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <User className="text-primary" />
                <span>{selectedAppointment.patientName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="text-primary" />
                <span>{selectedAppointment.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="text-primary" />
                <span>{selectedAppointment.time}</span>
              </div>
              <div>
                <Badge variant={selectedAppointment.status === 'scheduled' ? 'default' : 'secondary'}>
                  {selectedAppointment.status}
                </Badge>
              </div>
              <div>
                <h4 className="font-semibold">Appointment Type</h4>
                <p>{selectedAppointment.type}</p>
              </div>
              <form onSubmit={handleSubmit(handleReschedule)} className="space-y-4">
                <div>
                  <label htmlFor="reschedule-date" className="block text-sm font-medium text-gray-700">
                    Reschedule Date
                  </label>
                  <Input
                    id="reschedule-date"
                    type="date"
                    {...register('rescheduleDate')}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label htmlFor="reschedule-time" className="block text-sm font-medium text-gray-700">
                    Reschedule Time
                  </label>
                  <Select {...register('rescheduleTime')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">09:00 AM</SelectItem>
                      <SelectItem value="10:30">10:30 AM</SelectItem>
                      <SelectItem value="14:00">02:00 PM</SelectItem>
                      <SelectItem value="15:30">03:30 PM</SelectItem>
                      <SelectItem value="17:00">05:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter className="flex justify-between">
                  <Button type="submit" className="bg-primary text-primary-foreground">Reschedule</Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>Cancel Appointment</Button>
                  <Button type="button" variant="outline" onClick={handlePrint}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print
                  </Button>
                </DialogFooter>
              </form>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAddSlotDialogOpen} onOpenChange={setIsAddSlotDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Slot</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(addSlot)} className="space-y-4">
            <div>
              <label htmlFor="slot-date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <Controller
                name="date"
                control={control}
                defaultValue={format(new Date(), 'yyyy-MM-dd')}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={`w-full justify-start text-left font-normal ${
                          !field.value && "text-muted-foreground"
                        }`}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={new Date(field.value)}
                        onSelect={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            </div>
            <div>
              <label htmlFor="slot-time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <Input
                id="slot-time"
                type="time"
                {...register('time', { required: true })}
                className="mt-1"
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-primary text-primary-foreground">
                Add Slot
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}