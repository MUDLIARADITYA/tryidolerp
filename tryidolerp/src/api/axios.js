import axios from "axios";

const API = axios.create({
//  baseURL: "https://attendance-backend-hs02.onrender.com/api", 
baseURL: "http://localhost:5000/api/"
});

// Interceptor to attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
