import {
  Clock10Icon,
  MapPinPlusInside,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import React from "react";


const Header = () => {
  return (
    <div className="bg-white">
      {/* Top Bar */}
      <div className="bg-sky-700 w-full h-2"></div>

      {/* Contact & Social Info */}
      <nav className="flex flex-col md:flex-row justify-between p-4 text-slate-500 font-medium text-sm md:text-base lg:gap-6">
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
          <div className="flex items-center">
            <MapPinPlusInside strokeWidth={0.5} className="mr-2" />
            <span>Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001, INDIA</span>
          </div>
          <div className="flex items-center">
            <Clock10Icon strokeWidth={0.5} className="mr-2" />
            <span>Mon - Sat 6.00AM - 12.00AM, Sunday CLOSED</span>
          </div>
        </div>

        <div className="flex justify-center md:justify-end gap-4 mt-2 md:mt-0">
          <a href="https://www.facebook.com/sjhrc.in" aria-label="Facebook">
            <FaFacebookF className="text-muted-foreground transition-colors hover:text-sky-700" />
          </a>
          <a href="https://x.com/Sjhrcranchi" aria-label="Twitter">
            <FaTwitter className="text-muted-foreground transition-colors hover:text-sky-700" />
          </a>
          <a href="https://www.instagram.com/shreejagannathhospital/" aria-label="Instagram">
            <FaInstagram className="text-muted-foreground transition-colors hover:text-sky-700" />
          </a>
          <a href="https://www.youtube.com/@sjhrcjagannath9636" aria-label="YouTube">
            <FaYoutube className="text-muted-foreground transition-colors hover:text-sky-700" />
          </a>
        </div>
      </nav>

      {/* Logo & Info */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 text-center md:text-left space-y-4 md:space-y-0">
        <img src="/hospital/hospitallogo.png" alt="Hospital Logo" className="lg:h-44 lg:w-44 w-auto md:h-16 " />
        <div className="flex flex-col items-center  md:items-center space-y-1">
          <h1 className="text-2xl md:text-3xl font-serif font-semibold">
            SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE
          </h1>
          <h2 className="text-sm md:text-lg text-sky-700">
            MULTI SPECIALITY HOSPITAL AND TRAUMA CENTRE
          </h2>
          <p className="text-xs md:text-sm text-slate-600">
            ISO 9001 : 2015 Certified Hospital
          </p>
          <p className="text-red-500 text-sm md:text-base animate-pulse">
            Ambulance No: 0651-2360045
          </p>
        </div>
        <img src="/hospital/nabhlogo.png" alt="NABH Logo" className="lg:h-40 lg:w-40 w-auto md:h-16" />
      </div>

      {/* Navbar */}
      <Navbar />
      {/* <Nav/> */}
      {/* <Nav/> */}
    </div>
  );
};

export default Header;
