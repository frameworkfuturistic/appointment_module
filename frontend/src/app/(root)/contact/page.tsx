import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Mail, Smartphone } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <>
      <div className="relative">
        <img src="/contact-img/cover.png" alt="img" className="" />
        <div className="absolute inset-0 flex items-center justify-end mr-80">
          <h1 className="text-2xl font-semibold text-sky-700   ">Contact Us</h1>
        </div>
      </div>
      <div className=" grid place-content-center ">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d3662.1559012644075!2d85.3203445!3d23.3825767!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x39f4e1cabc58c68b%3A0xacb8529b237fb943!2sShree%20Jagannath%20Hospital%2C%20Mayor&#39;s%20Road%20-%20Booty%20Road%2C%20Radium%20Rd%2C%20behind%20Machali%20Ghar%20(Aqua%20World)%20and%20Nakshatra%20Van%2C%20Ranchi%20University%2C%20Morabadi%2C%20Ranchi%2C%20Jharkhand%20834001!3m2!1d23.3824796!2d85.32252129999999!5e0!3m2!1sen!2sin!4v1723537495368!5m2!1sen!2sin"
          width="800"
          height="350"
          // style="border:0;"
          // allowfullscreen=""
          loading="lazy"
          // referrerpolicy="no-referrer-when-downgrade"
          className="py-8"
        ></iframe>
      </div>
      <div className="bg-slate-50 grid justify-center py-6 ">
        <div className="flex flex-col items-center text-center py-8 gap-2 ">
          <h1>Contact Now</h1>
          <h2 className="text-2xl font-semibold">Write us a Message!</h2>
          <img src="/activity.png" alt="icon" className="  h-10 w-10" />
        </div>
        <div className="grid grid-cols-3 justify-items-center">
          <Card className="bg- sm:min-h-28 sm:min-w-52 grid grid-flow-col justify-center rounded-none shadow-none  ... transition duration-500 transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none hover:border-b-2  hover:border-b-sky-700 hover:bg-white ">
            <Smartphone
              size={48}
              color="#0284c7"
              strokeWidth={1}
              className="place-self-center"
            />
            <div className="grid items-center p-2">
              <p className="text-lg font-medium">Phone</p>
              <p className="text-xs"> 0651-2360045</p>
            </div>
          </Card>

          <Card className="bg- sm:min-h-28 sm:min-w-52 grid grid-flow-col justify-center rounded-none shadow-none  ... transition duration-500 transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none hover:border-b-2  hover:border-b-sky-700 hover:bg-white ">
            <Globe
              size={48}
              color="#0284c7"
              strokeWidth={1}
              className="place-self-center"
            />
            <div className="grid items-center p-2 text-nowrapx` ">
              <h1 className="text-xs font-medium">
                SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE
              </h1>
              <a href="" className="text-xs">
                (Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001)
              </a>
            </div>
          </Card>
          <Card className="bg- sm:min-h-28 sm:min-w-52 grid grid-flow-col justify-center rounded-none shadow-none  ... transition duration-500 transform hover:-translate-y-4 motion-reduce:transition-none motion-reduce:hover:transform-none hover:border-b-2  hover:border-b-sky-700 hover:bg-white ">
            <Mail
              size={48}
              color="#0284c7"
              strokeWidth={1}
              className="place-self-center"
            />
            <div className="grid items-center p-2">
              <p className="text-lg font-medium">Email</p>
              <p className="text-xs">sjhrc.ranchi@gmail.com</p>
            </div>
          </Card>
        </div>
        {/* Contact Form */}
        <div className="grid grid-flow-col justify-center">
          <div className=" grid grid-rows-3  mx-4 ">
            <Input
              type="name"
              placeholder="Your Name"
              className="bg-white rounded-sm m-4 max-h-12 max-w-32 text-lg px-3"
            />
            <Input
              type="phone"
              placeholder="Your Phone"
              className="bg-white rounded-sm m-4 max-h-12 max-w-32 text-lg px-3"
            />
            <Input
              type="mail"
              placeholder="Email Address"
              className="bg-white rounded-sm m-4 max-h-12 max-w-32 text-lg px-3"
            />
          </div>
          <Textarea
            placeholder="Type your message here."
            className="bg-white text-lg shadow-sm  rounded-sm m-4 min-w-96 max-h-32 "
          />
        </div>
        <Button type="submit" className="place-self-center ">
          Send
        </Button>
      </div>
    </>
  );
};

export default page;
