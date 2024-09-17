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
    
    // <section  className=" grid">
    //   <div className="bg-pattern5-bg  grid justify-items-center relative p-4 sm:p-6 md:p-8">
    //   <div className="relative ">
    //     <img
    //       src="/hospital/speciality.png"
    //       alt="img"
    //       className="w-full h-96 object-fill"
    //     />
    //     <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
    //       <h1 className="text-4xl sm:text-4xl font-bold text-white">
    //         Key Performance
    //       </h1>
    //     </div>
    //   </div>
    //     <div className=" grid grid-cols-1 sm:grid-cols-1 sm:text-wrap  gap-4 sm:gap-6 md:gap-8 justify-self-center p-4 ">
    //   <ScrollArea className="h-[600px] w-[800px] rounded-md border p-4 bg-rose-100">
    //     <Table >
    //       <TableCaption></TableCaption>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="w-[100px]">S no.</TableHead>
    //           <TableHead className="w-[500px]">Indicator</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {keyperformance?.map((row) => (
    //           <TableRow key={row.id}>
    //             <TableCell className="font-medium">{row?.id}</TableCell>
    //             <TableCell>{row?.indicator}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //     </ScrollArea>
    //   </div>
    //   </div>
      
      
      
    // </section>
    <section className="grid">
  <div className="bg-pattern5-bg grid justify-items-center relative p-4 sm:p-6 md:p-8">
    {/* Image Section with Overlay */}
    <div className="relative w-full">
      <img
        src="/hospital/speciality.png"
        alt="img"
        className="w-full h-72 sm:h-80 md:h-96 object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">
          Key Performance
        </h1>
      </div>
    </div>

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
