import { Request, Response, NextFunction as nextFunction } from "express";
import ApiError from "./ApiError";
const ErrorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: nextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    succsess: false,
    message: message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
      error: err,
    }),
  });
};

export default ErrorHandler;
