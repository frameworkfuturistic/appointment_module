import { Clock10, GraduationCap, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";



const Footer = () => {
  return (
    <>
     
      <div className=" grid grid-cols-2 justify-items-center py-8 mx-24">
        <img src="/hospital/hospitallogo.png" alt="img" />
        
       
        <img src="/hospital/nabhlogo.png" alt="img" />
        
      </div>
      <div className="bg-blue-950 grid grid-flow-col justify-evenly py-6  md:max-w-full md:min-h-80 ">
        {/* <div className=" grid grid-flow-row max-w-72 max-h-64 space-y-2  p-2">
          <img src="/hospital/slide-logo.png" alt="img"/>
          <p className="text-xs text-slate-300 font-light">
            <strong>Mission:-</strong>
            To create an organization devoted to develop a state-of-the-art Health Care System which would be comparable to the best in the country.
          </p>
          <p className="text-xs text-slate-300 font-light">
            <strong>Vision:-</strong>
            To create a chain of hospitals, specialized clinics and diagnostic centers for health care delivery to the fullest satisfaction of the users and stake-holders.
          </p>

          
        </div> */}
        <div className="grid grid-flow-row max-w-56 max-h-56  p-2  ">
          <h1 className="text-slate-300 font-medium border-b-2 ">
            Departments
          </h1>
          <Link href="">
            <div className="text-slate-300 text-xs font-light grid grid-flow-row gap-y-4 my-6 ">
              <p>+ ORTHOPEDICS</p>
              <p>+NEUROSURGERY</p>
              <p>+NEPHROLOGY & DIALYSIS</p>
              <p>+CARDIOLOGY</p>
              <p>+ PHYSIOTHERAPY</p>
              <p>+ EMERGENCY SERVICES</p>
            </div>
          </Link>
        </div>
        
        <div className="grid grid-flow-row max-w-64 min-h-48  p-2  ">
          <h1 className="text-slate-300 font-medium border-b-2 ">Contact Us</h1>
          <Link href="">
            <div className="text-slate-300 text-xs font-light grid grid-flow-row gap-y-4 my-6 ">
              <div className="grid grid-flow-col">
                <MapPin size={28} color="#e7dfdf" strokeWidth={0.5} />
                <div className="grid px-2">
                  <p>SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE</p>
                  <p>
                    (Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand -
                    834001)
                  </p>
                </div>
              </div>
              <div className="grid grid-flow-col">
                <Phone size={28} color="#e7dfdf" strokeWidth={0.5} />
                <div className="grid px-2">
                  <p>Mon to Fri : 08:30 - 18:00</p>
                  <p>+91 8987999200</p>
                </div>
              </div>
              <div className="grid grid-flow-col ">
                <Mail size={28} color="#e7dfdf" strokeWidth={0.5} />
                <div className="grid px-2"> 
                  <p>sjhrc.ranchi@gmail.com</p>
                </div>
              </div>
              <div className="grid grid-flow-col">
                <Clock10 size={28} color="#e7dfdf" strokeWidth={0.5} />
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
