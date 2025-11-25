import crypto from "crypto";
// auth keys
const VERIFICATION_EXPIRY = 86400; // 24 hours in seconds
const OTP_EXPIRY = 300; // 5 minutes in seconds
const MAX_OTP_ATTEMPTS = 3; // Maximum attempts for OTP verification
const RESEND_COOLDOWN = 60 * 5; // 5 minutes in seconds
const OTP_BLOCK_DURATION = 3600; // 1 hour in seconds
const MAX_DAILY_OTPS = 10;
const emailVerificationToken = crypto.randomBytes(32).toString("hex");
const GENERATE_OTP = (): string => {
  return crypto.randomInt(100000, 999999).toString();
};
const VERIFICATION_HTML_TEMPLATE = (name: string, verificationUrl: string) => {
  return `
        <h2>Welcome ${name}!</h2>
        <p>Please verify your email address by clicking the Button below:</p>
        <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
          Verify Email
        </a>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create this account, please ignore this email.</p>
      `;
};
const LOGIN_OTP_HTML_TEMPLATE = (name: string, otp: number) => {
  return `
  <h2>Hello ${name} here your Login Verification OTP</h2>
        <p>Your OTP for login is: <strong style="font-size: 24px; color: #007bff;">${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this login, please secure your account immediately.</p>
  `;
};
const RESEND_OTP_HTML_TEMPLATE = (otp: number, type: string) => {
  return `
        <h2>Your Resend OTP for ${type} Verification</h2>
        <p>New OtP is: <strong style="font-size: 24px; color: #007bff;">${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
      `;
};
const FORGET_PASS_OTP_HTML_TEMPLATE = (email: string, otp: number) => {
  return `
        <h2> Hi ${email} your Password Reset here.</h2>
        <p>Your OTP for password reset is: <strong style="font-size: 24px; color: #007bff;">${otp}</strong></p>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this reset, please ignore this email.</p>
      `;
};

export {
  VERIFICATION_EXPIRY,
  OTP_EXPIRY,
  emailVerificationToken,
  VERIFICATION_HTML_TEMPLATE,
  GENERATE_OTP,
  LOGIN_OTP_HTML_TEMPLATE,
  RESEND_OTP_HTML_TEMPLATE,
  FORGET_PASS_OTP_HTML_TEMPLATE,
  MAX_OTP_ATTEMPTS,
  RESEND_COOLDOWN,
  OTP_BLOCK_DURATION,
  MAX_DAILY_OTPS,
};
