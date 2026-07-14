import axios from "axios";

const api = axios.create({
  baseURL: "https://expense-2-0h4s.onrender.com", 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers["auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;