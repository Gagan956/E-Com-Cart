import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-com-cart-h53t.onrender.com",
  withCredentials: true,
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear user data on unauthorized
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;