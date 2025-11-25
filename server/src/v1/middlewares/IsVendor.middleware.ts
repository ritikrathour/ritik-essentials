import { NextFunction, Request, Response } from "express";
import ApiError from "../../utils/ApiError";

export const isVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check if the user is a vendor
  if (req.user?.role !== "vendor") {
    throw new ApiError(
      403,
      "Access denied. You must be a vendor to perform this action.",
      false
    );
  }
  next();
};
