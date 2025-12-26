import mongoose from "mongoose";
import { IUser } from "./Auth.type";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}
