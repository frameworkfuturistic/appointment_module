// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TextInputPage from "@/app/TextBoard/TextInputPage/page";
import TextDisplayPage from "@/app/TextBoard/TextDisplayPage/page";

const TextDisplay = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TextInputPage />} />
        <Route path="/display" element={<TextDisplayPage />} />
      </Routes>
    </Router>
  );
};

export default TextDisplay;
