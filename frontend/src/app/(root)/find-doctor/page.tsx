"use client"

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Users, Phone, Mail } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Ensure this is defined in your .env

interface Consultant {
  ConsultantID: number;
  ConsultantName: string;
  ProfessionalDegree: string;
  Fee: string | null;
  Department: string | null; // Nullable fields
}

const AdvancedMedicalExperts: React.FC = () => {
  const [doctors, setDoctors] = useState<Consultant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<Consultant | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(8); // Number of doctors to display per page
  const [activeDepartment, setActiveDepartment] = useState<string>('All');

  const departments = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics']; // Add your departments here

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/consultants`);
        setDoctors(response.data);
      } catch (err) {
        setError('Failed to fetch doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) return <strong className="text-center justify-center">Loading...</strong>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  // Specialties for the tabs
  const specialties = ["All", ...Array.from(new Set(doctors.map(doctor => doctor.Department || "Unknown")))];


  // Filter doctors based on active department and search term
  const filteredDoctors = doctors.filter(doctor =>
    (activeDepartment === 'All' || doctor.Department === activeDepartment) &&
    (doctor.ConsultantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     (doctor.Department?.toLowerCase() || "").includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="lg:w-1/6 bg-gradient-to-br from-blue-900 to-indigo-900 text-white flex flex-col">
        <div className="p-8 flex-grow">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-6"
          >
            Our Medical Experts
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 text-lg"
          >
            Rani Hospital is home to 50 eminent doctors in India, most of whom are pioneers in their
            respective fields. Additionally, they are renowned for developing innovative and revolutionary
            clinical procedures.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 flex items-center shadow-lg"
          >
            Book Appointment
            <ChevronRight className="ml-2" />
          </motion.button>
        </div>
        <div className="p-8 bg-gradient-to-br from-blue-800 to-indigo-800 relative">
          <Image
            src="/placeholder.svg?height=300&width=300"
            alt="Medical Team"
            width={300}
            height={300}
            className="w-full h-auto rounded-lg shadow-xl"
          />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
            className="absolute -top-8 right-4 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full p-4 shadow-lg"
          >
            <Users size={48} className="text-white" />
          </motion.div>
        </div>
      </div>

      <div className="lg:w-5/6 p-8">
        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search doctors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded py-2 px-4 w-full"
          />
        </div>

        {/* Department Tabs */}
        <div className="mb-4">
          {specialties.map(department => (
            <button
              key={department}
              onClick={() => {
                setActiveDepartment(department);
                setCurrentPage(1); // Reset to first page on department change
              }}
              className={`mr-2 mb-2 py-2 px-4 rounded ${activeDepartment === department ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
            >
              {department}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {currentDoctors.map((doctor, index) => (
            <motion.div
              key={doctor.ConsultantID}
              layoutId={`doctor-${doctor.ConsultantID}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              onClick={() => setSelectedDoctor(doctor)}
              className="bg-white rounded-xl shadow-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="relative">
                <Image
                  src={`/pattern8.png`}
                  alt={doctor.ConsultantName}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                  onError={(e: any) => {
                    e.target.onerror = null; // prevents looping
                    e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='gray'>" + doctor.ConsultantName.charAt(0) + "</text></svg>";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              </div>
              <div className="p-6 relative">
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={`/api/images/${doctor.ConsultantID}`}
                    alt={doctor.ConsultantName}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="pt-10 text-center">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{doctor.ConsultantName}</h2>
                  <p className="text-sm text-blue-600 font-medium">{doctor.ProfessionalDegree}</p>
                  <p className="text-xs text-gray-600 mt-2">{doctor.Department}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Doctor Detail Modal */}
        <AnimatePresence>
          {selectedDoctor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={() => setSelectedDoctor(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
                className="bg-white rounded-lg p-6 w-11/12 md:w-1/3"
              >
                <h2 className="text-2xl font-bold">{selectedDoctor.ConsultantName}</h2>
                <p className="text-lg mt-2">{selectedDoctor.ProfessionalDegree}</p>
                <p className="text-sm text-gray-600 mt-1">{selectedDoctor.Department}</p>
                <div className="flex justify-between mt-4">
                  <div>
                    <Phone size={20} /> <span>{selectedDoctor.Fee}</span>
                  </div>
                  <div>
                    <Mail size={20} /> <span>{selectedDoctor.Fee}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvancedMedicalExperts;
