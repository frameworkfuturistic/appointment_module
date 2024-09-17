// TextInputPage.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TextInputPage = () => {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle submit button click
  const handleSubmit = () => {
    localStorage.setItem('submittedData', inputValue);
    setInputValue('');
    navigate('/display'); // Redirect to the display page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-semibold mb-4">Enter Information</h1>
      <div className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Write something..."
          className="border border-gray-300 rounded-md p-2 w-full md:w-1/2"
        />
        <button
          onClick={handleSubmit}
          className="mt-2 md:mt-0 bg-blue-500 text-white p-2 rounded-md w-full md:w-auto"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default TextInputPage;
