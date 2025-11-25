import { NextFunction, Request, Response } from "express";
import { VERIFY_ACCESSTOKEN } from "../../libs/JWTTokens";
import UserModel from "../models/User.model";
import { CustomJwtPayload } from "../../types/Auth.type";
import ApiError from "../../utils/ApiError";

const Authenticate = async (req: Request, _: Response, next: NextFunction) => {
  const token =
    req.cookies.accessToken || req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new ApiError(401, "Unauthorized User!", false);
  }
  // verifyToken
  const verifyToken = VERIFY_ACCESSTOKEN(token) as CustomJwtPayload;

  // find user in database
  const user = await UserModel.findOne({ email: verifyToken.email });
  if (!user) {
    throw new ApiError(404, "User not found", false);
  }
  req.user = user;
  next();
};
export default Authenticate;
