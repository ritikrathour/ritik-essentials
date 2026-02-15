export interface ICheckoutItem {
  productId: string;
  vendorId?: string;
  quantity: number;
  name: string;
}
export interface IShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  fullAddress: string;
  city: string;
  state: string;
  pinCode: string;
  country?: string;
}
export enum PaymentMethod {
  CARD = "CARD",
  COD = "COD",
}
export interface ICheckoutRequest {
  items: ICheckoutItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: PaymentMethod;
  couponCode?: string;
}
