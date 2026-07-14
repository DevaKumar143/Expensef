import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", 
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