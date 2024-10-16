import axios from "axios";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Erro desconhecido. Tente novamente mais tarde.";

    toast.error(message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
