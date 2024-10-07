"use client";

import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useForm, Controller } from "react-hook-form";
import Razorpay from "razorpay";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  subYears,
  parse,
  addDays,
  isAfter,
  startOfYear,
  endOfYear,
} from "date-fns";
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
  Check,
  X,
  RefreshCw,
  Download,
  MoveLeft,
  BackpackIcon,
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
  CardFooter,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { jsPDF } from "jspdf";
import Link from "next/link";
import ExistAppointment from "./ExistAppointment";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

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
  {
    id: "confirmation",
    title: "Confirmation",
    icon: <Printer className="h-6 w-6" />,
  },
];

const initialState = {
  departments: [],
  doctors: [],
  selectedDoctor: null,
  availableSlots: [],
  selectedSlot: null,
  error: null,
  loading: false,
  patientData: null,
  appointmentDetails: null,
  selectedDepartmentId: null,
  paymentStatus: null,
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_DEPARTMENTS":
      return { ...state, departments: action.payload };
    case "SET_DOCTORS":
      return { ...state, doctors: action.payload };
    case "SET_SELECTED_DOCTOR":
      return {
        ...state,
        selectedDoctor: state.doctors.find(
          (doctor) => doctor.ConsultantID === action.payload
        ),
      };
    case "SET_AVAILABLE_SLOTS":
      return { ...state, availableSlots: action.payload };
    case "SET_SELECTED_SLOT":
      return { ...state, selectedSlot: action.payload };
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
    case "SET_PAYMENT_STATUS":
      return { ...state, paymentStatus: action.payload };
    default:
      return state;
  }
}

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
        const response = await axios.post(`${API_BASE_URL}/patients`, data);
        dispatch({ type: "SET_PATIENT_DATA", payload: response.data.patient });
        toast({
          title: "Patient Created",
          description: "Your patient profile has been created successfully.",
        });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Error creating patient" });
        toast({
          title: "Error",
          description: "Failed to create patient profile. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, []);

  const fetchDepartments = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/departments`);
      dispatch({ type: "SET_DEPARTMENTS", payload: response.data });
    } catch (err) {
      dispatch({ type: "SET_ERROR", payload: "Error fetching departments" });
      toast({
        title: "Error",
        description: "Failed to fetch departments. Please refresh the page.",
        variant: "destructive",
      });
    }
  }, []);

  const fetchDoctors = useCallback(async (departmentId) => {
    if (departmentId) {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/doctors/${departmentId}`
        );
        dispatch({ type: "SET_DOCTORS", payload: response.data });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: "Error fetching doctors" });
        toast({
          title: "Error",
          description: "Failed to fetch doctors. Please try again.",
          variant: "destructive",
        });
      }
    }
  }, []);

  const fetchAvailableSlots = async (selectedDoctor, date) => {
    if (!selectedDoctor || !date) return;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/slots/${selectedDoctor.ConsultantID}/${date}`
      );
      dispatch({ type: "SET_AVAILABLE_SLOTS", payload: response.data || [] });
    } catch (err) {
      dispatch({
        type: "SET_ERROR",
        payload: "Error fetching available slots",
      });
      toast({
        title: "Error",
        description: "Failed to fetch available slots. Please try again.",
        variant: "destructive",
      });
    }
  };

  const debouncedFetchAvailableSlots = useCallback(
    debounce((doctorId, date) => {
      fetchAvailableSlots(doctorId, date);
    }, 300),
    []
  );

  const bookAppointment = async (data) => {
    const appointmentData = {
      ConsultantID: data.doctorId,
      MRNo: state.patientData.MRNo,
      ConsultationDate: data.appointmentDate,
      SlotID: data.slotId,
      SlotToken: data.slotToken,
      Pending: 1,
      Remarks: data.reason,
      PatientName: state.patientData.PatientName,
      MobileNo: state.patientData.MobileNo,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/appointments`,
        appointmentData
      );
      dispatch({
        type: "SET_APPOINTMENT_DETAILS",
        payload: response.data.data,
      });
      toast({
        title: "Appointment Booked",
        description:
          "Your appointment has been booked successfully. Please proceed to payment.",
      });
      return response.data;
    } catch (error) {
      let errorMessage = "Error booking appointment";

      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        console.error("Error response data:", error.response.data);
      } else if (error.request) {
        errorMessage = "No response from the server";
        console.error("Error request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw new Error(errorMessage);
    }
  };

  const processPayment = async (data) => {
    try {
      // Step 1: Request backend to generate an order ID from Razorpay
      const paymentResponse = await axios.post(`${API_BASE_URL}/payments`, {
        amount: data.amount, // Pass the payment amount
        OPDOnlineAppointmentID: state.appointmentDetails.OPDOnlineAppointmentID,
      });
  
      const { orderId } = paymentResponse.data;
  
      // Step 2: Open Razorpay Payment Window
      const razorpayOptions = {
        key: process.env.RAZORPAY_KEY_ID, // Razorpay key from environment variables
        amount: data.amount * 100, // Amount in paisa (multiply by 100)
        currency: "INR",
        name: "Hospital Name", // Replace with your hospital's name
        description: "Appointment Payment",
        order_id: orderId, // Razorpay order ID from your backend
        handler: async function (response) {
          // Step 3: On successful payment, update the payment and appointment status
          try {
            const paymentData = {
              OPDOnlineAppointmentID: state.appointmentDetails.OPDOnlineAppointmentID,
              PaymentMode: "Razorpay",
              PaymentStatus: "Paid",
              AmountPaid: data.amount,
              TransactionID: response.razorpay_payment_id, // Razorpay Payment ID
            };
  
            // Save payment details to `opd_appointment_payments` table
            await axios.post(`${API_BASE_URL}/payments/callback`, paymentData); // Adjusted endpoint to match the callback route
  
            // Update the appointment status (Pending -> 0) after successful payment
            await axios.put(
              `${API_BASE_URL}/appointments/${state.appointmentDetails.OPDOnlineAppointmentID}`,
              { Pending: 0 }
            );
  
            // Dispatch payment success action
            dispatch({ type: "SET_PAYMENT_STATUS", payload: "success" });
            toast({
              title: "Payment Successful",
              description: "Your payment has been processed and appointment confirmed.",
            });
          } catch (error) {
            console.error("Error updating payment or appointment status:", error);
            toast({
              title: "Payment Error",
              description: "Payment was processed, but there was an error confirming your appointment.",
              variant: "destructive",
            });
          }
        },
        prefill: {
          name: state.patientData.PatientName,
          email: state.patientData.Email,
          contact: state.patientData.MobileNo,
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      // Open the Razorpay payment modal
      const razorpay = new Razorpay(razorpayOptions);
      razorpay.open();
  
    } catch (error) {
      console.error("Payment processing error:", error);
      toast({
        title: "Payment Error",
        description: "Unable to process the payment. Please try again.",
        variant: "destructive",
      });
    }
  };
  

  const onSubmit = useCallback(
    async (data) => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        switch (currentStep) {
          case 0:
            if (!state.patientData) {
              await createPatient(data);
            }
            setCurrentStep(currentStep + 1);
            break;
          case 1:
            if (!state.selectedSlot) {
              throw new Error("Please select a slot before proceeding.");
            }
            const appointmentDetails = await bookAppointment({
              ...data,
              slotId: state.selectedSlot,
              slotToken: state.availableSlots.find(
                (slot) => slot.SlotID === state.selectedSlot
              )?.SlotToken,
              shiftId: state.availableSlots.find(
                (slot) => slot.SlotID === state.selectedSlot
              )?.ShiftID,
            });
            dispatch({
              type: "SET_APPOINTMENT_DETAILS",
              payload: appointmentDetails,
            });
            setCurrentStep(currentStep + 1);
            break;
          case 2:
            await processPayment(data);
            setCurrentStep(currentStep + 1);
            break;
          default:
            break;
        }
      } catch (err) {
        dispatch({
          type: "SET_ERROR",
          payload: err.message || "An error occurred. Please try again.",
        });
        toast({
          title: "Error",
          description: err.message || "An error occurred. Please try again.",
          variant: "destructive",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [currentStep, state.selectedSlot, state.patientData, createPatient]
  );

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

  const handleSlotSelection = (slotId) => {
    dispatch({ type: "SET_SELECTED_SLOT", payload: slotId });
  };

  const calculateAge = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const monthDifference = today.getMonth() - dobDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dobDate.getDate())
    ) {
      age--;
    }

    return age < 0 ? "N/A" : age;
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const slipWidth = pageWidth - 20;
    const slipHeight = pageHeight - 210;

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, slipWidth, slipHeight);

    doc.setFontSize(16);
    doc.text(
      "Shree Jagannath Hospital & Research Center",
      pageWidth / 2,
      20,
      null,
      null,
      "center"
    );
    doc.setFontSize(12);
    doc.text(
      "Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001, INDIA",
      pageWidth / 2,
      30,
      null,
      null,
      "center"
    );
    doc.text(
      "Phone: +91 8987999200, Email: sjhrc.ranchi@gmail.com",
      pageWidth / 2,
      36,
      null,
      null,
      "center"
    );

    doc.setDrawColor(200);
    doc.line(10, 40, pageWidth - 10, 40);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 255);
    doc.text("Appointment Slip", pageWidth / 2, 45, null, null, "center");

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const leftColumnStart = 20;
    const rightColumnStart = pageWidth / 2 + 10;
    let currentY = 52;

    doc.text(
      `Patient Name: ${state.patientData?.PatientName}`,
      leftColumnStart,
      currentY
    );
    doc.text(
      `Gender: ${state.patientData?.Sex || "N/A"}`,
      rightColumnStart,
      currentY
    );

    currentY += 10;
    doc.text(
      `Phone: ${state.patientData?.MobileNo}`,
      leftColumnStart,
      currentY
    );
    const age = calculateAge(state.patientData?.DOB);
    doc.text(`Age: ${age}`, rightColumnStart, currentY);

    currentY += 10;
    doc.text(
      `Department: ${
        state.departments.find(
          (d) => d.DepartmentID === state.selectedDepartmentId
        )?.Department
      }`,
      leftColumnStart,
      currentY
    );
    doc.text(
      `Doctor: ${
        state.doctors.find(
          (d) => d.ConsultantID === state.selectedDoctor?.ConsultantID
        )?.ConsultantName
      }`,
      rightColumnStart,
      currentY
    );

    currentY += 10;
    doc.text(`Date: ${watch("appointmentDate")}`, leftColumnStart, currentY);
    doc.text(
      `Time: ${
        state.selectedSlot &&
        format(
          parse(
            state.availableSlots.find((s) => s.SlotID === state.selectedSlot)
              ?.SlotTime,
            "HH:mm:ss",
            new Date()
          ),
          "h:mm a"
        )
      }`,
      rightColumnStart,
      currentY
    );

    currentY += 10;
    doc.text(
      `Total Amount Paid:  ${state.selectedDoctor?.Fee}`,
      leftColumnStart,
      currentY
    );
    doc.text(
      `Payment Status: ${
        state.paymentStatus === "success" ? "Successful" : "Pending"
      }`,
      rightColumnStart,
      currentY
    );

    doc.save("appointment_confirmation.pdf");
  };

  const renderPatientDetails = () => (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <div className=" flex justify-between">
          <CardTitle className="text-xl font-bold">
         Personal Information
          </CardTitle>
          <ExistAppointment />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="PatientName" className="text-lg font-semibold">
              Full Name
            </Label>
            <Input
              id="PatientName"
              {...register("PatientName", { required: "Name is required" })}
              className="w-full px-3 py-2 border rounded-md text-lg"
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
                        format(new Date(field.value), "yyyy-MM-dd")
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
                          if (date) {
                            const formattedDate = format(date, "yyyy-MM-dd");
                            field.onChange(formattedDate);
                          } else {
                            field.onChange(null);
                          }
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
            {errors.DOB && (
              <p className="text-red-500 text-sm">{errors.DOB.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="Sex" className="text-lg font-semibold">
              Gender
            </Label>
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
                    <Label htmlFor="MALE" className="text-lg">
                      Male
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="FEMALE" id="FEMALE" />
                    <Label htmlFor="FEMALE" className="text-lg">
                      Female
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="OTHER" id="OTHER" />
                    <Label htmlFor="OTHER" className="text-lg">
                      Other
                    </Label>
                  </div>
                </RadioGroup>
              )}
            />
            {errors.Sex && (
              <p className="text-red-500 text-sm">{errors.Sex.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="MobileNo" className="text-lg font-semibold">
              Phone Number
            </Label>
            <Input
              id="MobileNo"
              {...register("MobileNo", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid phone number",
                },
              })}
              className="w-full px-3 py-2 border rounded-md text-lg"
            />
            {errors.MobileNo && (
              <p className="text-red-500 text-sm">{errors.MobileNo.message}</p>
            )}
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="address" className="text-lg font-semibold">
              Address
            </Label>
            <Textarea
              id="address"
              {...register("address", { required: "Address is required" })}
              className="w-full px-3 py-2 border rounded-md text-lg"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="city" className="text-lg font-semibold">
              City
            </Label>
            <Input
              id="city"
              {...register("city", { required: "City is required" })}
              className="w-full px-3 py-2 border rounded-md text-lg"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="text-lg font-semibold">
              State
            </Label>
            <Input
              id="state"
              {...register("state", { required: "State is required" })}
              className="w-full px-3 py-2 border rounded-md text-lg"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="pin" className="text-lg font-semibold">
              Pin Code
            </Label>
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
              className="w-full px-3 py-2 border rounded-md text-lg"
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
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardTitle className="text-xl font-bold">Book Appointment</CardTitle>
        <CardDescription className="text-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            <Label className="text-indigo-100">
              MRNo:{" "}
              <span className="ml-auto font-medium text-white">
                {state.patientData?.MRNo}
              </span>
            </Label>
            <Label className="text-indigo-100">
              Patient Name:{" "}
              <span className="ml-auto font-medium text-white">
                {state.patientData?.PatientName}
              </span>
            </Label>
            <Label className="text-indigo-100">
              Mobile No.:{" "}
              <span className="ml-auto font-medium text-white">
                {state.patientData?.MobileNo}
              </span>
            </Label>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
        <div className="space-y-2">
          <Label htmlFor="department" className="text-lg font-semibold">
            Department
          </Label>
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
                <SelectTrigger className="w-full text-lg">
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
                    <SelectItem value="loading" disabled>
                      Loading departments...
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
          <Label htmlFor="doctor" className="text-lg font-semibold">
            Doctor
          </Label>
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
                <SelectTrigger className="w-full text-lg">
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
                    <SelectItem value="loading" disabled>
                      {state.selectedDepartmentId
                        ? "Loading doctors..."
                        : "Select a department first"}
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
          <Label className="text-lg font-semibold">
            Fee:{" "}
            <span className="ml-auto font-medium text-indigo-600">
              {state.selectedDoctor
                ? state.selectedDoctor.Fee
                  ? `₹${state.selectedDoctor.Fee}`
                  : "No fee available for this doctor"
                : "Select a doctor"}
            </span>
          </Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="appointmentDate" className="text-lg font-semibold">
            Appointment Date
          </Label>
          <Controller
            name="appointmentDate"
            control={control}
            rules={{ required: "Appointment date is required" }}
            render={({ field }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal text-lg ${
                      !field.value && "text-muted-foreground"
                    }`}
                  >
                    {field.value ? (
                      format(new Date(field.value), "yyyy-MM-dd")
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
                    disabled={(date) =>
                      date < new Date() || date > addDays(new Date(), 30)
                    }
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
          <Label htmlFor="slotId" className="text-lg font-semibold">
            Available Slots
          </Label>
          <div>
            {state.loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(6)].map((_, index) => (
                  <Skeleton key={index} className="h-20 w-full" />
                ))}
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
                        state.selectedSlot === slot.SlotID
                          ? "ring-2 ring-indigo-500"
                          : slot.isBooked
                          ? "bg-red-100 opacity-50 cursor-not-allowed"
                          : "bg-green-100 hover:bg-green-200"
                      }`}
                      onClick={() => {
                        if (!slot.isBooked && slot.AvailableSlots > 0) {
                          handleSlotSelection(slot.SlotID);
                        }
                      }}
                    >
                      <CardContent className="p-4 flex flex-col items-center justify-between h-full">
                        <Clock className="h-6 w-6 mb-2 text-indigo-500" />
                        <span className="text-sm font-semibold">
                          {format(
                            parse(slot.SlotTime, "HH:mm:ss", new Date()),
                            "h:mm a"
                          )}
                        </span>
                        <Badge
                          variant={slot.isBooked ? "destructive" : "secondary"}
                          className="mt-2"
                        >
                          {slot.isBooked ? "Booked" : "Available"}
                        </Badge>
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
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reason" className="text-lg font-semibold">
            Reason for Visit
          </Label>
          <Textarea
            id="reason"
            {...register("reason", { required: "Reason is required" })}
            className="w-full px-3 py-2 border rounded-md text-lg"
            placeholder="Please briefly describe the reason for your visit"
          />
          {errors.reason && (
            <p className="text-red-500 text-sm">{errors.reason.message}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderPayment = () => (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardTitle className="text-xl font-bold">Payment</CardTitle>
        <CardDescription className="text-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <Label className="text-indigo-100">
              Patient Name:{" "}
              <span className="ml-auto font-medium text-white">
                {state.patientData?.PatientName}
              </span>
            </Label>
            <Label className="text-indigo-100">
              Appointment Date:{" "}
              <span className="ml-auto font-medium text-white">
                {watch("appointmentDate")}
              </span>
            </Label>
            <Label className="text-indigo-100">
              Doctor:{" "}
              <span className="ml-auto font-medium text-white">
                {
                  state.doctors.find(
                    (d) => d.ConsultantID === state.selectedDoctor?.ConsultantID
                  )?.ConsultantName
                }
              </span>
            </Label>
            <Label className="text-indigo-100">
              Amount to Pay:{" "}
              <span className="ml-auto font-medium text-white">
                ₹{state.selectedDoctor?.Fee || "N/A"}
              </span>
            </Label>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="paymentMethod" className="text-lg font-semibold">
            Payment Method
          </Label>
          <Controller
            name="paymentMethod"
            control={control}
            rules={{ required: "Payment method is required" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange}>
                <SelectTrigger className="w-full text-lg">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.paymentMethod && (
            <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>
          )}
        </div>
  
        {watch("paymentMethod") === "online" && (
          <div className="space-y-2">
            <Label className="text-lg font-semibold">Online Payment Instructions</Label>
            <p className="text-gray-600">
              Please click the "Proceed to Payment" button below to be redirected to our secure payment gateway.
            </p>
  
            {/* Proceed to Payment Button */}
            <Button
              className="mt-4"
              onClick={() => processPayment({ amount: state.selectedDoctor?.Fee })}
            >
              Proceed to Payment
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
  

  const renderAppointmentConfirmation = () => (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r  from-green-500 to-teal-600 text-white">
        <CardTitle className="text-xl font-bold">
          Appointment Confirmation
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <Alert>
          <Check className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your appointment has been successfully booked and payment processed.
          </AlertDescription>
        </Alert>
        <div className="space-y-2">
          <h3 className="font-semibold text-xl">Patient Details</h3>
          <p className="text-lg">Name: {state.patientData?.PatientName}</p>
          <p className="text-lg">Phone: {state.patientData?.MobileNo}</p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-xl">Appointment Details</h3>
          <p className="text-lg">
            Department:{" "}
            {
              state.departments.find(
                (d) => d.DepartmentID === state.selectedDepartmentId
              )?.Department
            }
          </p>
          <p className="text-lg">
            Doctor:{" "}
            {
              state.doctors.find(
                (d) => d.ConsultantID === state.selectedDoctor?.ConsultantID
              )?.ConsultantName
            }
          </p>
          <p className="text-lg">Date: {watch("appointmentDate")}</p>
          <p className="text-lg">
            Time:{" "}
            {state.selectedSlot &&
              format(
                parse(
                  state.availableSlots.find(
                    (s) => s.SlotID === state.selectedSlot
                  )?.SlotTime || "",
                  "HH:mm:ss",
                  new Date()
                ),
                "h:mm a"
              )}
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-xl">Payment Details</h3>
          <p className="text-lg">
            Amount Paid: ₹{state.selectedDoctor?.Fee || "N/A"}
          </p>
          <p className="text-lg">Payment Method: {watch("paymentMethod")}</p>
          <p className="text-lg">
            Payment Status:{" "}
            {state.paymentStatus === "success" ? "Successful" : "Pending"}
          </p>
        </div>
        <div className="flex space-x-4">
          <Button
            onClick={() => window.print()}
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-lg"
          >
            <Printer className="mr-2 h-5 w-5" /> Print Confirmation
          </Button>
          <Button
            onClick={generatePDF}
            className="w-full bg-green-500 hover:bg-green-600 text-white text-lg"
          >
            <Download className="mr-2 h-5 w-5" /> Download PDF
          </Button>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pb-10">
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
      <div className="max-w-5xl mx-auto">
        <nav className="my-6">
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
              <Button
                type="submit"
                disabled={state.loading}
                className="bg-indigo-500 hover:bg-indigo-600 text-white ml-auto text-md"
              >
                {state.loading ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </div>
     
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="fixed bottom-4 right-4">
            Need Help?
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Appointment Booking Help</DialogTitle>
            <DialogDescription>
              If you need assistance with booking your appointment, please don't
              hesitate to contact us.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <p>Phone: +91 8987999200</p>
            <p>Email: sjhrc.ranchi@gmail.com</p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => (window.location.href = "tel:+918987999200")}
            >
              Call Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
