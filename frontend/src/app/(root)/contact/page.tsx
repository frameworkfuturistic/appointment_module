import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Mail, Smartphone } from "lucide-react";
import React from "react";


const ContactPage = () => {
  return (
    <section className="section ">
      {/* Hero Section with Image and Overlay */}
      <div className="relative">
        <img
          src="/contact-img/map.png"
          alt="Contact Cover"
          className="w-full h-96 object-fill"
        />
        <div className="absolute inset-0 flex items-center justify-center  px-4 sm:px-20 bg-black bg-opacity-40 ">
          <h1 className="text-4xl sm:text-4xl font-semibold text-white">
            Contact Us
          </h1>
        </div>
      </div>

      {/* Google Maps Iframe */}
      <div className=" container mx-auto px-4 py-2 h-96">
        <h1 className="text-2xl font-semibold text-center m-4 text-black">
          Find Us
        </h1>
        <div className="w-full h-0 pb-[56.25%] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d3662.1559012644075!2d85.3203445!3d23.3825767!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x39f4e1cabc58c68b%3A0xacb8529b237fb943!2sShree%20Jagannath%20Hospital%2C%20Mayor&#39;s%20Road%20-%20Booty%20Road%2C%20Radium%20Rd%2C%20behind%20Machali%20Ghar%20(Aqua%20World)%20and%20Nakshatra%20Van%2C%20Ranchi%20University%2C%20Morabadi%2C%20Ranchi%2C%20Jharkhand%20834001!3m2!1d23.3824796!2d85.32252129999999!5e0!3m2!1sen!2sin!4v1723537495368!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            className="absolute top-0 left-0 w-full h-96 border-0"
            title="Google Maps"
          ></iframe>
        </div>
      </div>

      {/* Contact Information and Form */}
      <div className=" py-8 px-4">
        {/* Contact Info Section */}
        <div className="text-center  py-4 ">
          <h1 className="text-xl font-semibold text-black mt-8">Contact Now</h1>
          <h2 className="text-xl font-medium text-black">
            Write us a Message!
          </h2>
          <img
            src="/activity.png"
            alt="Icon"
            className="mx-auto mt-4 h-10 w-10"
          />
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 ">
          {/* Phone Card */}
          <Card className="flex items-center p-4 bg-white rounded shadow hover:shadow-lg  transition">
            <Smartphone
              size={48}
              color="#0284c7"
              strokeWidth={1}
              className="mr-4 flex-shrink-0"
            />
            <div>
              <p className="text-lg font-medium">Phone</p>
              <p className="text-sm text-gray-600">0651-2360045</p>
            </div>
          </Card>

          {/* Address Card */}
          <Card className="flex items-center p-4 bg-white rounded shadow hover:shadow-lg transition">
            <Globe
              size={48}
              color="#0284c7"
              strokeWidth={1}
              className="mr-4 flex-shrink-0"
            />
            <div>
              <p className="text-lg font-medium">
                SHREE JAGANNATH HOSPITAL & RESEARCH CENTRE
              </p>
              <a
                href="https://www.google.com/maps/place/Shree+Jagannath+Hospital"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                Mayor Road, Behind Machhli Ghar, Ranchi, Jharkhand - 834001
              </a>
            </div>
          </Card>

          {/* Email Card */}
          <Card className="flex items-center p-4 bg-white rounded  transition">
            <Mail
              size={48}
              color="#0284c7"
              strokeWidth={1}
              className="mr-4 flex-shrink-0"
            />
            <div>
              <p className="text-lg font-medium">Email</p>
              <p className="text-sm text-gray-600">sjhrc.ranchi@gmail.com</p>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <form className="bg-pattern5-bg  justify-center max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4 my-4 shadow-xl hover:shadow-slate-200 ">
          <div className="grid grid-flow-row gap-4">
            <Input
              type="name"
              placeholder="Your Name"
              className="bg-white rounded-sm max-h-12 w-full text-lg px-3 border-2"
            />
            <Input
              type="phone"
              placeholder="Your Phone"
              className="bg-white rounded-sm max-h-12 w-full text-lg px-3 border-2"
            />
            <Input
              type="mail"
              placeholder="Email Address"
              className="bg-white rounded-sm max-h-12 w-full text-lg px-3 border-2"
            />
            <Textarea
              placeholder="Type your message here."
              className="bg-white text-lg shadow-sm rounded-sm w-full h-32"
            />
            <Button variant="hms" type="submit" className="place-self-center">
              Submit Query
            </Button>
          </div>
          <div className="grid grid-flow-row text-wrap p-4 space-y-2">
            <ul>
              <h1 className="text-sm text-black">
                Need a Doctor for Check-up?
              </h1>
              <h1 className="text-2xl font-medium">
                Just Make an Appointment!
              </h1>
              <p className="font-medium">Call:</p>
              <p className="text-xl font-light">+91 8987999200</p>
            </ul>
            <ul>
              <h2 className="text-3xl font-medium text-black">
                Opening Hours
              </h2>
              <p className="font-light">Monday - Saturday 08:00 - 20:00</p>
              <p className="font-light">Sunday 12:00 - 16:00</p>
            </ul>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
