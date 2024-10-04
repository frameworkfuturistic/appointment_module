"use client";

import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useForm, Controller } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { format, subYears, parse } from "date-fns";
import axios from "axios";
import {
  ChevronRight,
  User,
  Calendar,
  CreditCard,
  Printer,
  AlertCircle,
  Clock,
  ChevronLeft,
  CalendarIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { log } from "console";

const steps = [
  {
    id: "patient-details",
    title: "Patient Details",
    icon: <User className="h-6 w-6" />,
  },
  {
    id: "book-slot",
    title: "Book a Slot",
    icon: <Calendar className="h-6 w-6" />,
  },
  { id: "payment", title: "Payment", icon: <CreditCard className="h-6 w-6" /> },
  { id: "print", title: "Print", icon: <Printer className="h-6 w-6" /> },
];

const initialState = {
  departments: [],
  doctors: [],
  selectedDoctor: null,
  availableSlots: [],
  bookedSlots: [],
  error: null,
  loading: false,
  patientData: {},
  appointmentDetails: {},
  selectedDepartmentId: null,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_DEPARTMENTS":
      return { ...state, departments: action.payload };
    case "SET_DOCTORS":
      return { ...state, doctors: action.payload };
    case "SET_SELECTED_DOCTOR":
      const selectedDoctor = state.doctors.find(
        (doctor) => doctor.ConsultantID === action.payload
      );
      return { ...state, selectedDoctor: selectedDoctor };
    case "SET_AVAILABLE_SLOTS":
      return { ...state, availableSlots: action.payload };
    case "SET_BOOKED_SLOTS": // New action type
      return { ...state, bookedSlots: [...state.bookedSlots, action.payload] };

    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_PATIENT_DATA":
      return { ...state, patientData: action.payload };
    case "SET_APPOINTMENT_DETAILS":
      return { ...state, appointmentDetails: action.payload };
    case "SET_SELECTED_DEPARTMENT_ID":
      return { ...state, selectedDepartmentId: action.payload };
    default:
      return state;
  }
};

const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default function AdvancedAppointmentForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());

  const years = Array.from(
    { length: 121 },
    (_, i) => new Date().getFullYear() - i
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const createPatient = useCallback(async (data) => {
    if (data) {
      try {
        const response = await axios.post(
          `http://127.0.0.1:8000/api/v1/patients`,
          data
        );
        dispatch({ type: "SET_PATIENT_DATA", payload: response.data.patient });
        console.log("Patient created:", response.data.patient);
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Error creating patient" });
      }
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/departments"
      );
      dispatch({ type: "SET_DEPARTMENTS", payload: response.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Error fetching departments" });
    }
  }, []);

  const fetchDoctors = useCallback(async (departmentId) => {
    if (departmentId) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v1/doctors/${departmentId}`
        );
        dispatch({ type: "SET_DOCTORS", payload: response.data });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Error fetching doctors" });
      }
    }
  }, []);

  const fetchAvailableSlots = async (selectedDoctor, date) => {
    if (!selectedDoctor || !date) return;

    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/v1/slots/${selectedDoctor.ConsultantID}/${date}`
      );
      dispatch({ type: "SET_AVAILABLE_SLOTS", payload: response.data || [] });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error fetching available slots",
      });
    }
  };

  const debouncedFetchAvailableSlots = useCallback(
    debounce((doctorId, date) => {
      fetchAvailableSlots(doctorId, date);
    }, 300),
    []
  );

  const onSubmit = useCallback(
    async (data) => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        switch (currentStep) {
          case 0:
            await createPatient(data);
            break;
          case 1:
            await bookAppointment({ ...data, slotId: watch("slotId") });
            break;
          case 2:
            await processPayment(data);
            break;
          default:
            break;
        }

        if (currentStep < steps.length - 1) {
          setCurrentStep(currentStep + 1);
        } else {
          dispatch({ type: "SET_APPOINTMENT_DETAILS", payload: data });
        }
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "An error occurred. Please try again.",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [currentStep, watch, createPatient]
  );


  const bookSlot = async (data) => {
    const slotData = {
      slot_id: data.slotId,
      mr_no: state.patientData.MRNo,
      remarks: data.reason,
    };

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/v1/slots/book",
        slotData
      );

      console.log("Slot Data", response.data);

      // Dispatch the booked slot to the state
      dispatch({ type: "SET_BOOKED_SLOTS", payload: data.slotId });

      dispatch({ type: "SET_APPOINTMENT_DETAILS", payload: response.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error booking appointment" });
    }
  };

  const bookAppointment = async (data) => {
    const appointmentData = {
      ConsultantID: data.doctorId,
      MRNo: state.patientData.MRNo,
      RegistrationID: state.patientData.RegistrationID,
      ConsultationDate: format(new Date(data.appointmentDate), "yyyy-MM-dd"),
      SlotID: data.slotId,
      SlotToken: data.slotToken,
      ShiftID: data.shiftId,
      Remarks: data.reason,
      PatientName: state.patientData.name,
      MobileNo: state.patientData.phone,
      CreatedBy: state.patientData.CreatedBy,
    };

    try {
      const response = await axios.post(
        "http://localhost:8585/api/V1/appointments",
        appointmentData
      );
      // Dispatch the booked slot to the state
      dispatch({ type: "SET_BOOKED_SLOTS", payload: data.slotId });

      dispatch({ type: "SET_APPOINTMENT_DETAILS", payload: response.data });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: "Error booking appointment" });
    }
  };

  const processPayment = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Payment processed", data);
  };

  
  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  useEffect(() => {
    fetchDoctors(state.selectedDepartmentId);
  }, [state.selectedDepartmentId, fetchDoctors]);

  useEffect(() => {
    if (state.selectedDoctor && watch("appointmentDate")) {
      debouncedFetchAvailableSlots(
        state.selectedDoctor,
        watch("appointmentDate")
      );
    }
  }, [
    state.selectedDoctor,
    watch("appointmentDate"),
    debouncedFetchAvailableSlots,
  ]);

  console.log("availableSlots", state.availableSlots);

  const renderPatientDetails = () => (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="PatientName">Full Name</Label>
            <Input
              id="PatientName"
              {...register("PatientName", { required: "Name is required" })}
            />
            {errors.PatientName && (
              <p className="text-red-500 text-sm">
                {errors.PatientName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="DOB">Date of Birth</Label>
            <Controller
              name="DOB"
              control={control}
              rules={{ required: "Date of Birth is required" }}
              render={({ field }) => (
                <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !field.value && "text-muted-foreground"
                      }`}
                      onClick={() => setIsCalendarOpen(true)}
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="space-y-4 p-3">
                      <div className="flex justify-between space-x-2">
                        <Select
                          value={month.toString()}
                          onValueChange={(value) => setMonth(parseInt(value))}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Select month" />
                          </SelectTrigger>
                          <SelectContent>
                            {months.map((m, index) => (
                              <SelectItem key={m} value={index.toString()}>
                                {m}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={year.toString()}
                          onValueChange={(value) => setYear(parseInt(value))}
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Select year" />
                          </SelectTrigger>
                          <SelectContent>
                            {years.map((y) => (
                              <SelectItem key={y} value={y.toString()}>
                                {y}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <CalendarComponent
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          field.onChange(
                            date ? date.toISOString().split("T")[0] : null
                          );
                          setIsCalendarOpen(false);
                        }}
                        disabled={(date) =>
                          date > new Date() || date < subYears(new Date(), 120)
                        }
                        initialFocus
                        month={new Date(year, month)}
                        onMonthChange={(newMonth) => {
                          setMonth(newMonth.getMonth());
                          setYear(newMonth.getFullYear());
                        }}
                        className="rounded-md border shadow"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="Sex">Gender</Label>
            <Controller
              name="Sex"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="MALE" id="MALE" />
                    <Label htmlFor="MALE">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="FEMALE" />
                    <Label htmlFor="FEMALE">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="OTHER" id="OTHER" />
                    <Label htmlFor="OTHER">Other</Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.Sex && (
              <p className="text-red-500 text-sm">{errors.Sex.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="MobileNo">Phone Number</Label>
            <Input
              id="MobileNo"
              {...register("MobileNo", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.MobileNo && (
              <p className="text-red-500 text-sm">{errors.MobileNo.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              {...register("state", { required: "State is required" })}
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pin">Pin Code</Label>
            <Input
              id="pin"
              type="text"
              {...register("pin", {
                required: "Pin code is required",
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: "Invalid pin code",
                },
              })}
            />
            {errors.pin && (
              <p className="text-red-500 text-sm">{errors.pin.message}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderBookAppointment = () => (
    <Card>
      <CardHeader>
        <CardTitle>Book Appointment</CardTitle>
        <CardDescription>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            <Label>
              MRNo:{" "}
              <span className="ml-auto font-medium text-red-700">
                {state.patientData.MRNo}
              </span>
            </Label>
            <Label>
              Patient Name:{" "}
              <span className="ml-auto font-medium text-red-700">
                {state.patientData.PatientName}
              </span>
            </Label>
            <Label>
              Mobile No.:{" "}
              <span className="ml-auto font-medium text-red-700">
                {state.patientData.MobileNo}
              </span>
            </Label>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Controller
            name="departmentId"
            control={control}
            rules={{ required: "Department is required" }}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  dispatch({
                    type: "SET_SELECTED_DEPARTMENT_ID",
                    payload: Number(value),
                  });
                  field.onChange(value);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {state.departments.length > 0 ? (
                    state.departments.map((dept) => (
                      <SelectItem
                        key={dept.DepartmentID}
                        value={dept.DepartmentID.toString()}
                      >
                        {dept.Department}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="cs" disabled>
                      No departments available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.departmentId && (
            <p className="text-red-500 text-sm">
              {errors.departmentId.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="doctor">Doctor</Label>
          <Controller
            name="doctorId"
            control={control}
            rules={{ required: "Doctor is required" }}
            render={({ field }) => (
              <Select
                onValueChange={(value) => {
                  dispatch({
                    type: "SET_SELECTED_DOCTOR",
                    payload: parseInt(value),
                  });
                  field.onChange(value);
                  debouncedFetchAvailableSlots(value, watch("appointmentDate"));
                }}
                disabled={!state.selectedDepartmentId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select doctor" />
                </SelectTrigger>
                <SelectContent>
                  {state.doctors.length > 0 ? (
                    state.doctors.map((doctor) => (
                      <SelectItem
                        key={doctor.ConsultantID}
                        value={doctor.ConsultantID.toString()}
                      >
                        {doctor.ConsultantName}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="cs" disabled>
                      No doctors available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
          />
          {errors.doctorId && (
            <p className="text-red-500 text-sm">{errors.doctorId.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>
            Fee:{" "}
            <span className="ml-auto font-medium text-red-700">
              {state.selectedDoctor
                ? state.selectedDoctor.Fee
                  ? state.selectedDoctor.Fee
                  : "No fee available for this doctor"
                : "Select a doctor"}
            </span>
          </Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="appointmentDate">Appointment Date</Label>
          <Controller
            name="appointmentDate"
            control={control}
            rules={{ required: "Appointment date is required" }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !field.value && "text-muted-foreground"
                    }`}
                  >
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date) => {
                      const formattedDate = date
                        ? format(date, "yyyy-MM-dd")
                        : null;
                      field.onChange(formattedDate);
                      if (state.selectedDoctor && formattedDate) {
                        debouncedFetchAvailableSlots(
                          state.selectedDoctor.ConsultantID,
                          formattedDate
                        );
                      }
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          {errors.appointmentDate && (
            <p className="text-red-500 text-sm">
              {errors.appointmentDate.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="slotId">Available Slots</Label>
          <Controller
            name="slotId"
            control={control}
            rules={{ required: "Slot selection is required" }}
            render={({ field }) => (
              <div>
                {state.loading ? (
                  <div className="flex justify-center items-center h-32">
                    <svg
                      className="animate-spin h-8 w-8 text-primary"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </div>
                ) : state.availableSlots.length > 0 ? (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                    >
                      {state.availableSlots.map((slot) => (
                        <Card
                          key={slot.SlotID}
                          className={`cursor-pointer transition-all duration-200 ${
                            field.value === slot.SlotID
                              ? "ring-2 ring-primary"
                              : slot.isBooked // Check if the slot is booked
                              ? "bg-red-200 opacity-50 cursor-not-allowed" // Red background for booked slots
                              : "bg-green-200 opacity-50 "
                          }`}
                          onClick={() => {
                            if (!slot.isBooked && slot.AvailableSlots > 0) {
                              field.onChange(slot.SlotID);
                              bookSlot({
                                slotId: slot.SlotID,
                              });
                            }
                          }}
                        >
                          <CardContent className="p-4 flex items-center justify-between h-full">
                            <Clock className="h-6 w-6 mb-2 text-primary" />
                            <span className="text-sm font-semibold">
                              {format(
                                parse(slot.SlotTime, "HH:mm:ss", new Date()),
                                "h:mm a"
                              )}
                            </span>
                          </CardContent>
                        </Card>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                ) : (
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No slots available</AlertTitle>
                    <AlertDescription>
                      Please try selecting a different date or doctor.
                    </AlertDescription>
                  </Alert>
                )}
                <input type="hidden" {...field} />
              </div>
            )}
          />
          {errors.SlotID && (
            <p className="text-red-500 text-sm" role="alert">
              {errors.SlotID.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderPayment = () => (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
        <CardDescription>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 py-2">
            <Label>
              MRNo:{" "}
              <span className="ml-auto font-medium text-red-700">
                {state.patientData.MRNo}
              </span>
            </Label>
            <Label>
              Patient Name:{" "}
              <span className="ml-auto font-medium text-red-700">
                {state.patientData.PatientName}
              </span>
            </Label>
            <Label>
              Mobile No.:{" "}
              <span className="ml-auto font-medium text-red-700">
                {state.patientData.MobileNo}
              </span>
            </Label>
            <Label>
              Fee:{" "}
              <span className="ml-auto font-medium text-red-700">
                {state.selectedDoctor?.Fee}
              </span>
            </Label>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="paymentMethod">Payment Method</Label>
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: "Payment method is required" }}
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
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm">
              {errors.paymentMethod.message}
            </p>
          )}
        </div>
        {watch("paymentMethod") === "card" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                {...register("cardNumber", {
                  required: "Card number is required",
                })}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  {...register("expiryDate", {
                    required: "Expiry date is required",
                  })}
                  placeholder="MM/YY"
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm">
                    {errors.expiryDate.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  {...register("cvv", { required: "CVV is required" })}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm">{errors.cvv.message}</p>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );

  const renderAppointmentConfirmation = () => (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Confirmation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your appointment has been successfully booked and payment processed.
          </AlertDescription>
        </Alert>
        <div className="space-y-2">
          <h3 className="font-semibold">Patient Details</h3>
          <p>Name: {state.patientData?.PatientName}</p>
          <p>Phone: {state.patientData?.MobileNo}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Appointment Details</h3>
          <p>
            Department:{" "}
            {
              state.departments.find(
                (d) => d.DepartmentID === state.selectedDepartmentId
              )?.Department
            }
          </p>
          <p>
            Doctor:{" "}
            {
              state.doctors.find(
                (d) => d.ConsultantID === state.appointmentDetails?.doctorId
              )?.ConsultantName
            }
          </p>
          <p>
            Date:{" "}
            {state.appointmentDetails?.appointmentDate &&
              format(new Date(state.appointmentDetails.appointmentDate), "PPP")}
          </p>
          <p>
            Time:{" "}
            {
              state.availableSlots.find(
                (s) => s.SlotID === state.appointmentDetails?.slotId
              )?.SlotTime
            }
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold">Payment Details</h3>
          <p>
            Amount Paid: $
            {state.appointmentDetails?.amount || state.selectedDoctor?.Fee}
          </p>
          <p>Payment Method: {watch("paymentMethod")}</p>
        </div>
        <Button onClick={() => window.print()} className="w-full">
          Print Confirmation
        </Button>
      </CardContent>
    </Card>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return renderPatientDetails();
      case 1:
        return renderBookAppointment();
      case 2:
        return renderPayment();
      case 3:
        return renderAppointmentConfirmation();
      default:
        return null;
    }
  };

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
                <h1 className="text-2xl font-bold ">
                  Patient Appointment System
                </h1>
                <p className="mt-2 text-sm text-gray-300">
                  Book your appointment in a few easy steps
                </p>
              </div>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20"></div>
          </div>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <ol className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`flex items-center ${
                  index < steps.length - 1 ? "w-full" : ""
                }`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 mr-2 text-xs border ${
                    index <= currentStep
                      ? "border-blue-600 text-blue-600"
                      : "border-gray-500 text-gray-500"
                  } rounded-full shrink-0`}
                >
                  {step.icon}
                </span>
                {step.title}
                {index < steps.length - 1 && (
                  <svg
                    className="w-3 h-3 ml-2 sm:ml-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 12 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 5 5 5 5-5"
                    />
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
          {state.error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}
          <div className="mt-8 flex justify-end">
            {currentStep < steps.length - 1 && (
              <Button type="submit" disabled={state.loading}>
                {state.loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
