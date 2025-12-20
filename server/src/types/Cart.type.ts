import mongoose from "mongoose";

export interface ICartItem {
  _id: mongoose.ObjectId;
  productId: mongoose.ObjectId;
  quantity: number;
  price: number;
  name: string;
  imageUrl: string;
}
export interface ICart {
  userId: mongoose.ObjectId;
  items: ICartItem[];
  totalAmount?: number;
  totalItems?: number;
}

export interface IAddToCartRequest {
  productId: mongoose.ObjectId;
  qunatity: number;
  price: number;
  name: string;
  imageUrl: string;
}
