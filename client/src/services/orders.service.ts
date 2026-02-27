import { OrderStatus } from "../utils/Types/Order.types";
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
  vendorOrders: async () => {
    const { data } = await AxiosInstense.get("/vendor-orders");
    return data?.data;
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
  updateOrderStatus: async (orderNumber: string, status: OrderStatus) => {
    try {
      const { data } = await AxiosInstense.patch(
        `/order-status/${orderNumber}`,
        { status: status },
      );
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
