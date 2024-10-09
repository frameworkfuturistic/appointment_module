"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { toast } from "@/components/ui/use-toast";
import { Search, Loader2, SearchCodeIcon } from "lucide-react";
import axios from "axios";

type Appointment = {
  OPDOnlineAppointmentID: number;
  MRNo: string;
  PatientName: string;
  MobileNo: string;
  ConsultationDate: string;
  SlotToken: string;
  Status: string;
};

export default function AdvancedAppointmentSearch() {
  const [searchType, setSearchType] = useState<
    "MobileNo" | "OPDOnlineAppointmentID" | "MRNo"
  >("MobileNo");
  const [searchValue, setSearchValue] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearch = async () => {
    if (!searchValue.trim()) {
      toast({
        title: "Error",
        description: "Please enter a search value.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v1/search", {
        [searchType]: searchValue.trim(),
      });

      setAppointments(response.data.appointments);

      if (response.data.appointments.length === 0) {
        toast({
          title: "No appointments found",
          description: "Please check your search criteria and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error searching appointments:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while searching for appointments. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string | undefined) => {
    if (!status) {
      return "bg-gray-500"; // Default color if status is undefined or empty
    }

    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-fit bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
          disabled={isLoading}
        ><SearchCodeIcon/> &nbsp;Find Appointment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[60vw] h-[60vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-primary">
            Advanced Appointment Search
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Search for your appointments using Mobile Number, Appointment ID, or
            MR No
          </DialogDescription>
        </DialogHeader>
        <Card>
          <CardContent className="p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label
                    htmlFor="searchType"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Search By
                  </Label>
                  <Select
                    value={searchType}
                    onValueChange={(
                      value: "MobileNo" | "OPDOnlineAppointmentID" | "MRNo"
                    ) => setSearchType(value)}
                  >
                    <SelectTrigger id="searchType" className="w-full mt-1">
                      <SelectValue placeholder="Select search type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MobileNo">Mobile Number</SelectItem>
                      <SelectItem value="OPDOnlineAppointmentID">
                        Appointment ID
                      </SelectItem>
                      <SelectItem value="MRNo">MR Number</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-[2]">
                  <Label
                    htmlFor="searchValue"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    {searchType === "MobileNo"
                      ? "Mobile Number"
                      : searchType === "MRNo"
                      ? "MR Number"
                      : "Appointment ID"}
                  </Label>
                  <Input
                    id="searchValue"
                    type={
                      searchType === "MobileNo"
                        ? "tel"
                        : searchType === "MRNo"
                        ? "text"
                        : "number"
                    }
                    placeholder={`Enter ${
                      searchType === "MobileNo"
                        ? "mobile number"
                        : searchType === "MRNo"
                        ? "MR number"
                        : "appointment ID"
                    }`}
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="mt-1"
                    maxLength={searchType === "MobileNo" ? 10 : undefined}
                  />
                </div>
              </div>
              <div className="flex-[2] mx-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Appointments
                  </>
                )}
              </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        <AnimatePresence>
          {appointments.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="mt-8">
               
                <CardContent>
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">ID</TableHead>
                          <TableHead>MR No</TableHead>
                          <TableHead>Patient Name</TableHead>
                          <TableHead>Mobile No</TableHead>
                          <TableHead>Consultation Date</TableHead>
                          <TableHead>Slot Token</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {appointments.map((appointment) => (
                          <TableRow key={appointment.OPDOnlineAppointmentID}>
                            <TableCell className="font-medium">
                              {appointment.OPDOnlineAppointmentID}
                            </TableCell>
                            <TableCell>{appointment.MRNo}</TableCell>
                            <TableCell>{appointment.PatientName}</TableCell>
                            <TableCell>{appointment.MobileNo}</TableCell>
                            <TableCell>
                              {new Date(
                                appointment.ConsultationDate
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>{appointment.SlotToken}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-white text-xs ${getStatusColor(
                                  appointment.Status
                                )}`}
                              >
                                {appointment.Status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
