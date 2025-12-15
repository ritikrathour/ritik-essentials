import mongoose from "mongoose";
import { IUser } from "./Auth.type";

declare global {
  namespace Express {
    interface Request {
      user: IUser;
    }
  }
}

// category
export interface ICategory {
  name: string;
  slug?: string;
  parent?: mongoose.ObjectId;
  image?: string;
}
