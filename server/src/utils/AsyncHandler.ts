import { Request, Response, NextFunction, RequestHandler } from "express";
const AsyncHandler =
  (
    asyncHandler: (req: Request, res: Response, next: NextFunction) => any
  ): RequestHandler =>
  (req, res, next) => {
    // Execute the handler and forward any thrown errors to Express
    asyncHandler(req, res, next).catch(next);
  };
export default AsyncHandler;
