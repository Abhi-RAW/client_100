import axios from "axios";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// Add authorization header globally
axiosInstance.interceptors.request.use((config) => {
  // Get token from local storage
  const token = localStorage.getItem("token"); 
  if (token) {
     // Set authorization header
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Always return the config
  return config; 
}, (error) => {
  // Handle request error
  return Promise.reject(error);
});
