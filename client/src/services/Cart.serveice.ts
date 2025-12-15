import { IAddToCartPayload } from "../utils/Types/Cart.types";
import { AxiosInstense } from "./AxiosInstance";

export const CartApi = {
  getCart: async (url: string) => {
    const { data } = await AxiosInstense.get(url);
    return data?.data;
  },
  addToCart: async (payload: IAddToCartPayload) => {
    const { data } = await AxiosInstense.post(
      `/cart/items/${payload.productId}`
    );
    return data?.data;
  },
};
