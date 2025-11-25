import React from "react";

// otp types
export interface IOTP {
  length: Number;
}
export interface IOPTCredentials {
  email: string;
  otp: number;
  newPassword: string;
}
export interface IResendOTPCredentials {
  email: string;
  type: string;
}
export interface IuseOTP {
  email: string;
  otp?: string[];
  setTtl?: React.Dispatch<React.SetStateAction<number>>;
  data?: any;
  redirect?: string;
}

export interface IOTPTimerProps {
  ReSendOTP: (url: string, action: string) => void;
  ttl: number; // time-to-live in seconds
  URI: string;
  type: string;
  setTtl: React.Dispatch<React.SetStateAction<number>>;
  isResending: boolean;
}
