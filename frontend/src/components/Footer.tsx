import { Clock10, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-rose-50 bg-pattern3 bg-contain py-6 ">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Contact Us Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-medium border-b-2 border-rose-300 pb-2">Contact Us</h2>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin size={28} color="black" strokeWidth={0.5} />
                <div>
                  <p className="font-semibold">SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE</p>
                  <p>(Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001)</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Phone size={28} color="black" strokeWidth={0.5} />
                <div>
                  <p>Mon to Fri : 08:30 - 18:00</p>
                  <p>+91 8987999200</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Mail size={28} color="black" strokeWidth={0.5} />
                <div>
                  <p>sjhrc.ranchi@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Clock10 size={28} color="black" strokeWidth={0.5} />
                <div>
                  <p>Mon-Sat 6.00 - 22.00</p>
                  <p>Sunday CLOSED</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="space-y-4 ">
            <h2 className="text-lg font-medium border-b-2 border-rose-300 pb-2">About</h2>
            <div className="space-y-2 text-sm grid grid-flow-row">
              <Link href="/about" className="hover:underline">About Us
               
              </Link>
              <Link href="/privacy-policy" className="hover:underline">Privacy Policy
                
              </Link>
              <Link href="/terms-conditions" className="hover:underline">Terms & Conditions
                
              </Link>
              <Link href="/contact"  className="hover:underline">Contact Us
                
              </Link>
            </div>
          </div>

          {/* Departments Section */}
          <div className="space-y-4 hidden md:block ">
            <h2 className="text-lg font-medium border-b-2 border-rose-300 pb-2">Departments</h2>
            <div className="space-y-2 grid grid-flow-row text-sm">
              <Link href="/orthopedics "  className="hover:underline">ORTHOPEDICS
                
              </Link>
              <Link href="/neurosurgery"  className="hover:underline">NEUROSURGERY
                
              </Link>
              <Link href="/nephrology-dialysis" className="hover:underline">NEPHROLOGY & DIALYSIS
               
              </Link>
              <Link href="/cardiology" className="hover:underline">CARDIOLOGY
                
              </Link>
              <Link href="/physiotherapy" className="hover:underline">PHYSIOTHERAPY
              
              </Link>
              <Link href="/emergency-services" className="hover:underline">EMERGENCY SERVICES
              
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-rose-300  py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          <p className="">
            &copy; {new Date().getFullYear()} SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE. All Rights Reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
