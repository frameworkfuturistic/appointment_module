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

import opdTable from "@/json/opdTable";

const page = () => {
  return (
    <div>
      <div>
        <Table>
          <TableCaption>Caption</TableCaption>
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
            {opdTable.map((row) => (
              <TableRow>
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
    </div>
  );
};

export default page;
// const mappedData = tableData.rows.map(row => ({
//     consultant: row.Consultant,
//     department: row.Department,
//     designation: row.Designation,
//     opdTiming: row.OPD_Timing,
//     days: row.Days
//   }));

//   console.log(mappedData);
