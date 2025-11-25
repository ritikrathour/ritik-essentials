import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import ApiError from "../../utils/ApiError";
import AsyncHandler from "../../utils/AsyncHandler";
import UserModel from "../models/User.model";
// redis keys
import {
  getOTPAttemptsKey,
  getOTPCooldownKey,
  getOTPkey,
  getUserKey,
  getVerificationKey,
} from "../../libs/Redis_keys";
// constants
import {
  OTP_BLOCK_DURATION,
  emailVerificationToken,
  GENERATE_OTP,
  LOGIN_OTP_HTML_TEMPLATE,
  MAX_OTP_ATTEMPTS,
  OTP_EXPIRY,
  RESEND_COOLDOWN,
  RESEND_OTP_HTML_TEMPLATE,
  VERIFICATION_EXPIRY,
  VERIFICATION_HTML_TEMPLATE,
  FORGET_PASS_OTP_HTML_TEMPLATE,
} from "../../libs/Constants";
// utils and services
import { redisClient } from "../../libs/RedisClient";
import { SendEmail } from "../../utils/SendEmail";
import { ApiResponse } from "../../utils/ApiResponse";
import { isDomainValid } from "../../utils/Validation";
import {
  GENERATE_ACCESSTOKEN,
  GENERATE_REFRESHTOKEN,
  VERIFY_REFRESHTOKEN,
} from "../../libs/JWTTokens";
// types
import {
  CustomJwtPayload,
  ILoginRequestBody,
  ITokenOptions,
} from "../../types/Auth.type";
import { config } from "../../config";
// accessTokenOptions
const accessTokenOptions: ITokenOptions = {
  httpsOnly: true,
  sameSite: "none",
  secure: true,
  maxAge: 60 * 60 * 1000, // 1 hour
};
// refreshTOkenOptions
const refreshTokenOptions: ITokenOptions = {
  ...accessTokenOptions,
  maxAge: 7 * 24 * 60 * 60 * 1000, //  // 7 days
};
// register user
const Register = AsyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role, shopName, address, gstNumber } =
    req.body;
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    throw new ApiError(401, "Invalid Email! please provide valid email", false);
  }
  if (!name || !email || !password) {
    throw new ApiError(401, "Please Provide all fields", false);
  }
  // if (!(await isDomainValid(email))) {
  //   throw new ApiError(401, "Email domain does not exist");
  // }
  // check password length greater than 6
  if (password.length < 6) {
    throw new ApiError(
      401,
      "Password must be at least 6 characters long",
      false
    );
  }
  // Check if user already exists in redis
  // const checkUserInRedis = await redisClient.get(getUserKey(email));
  // if (checkUserInRedis) {
  //   throw new ApiError(401, "User already exists with this email", false);
  // }
  // check user exists in mongodb database
  const checkUserInDB = await UserModel.findOne({ email });
  if (checkUserInDB) {
    throw new ApiError(401, "User already exists in DB with this email", false);
  }
  // hashed the password
  const hashedPassword = await bcrypt.hash(password, 12);
  let userData;
  if (role === "vendor") {
    if (!shopName || !address) {
      throw new ApiError(
        401,
        "Please Provide all fields like shopName and address",
        false
      );
    }
    userData = {
      email,
      password: hashedPassword,
      name,
      role,
      isEmailVerified: false,
      shopName,
      address,
      gstNumber,
    };
  } else if (role === "admin") {
    userData = {
      email,
      password: hashedPassword,
      name,
      role,
      isEmailVerified: false,
      Permissions,
    };
  } else if (role === "customer") {
    userData = {
      email,
      password: hashedPassword,
      name,
      role,
      isEmailVerified: false,
    };
  } else {
    throw new ApiError(401, "Invalid role!", false);
  }
  // stroe user and verification token in redis
  // await redisClient.setEx(
  //   getUserKey(email),
  //   VERIFICATION_EXPIRY,
  //   JSON.stringify(userData)
  // );
  // await redisClient.setEx(
  //   getVerificationKey(emailVerificationToken),
  //   VERIFICATION_EXPIRY,
  //   email
  // );
  // Send verification email
  const verificationURL = `${config.frontendUrl}/verify-email?token=/${emailVerificationToken}`;

  // const emailSent = await SendEmail(
  //   email,
  //   "Verify Your Email Address",
  //   VERIFICATION_HTML_TEMPLATE(name, verificationURL)
  // );
  // if (!emailSent) {
  //   throw new ApiError(500, "Sending email failed...", false);
  // }
  res.json(
    new ApiResponse(
      201,
      { email },
      "Registration successful. Please check your email to verify your account."
    )
  );
});
// resend verification link email //TODO
// verify email by token
const VerifyEmail = AsyncHandler(async (req: Request, res: Response) => {
  const { token } = req.query;

  // if (!token?.token) {
  //   throw new ApiError(401, "token Expired or used!", false);
  // }

  // get email by verification token
  // const email = await redisClient.get(getVerificationKey(token as string));
  // if (!email) {
  //   throw new ApiError(401, "Invalid or expired verification token", false);
  // }
  // get user by email
  // const userData = await redisClient.get(getUserKey(email));
  // if (!userData) {
  //   throw new ApiError(401, "User not found");
  // }
  // parse the user
  // const user = JSON.parse(userData);
  // verify the user
  // user.isEmailVerified = true;
  // Clean up verification token and sotored user in redis
  // await redisClient.del(getVerificationKey(token as string));
  // await redisClient.del(getUserKey(email));
  // Generate JWT tokens
  // const JWTAccessToken = GENERATE_ACCESSTOKEN({ email: "ritik@gmail.com" });
  // const JWTRefreshToken = GENERATE_REFRESHTOKEN({
  //   email: "ritik@gmail.com",
  //   name: "ritik",
  //   role: "customer",
  // });
  // Store verified user permanently in mongodb
  // const savedUser = await UserModel.create({
  //   email: "ritik@gmail.com",
  //   password: "Ritik1@",
  //   name: "ritik",
  //   role: "customer",
  //   isEmailVerified: false,
  // });
  // savedUser.refreshToken = JWTRefreshToken;
  // await savedUser.save();
  // const userObj = savedUser.toObject() as any;
  // delete userObj.password;
  res
    // .cookie("accessToken", JWTAccessToken, accessTokenOptions)
    // .cookie("refreshToken", JWTRefreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(
        201,
        {},
        // userObj,
        "Email verified successfully."
      )
    );
});
// login
const Login = AsyncHandler(async (req: Request, res: Response) => {
  const { email, password }: ILoginRequestBody = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required!", false);
  }
  // is otp present in redis
  const storedOTP = await redisClient.get(getOTPkey(email, "login"));
  if (storedOTP) {
    throw new ApiError(
      400,
      "Verify OTP sent to your email! Please complete login!",
      false
    );
  }
  // find user in Database
  const checkUser = await UserModel.findOne({ email });
  if (!checkUser) {
    throw new ApiError(404, "User not found with this email!", false);
  }
  // Check if user is verified
  if (!checkUser.isEmailVerified) {
    throw new ApiError(401, "Please verify your email before logging in");
  }
  // check password
  const checkPassword = await bcrypt.compare(password, checkUser.password);
  if (!checkPassword) {
    throw new ApiError(401, "Invalid password!", false);
  }
  // store otp in redis, send OTP
  const otp = GENERATE_OTP();
  await redisClient.setEx(getOTPkey(email, "login"), OTP_EXPIRY, otp);
  // send email
  const SentEmailOTP = await SendEmail(
    email,
    "Login OTP Verification",
    LOGIN_OTP_HTML_TEMPLATE(checkUser.name, parseInt(otp))
  );
  if (!SentEmailOTP) {
    throw new ApiError(500, "Failed to send OTP", false);
  }
  res.json(
    new ApiResponse(
      200,
      { email },
      "We sent OTP to your email. Please verify to complete login."
    )
  );
});
// Verify Login OTP (Complete Login)
const VerifyLogInOTP = AsyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required", false);
  }
  if (!otp) {
    throw new ApiError(400, "OTP is required", false);
  }
  // get storedOTP from redis
  const storedOTP = await redisClient.get(getOTPkey(email, "login"));
  if (!storedOTP) {
    throw new ApiError(400, "OTP expired or Used!", false);
  }
  // compare otp to storedOTP
  if (storedOTP !== otp) {
    throw new ApiError(400, "Invalid OTP", false);
  }
  // get user by email
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User Not Found", false);
  }
  // generate accessToken and RefreshToken
  const JWTAccessToken = GENERATE_ACCESSTOKEN({ email: user.email });
  const JWTRefreshToken = GENERATE_REFRESHTOKEN({
    name: user.name,
    email: user.email,
    role: user.role,
  });
  // delete storedOTP from redis
  await redisClient.del(getOTPkey(email, "login"));
  // update refresh token in mongodb
  user.refreshToken = JWTRefreshToken;
  await user.save();
  // send response with tokens
  res
    .cookie("accessToken", JWTAccessToken, accessTokenOptions)
    .cookie("refreshToken", JWTRefreshToken, refreshTokenOptions)
    .json(new ApiResponse(200, user, "Login successful."));
});
// log out
const Logout = AsyncHandler(async (req: Request, res: Response) => {
  const token =
    req.cookies.refreshToken ||
    req.headers["authorization"]?.split("bearer ")[1];
  if (!token) {
    throw new ApiError(401, "Refresh token is required", false);
  }
  // Verify the refresh token
  let decodedToken = VERIFY_REFRESHTOKEN(token) as CustomJwtPayload;
  if (!decodedToken) {
    throw new ApiError(401, "Invalid or expired refresh token", false);
  }
  // Check if user exists in DB
  const user = await UserModel.findOne({ email: decodedToken.email });
  if (!user) {
    throw new ApiError(404, "User not found!", false);
  }
  // clear cookies
  res
    .clearCookie("accessToken", accessTokenOptions)
    .clearCookie("refreshToken", refreshTokenOptions);
  // remove refresh token from db
  user.refreshToken = "";
  await user.save();
  res.json(new ApiResponse(200, null, "User Logged out successfully"));
});
// Resend OTP
const ReSendOTP = AsyncHandler(async (req: Request, res: Response) => {
  const { email, type } = req.body;
  if (!email) {
    throw new ApiError(401, "Email is required");
  }
  if (!type) {
    throw new ApiError(401, "OTP type is required");
  }
  // Check if user is in cooldown period
  const cooldownExists = await redisClient.exists(
    getOTPCooldownKey(email, type)
  );
  if (cooldownExists) {
    const coolDownTtl = await redisClient.ttl(getOTPCooldownKey(email, type));
    throw new ApiError(
      401,
      `Please wait ${Math.ceil(
        coolDownTtl / 60
      )} menutes before requesting a new OTP`
    );
  }
  // Check rate limiting (max 3 attempts per hour)
  const attempts = await redisClient.get(getOTPAttemptsKey(email, type));

  if (attempts && parseInt(attempts) >= MAX_OTP_ATTEMPTS) {
    throw new ApiError(
      429,
      "Too many OTP requests. Please try after 1 hour.",
      false
    );
  }
  // find user in DB
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User not found", false);
  }
  // check user verified
  if (!user.isEmailVerified) {
    throw new ApiError(401, "Please verify your email first", false);
  }
  // generate OTP and Store OTP in Redis with 5-minute TTL
  const otp = GENERATE_OTP();

  await redisClient.setEx(getOTPkey(email, type), OTP_EXPIRY, otp);
  // Set cooldown period of 600 seconds
  await redisClient.setEx(
    getOTPCooldownKey(email, type),
    RESEND_COOLDOWN,
    "true"
  );
  // Increment attempt counter with 1-hour TTL
  const currAttempts = attempts ? parseInt(attempts) + 1 : 1;
  await redisClient.setEx(
    getOTPAttemptsKey(email, type),
    OTP_BLOCK_DURATION,
    currAttempts.toString()
  );
  // // send email with otp
  const sentEmailOTP = await SendEmail(
    email,
    type + " OTP",
    RESEND_OTP_HTML_TEMPLATE(parseInt(otp), type)
  );
  if (!sentEmailOTP) {
    // Clean up Redis if sending fails
    await redisClient.del(getOTPkey(email, type));
    await redisClient.del(getOTPCooldownKey(email, type));
    await redisClient.del(getOTPAttemptsKey(email, type));
    throw new ApiError(500, "Failed to send OTP", false);
  }
  // Get TTL for client information
  const ttl = await redisClient.ttl(getOTPkey(email, type));
  res.json(new ApiResponse(200, { otp, ttl }, "OTP resent successfully"));
});
// Refresh Access Token
const RefreshAccessToken = AsyncHandler(async (req: Request, res: Response) => {
  const token =
    req.cookies.refreshToken ||
    req.headers["authorization"]?.split("bearer ")[1];
  if (!token) {
    throw new ApiError(401, "Refresh token is required", false);
  }
  // Verify the refresh token
  let decodedToken = VERIFY_REFRESHTOKEN(token) as CustomJwtPayload;
  if (!decodedToken) {
    throw new ApiError(401, "Invalid or expired refresh token", false);
  }
  // Check if user exists in DB
  const user = await UserModel.findOne({ email: decodedToken.email });
  if (!user) {
    throw new ApiError(404, "User not found!", false);
  }
  // check user verified
  if (!user.isEmailVerified) {
    throw new ApiError(401, "Please verify your email first", false);
  }

  // generate access token and refresh token
  const accessToken = GENERATE_ACCESSTOKEN({ email: decodedToken.email });
  const refreshToken = GENERATE_REFRESHTOKEN({
    name: decodedToken.name,
    email: decodedToken.email,
    role: decodedToken.role,
  });
  res
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json(
      new ApiResponse(200, { accessToken }, "Tokens refreshed successfully")
    );
});
// forget password
const ForgetPassword = AsyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    throw new ApiError(400, "Email is required", false);
  }
  // find user in db
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "User Not Found With This Email!", false);
  }
  // verify user
  if (!user.isEmailVerified) {
    throw new ApiError(401, "Please verify your email first", false);
  }
  // generateOTP
  const OTP = GENERATE_OTP();
  if (!OTP) {
    throw new ApiError(500, "OTP not generated!", false);
  }
  // store otp in redis
  await redisClient.setEx(
    getOTPkey(OTP, "forget-password"),
    OTP_EXPIRY,
    user.email
  );
  // send Email to user email
  const sentEmail = await SendEmail(
    user.email,
    "FORGET PASSWORD",
    FORGET_PASS_OTP_HTML_TEMPLATE(email, Number(OTP))
  );
  if (!sentEmail) {
    throw new ApiError(500, "Email not Sent Successfully", false);
  }
  res.json(
    new ApiResponse(200, email, "Forget Password OTP send successfully!")
  );
});
// verify forget password
const VerifyForgetPassword = AsyncHandler(
  async (req: Request, res: Response) => {
    const { otp, newPassword, email } = req.body;
    if (!email) {
      throw new ApiError(400, "Email is required!");
    }
    if (!otp) {
      throw new ApiError(400, "OTP is required!");
    }
    if (!newPassword) {
      throw new ApiError(400, "New Password is Required!", false);
    }
    if (newPassword.length < 6) {
      throw new ApiError(
        400,
        "Password must be at least 6 characters long",
        false
      );
    }
    // get otp from redis
    const storedOTP = await redisClient.get(
      getOTPkey(email, "forget-password")
    );
    if (!storedOTP) {
      throw new ApiError(400, "OTP expired or Used!", false);
    }
    if (storedOTP !== otp) {
      throw new ApiError(400, "Invalid OTP", false);
    }
    // hashed the password
    const hashedPass = await bcrypt.hash(newPassword, 12);
    //  find the user and update the password
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        password: hashedPass,
      },
      {
        new: true,
      }
    );
    if (!user) {
      throw new ApiError(500, "Password not Updated!", false);
    }
    // delete the otp form redis
    await redisClient.del(getOTPkey(email, "forget-password"));
    res.json(new ApiResponse(200, user, "Password reset successful."));
  }
);
export {
  Register,
  VerifyEmail,
  Login,
  VerifyLogInOTP,
  RefreshAccessToken,
  ReSendOTP,
  ForgetPassword,
  VerifyForgetPassword,
  Logout,
};
