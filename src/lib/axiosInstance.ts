import axios from "axios";
import { toast } from "react-hot-toast";
import Cookies from "universal-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (request) => {
    const cookies = new Cookies();
    const token = cookies.get("token");

    if (token && !["/login", "/register"].includes(request.url || "")) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const cookies = new Cookies();

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      delete axios.defaults.headers.common["Authorization"];
      cookies.remove("token");
    }

    const message =
      error.response?.data?.message || "Erro desconhecido. Tente novamente mais tarde.";

    toast.error(message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
