import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

export const postTransaction = (data) => API.post("/transaction", data);
export const getSummary = (userId) => API.get(`/summary/${userId}`);
export const getRankings = () => API.get("/ranking");