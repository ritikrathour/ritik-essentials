import { AxiosInstense } from "./AxiosInstance";

export const ProductApi = {
  createProduct: async (url: string, formData: any) => {
    const { data } = await AxiosInstense.post(url, formData);
    return data?.data;
  },
  getProducts: async (url: string) => {
    const { data } = await AxiosInstense.get(url);
    return data?.data;
  },
  getcategories: async (url: string) => {
    const { data } = await AxiosInstense.get(url);
    return data?.data;
  },
  getProductByID: async (url: string) => {
    const { data } = await AxiosInstense.get(url);
    return data?.data;
  },
  getProductByCategory: async (url: string) => {
    const { data } = await AxiosInstense.get(url);
    return data?.data;
  },
  getBrands: async (url: string) => {
    const { data } = await AxiosInstense.get(url);
    return data?.data;
  },
  createFavProduct: async (url: string, id: string) => {
    const { data } = await AxiosInstense.post(url);
  },
};
