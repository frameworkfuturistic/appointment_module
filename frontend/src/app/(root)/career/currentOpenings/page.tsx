import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const Page = () => {
  return (
    <div className="grid grid-cols-1 bg-pattern5-bg relative justify-self-center">
      <img
        src="/hospital/career.png"
        alt="img"
        className="w-full h-64 md:h-80 object-cover"
      />
      <div className="grid items-center justify-center bg-pattern5-bg p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold text-sky-700 text-center">Join Our Team</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-sky-100 max-w-[800px] justify-self-center m-4 md:m-8 p-4">
        <div className="grid w-full items-center">
          <Label htmlFor="picture" className="text-lg md:text-xl">
            Submit your Resume here
          </Label>
          <Input id="picture" type="file" className="h-10 border-sky-700 border-2 mt-2" />
        </div>
        <div className="p-4">
          <h1 className="font-medium text-lg md:text-xl">ISO 9001 : 2015 Certified Hospital</h1>
          <div className="grid grid-flow-row gap-1 border-b-2 pb-2 mt-2">
            <a href="About Us" className="text-sky-700">About Us</a>
            <a href="Our Mission" className="text-sky-700">Our Mission</a>
          </div>
          <h2 className="font-semibold mt-4">Our Address:</h2>
          <p>Mayor Road (Behind Machhli Ghar), Ranchi, Jharkhand 834001</p>
          <p>Tel: 0651-2360045</p>
          <p>
            <strong>Email:</strong> <a href="mailto:shjrc.ranchi@gmail.com" className="text-sky-700">shjrc.ranchi@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
