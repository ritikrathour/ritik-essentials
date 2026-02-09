import { AxiosInstense } from "./AxiosInstance";

export const CheckOutAPIService = {
  createOrder: async (payload: any) => {
    try {
      const { data } = await AxiosInstense.post(`/order`, payload);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
