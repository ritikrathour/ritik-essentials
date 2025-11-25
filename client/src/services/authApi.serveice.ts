import { AxiosInstense } from "./AxiosInstance";

export const AuthApi = {
  currentUser: async () => {
    try {
      const { data } = await AxiosInstense.get("/user");
      return data;
    } catch (error) {
      console.log(error, "current user error");
      throw error;
    }
  },
  userOrders: async (url: string) => {
    try {
      const { data } = await AxiosInstense.get(url);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
