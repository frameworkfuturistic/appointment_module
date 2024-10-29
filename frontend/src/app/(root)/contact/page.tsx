"use client";
import { Card } from "@/components/ui/card";
import { Globe, Mail, Smartphone } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setSubmitted(true);
    console.log("Appointment Submitted:", formData);
  };

  return (
    <section className="section">
      {/* Hero Section with Image and Overlay */}
      <div className="relative">
        <Image
          src="/contact-img/map.png"
          alt="Contact Cover"
          width={800}
          height={384}
          className="w-full h-96 object-cover" // Use object-cover for better image display
          layout="responsive"
        />
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-20 bg-black bg-opacity-40">
          <h1 className="text-4xl sm:text-4xl font-semibold text-white">Contact Us</h1>
        </div>
      </div>

      {/* Google Maps Iframe */}
      <div className="container mx-auto px-4 py-2 h-96">
        <h1 className="text-2xl font-semibold text-center m-4 text-black">Find Us</h1>
        <div className="w-full h-0 pb-[56.25%] relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
            allowFullScreen
            loading="lazy"
            className="absolute top-0 left-0 w-full h-full border-0" // Use h-full for responsive iframe height
            title="Google Maps"
          ></iframe>
        </div>
      </div>

      {/* Contact Information and Form */}
      <div className="py-8 px-4">
        <div className="text-center py-4">
          <h1 className="text-xl font-semibold text-black mt-8">Contact Now</h1>
          <h2 className="text-xl font-medium text-black">Write us a Message!</h2>
          <Image
            src="/activity.png"
            alt="Icon"
            width={40}
            height={40}
            className="mx-auto mt-4 h-10 w-10"
          />
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {/* Phone Card */}
          <Card className="flex items-center p-4 bg-white rounded shadow hover:shadow-lg transition">
            <Smartphone size={48} color="#0284c7" strokeWidth={1} className="mr-4 flex-shrink-0" />
            <div>
              <p className="text-lg font-medium">Phone</p>
              <p className="text-sm text-gray-600">0651-2360045</p>
            </div>
          </Card>

          {/* Address Card */}
          <Card className="flex items-center p-4 bg-white rounded shadow hover:shadow-lg transition">
            <Globe size={48} color="#0284c7" strokeWidth={1} className="mr-4 flex-shrink-0" />
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
          <Card className="flex items-center p-4 bg-white rounded transition">
            <Mail size={48} color="#0284c7" strokeWidth={1} className="mr-4 flex-shrink-0" />
            <div>
              <p className="text-lg font-medium">Email</p>
              <p className="text-sm text-gray-600">sjhrc.ranchi@gmail.com</p>
            </div>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="bg-pattern5-bg justify-center max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4 my-4 shadow-xl hover:shadow-slate-200">
          <div className="grid grid-flow-row max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6"></h2>

            {submitted ? (
              <div className="bg-green-100 text-green-800 p-4 rounded">
                <p>Thank you! Your appointment has been submitted.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    required
                  />
                </div>

                {/* Notes */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Additional Query</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                  Send
                </button>
              </form>
            )}
          </div>

          <div className="grid grid-flow-row text-wrap p-4 space-y-2">
            <ul>
              <h1 className="text-sm text-black">Need a Doctor for Check-up?</h1>
              <h1 className="text-2xl font-medium">Just Make an Appointment!</h1>
              <p className="font-medium">Call:</p>
              <p className="text-xl font-light">+91 8987999200</p>
            </ul>
            <ul>
              <h2 className="text-3xl font-medium text-black">Opening Hours</h2>
              <p className="font-light">Monday - Saturday 08:00 - 20:00</p>
              <p className="font-light">Sunday 12:00 - 16:00</p>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
