import { IValidationError } from "../types/Auth.type";

class ApiError extends Error {
  [x: string]: any;
  public statusCode: number;
  public success: Boolean;
  constructor(
    statusCode: number,
    message: string = "something went wrong",
    success: Boolean = false,
    errors?: IValidationError[],
    stack: string = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = success;
    this.errors = errors;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
export default ApiError;
