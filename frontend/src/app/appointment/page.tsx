"use client";

import React, { useState, useEffect, useCallback, useReducer } from "react";
import { useForm, Controller } from "react-hook-form";
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
  Search,
  Edit,
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
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


import { jsPDF } from "jspdf";
import Link from "next/link";
import ExistAppointment from "./ExistAppointment";
import RazorpayLoader from "@/lib/RazorpayLoader";

const API_BASE_URL = "http://127.0.0.1:8000/api/v1";

const steps = [
  {
    id: "choose-slot",
    title: "Choose Slot",
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    id: "patient-details",
    title: "Patient Details",
    icon: <User className="h-6 w-6" />,
  },
  { id: "payment", title: "Payment", icon: <CreditCard className="h-6 w-6" /> },
  {
    id: "confirmation",
    title: "Confirmation",
    icon: <Printer className="h-6 w-6" />,
  },
];

interface State {
  departments: Array<{ DepartmentID: number; Department: string }>;
  doctors: Array<{
    ConsultantID: number;
    ConsultantName: string;
    Fee?: number;
  }>;
  selectedDoctor: {
    ConsultantID: number;
    ConsultantName: string;
    Fee?: number;
  } | null;
  availableSlots: Array<{
    SlotID: number;
    SlotTime: string;
    isBooked?: boolean;
  }>;
  selectedSlot: number | null;
  error: string | null;
  loading: boolean;
  patientData: {
    PatientName?: string;
    MobileNo?: string;
    // Email?: string;
    Sex?: string;
    DOB?: string;
    MRNo?: string;
  } | null;
  appointmentDetails: {
    appointment?: {
      OPDOnlineAppointmentID?: number;
    };
  } | null;
  selectedDepartmentId: number | null;
  paymentStatus: "success" | "failed" | null;
  temporaryAppointmentId: string | null;
  isProcessingPayment: boolean;
  existingPatient: boolean;
  multiplePatients: Array<{
    PatientName: string;
    MobileNo: string;
    MRNo: string;
  }>;
}

type Action =
  | { type: "SET_DEPARTMENTS"; payload: State["departments"] }
  | { type: "SET_DOCTORS"; payload: State["doctors"] }
  | { type: "SET_SELECTED_DOCTOR"; payload: number }
  | { type: "SET_AVAILABLE_SLOTS"; payload: State["availableSlots"] }
  | { type: "SET_SELECTED_SLOT"; payload: number }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_PATIENT_DATA"; payload: State["patientData"] }
  | { type: "SET_APPOINTMENT_DETAILS"; payload: State["appointmentDetails"] }
  | { type: "SET_SELECTED_DEPARTMENT_ID"; payload: number }
  | { type: "SET_PAYMENT_STATUS"; payload: State["paymentStatus"] }
  | { type: "SET_TEMPORARY_APPOINTMENT_ID"; payload: string }
  | { type: "SET_IS_PROCESSING_PAYMENT"; payload: boolean }
  | { type: "SET_EXISTING_PATIENT"; payload: boolean }
  | { type: "SET_MULTIPLE_PATIENTS"; payload: State["multiplePatients"] };

const initialState: State = {
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
  temporaryAppointmentId: null,
  isProcessingPayment: false,
  existingPatient: false,
  multiplePatients: [],
};

function formReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_DEPARTMENTS":
      return { ...state, departments: action.payload };
    case "SET_DOCTORS":
      return { ...state, doctors: action.payload };
    case "SET_SELECTED_DOCTOR":
      return {
        ...state,
        selectedDoctor:
          state.doctors.find(
            (doctor) => doctor.ConsultantID === action.payload
          ) || null,
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
    case "SET_TEMPORARY_APPOINTMENT_ID":
      return { ...state, temporaryAppointmentId: action.payload };
    case "SET_IS_PROCESSING_PAYMENT":
      return { ...state, isProcessingPayment: action.payload };
    case "SET_EXISTING_PATIENT":
      return { ...state, existingPatient: action.payload };
    case "SET_MULTIPLE_PATIENTS":
      return { ...state, multiplePatients: action.payload };
    default:
      return state;
  }
}


const debounce = <F extends (...args: any[]) => any>(func: F, wait: number) => {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<F>) {
    const context = this;
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

const saveToSessionStorage = (key: string, data: any) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

const getFromSessionStorage = (key: string) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const removeFromSessionStorage = (key: string) => {
  sessionStorage.removeItem(key);
};

export default function Component() {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [isEditMode, setIsEditMode] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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

  const createTemporaryAppointment = useCallback(async (data: any) => {
    const tempAppointmentId = Date.now().toString();
    saveToSessionStorage(tempAppointmentId, data);
    dispatch({
      type: "SET_TEMPORARY_APPOINTMENT_ID",
      payload: tempAppointmentId,
    });
    return tempAppointmentId;
  }, []);

  const updateTemporaryAppointment = useCallback(
    async (id: string, data: any) => {
      const existingData = getFromSessionStorage(id);
      if (existingData) {
        saveToSessionStorage(id, { ...existingData, ...data });
      }
    },
    []
  );

  const deleteTemporaryAppointment = useCallback(async (id: string) => {
    removeFromSessionStorage(id);
  }, []);

  const createPatient = useCallback(async (data: any) => {
    if (data) {
      try {
        const response = await axios.post(`${API_BASE_URL}/patients`, {
          PatientName: data.patientName,
          Sex: data.gender,
          MobileNo: data.mobileNo,
          // Email: data.email,
          DOB: data.DOB,
        });
        dispatch({ type: "SET_PATIENT_DATA", payload: response.data.patient });
        toast({
          title: "Patient Created",
          description: "Your patient profile has been created successfully.",
        });
        return response.data.patient;
      } catch (err) {
        console.error("Error creating patient:", err.response?.data);
        dispatch({ type: "SET_ERROR", payload: "Error creating patient" });
        toast({
          title: "Error",
          description: "Failed to create patient profile. Please try again.",
          variant: "destructive",
        });
        throw err;
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

  const fetchDoctors = useCallback(async (departmentId: number) => {
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

  const fetchAvailableSlots = async (doctorId: number, date: string) => {
    if (!doctorId || !date) return;

    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const response = await axios.get(
        `${API_BASE_URL}/slots/${doctorId}/${date}`
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
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  const debouncedFetchAvailableSlots = useCallback(
    debounce((doctorId: number, date: string) => {
      fetchAvailableSlots(doctorId, date);
    }, 300),
    []
  );

  const bookAppointment = async (data: any) => {
    if (state.appointmentDetails?.appointment?.OPDOnlineAppointmentID) {
      console.log(
        "Appointment already exists, using existing ID:",
        state.appointmentDetails.appointment.OPDOnlineAppointmentID
      );
      return state.appointmentDetails;
    }

    const appointmentData = {
      ConsultantID: data.doctorId,
      MRNo: state.patientData?.MRNo,
      ConsultationDate: data.appointmentDate,
      SlotID: data.slotId,
      SlotToken: data.slotToken,
      Pending: 1,
      Remarks: data.reason,
      PatientName: state.patientData?.PatientName,
      MobileNo: state.patientData?.MobileNo,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/appointments`,
        appointmentData
      );
      console.log("Appointment Response:", response.data.data);
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
    } catch (error: any) {
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

  const processPayment = async (data: { amount: number }) => {
    if (state.isProcessingPayment) {
      console.log("Payment is already being processed");
      return;
    }

    dispatch({ type: "SET_IS_PROCESSING_PAYMENT", payload: true });

    try {
      console.log("Appointment Details:", state.appointmentDetails);

      const appointmentId =
        
        state.appointmentDetails?.appointment?.OPDOnlineAppointmentID;
      console.log("Extracted OPDOnlineAppointmentID:", appointmentId);

      if (!appointmentId || typeof appointmentId !== "number") {
        throw new Error(
          "Invalid OPDOnlineAppointmentID. It must be an integer."
        );
      }

      const amountPaid = Math.floor(parseFloat(data.amount.toString()));
      if (isNaN(amountPaid) || amountPaid <= 0) {
        throw new Error("Invalid amount. It must be a positive integer.");
      }

      const paymentData = {
        OPDOnlineAppointmentID: appointmentId,
        AmountPaid: amountPaid,
        PaymentMode: "Razorpay",
      };

      console.log("Payment Request Data:", paymentData);

      const paymentResponse = await axios.post(
        `${API_BASE_URL}/payments`,
        paymentData
      );

      const { order_id } = paymentResponse.data;

      if (!order_id) {
        throw new Error("Order ID not found in the payment response.");
      }

      const razorpayOptions = {
        key_id:
          process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_4clm2oRR0AjqFE",
        amount: amountPaid * 100,
        currency: "INR",
        name: "Shree Jagannath Hospital & Research Center",
        description: "Appointment Payment",
        order_id: order_id,
        handler: async function (response: any) {
          try {
            const callbackPaymentData = {
              OPDOnlineAppointmentID: appointmentId,
              PaymentMode: "Razorpay",
              PaymentStatus: "Paid",
              AmountPaid: amountPaid,
              TransactionID: response.razorpay_payment_id,
            };

            console.log("Payment Data for Callback:", callbackPaymentData);

            await axios.put(`${API_BASE_URL}/appointments/${appointmentId}`, {
              Pending: 0,
            });

            dispatch({ type: "SET_PAYMENT_STATUS", payload: "success" });
            toast({
              title: "Payment Successful",
              description:
                "Your payment has been processed and appointment confirmed.",
            });

            if (state.temporaryAppointmentId) {
              removeFromSessionStorage(state.temporaryAppointmentId);
            }

            setCurrentStep(currentStep + 1);
          } catch (error) {
            console.error(
              "Error updating payment or appointment status:",
              error
            );
            toast({
              title: "Payment Error",
              description:
                "Payment was processed, but there was an error confirming your appointment.",
              variant: "destructive",
            });
          } finally {
            dispatch({ type: "SET_IS_PROCESSING_PAYMENT", payload: false });
          }
        },
        prefill: {
          name: state.patientData?.PatientName,
          // email: state.patientData?.Email,
          contact: state.patientData?.MobileNo,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new (window as any).Razorpay(razorpayOptions);
      razorpay.open();
    } catch (error) {
      console.error("Payment processing error:", error);
      toast({
        title: "Payment Error",
        description: "Unable to process the payment. Please try again.",
        variant: "destructive",
      });
      dispatch({ type: "SET_IS_PROCESSING_PAYMENT", payload: false });
    }
  };

  const searchExistingPatient = useCallback(async (mrdOrMobile: string) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/patients/search`, {
        params: { mrdOrMobile },
      });
      if (response.data.patients && Array.isArray(response.data.patients) && response.data.patients.length > 0) {
        setSearchResults(response.data.patients);
        toast({
          title: "Patients Found",
          description: "Please select the correct patient from the list.",
        });
      } else {
        setSearchResults([]);
        dispatch({ type: "SET_EXISTING_PATIENT", payload: false });
        toast({
          title: "Patient Not Found",
          description: "No existing patient found with the provided details.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error searching for patient:", error);
      setSearchResults([]);
      toast({
        title: "Error",
        description: "An error occurred while searching for the patient.",
        variant: "destructive",
      });
    }
  }, [dispatch]);

  const autoFillPatientData = useCallback((patient: any) => {
    if (patient) {
      setValue("patientName", patient.PatientName || "");
      setValue("mobileNo", patient.MobileNo || "");
      setValue("gender", patient.Sex || "");
      setValue("DOB", patient.DOB || "");
      dispatch({ type: "SET_PATIENT_DATA", payload: patient });
      dispatch({ type: "SET_EXISTING_PATIENT", payload: true });
      toast({
        title: "Patient Selected",
        description: "Patient details have been auto-filled.",
      });
    }
  }, [dispatch, setValue]);

  const onSubmit = useCallback(
    async (data: any) => {
      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({ type: "SET_ERROR", payload: null });

      try {
        switch (currentStep) {
          case 0: // Choose Slot
            if (!state.selectedSlot) {
              throw new Error("Please select a slot before proceeding.");
            }
            const tempAppointmentId = await createTemporaryAppointment({
              doctorId: data.doctorId,
              appointmentDate: data.appointmentDate,
              slotId: state.selectedSlot,
            });
            setCurrentStep(currentStep + 1);
            break;
          case 1: // Patient Details
            let patient;
            if (!state.existingPatient) {
              patient = await createPatient(data);
            } else {
              patient = state.patientData;
            }
            await updateTemporaryAppointment(state.temporaryAppointmentId!, {
              patientData: patient,
            });
            dispatch({ type: "SET_PATIENT_DATA", payload: patient });
            setCurrentStep(currentStep + 1);
            break;
          case 2: // Payment
            if (!state.patientData || !state.patientData.MRNo) {
              throw new Error(
                "Patient data is missing. Please go back and fill in the patient details."
              );
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
            await processPayment({ amount: state.selectedDoctor?.Fee || 0 });
            break;
          default:
            break;
        }
      } catch (err: any) {
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
    [
      currentStep,
      state.selectedSlot,
      state.patientData,
      state.existingPatient,
      createPatient,
      createTemporaryAppointment,
      updateTemporaryAppointment,
      bookAppointment,
      processPayment,
    ]
  );

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  useEffect(() => {
    fetchDoctors(state.selectedDepartmentId!);
  }, [state.selectedDepartmentId, fetchDoctors]);

  useEffect(() => {
    if (state.selectedDoctor && watch("appointmentDate")) {
      debouncedFetchAvailableSlots(
        state.selectedDoctor.ConsultantID,
        watch("appointmentDate")
      );
    }
  }, [
    state.selectedDoctor,
    watch("appointmentDate"),
    debouncedFetchAvailableSlots,
  ]);

  useEffect(() => {
    const tempAppointmentId = sessionStorage.getItem("temporaryAppointmentId");
    if (tempAppointmentId) {
      const tempAppointmentData = getFromSessionStorage(tempAppointmentId);
      if (tempAppointmentData) {
        dispatch({
          type: "SET_TEMPORARY_APPOINTMENT_ID",
          payload: tempAppointmentId,
        });
        if (tempAppointmentData.doctorId) {
          dispatch({
            type: "SET_SELECTED_DOCTOR",
            payload: parseInt(tempAppointmentData.doctorId),
          });
        }
        if (tempAppointmentData.appointmentDate) {
          setValue("appointmentDate", tempAppointmentData.appointmentDate);
        }
        if (tempAppointmentData.slotId) {
          dispatch({
            type: "SET_SELECTED_SLOT",
            payload: tempAppointmentData.slotId,
          });
        }
        if (tempAppointmentData.patientData) {
          dispatch({
            type: "SET_PATIENT_DATA",
            payload: tempAppointmentData.patientData,
          });
        }
      }
    }

    return () => {
      if (state.temporaryAppointmentId) {
        deleteTemporaryAppointment(state.temporaryAppointmentId);
      }
    };
  }, [deleteTemporaryAppointment, setValue]);

  const handleSlotSelection = (slotId: number) => {
    dispatch({ type: "SET_SELECTED_SLOT", payload: slotId });
  };

  const calculateAge = (DOB: string) => {
    const dobDate = new Date(DOB);
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
    const slipHeight = pageHeight - 190;

    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(10, 10, slipWidth, slipHeight);

    doc.setFontSize(16);
    doc.text("Shree Jagannath Hospital & Research Center", pageWidth / 2, 20, {
      align: "center",
    });
    doc.setFontSize(10);
    doc.text(
      "Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001, INDIA",
      pageWidth / 2,
      30,
      { align: "center" }
    );
    doc.text(
      "Phone: +91 8987999200, Email: sjhrc.ranchi@gmail.com",
      pageWidth / 2,
      36,
      { align: "center" }
    );

    doc.setDrawColor(200);
    doc.line(10, 40, pageWidth - 10, 40);

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 255);
    doc.text("Appointment Slip", pageWidth / 2, 45, { align: "center" });

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    const leftColumnStart = 20;
    const rightColumnStart = pageWidth / 2 + 10;
    let currentY = 52;

    doc.text(
      `MRNo: ${state.appointmentDetails?.appointment?.MRNo || "N/A"}`,
      leftColumnStart,
      currentY
    );
    doc.text(
      `TransactionID : ${
        state.appointmentDetails?.appointment?.OPDOnlineAppointmentID || "N/A"
      }`,
      rightColumnStart,
      currentY
    );

    currentY += 10;
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
    const age = calculateAge(state.patientData?.DOB || "");
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
              ?.SlotTime || "",
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
      `Slot Token: ${
        state.appointmentDetails?.appointment?.SlotToken || "N/A"
      }`,
      leftColumnStart,
      currentY
    );
    doc.text(
      `Appointment ID: ${
        state.appointmentDetails?.appointment?.OPDOnlineAppointmentID || "N/A"
      }`,
      rightColumnStart,
      currentY
    );

    currentY += 10;
    doc.text(
      `Total Amount Paid: ${state.selectedDoctor?.Fee}`,
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

  const renderChooseSlot = () => (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <div className="flex justify-between">
          <CardTitle className="text-xl font-bold">Select Slot</CardTitle>
          <ExistAppointment />
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    debouncedFetchAvailableSlots(
                      parseInt(value),
                      watch("appointmentDate")
                    );
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
                        if (!slot.isBooked) {
                          handleSlotSelection(slot.SlotID);
                        }
                      }}
                    >
                      <CardContent className="p-4 text-center">
                        <p className="font-semibold">
                          {format(
                            parse(slot.SlotTime, "HH:mm:ss", new Date()),
                            "h:mm a"
                          )}
                        </p>
                        <p className="text-sm">
                          {slot.isBooked ? "Booked" : "Available"}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <p className="text-gray-500">No available slots for this date.</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-end">
        <Button
          type="submit"
          onClick={handleSubmit(onSubmit)}
          disabled={!state.selectedSlot}
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );

  const renderPatientDetails = () => (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardTitle className="text-xl font-bold">Patient Details</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
      <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter MRD or Mobile Number"
              {...register("searchMrdOrMobile")}
            />
            <Button
              onClick={() => searchExistingPatient(watch("searchMrdOrMobile"))}
            >
              <Search className="mr-2 h-4 w-4" /> Search
            </Button>
          </div>
          {searchResults.length > 0 && (
            <Select onValueChange={(value) => autoFillPatientData(JSON.parse(value))}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {searchResults.map((patient) => (
                  <SelectItem key={patient.MRNo} value={JSON.stringify(patient)}>
                    {patient.PatientName} - {patient.MobileNo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          {initialState.existingPatient && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Existing Patient</AlertTitle>
              <AlertDescription>
                Patient details have been auto-filled. Please review and update if necessary.
              </AlertDescription>
            </Alert>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="patientName" className="text-lg font-semibold">
              Patient Name
            </Label>
            <Input
              id="patientName"
              {...register("patientName", {
                required: "Patient name is required",
              })}
              className="text-lg"
              defaultValue={state.patientData?.PatientName || ""}
              disabled={state.existingPatient && !isEditMode}
            />
            {errors.patientName && (
              <p className="text-red-500 text-sm">
                {errors.patientName.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="mobileNo" className="text-lg font-semibold">
              Mobile Number
            </Label>
            <Input
              id="mobileNo"
              {...register("mobileNo", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number",
                },
              })}
              className="text-lg"
              defaultValue={state.patientData?.MobileNo || ""}
              disabled={state.existingPatient && !isEditMode}
            />
            {errors.mobileNo && (
              <p className="text-red-500 text-sm">{errors.mobileNo.message}</p>
            )}
          </div>
          {/* <div className="space-y-2">
            <Label htmlFor="email" className="text-lg font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="text-lg"
              defaultValue={state.patientData?.Email || ""}
              disabled={state.existingPatient && !isEditMode}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div> */}
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
                      disabled={state.existingPatient && !isEditMode}
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
            <Label htmlFor="gender" className="text-lg font-semibold">
              Gender
            </Label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              defaultValue={state.patientData?.Sex || ""}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                  disabled={state.existingPatient && !isEditMode}
                >
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
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="reason" className="text-lg font-semibold">
              Reason for Visit
            </Label>
            <Textarea
              id="reason"
              {...register("reason", {
                required: "Reason for visit is required",
              })}
              className="text-lg"
            />
            {errors.reason && (
              <p className="text-red-500 text-sm">{errors.reason.message}</p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-between">
        {state.existingPatient && (
          <Button onClick={() => setIsEditMode(!isEditMode)}>
            {isEditMode ? (
              <>
                <Check className="mr-2 h-4 w-4" /> Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" /> Edit Details
              </>
            )}
          </Button>
        )}
        <Button type="submit" onClick={handleSubmit(onSubmit)}>
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );

  const renderPayment = () => (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardTitle className="text-xl font-bold">Payment</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <Label className="text-md text-slate-500">
              Patient Name:{" "}
              <span className="ml-auto font-medium text-md text-slate-900">
                {state.patientData?.PatientName}
              </span>
            </Label>
            <Label className="text-md text-slate-500">
              MRNO:{" "}
              <span className="ml-auto font-medium text-md text-slate-900">
                {state.patientData?.MRNo}
              </span>
            </Label>
            <Label className="text-md text-slate-500">
              Appointment Date:{" "}
              <span className="ml-auto font-medium text-md text-slate-900">
                {watch("appointmentDate")}
              </span>
            </Label>
            <Label className="text-md text-slate-500">
              Slot:{" "}
              <span className="ml-auto font-medium text-md text-slate-900">
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
              </span>
            </Label>
            <Label className="text-md text-slate-500">
              Doctor:{" "}
              <span className="ml-auto font-medium text-md text-slate-900">
                {
                  state.doctors.find(
                    (d) => d.ConsultantID === state.selectedDoctor?.ConsultantID
                  )?.ConsultantName
                }
              </span>
            </Label>
            <Label className="text-md text-slate-500">
              Consultation Fee:{" "}
              <span className="ml-auto font-medium text-md text-slate-900">
                ₹ {state.selectedDoctor?.Fee || "N/A"}
              </span>
            </Label>

            <Label className="text-md text-slate-500">
              Appointment ID:{" "}
              <span className="ml-auto font-medium text-md text-slate-900">
                {state.appointmentDetails?.appointment?.OPDOnlineAppointmentID}
              </span>
            </Label>
          </div>
        </div>
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Payment Information</AlertTitle>
          <AlertDescription>
            You will be redirected to our secure payment gateway to complete
            your payment.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-end">
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-green-600 hover:bg-green-700"
          disabled={state.isProcessingPayment}
        >
          {state.isProcessingPayment ? (
            <>
              Processing... <RefreshCw className="ml-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              Pay Now <CreditCard className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );

  const renderConfirmation = () => (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardTitle className="text-xl font-bold">Confirmation</CardTitle>
      </CardHeader>
      <CardContent className="px-8 space-y-6">
        {state.paymentStatus === "success" ? (
          <>
            <div className="p-2 mx-auto ">
              <div className="text-center">
                <Check className="mx-auto h-16 w-16 text-green-500" />
                <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                  Payment Successful
                </h2>
                <p className="mt-2 text-lg text-gray-600">
                  Your appointment has been confirmed.
                </p>
              </div>

              <div className="mt-8 border-t pt-6">
                <ul className="space-y-4">
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Appointment ID:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {
                        state.appointmentDetails?.appointment
                          ?.OPDOnlineAppointmentID
                      }
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Patient Name:
                    </span>
                    <span className="font-semibold text-gray-900">
                      {state.patientData?.PatientName}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">Doctor:</span>
                    <span className="font-semibold text-gray-900">
                      {
                        state.doctors.find(
                          (d) =>
                            d.ConsultantID ===
                            state.selectedDoctor?.ConsultantID
                        )?.ConsultantName
                      }
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">Date:</span>
                    <span className="font-semibold text-gray-900">
                      {watch("appointmentDate")}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">Time:</span>
                    <span className="font-semibold text-gray-900">
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
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="font-medium text-gray-700">
                      Amount Paid:
                    </span>
                    <span className="font-semibold text-gray-900">
                      ₹{state.selectedDoctor?.Fee}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="text-center mt-8">
                <p className="text-sm text-gray-500">
                  Thank you for choosing our service. We look forward to seeing
                  you at your appointment!
                </p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <X className="mx-auto h-16 w-16 text-red-500" />
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              Payment Failed
            </h2>
            <p className="mt-2 text-lg text-gray-600">
              There was an issue processing your payment. Please try again.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-between">
        {state.paymentStatus === "success" ? (
          <>
            <Button
              onClick={generatePDF}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Download PDF <Download className="ml-2 h-4 w-4" />
            </Button>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">
                Back to Home <MoveLeft className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </>
        ) : (
          <Button
            onClick={() => setCurrentStep(2)}
            className="bg-red-600 hover:bg-red-700"
          >
            Try Again <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <>
      <RazorpayLoader />
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

      <div className="container mx-auto px-4 py-8">
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
                <span className="hidden md:inline">{step.title}</span>
                {index < steps.length - 1 && (
                  <div className="flex-1 hidden sm:inline">
                    <div className="w-44 mx-auto bg-gray-200 rounded h-2.5 dark:bg-gray-700">
                      <div
                        className="bg-blue-600 h-2.5 rounded"
                        style={{
                          width: `${
                            index < currentStep ? "100%" : "0%"
                          }`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 0 && renderChooseSlot()}
          {currentStep === 1 && renderPatientDetails()}
          {currentStep === 2 && renderPayment()}
          {currentStep === 3 && renderConfirmation()}
        </form>
        {state.error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        )}
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="hidden">Open</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Multiple Patients Found</DialogTitle>
            <DialogDescription>
              Please select the correct patient from the list below:
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            {state.multiplePatients.map((patient) => (
              <Button
                key={patient.MRNo}
                onClick={() => {
                  dispatch({ type: "SET_PATIENT_DATA", payload: patient });
                  dispatch({ type: "SET_EXISTING_PATIENT", payload: true });
                  autoFillPatientData(patient);
                }}
                className="justify-start"
              >
                {patient.PatientName} - {patient.MobileNo}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}