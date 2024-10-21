"use client";
import { Clock10Icon, MapPinIcon, MenuIcon, Phone, PhoneIcon, XIcon } from "lucide-react"
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import React, { useEffect, useState } from "react";
import NavMobile from "./NavMobile";
import { Button } from "./ui/button";

const Header = () => {

  return (
    <section className="bg-rose-100 bg-pattern4 bg-contain">
      {/* Top Bar */}
      <div className="bg-rose-200 hidden md:flex">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <MapPinIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Mayor Road, Behind Machhli Ghar, Ranchi</span>
              </div>
              <div className="flex items-center">
                <Clock10Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Mon - Sat 6.00AM - 12.00AM</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://www.facebook.com/sjhrc.in" aria-label="Facebook" className="text-muted-foreground hover:text-primary">
                <FaFacebookF />
              </a>
              <a href="https://x.com/Sjhrcranchi" aria-label="Twitter" className="text-muted-foreground hover:text-primary">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com/shreejagannathhospital/" aria-label="Instagram" className="text-muted-foreground hover:text-primary">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/@sjhrcjagannath9636" aria-label="YouTube" className="text-muted-foreground hover:text-primary">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
      </div>

      <NavMobile/>

      {/* Logo & Info */}
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center px-4 py-2 text-center md:text-left hidden md:flex">
        <img src="/hospital/hospitallogo.png" alt="Hospital Logo" className="h-28 w-auto md:h-16 lg:h-28" />
        <div className="flex flex-col items-center md:items-center space-y-2 md:space-y-0">
          <h1 className="text-2xl md:text-3xl font-serif font-semibold">
            SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE
          </h1>
          <h2 className="text-sm md:text-lg text-sky-700">
            MULTI SPECIALITY HOSPITAL AND TRAUMA CENTRE
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            ISO 9001 : 2015 Certified Hospital
          </p>
          
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-rose-800 ">
              <Phone className="mr-2 h-4 w-4" />
              Ambulance No: 0651-2360045
            </Button>
        </div>
        <img src="/hospital/nabhlogo.png" alt="NABH Logo" className="h-24 sm:h-8 w-auto sm: md:h-16 lg:h-24" />
      </div>

      {/* Navbar */}
      <Navbar />
     
    </section>
  );
};

export default Header;
