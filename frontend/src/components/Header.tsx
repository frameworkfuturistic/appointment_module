import {
  Clock10Icon,
  MapPinPlusInside,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import React from "react";
import NavMobile from "./NavMobile";

const Header = () => {
  return (
    <section className="bg-rose-50 bg-pattern4 bg-contain">
      {/* Top Bar */}
      <div className="bg-rose-300  hidden md:flex">
        <nav className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          {/* Contact Info */}
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4  text-slate-800" >
            <div className="flex items-center">
              <MapPinPlusInside strokeWidth={1} className="mr-2" />
              <span className="text-">Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001, INDIA</span>
            </div>
            <div className="flex items-center">
              <Clock10Icon strokeWidth={1} className="mr-2" />
              <span className="">Mon - Sat 6.00AM - 12.00AM, Sunday CLOSED</span>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="https://www.facebook.com/sjhrc.in" aria-label="Facebook" className="text-white hover:text-sky-700 transition-colors">
              <FaFacebookF />
            </a>
            <a href="https://x.com/Sjhrcranchi" aria-label="Twitter" className="text-sky-400  hover:text-sky-700 transition-colors">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/shreejagannathhospital/" aria-label="Instagram" className="text-rose-600 hover:text-sky-700 transition-colors">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@sjhrcjagannath9636" aria-label="YouTube" className="text-red-500 hover:text-sky-700 transition-colors">
              <FaYoutube />
            </a>
          </div>
        </nav>
      </div>

      <NavMobile/>

      {/* Logo & Info */}
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center px-4 py-2 text-center md:text-left">
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
          <p className="text-red-500 text-sm md:text-base animate-pulse">
            Ambulance No: 0651-2360045
          </p>
        </div>
        <img src="/hospital/nabhlogo.png" alt="NABH Logo" className="h-24 sm:h-8 w-auto sm: md:h-16 lg:h-24" />
      </div>

      {/* Navbar */}
      <Navbar />
     
    </section>
  );
};

export default Header;
