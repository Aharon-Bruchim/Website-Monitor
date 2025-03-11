import axios from "axios";

const api = axios.create({
  baseURL: "https://website-monitor-48kx.onrender.com/url",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default api;
