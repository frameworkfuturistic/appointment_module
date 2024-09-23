import React, { useState } from "react";

interface NoticeInputPageProps {
  setNotices: React.Dispatch<React.SetStateAction<string[]>>; // Define the type for setNotices
}

export function NoticeInputPage({ setNotices }: NoticeInputPageProps) {
  const [inputNotice, setInputNotice] = useState<string>(""); // Explicitly define state as string

  const handleAddNotice = () => {
    if (inputNotice.trim()) {
      setNotices((prevNotices: string[]) => [
        ...prevNotices,
        inputNotice.trim(),
      ]); // Ensure prevNotices is typed
      setInputNotice(""); // Clear the input field after submitting
    }
  };

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100 p-4 m-4">
      <h1 className="text-2xl font-semibold text-slate-700 mb-4">
        Add New Notice
      </h1>
      <input
        type="text"
        value={inputNotice}
        onChange={(e) => setInputNotice(e.target.value)}
        placeholder="Enter notice here"
        className="w-full max-w-md px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
      />

     
      <button
        onClick={handleAddNotice}
        className="px-6 py-2 bg-rose-500 text-white rounded-md hover:bg-rose-400 transition"
      >
        Add Notice
      </button>
    </div>
  );
}
