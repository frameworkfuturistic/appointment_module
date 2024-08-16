import { Clock10Icon, Link, Linkedin, MapPinPlusInside } from "lucide-react";
import { IoLogoSkype } from "react-icons/io";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import Navbar from "@/components/Navbar";
import React from "react";

const Header = () => {
  return (
    <div>
      {/* header */}
      <div className="bg-sky-700  w-full min-h-3 "></div>

      <nav className=" justify-around p-2 hidden flex-col  text-lg text-slate-500 font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ">
        <div className="grid grid-flow-col gap-4">
          <div className="  flex  ">
            <MapPinPlusInside strokeWidth={0.5} className="mx-3" />
            (Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001),
            Ranchi, Jharkhand, INDIA
          </div>
          <div className=" flex">
            <Clock10Icon strokeWidth={0.5} className="mx-3" />
            Mon - Sat 6.00AM - 12.00AM Sunday CLOSED
          </div>
        </div>

        <div className="grid grid-flow-col gap-8  text-lg ">
          <a href="https://www.facebook.com/sjhrc.in/">
            <FaFacebookF className=" text-muted-foreground transition-colors hover:text-foreground" />
          </a>

          <FaTwitter className="  text-muted-foreground transition-colors hover:text-foreground" />

          <IoLogoSkype className="  text-muted-foreground transition-colors hover:text-foreground" />

          <FaLinkedinIn className="  text-muted-foreground transition-colors hover:text-foreground" />
        </div>
      </nav>
      {/* LOGO */}
      <div className="grid grid-flow-col justify-center m-4">
        <img src="/hospital/hospitallogo.png" alt="logo" />
        <div className="grid grid-flow-row place-items-center ">
          <h1 className="text-4xl font-serif font-semibold ">
            SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE
          </h1>
          <h2 className="text-lg text-sky-700 ">
            MULTY SPECIALITY HOSPITAL AND TRAUMA CENTRE
          </h2>
          <p className="text-sm text-slate-600 ">
            ISO 9001 : 2015 Certified Hospital
          </p>
          <p className="text-destructive text-lg animate-pulse  ">Ambulance No:
          0651-2360045</p>
        </div>
        <img src="/hospital/nabhlogo.png" alt="logo" />
      </div>
      {/* NAVBAR */}
      <Navbar />
    </div>
  );
};

export default Header;
