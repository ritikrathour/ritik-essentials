import { useState } from "react";
import { AxiosInstense } from "../services/AxiosInstance";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IuseOTP } from "../utils/Types/Otp.types";
export const useOTP = ({ email, otp, setTtl, data }: IuseOTP) => {
  const [isResending, setIsResending] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isOtpSending, setIsOtpSending] = useState<boolean>(false);
  const navgate = useNavigate();
  // verify otp
  const VerifyOTP = async (endpoint: string) => {
    let joinedOTP = otp?.join("");
    try {
      setIsVerifying(true);
      const response = await AxiosInstense.post(endpoint, {
        email,
        otp: joinedOTP,
        newPassword: data?.newPass,
      });
      toast.success(response?.data?.message);
      setIsVerifying(false);
    } catch (error) {
      setIsVerifying(false);
      toast.error(
        axios.isAxiosError(error)
          ? error?.response?.data?.message || error.message
          : "Error"
      );
      console.log(error);
    }
  };
  // resend otp
  const ReSendOTP = async (endpoint: string, type: string) => {
    try {
      setIsResending(true);
      const response = await AxiosInstense.post(endpoint, { email, type });
      toast.success(response?.data?.message);
      setTtl && setTtl(response?.data?.ttl);
      setIsResending(false);
    } catch (error) {
      toast.error(
        axios.isAxiosError(error)
          ? error?.response?.data?.message || error.message
          : "Error"
      );
      setIsResending(false);
      console.log(error);
    }
  };
  // send otp
  const sendOTP = async (endpoint: string) => {
    try {
      setIsOtpSending(true);
      const response = await AxiosInstense.post(endpoint, { email });
      toast.success(response?.data?.message);
      setIsOtpSending(false);
      navgate(`/forget-password-otp-verify/${email}`);
    } catch (error) {
      setIsOtpSending(false);
      toast.error(
        axios.isAxiosError(error)
          ? error?.response?.data?.message || error.message
          : "OTP sending failed"
      );
    }
  };
  return {
    // methods
    VerifyOTP,
    ReSendOTP,
    sendOTP,
    // state
    isResending,
    isVerifying,
    isOtpSending,
    isLoading: isResending || isVerifying,
  };
};
