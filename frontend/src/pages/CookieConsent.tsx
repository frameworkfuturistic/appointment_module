"use client";

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) setShowBanner(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 shadow-lg flex items-center justify-between z-50">
      <p className="text-sm">
        We use cookies to improve your experience. By using our site, you agree to our cookie policy.
      </p>
      <button 
        onClick={handleAccept} 
        className="bg-white text-black font-semibold py-2 px-4 rounded transition duration-300 hover:bg-gray-200"
      >
        Accept
      </button>
    </div>
  );
}
