import {
  IAddToCartPayload,
  IUpdateCartItemPayload,
} from "../utils/Types/Cart.types";
import { AxiosInstense } from "./AxiosInstance";

export const CartApi = {
  getCart: async (url: string) => {
    const { data } = await AxiosInstense.get(url);
    return data?.data;
  },
  addToCart: async (payload: IAddToCartPayload) => {
    const { data } = await AxiosInstense.post(
      `/cart/items/${payload.productId}`,
      payload
    );
    return data?.data;
  },
  updateCartItem: async (payload: IUpdateCartItemPayload) => {
    const { data } = await AxiosInstense.post(
      `/cart/item/update-quantity/${payload?.productId}`,
      payload
    );
    return data?.data;
  },
  removeItemFromCart: async (payload: { itemId: string }) => {
    const { data } = await AxiosInstense.delete(`/cart/item/${payload.itemId}`);
    return data?.data;
  },
  clearCart: async () => {
    const { data } = await AxiosInstense.delete("/cart/clear");
    return data?.data;
  },
};
