import { config } from "../config";
import { IJwtPayload } from "../types/Auth.type";
import jwt from "jsonwebtoken";
const GENERATE_ACCESSTOKEN = (email: any) => {
  try {
    let accessToken = jwt.sign(email, config.jwtSecret!, { expiresIn: "1h" });
    return accessToken;
  } catch (error) {
    throw new Error("Error generating access token: " + error);
  }
};
const GENERATE_REFRESHTOKEN = (payload: IJwtPayload) => {
  try {
    let refreshToken = jwt.sign(payload, config.jwtRefreshSecret!, {
      expiresIn: "7d",
    });
    return refreshToken;
  } catch (error) {
    throw new Error("Error generating refresh token: " + error);
  }
};
const VERIFY_ACCESSTOKEN = (token: string) => {
  try {
    return jwt.verify(token, config.jwtSecret!);
  } catch (error) {
    throw new Error("Invalid or expired access token");
  }
};
const VERIFY_REFRESHTOKEN = (token: string) => {
  try {
    return jwt.verify(token, config.jwtRefreshSecret!);
  } catch (error) {
    return null;
  }
};

export {
  GENERATE_ACCESSTOKEN,
  GENERATE_REFRESHTOKEN,
  VERIFY_REFRESHTOKEN,
  VERIFY_ACCESSTOKEN,
};
