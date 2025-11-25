import { Router } from "express";
import { authLimiter } from "../../libs/ExpressLimitter";
import {
  Login,
  RefreshAccessToken,
  Register,
  ReSendOTP,
  VerifyEmail,
  VerifyLogInOTP,
  ForgetPassword,
  VerifyForgetPassword,
  Logout,
} from "../controllers/Auth.controller";
const authRoute = Router();
authRoute.route("/register").post(authLimiter, Register);
authRoute.route("/login").post(authLimiter, Login);
authRoute.route("/verify-email").get(authLimiter, VerifyEmail);
authRoute.route("/verify-login-otp").post(authLimiter, VerifyLogInOTP);
authRoute.route("/resend-otp").post(ReSendOTP);
authRoute.route("/refresh-token").post(
  // authLimiter,
  RefreshAccessToken
);
authRoute.route("/forget-password").post(authLimiter, ForgetPassword);
authRoute
  .route("/verify-forget-password")
  .post(authLimiter, VerifyForgetPassword);
authRoute.route("/logout").post(authLimiter, Logout);
export default authRoute;
