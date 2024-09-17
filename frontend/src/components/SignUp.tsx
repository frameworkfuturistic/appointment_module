import React, { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMessage("All fields are required");
    } else {
      setErrorMessage("");
      // Handle form submission
    }
  };

  return (
    <div className="max-w-lg w-full mx-auto p-5 sm:p-8 bg-white shadow-xl rounded-xl text-gray-800">
      <h2 className="text-3xl font-bold pb-5 text-center">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-3 px-4"
            placeholder="Andrew Jackson"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-3 px-4"
            placeholder="andrew@mail.com"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Your Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full py-3 px-4"
            placeholder="*********"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {errorMessage && (
          <div className="text-red-500 text-sm pb-4">{errorMessage}</div>
        )}
        <div className="flex items-center justify-between mb-6">
          <Link href="/dashboard">
            <Button
              type="submit"
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm py-3 px-6 w-full sm:w-auto"
            >
              Register
            </Button>
          </Link>
          <div className="text-sm">
            <p>
              Already have an account?{" "}
              <span className="underline text-blue-600 cursor-pointer">
                Sign in
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
