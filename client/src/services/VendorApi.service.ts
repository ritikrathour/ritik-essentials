import { AxiosInstense } from "./AxiosInstance";
export const VendorProductsApi = {
  getCurrVendorProduct: async (vendorId: string, url: string) => {
    const { data } = await AxiosInstense.get(`${url}/${vendorId}`);
    return data?.data;
  },
  getVendorDashboard: async () => {
    try {
      const { data } = await AxiosInstense.get("/dashboard");
      console.log(data);
      return data?.data;
    } catch (error) {
      throw error;
    }
  },
};
