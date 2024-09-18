"use client";

import React, { useState } from "react";
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

const PatientSearchDialog = () => {
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

  return (
    <>
      <Card>
        <CardHeader>
          <form className="w-full flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center justify-between">
            <Input
              type="text"
              placeholder="Search by Registration no, mobile no. "
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
          {/* Filterable Table */}
          <div className="mt-6">
            <div className="overflow-x-auto">
              <Table className=" table-auto">
                <TableHeader>
                  <TableRow>
                    <TableHead>Reg. No</TableHead>
                    <TableHead>Patient Name</TableHead>
                    <TableHead>Age/Gender</TableHead>
                    <TableHead>DOB</TableHead>
                    <TableHead>Mobile No</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Payer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* Example data row */}
                  <TableRow>
                    <TableCell>116</TableCell>
                    <TableCell>Mr. Good Luck</TableCell>
                    <TableCell>23Y/M</TableCell>
                    <TableCell>11/07/1996</TableCell>
                    <TableCell>9009900909</TableCell>
                    <TableCell>Namkum, Ranchi</TableCell>
                    <TableCell>PRIVATE CASH</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-sm bg-yellow-200 rounded-full">
                        Admitted
                      </span>
                    </TableCell>
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
                  {/* Add more rows dynamically */}
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
    </>
  );
};

export default PatientSearchDialog;
