import axios from "axios";
export const baseApi = axios.create({
  baseURL: "https://thanhan.vercel.app",
  timeout: 35000,
});
