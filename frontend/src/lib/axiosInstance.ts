// src/lib/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5555/api', // Replace with your Node API base URL
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or other configurations if needed
    const token = sessionStorage.getItem('token'); // If you use tokens
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Check if data is FormData to set content type accordingly
    if (config.data instanceof FormData) {
      // Do not set Content-Type for FormData, let axios handle it
      delete config.headers['Content-Type'];
    } else {
      config.headers['Content-Type'] = 'application/json'; // Default to JSON
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data; // Automatically return response data
  },
  (error) => {
    // Handle errors globally
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
