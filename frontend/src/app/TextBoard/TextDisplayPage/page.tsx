// TextDisplayPage.tsx
import React, { useState, useEffect } from 'react';

const TextDisplayPage = () => {
  const [submittedData, setSubmittedData] = useState('');

  useEffect(() => {
    const savedData = localStorage.getItem('submittedData');
    if (savedData) {
      setSubmittedData(savedData);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">Submitted Information</h1>
      <div className="border border-gray-300 p-4 rounded-md w-full md:w-1/2 text-center">
        {submittedData ? (
          <p>{submittedData}</p>
        ) : (
          <p>No information submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default TextDisplayPage;
