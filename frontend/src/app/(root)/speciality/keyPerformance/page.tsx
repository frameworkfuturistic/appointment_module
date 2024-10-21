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
import HeaderBanner from "@/components/HeaderBanner";

const page = () => {
  return (
    
  
      
      
      
    // </section>
    <section className="grid">
  <div className="bg-pattern5-bg grid justify-items-center relative p-4 sm:p-6 md:p-8">
    {/* Image Section with Overlay */}
  
    <HeaderBanner
        title=" Key Performance"
        subtitle="Providing Exceptional Healthcare with Compassion and Excellence"
        bgImage="/hospital/speciality.png" // Replace with your actual image path
      />

    {/* Table Section */}
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 p-4 w-full max-w-4xl">
      <ScrollArea className="h-[400px] sm:h-[500px] md:h-[600px] w-full rounded-md border p-4 bg-rose-100">
        <Table>
          <TableCaption></TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24 sm:w-32 md:w-40">S no.</TableHead>
              <TableHead className="w-56 sm:w-72 md:w-96">Indicator</TableHead>
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
</section>

  );
};

export default page;
