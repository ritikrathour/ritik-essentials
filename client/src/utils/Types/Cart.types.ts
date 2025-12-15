import { IProduct } from "./Product.types";

export interface ICartItem {
  id?: string;
  productId: string;
  product: IProduct;
  quantity: number;
}

export interface ICart {
  id?: string;
  userId?: string;
  items: ICartItem[];
  totalItems: number;
  totalPrice: number;
}
export interface ICartState {
  Cart: ICart;
  isCartDrawerOpen: boolean;
  isLoading: boolean;
  error: any;
  isAuthenticate: boolean;
}
export interface IAddToCartPayload {
  productId: string;
  product: IProduct;
  quantity: number;
}
export interface IUpdateCartItemPayload {
  cartItemId: string;
  quantity: number;
}
