"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

const WhatsAppWidget = () => {
  const openWhatsApp = () => {
    const phoneNumber = "#"; // Replace with your WhatsApp number in international format (without the +)
    const message = "Hello, I'd like to learn more about your services."; // Customize this message
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };

  return (
    <div>
      {/* WhatsApp Icon */}
      <div
        onClick={openWhatsApp}
        className="fixed  bottom-24 right-8  bg-green-500 p-3 rounded-full shadow-lg cursor-pointer hover:bg-green-600 transition-colors duration-300 ease-in-out z-50"
      >
        <MessageCircle className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};

export default WhatsAppWidget;
