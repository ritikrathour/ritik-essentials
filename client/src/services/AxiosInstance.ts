import axios, { AxiosError } from "axios";
const isProduction =
  process.env.NODE_ENV === "PRODUCTION"
    ? (import.meta.env.VITE_BASE_URL_PRODUCTION as string)
    : (import.meta.env.VITE_BASE_URL_DEVELOPMENT as string);

export const AxiosInstense = axios.create({
  baseURL: isProduction,
  withCredentials: true,
});
// // attach access token if mobile device
// AxiosInstense.interceptors.request.use(
//   (config)=>{
//
//   }
// )
AxiosInstense.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<any>) => {
    console.log(error);
    try {
      const originalRequest = error.config;
      if (error.response?.status === 401 && originalRequest) {
        const data = await axios.post(
          `${isProduction}/refresh-token`,
          {},
          { withCredentials: true }
        );
        return AxiosInstense(originalRequest);
      }
    } catch (error) {
      // window.location.href = "/login";
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);
