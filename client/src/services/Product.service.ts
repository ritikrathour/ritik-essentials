import toast from "react-hot-toast";
import { AxiosInstense } from "./AxiosInstance";
import {
  IProdStatus,
  IProduct,
  IProductFormData,
} from "../utils/Types/Product.types";
import axios from "axios";

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
    try {
      const { data } = await AxiosInstense.post("/category", { name: payload });
      toast.success(data?.message);
      return data?.data;
    } catch (error) {
      toast.error(
        (axios.isAxiosError(error) && error?.response?.data?.message) ||
          "Somthing is wrong!"
      );
    }
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
    toast.success(data?.message);
    return data;
  },
  updateProduct: async (product: IProductFormData, id: string) => {
    const { data } = await AxiosInstense.patch(`/product/${id}`, product);
    return data;
  },
  getVendorProductById: async (
    productId: string
  ): Promise<IProductFormData> => {
    const { data } = await AxiosInstense.get(`/product/${productId}`);
    return data?.data;
  },
};
