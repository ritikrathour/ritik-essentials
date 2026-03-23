import axios, { AxiosError } from "axios";
const URI = import.meta.env.VITE_BASE_URL as string;
export const AxiosInstense = axios.create({
  baseURL: URI,
  withCredentials: true,
});
AxiosInstense.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    try {
      const originalRequest = error.config;
      if (error.response?.status === 401 && originalRequest) {
        await axios.post(`${URI}/refresh-token`, {}, { withCredentials: true });
        return AxiosInstense(originalRequest);
      }
    } catch (error) {
      // window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  },
);
