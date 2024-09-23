// src/components/DoctorAppointmentForm.jsx
"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    notes: '',
    department: '',
    doctor: '',
  });
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch departments and doctors from API
  useEffect(() => {
    const fetchDepartmentsAndDoctors = async () => {
      try {
        const departmentResponse = await axios.get('https://a00e-115-245-226-37.ngrok-free.app');
        const doctorResponse = await axios.get('https://api.example.com/doctors');
        setDepartments(departmentResponse.data);
        setDoctors(doctorResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load departments and doctors.');
      }
    };
    fetchDepartmentsAndDoctors();
  }, []);

  // Filter doctors based on selected department
  useEffect(() => {
    if (formData.department) {
      const filtered = doctors.filter((doctor) => doctor.departmentId === formData.department);
      setFilteredDoctors(filtered);
    }
  }, [formData.department, doctors]);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Start loading state
    setError(''); // Reset error state

    try {
      const response = await axios.post('https://a00e-115-245-226-37.ngrok-free.app/api/v1/book/prefill', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Appointment Submitted:', response.data);
      setSubmitted(true); // Mark form as submitted
    } catch (err) {
      console.error('Error submitting appointment:', err);
      setError('Failed to submit appointment. Please try again later.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Doctor Appointment Form</h2>

      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">
          <p>Thank you! Your appointment has been submitted.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {error && <div className="bg-red-100 text-red-800 p-2 rounded mb-4">{error}</div>}
          
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

          {/* Appointment Date */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Department Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select a department</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          {/* Doctor Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Doctor</label>
            <select
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            >
              <option value="">Select a doctor</option>
              {filteredDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Appointment'}
          </button>
        </form>
      )}
    </div>
  );
};

export default AppointForm;
