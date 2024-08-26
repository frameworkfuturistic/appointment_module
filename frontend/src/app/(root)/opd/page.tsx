import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import opdTable, {consultantTable}from "@/json/opdTable";

const page = () => {
  return (
    <div className="gird grid-flow-row p-8 m-8 space-y-8">
      <div>
        <Table>
          {/* <TableCaption>Caption</TableCaption> */}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Consultant</TableHead>
              <TableHead className="w-[200px]">Department</TableHead>
              <TableHead className="w-[200px]">Designation</TableHead>
              <TableHead className="w-[200px]">OPD Timing</TableHead>
              <TableHead className="w-[200px]">Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {opdTable?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row?.name}</TableCell>
                <TableCell>{row?.department}</TableCell>
                <TableCell>{row?.designation}</TableCell>
                <TableCell>{row?.opd_timing}</TableCell>
                <TableCell>{row?.days}</TableCell>
              </TableRow>
            ))}
          </TableBody>
      
        </Table>
      </div>
      {/* CONSULTANT TABLE */}
      <div>
        <Table>
          <TableCaption>Caption</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name of Faculty</TableHead>
              <TableHead className="w-[200px]">Department</TableHead>

              <TableHead className="w-[200px]"> Timing</TableHead>
              <TableHead className="w-[200px]">Days</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultantTable.map((row) => (
              <TableRow>
                <TableCell className="font-medium">{row?.name}</TableCell>
                <TableCell>{row?.department}</TableCell>
                
                <TableCell>{row?.timing}</TableCell>
                <TableCell>{row?.days}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default page;

