import toast from "react-hot-toast";
import { AxiosInstense } from "./AxiosInstance";
import { IProdStatus } from "../utils/Types/Product.types";

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
  createCategory: async (payload: string) => {
    const { data } = await AxiosInstense.post("/category", { name: payload });
    toast.success(data?.message);
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
  getProductsByVendor: async (url: string) => {
    const { data } = await AxiosInstense.get(url);
    return data?.data;
  },
  deleteVendorProduct: async (prodId: string) => {
    const { data } = await AxiosInstense.delete(`/product/${prodId}`);
    return data;
  },
  updateProductStatus: async (productId: string, status: IProdStatus) => {
    const { data } = await AxiosInstense.patch(`/product/status/${productId}`, {
      status,
    });
    return data;
  },
};
