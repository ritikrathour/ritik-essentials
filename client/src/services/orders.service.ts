import { AxiosInstense } from "./AxiosInstance";

export const OrdersApi = {
  orders: async () => {
    try {
      const { data } = await AxiosInstense.get("/orders");
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  rating: async (payload: {
    productId: string;
    rating: number | null;
    text: string;
  }) => {
    try {
      const { data } = await AxiosInstense.post("/review", payload);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
