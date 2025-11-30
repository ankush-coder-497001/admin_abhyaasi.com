import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_URL}/api/v1`, // from .env
  timeout: 50000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token and handle FormData
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("abhyaasi_admin_token");
    if (token) {
      // Ensure token has Bearer prefix if not already present
      const bearerToken = token.startsWith("Bearer ")
        ? token
        : `Bearer ${token}`;
      config.headers.Authorization = bearerToken;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
