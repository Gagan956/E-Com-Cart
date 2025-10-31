// api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-com-cart-h53t.onrender.com", // Make sure this is correct
  withCredentials: true,
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("🔐 Sending token:", token ? "Yes" : "No"); // Debug
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✅ Response received:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.log("❌ API Error:", error.response?.status, error.config?.url);
    
    if (error.response?.status === 401) {
      console.log("🛑 Unauthorized - clearing token");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;