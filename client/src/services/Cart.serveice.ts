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
    try {
      const { data } = await AxiosInstense.post(`/cart/item`, payload);
      return data?.data;
    } catch (error) {
      console.log(error);
    }
  },
  updateCartItem: async (payload: IUpdateCartItemPayload) => {
    const { data } = await AxiosInstense.patch(
      `/cart/item/update-quantity/${payload?.cartItemId}`,
      payload
    );
    return data?.data;
  },
  removeItemFromCart: async (payload: { itemId: string }) => {
    const { data } = await AxiosInstense.delete(
      `/cart/item/${payload.itemId}`,
      {}
    );
    return data?.data;
  },
  clearCart: async () => {
    const { data } = await AxiosInstense.delete("/cart/clear", {});
    return data?.data;
  },
};
