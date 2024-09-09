import axios from "axios";
import { useAccountStore } from "@/stores/accountStore";

const axiosRequest = axios.create({
  method: "POST",
  baseURL: "https://preprod.api.fishemi.ilies.ch",
});

// Interceptor for injection token
axiosRequest.interceptors.request.use((config) => {
  if (
    config.url &&
    config.url.trim() !== "/otp" &&
    config.url.trim() !== "/login" &&
    config.url.trim() !== "/register"
  ) {
    // If we are trying to request
    const token = localStorage.getItem("accessToken");
    if (token !== "" && token !== null && token !== undefined) {
      config.headers.Authorization = `Bearer ${token}`;
      if (config.headers["Content-Type"] === undefined) {
        config.headers["Content-Type"] = "application/json";
      }
    }
  }

  return config;
});

// Interceptor for response
axiosRequest.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      const accountStore = useAccountStore();
      accountStore.logout();
    }
    return Promise.reject(error);
  }
);

export default axiosRequest;
