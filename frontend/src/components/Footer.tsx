import { Clock10, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { IoLogoSkype } from "react-icons/io";

const Footer = () => {
  return (
    <>
      <div className="bg-slate-100  grid grid-cols-3 justify-items-center py-8 mx-56">
        <img src="/hospital/hospitallogo.png" alt="img" />
        <img src="/hospital/nabhlogo.png" alt="img" />
        {/* <img src="/hospital/slide-logo.png" alt="img" /> */}
        <img src="/hospital/nabh.png" alt="img" />
        
      </div>
      <div className="bg-blue-950 grid grid-flow-col justify-evenly py-6  md:max-w-full md:min-h-80 ">
        <div className=" grid grid-flow-row max-w-56 max-h-72  p-2">
          <img src="/hospital/hospitallogo.png" alt="img" />
          <p className="text-xs text-slate-300 font-extralight">
          The hospital has an excellent infrastructure, which includes five OTs with 100% fresh laminar air flow facilities, well-equipped intensive care units.
          </p>
          <p className="text-xs text-slate-300 font-extralight">
          We have 12-hour OPD facilities of all major disciplines and also round-the-clock facilities for emergency & investigation, which includes Pathology and Imaging.
          </p>

          <Link href="" className="grid grid-flow-col ">
            <FaFacebookF
              color="#e7dfdf"
              className=" text-muted-foreground transition-colors hover:text-foreground "
            />

            <FaTwitter
              color="#e7dfdf"
              className="  text-muted-foreground transition-colors hover:text-foreground "
            />

            <IoLogoSkype
              color="#e7dfdf"
              className="  text-muted-foreground transition-colors hover:text-foreground "
            />

            <FaLinkedinIn
              color="#e7dfdf"
              className="  text-muted-foreground transition-colors hover:text-foreground "
            />
          </Link>
        </div>
        <div className="grid grid-flow-row max-w-56 max-h-56  p-2  ">
          <h1 className="text-slate-300 font-medium border-b-2 ">
            Departments
          </h1>
          <Link href="">
            <div className="text-slate-300 text-xs font-light grid grid-flow-row gap-y-4 my-6 ">
              <p>+ Surgery & Radiology</p>
              <p>+ Family Medicine</p>
              <p>+ Women's Health</p>
              <p>+ Optician</p>
              <p>+ Pediatrics</p>
              <p>+ Dermatology</p>
            </div>
          </Link>
        </div>
        
        <div className="grid grid-flow-row max-w-56 min-h-48  p-2  ">
          <h1 className="text-slate-300 font-medium border-b-2 ">Contact Us</h1>
          <Link href="">
            <div className="text-slate-300 text-xs font-light grid grid-flow-row gap-y-4 my-6 ">
              <div className="grid grid-flow-col">
                <MapPin size={40} color="#e7dfdf" strokeWidth={0.5} />
                <div className="grid px-2">
                  <p>SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE</p>
                  <p>
                    (Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand -
                    834001)
                  </p>
                </div>
              </div>
              <div className="grid grid-flow-col">
                <Phone size={40} color="#e7dfdf" strokeWidth={0.5} />
                <div className="grid px-2">
                  <p>Mon to Fri : 08:30 - 18:00</p>
                  <p>+91 8987999200</p>
                </div>
              </div>
              <div className="grid grid-flow-col place-items-center">
                <Mail size={40} color="#e7dfdf" strokeWidth={0.5} />
                <div className="grid px-2"> 
                  <p>sjhrc.ranchi@gmail.com</p>
                </div>
              </div>
              <div className="grid grid-flow-col">
                <Clock10 size={40} color="#e7dfdf" strokeWidth={0.5} />
                <div className="grid px-2">
                  <p>Mon-Sat 6.00 - 22.00</p>
                  <p>Sunday CLOSED</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <Link
        href=""
        className="bg-sky-700 text-white text-sm min-h-6 grid grid-flow-col  justify-center place-items-center gap-x-20 "
      >
        <p className="hover:border-b-2">Privacy Policy</p>
        <p className="hover:border-b-2">Contact</p>
        <p className="hover:border-b-2">Copyright © 2015 - All Rights Reserved - sjhrc.in</p>
      </Link>
    </>
  );
};

export default Footer;
