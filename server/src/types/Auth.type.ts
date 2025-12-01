import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "vendor" | "admin" | "customer";
  isEmailVerified: Boolean;
  refreshToken?: string;
  phone?: string;
  avatar?: string;
  shopName?: string;
  shopImage?: string;
  gstNumber?: string;
  address?: string;
  permissions: string[];
  isBlocked?: boolean;
  blockedUntil?: Date;
}

export interface ILoginRequestBody {
  email?: string;
  password: string;
  rememberMe?: boolean;
}

export interface IJwtPayload {
  name: string;
  email: string;
  role: "customer" | "admin" | "vendor";
}

export interface ITokenOptions {
  httpsOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  maxAge: number;
}

export interface CustomJwtPayload extends IJwtPayload {
  email: string;
  userId: string;
}
interface IOrderItems {
  product: mongoose.ObjectId;
  quantity: number;
  price: number;
}
export interface IOrder {
  user: mongoose.ObjectId;
  items: IOrderItems[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  paymentMethod: "COD" | "Online";
}
// validation error
export interface IValidationError {
  field: string;
  message: string;
}
