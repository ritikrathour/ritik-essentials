import { AxiosInstense } from "./AxiosInstance";
type VerifyOtpRequest = {
  email: string;
  otp: string;
};
export const VerifyOTP = async (
  url: string,
  { email, otp }: VerifyOtpRequest
) => {
  const response = await AxiosInstense.post(url, { email, otp });
  return response;
};
export const ResendOTPService = async (
  url: string,
  email: string,
  type: string
) => {
  const response = await AxiosInstense.post(url, {
    email,
    type,
  });
  return response.data;
};
