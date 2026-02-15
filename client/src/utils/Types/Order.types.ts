import { IProduct } from "./Product.types";

export type OrderStatus =
  | "PLACED"
  | "CONFIRMED"
  | "SHIPPED"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";

export interface IProductReview {
  rating: number;
  comment: string;
}

export interface IOrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  isReviewed: boolean;
  product: IProduct;
}

export interface IOrder {
  _id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  createdAt: string;
  items: IOrderItem[];
}
