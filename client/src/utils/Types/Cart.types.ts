export interface ICartItem {
  _id: string;
  name: string;
  productId: string;
  quantity: number;
  image: string;
  price: number;
}

export interface ICart {
  _id?: string;
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
  quantity: number;
  price: number;
  name: string;
  imageUrl: string | undefined;
}
export interface IUpdateCartItemPayload {
  cartItemId: string;
  quantity: number;
  productId?: string;
}
