'use client'

import { useState, useEffect, useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import axios from 'axios'
import { ChevronRight, ChevronLeft, User, Calendar, CreditCard, Printer, AlertCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { log } from 'console'

const steps = [
  { id: 'patient-details', title: 'Patient Details', icon: <User className="h-6 w-6" /> },
  { id: 'book-slot', title: 'Book a Slot', icon: <Calendar className="h-6 w-6" /> },
  { id: 'payment', title: 'Payment', icon: <CreditCard className="h-6 w-6" /> },
  { id: 'print', title: 'Print', icon: <Printer className="h-6 w-6" /> },
]

export default function AdvancedAppointmentForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [departments, setDepartments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [slots, setSlots] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [patientData, setPatientData] = useState(null)
  const [appointmentDetails, setAppointmentDetails] = useState(null)
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm()

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/v1/departments')
      console.log("department", response.data);
      
      setDepartments(response.data)
    } catch (err) {
      setError('Error fetching departments')
    }
  }, [])

  const fetchDoctors = useCallback(async (DepartmentID) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/doctors/${DepartmentID}`)
      setDoctors(response.data)
    } catch (err) {
      setError('Error fetching doctors')
    }
  }, [])

  const fetchSlots = useCallback(async (doctorId, date) => {
    try {
      const formattedDate = format(date, 'yyyy-MM-dd')
      const response = await axios.get(`http://localhost:8585/api/V1/slots/${doctorId}/${formattedDate}`)
      setSlots(response.data)
    } catch (err) {
      setError('Error fetching slots')
    }
  }, [])

  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])

  const onSubmit = async (data) => {
    setLoading(true)
    setError(null)

    try {
      if (currentStep === 0) {
        
      } else if (currentStep === 1) {
        await bookAppointment(data)
      } else if (currentStep === 2) {
        await processPayment(data)
      }

      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setAppointmentDetails(data)
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }



  const bookAppointment = async (data) => {
    const appointmentData = {
      patientId: patientData.id,
      doctorId: data.doctorId,
      departmentId: selectedDepartmentId,
      slotId: data.slotId,
      appointmentDate: format(data.appointmentDate, 'yyyy-MM-dd'),
      reason: data.reason,
    }
    const response = await axios.post('http://localhost:8585/api/V1/appointments', appointmentData)
    setAppointmentDetails(response.data)
  }

  const processPayment = async (data) => {
    // Simulating payment processing
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Payment processed', data)
  }

   useEffect(() => {
    if (selectedDepartmentId) {
      const selectedDepartment = departments.find(dept => dept.id === selectedDepartmentId);
      if (selectedDepartment) {
        setDoctors(selectedDepartment.doctors); // Set doctors based on department
      } else {
        setDoctors([]);
      }
    }
  }, [selectedDepartmentId, departments]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Card>
            <CardHeader>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" {...register('name', { required: 'Name is required' })} />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Controller
                    name="dateOfBirth"
                    control={control}
                    rules={{ required: 'Date of Birth is required' }}
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={`w-full justify-start text-left font-normal ${!field.value && 'text-muted-foreground'}`}>
                            {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: 'Gender is required' }}
                    render={({ field }) => (
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female">Female</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    )}
                  />
                  {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" {...register('phone', { required: 'Phone number is required', pattern: { value: /^[0-9]{10}$/, message: 'Invalid phone number' } })} />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea id="address" {...register('address', { required: 'Address is required' })} />
                  {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        )
      case 1:
        return (
          <Card>
          <CardHeader>
            <CardTitle>Book Appointment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Controller
                name="departmentId"
                control={control}
                rules={{ required: 'Department is required' }}
                render={({ field }) => (
                  <Select onValueChange={(value) => {
                    setSelectedDepartmentId(Number(value));
                    fetchDoctors(value);
                    field.onChange(value);
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.length > 0 ? (
                        departments.map((dept) => (
                          <SelectItem key={dept.DepartmentID} value={dept.DepartmentID.toString()}>{dept.Department}</SelectItem>
                        ))
                      ) : (
                        <SelectItem disabled>No departments available</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.departmentId && <p className="text-red-500 text-sm">{errors.departmentId.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="doctor">Doctor</Label>
              <Controller
                name="doctorId"
                control={control}
                rules={{ required: 'Doctor is required' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} disabled={!selectedDepartmentId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {doctors.map((doctor) => (
                       <SelectItem key={doctor.ConsultantID} value={doctor.ConsultantID.toString()}>{doctor.ConsultantName}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.doctorId && <p className="text-red-500 text-sm">{errors.doctorId.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="appointmentDate">Appointment Date</Label>
              <Controller
                name="appointmentDate"
                control={control}
                rules={{ required: 'Appointment date is required' }}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className={`w-full justify-start text-left font-normal ${!field.value && 'text-muted-foreground'}`}>
                        {field.value ? format(new Date(field.value), 'PPP') : <span>Pick a date</span>}
                        {/* Replace with your calendar icon */}
                        <span className="ml-auto h-4 w-4 opacity-50">📅</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                          field.onChange(date);
                          fetchSlots(watch('doctorId'), date);
                        }}
                        disabled={(date) => date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 3))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.appointmentDate && <p className="text-red-500 text-sm">{errors.appointmentDate.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="slotId">Time Slot</Label>
              <Controller
                name="slotId"
                control={control}
                rules={{ required: 'Time slot is required' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} disabled={!watch('appointmentDate')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {slots.map((slot) => (
                        <SelectItem key={slot.id} value={slot.id.toString()}>
                          {format(new Date(`2000-01-01T${slot.startTime}`), 'h:mm a')} - {format(new Date(`2000-01-01T${slot.endTime}`), 'h:mm a')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.slotId && <p className="text-red-500 text-sm">{errors.slotId.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Visit</Label>
              <Textarea id="reason" {...register('reason', { required: 'Reason for visit is required' })} />
              {errors.reason && <p className="text-red-500 text-sm">{errors.reason.message}</p>}
            </div>
            <Button type="submit">Submit Appointment</Button>
          </CardContent>
        </Card>
        )
      case 2:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Controller
                  name="paymentMethod"
                  control={control}
                  rules={{ required: 'Payment method is required' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="online">Online Payment</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>}
              </div>
              {watch('paymentMethod') === 'card' && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" {...register('cardNumber', { required: 'Card number is required' })} />
                    {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber.message}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input id="expiryDate" {...register('expiryDate', { required: 'Expiry date is required' })} placeholder="MM/YY" />
                      {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" {...register('cvv', { required: 'CVV is required' })} />
                      {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv.message}</p>}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )
      case 3:
        return (
          <Card>
            <CardHeader>
              <CardTitle>Appointment Confirmation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>Your appointment has been successfully booked and payment processed.</AlertDescription>
              </Alert>
              <div className="space-y-2">
                <h3 className="font-semibold">Patient Details</h3>
                <p>Name: {patientData?.name}</p>
                <p>Email: {patientData?.email}</p>
                <p>Phone: {patientData?.phone}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Appointment Details</h3>
                <p>Department: {departments.find(d => d.id === selectedDepartmentId)?.name}</p>
                <p>Doctor: {doctors.find(d => d.id === appointmentDetails?.doctorId)?.name}</p>
                <p>Date: {appointmentDetails?.appointmentDate && format(new Date(appointmentDetails.appointmentDate), 'PPP')}</p>
                <p>Time: {slots.find(s => s.id === appointmentDetails?.slotId)?.startTime} - {slots.find(s => s.id === appointmentDetails?.slotId)?.endTime}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold">Payment Details</h3>
                <p>Amount Paid: ${appointmentDetails?.amount || '100.00'}</p>
                <p>Payment Method: {watch('paymentMethod')}</p>
              </div>
              <Button onClick={() => window.print()} className="w-full">
                Print Confirmation
              </Button>
            </CardContent>
          </Card>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-50 to-gray-50">
     <div className="bg-[url('/hospital/hospitallogo.png?height=300&width=1920')] bg-cover bg-center">
        <div className="bg-blue-900 bg-opacity-75 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <img
              src="/hospital/hospitallogo.png?height=80&width=80"
              alt="Hospital logo"
              className="w-16 h-16 sm:w-20 sm:h-20"
            />
            <div className="text-center md:text-left text-white">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                Shree Jagannath Hospital & Research Center
              </h1>
              <div className="flex flex-col md:flex-row justify-center md:justify-evenly text-sm sm:text-md lg:text-lg text-gray-300 space-y-2 md:space-y-0 md:space-x-4">
                <p>sjhrc.ranchi@gmail.com</p>
                <a href="https://sjhrc.in" className="underline">
                  https://sjhrc.in
                </a>
                <p>+91 8987999200</p>
              </div>
              <div className="text-center mt-4">
          <h1 className="text-2xl font-bold ">Patient Appointment System</h1>
          <p className="mt-2 text-sm text-gray-300">Book your appointment in a few easy steps</p>
        </div>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20"></div>{" "}
            {/* Placeholder for symmetry */}
          </div>
        </div>
      </div><div className="max-w-4xl mx-auto">
       
        <nav className="mb-8">
          <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
            {steps.map((step, index) => (
              <li key={step.id} className={`flex items-center ${index < steps.length - 1 ? 'w-full' : ''}`}>
                <span className={`flex items-center justify-center w-8 h-8 mr-2 text-xs border ${index <= currentStep ? 'border-blue-600 text-blue-600' : 'border-gray-500 text-gray-500'} rounded-full shrink-0`}>
                  {step.icon}
                </span>
                {step.title}
                {index < steps.length - 1 && (
                  <svg className="w-3 h-3 ml-2 sm:ml-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 5 5 5 5-5"/>
                  </svg>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <Button type="button" onClick={() => setCurrentStep(currentStep - 1)} variant="outline">
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : currentStep < steps.length - 1 ? (
                <>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                'Complete Appointment'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}