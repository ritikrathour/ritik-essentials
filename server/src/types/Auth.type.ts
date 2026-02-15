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
  name: string;
  price: number;
  isReviewd: boolean;
}
export interface IShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  fullAddress: string;
  addressLine2?: string;
  city: string;
  state: string;
  pinCode: string;
}
export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface IOrder {
  shippingAddress: IShippingAddress;
  orderNumber: string;
  user: mongoose.ObjectId;
  items: IOrderItems[];
  totalAmount: number;
  tax: Number;
  shippingCharges: Number;
  status: OrderStatus;
  paymentMethod: "COD" | "Online";
  isPaid: boolean;
  discount: number;
  coupon: String;
}
// validation error
export interface IValidationError {
  field: string;
  message: string;
}
