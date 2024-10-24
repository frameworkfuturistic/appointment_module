"use client";

import React, { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import axiosInstance from "@/lib/axiosInstance";
import { format } from "date-fns";
import { Calendar, Clock, Search, User, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HeaderBanner from "@/components/HeaderBanner";

// Existing interface and fetch function...
interface Consultant {
  id: string;
  consultantName: string;
  departmentName: string;
  designation: string;
  opdTiming: {
    from: string;
    to: string;
  };
  days: string[];
}

const fetchDoctors = async (): Promise<Consultant[]> => {
  const response = await axiosInstance.get("/consultant");
  return response;
};

const queryClient = new QueryClient();

export default function DoctorAvailability() {
  return (
    <QueryClientProvider client={queryClient}>
      <DoctorAvailabilityContent />
    </QueryClientProvider>
  );
}

function DoctorAvailabilityContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const {
    data: doctors,
    isLoading,
    error,
  } = useQuery<Consultant[], Error>({
    queryKey: ["doctors"],
    queryFn: fetchDoctors,
  });

  const filteredDoctors = doctors?.filter(
    (doctor) =>
      doctor.consultantName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedDepartment === "" ||
        doctor.departmentName === selectedDepartment)
  );

  const departments = [
    ...new Set(doctors?.map((doctor) => doctor.departmentName)),
  ];

  const formatTime = (timeString: string) => {
    try {
      const [hours, minutes] = timeString.split(":");
      return format(
        new Date(2000, 0, 1, parseInt(hours), parseInt(minutes)),
        "h:mm a"
      );
    } catch {
      return "Invalid Time";
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-red-500">An error occurred: {error.message}</div>
    );

  return (
    <div className="min-h-fit bg-gradient-to-b from-blue-50 to-white ">
      <HeaderBanner
        title="Doctor Schedules"
        subtitle="Comprehensive care for your health and well-being"
        bgImage="/path-to-your-bg-image.jpg" // Replace with your actual image path
      />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="flex flex-col md:flex-row justify-evenly items-center mb-6 space-y-4 md:space-y-0 md:space-x-4 bg-rose-200 p-8 md:rounded-full rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search doctors..."
              className="pl-10 border border-slate-500 rounded-2xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-full md:w-1/3 border-slate-500 rounded-2xl">
              <SelectValue placeholder="Filter by department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        <AnimatePresence>
          {filteredDoctors?.length === 0 ? (
            <motion.div
              className="text-center mt-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No doctors found matching your search criteria.
            </motion.div>
          ) : (
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader className="bg-rose-200">
                      <TableRow>
                        <TableHead className="font-bold text-primary">
                          Doctor
                        </TableHead>
                        <TableHead className="font-bold text-primary hidden md:table-cell">
                          Department
                        </TableHead>
                        <TableHead className="font-bold text-primary hidden lg:table-cell">
                          Designation
                        </TableHead>
                        <TableHead className="font-bold text-primary">
                          Schedule
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Add custom rows here */}
                      <TableRow className="bg-secondary/5">
                        <TableCell className="font-medium">
                          <div className="flex items-center font-semibold">
                            <User className="mr-2 h-4 w-4 text-primary" />
                            Prof. (Dr.) Sudhir Kumar
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge
                                  variant="outline"
                                  className="bg-primary/10 text-primary"
                                >
                                  Orthopaedics
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Department: Orthopaedics</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center">
                            <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                            Managing Director, Senior Consultant & HOD(Ortho)
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              09:00 am To 05:00 pm
                            </div>
                            <div className="flex flex-wrap items-center gap-1">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              <Badge variant="secondary" className="text-xs">
                                Mon
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Tue
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Wed
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Thu
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Fri
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Sat - Operation Day
                              </Badge>
                              <Badge variant="secondary" className="text-xs">
                                Sun
                              </Badge>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                      {filteredDoctors?.map((doctor, index) => (
                        <TableRow
                          key={doctor.id}
                          className={
                            index % 2 === 0 ? "bg-secondary/5" : "bg-background"
                          }
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4 text-primary" />
                              {doctor.consultantName}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <Badge
                                    variant="outline"
                                    className="bg-primary/10 text-primary"
                                  >
                                    {doctor.departmentName}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Department: {doctor.departmentName}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex items-center">
                              <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                              {doctor.designation}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center">
                                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                                {formatTime(doctor.opdTiming.from)} -{" "}
                                {formatTime(doctor.opdTiming.to)}
                              </div>
                              <div className="flex flex-wrap items-center gap-1">
                                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                                {doctor.days.map((day, idx) => (
                                  <Badge
                                    key={idx}
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {day.slice(0, 3)}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
