import { AxiosInstense } from "./AxiosInstance";
export const VendorProductsApi = {
  getCurrVendorProduct: async (vendorId: string, url: string) => {
    const { data } = await AxiosInstense.get(`${url}/${vendorId}`);
    return data?.data;
  },
};
