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

import keyperformance from "@/json/keyPerformance";
import { ScrollArea } from "@/components/ui/scroll-area";

const page = () => {
  return (
    <div className="grid">
      <div className="bg-pattern5-bg  grid justify-items-center relative p-4 sm:p-6 md:p-8">
      <div className="relative ">
        <img
          src="/hospital/speciality.png"
          alt="img"
          className="w-full h-96 object-fill"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <h1 className="text-4xl sm:text-4xl font-bold text-white">
            Key Performance
          </h1>
        </div>
      </div>
        <div className=" grid grid-cols-1 sm:grid-cols-1 sm:text-wrap  gap-4 sm:gap-6 md:gap-8 justify-self-center p-4 ">
      <ScrollArea className="h-[600px] w-[800px] rounded-md border p-4 bg-rose-100">
        <Table >
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">S no.</TableHead>
              <TableHead className="w-[500px]">Indicator</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keyperformance?.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row?.id}</TableCell>
                <TableCell>{row?.indicator}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </ScrollArea>
      </div>
      </div>
      
      
      
    </div>
  );
};

export default page;
