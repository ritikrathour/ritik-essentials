import { Router } from "express";
import { authLimiter, passwordResetLimiter } from "../../libs/ExpressLimitter";
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
import Authenticate from "../middlewares/Authtenticate.middleware";
const authRoute = Router();
authRoute.route("/register").post(authLimiter, Register);
authRoute.route("/login").post(authLimiter, Login);
// authLimiter
authRoute.route("/verify-email").get(authLimiter, VerifyEmail);
authRoute.route("/verify-login-otp").post(authLimiter, VerifyLogInOTP);
// authLimiter
authRoute.route("/resend-otp").post(authLimiter, ReSendOTP);
authRoute.route("/refresh-token").post(authLimiter, RefreshAccessToken);
authRoute.route("/forget-password").post(passwordResetLimiter, ForgetPassword);
authRoute
  .route("/verify-forget-password")
  .post(passwordResetLimiter, VerifyForgetPassword);
authRoute.route("/logout").post(Authenticate, Logout);
// authLimiter
export default authRoute;
