import * as React from "react";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";

export function NoticeBoard({ notices }) {
  return (
    <section className="section">


      <div className="grid justify-center">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 space-x-6 space-y-4 max-w-7xl h-full mx-10">
          
          {/* About Area */}
           {/* <div className="px-8 py-4 shadow-md flex flex-col justify-center"> 
             <h3 className="text-slate-800 text-2xl sm:text-3xl font-medium mb-4">
              We're Setting Standards in Research & Clinical Care.
            </h3>
            <img src="/activity.png" alt="icon" className="size-20 mb-4" />
            <p className="text-slate-600 mb-4">
              We provide the most complete medical services, so every person has
              the opportunity to receive high-quality medical care.
            </p>
            <p className="text-slate-600 mb-4">
              Our clinic has grown to provide a world-class facility for the
              treatment of tooth loss, dental cosmetics, and advanced
              restorative dentistry. With over 30 years of experience, we are
              among the most qualified implant providers in Australia.
            </p>
             </div> */}

            {/* Static Notice Board */}
            <div className="bg-white shadow-lg p-2 rounded-lg border  w-96 text-center border-slate-300">
              <h4 className="text-black text-xl font-semibold mb-2">
                Notice 
              </h4>
              {notices.length > 0 ? (
                <ul className="list-disc pl-5">
                  {notices.map((notice, index) => (
                    <li key={index} className="text-slate-700 mb-2">
                      {notice}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-slate-500 font-mono text-xl h-32 ">No notices available.</p>
              )}
            </div>
         
        </div>
      </div>
    </section>
  );
}
