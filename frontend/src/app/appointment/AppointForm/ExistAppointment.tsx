"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import axios from "axios";

const PatientSearchDialog = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchParams, setSearchParams] = useState({
    registrationNumber: "",
    patientName: "",
    dob: "",
    mobileNumber: "",
    oldOpdNumber: "",
  });

  const handleInputChange = (e) => {
    setSearchParams({
      ...searchParams,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:3001/appointments");
        setAppointments(res.data); // Use res.data directly since axios parses JSON automatically
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <Card>
      <CardHeader>
        <form className="w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center justify-between">
          <Input
            type="text"
            placeholder="Search by Registration no, mobile no."
            className="flex-grow bg-transparent border border-gray-300 rounded-lg h-11 font-medium text-md px-4 py-2"
            name="search"
            onChange={handleInputChange}
          />
          <Button className="flex md:w-auto bg-black text-white px-4 py-2 rounded-md">
            Search
          </Button>
        </form>
      </CardHeader>
      <CardContent>
        <div className="mt-6">
          <div className="overflow-x-auto">
            <Table className="table-auto">
              <TableHeader>
                <TableRow>
                  <TableHead>Department</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Shift</TableHead>
                  <TableHead>Slot</TableHead>
                  <TableHead>Patient Name</TableHead>
                  <TableHead>Age/Gender</TableHead>
                  <TableHead>DOB</TableHead>
                  <TableHead>Mobile No</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.department}</TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.shift}</TableCell>
                    <TableCell>{appointment.slot}</TableCell>
                    <TableCell>{appointment.patientDetails.name}</TableCell>
                    <TableCell>{`${appointment.patientDetails.age}Y/${appointment.patientDetails.gender}`}</TableCell>
                    <TableCell>{appointment.patientDetails.dob}</TableCell>
                    <TableCell>{appointment.patientDetails.mobileNo}</TableCell>
                    <TableCell>{appointment.patientDetails.address}</TableCell>
                    <TableCell>{appointment.patientDetails.notes}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <EllipsisVertical className="w-5 h-5 text-gray-500 cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Cancelled</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination and Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
            {/* Page size filter */}
            <div className="flex items-center space-x-2">
              <Label>Page Size</Label>
              <Select>
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Pagination buttons */}
            <div className="flex space-x-2">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientSearchDialog;
