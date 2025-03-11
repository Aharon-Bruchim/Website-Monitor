import axios from "axios";

const api = axios.create({
  // baseURL: "https://website-monitor-48kx.onrender.com/websites",
  baseURL: "https://website-monitor-48kx.onrender.com/websites",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
