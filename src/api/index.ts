import axios, { InternalAxiosRequestConfig } from "axios";
// import { authorizationApi } from "./authorizationApi/authorization.api";
//
//
export const BASE_URL = "http://192.168.103.116:3002/api/v1/";
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  config.headers.set("Authorization", `Bearer_${token}`);
  return config;
});

// axiosInstance.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     error.config.withCredentials = true;
//     const originalRequest = error.config;
//     if (
//       error.response.status == 401 &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         const response = await authorizationApi.refresh();
//         localStorage.setItem("access_token", response.data.access_token);
//         return axiosInstance.request(originalRequest);
//       } catch (e) {
//         console.log("No auth");
//       }
//     }
//     throw error;
//   }
// );
