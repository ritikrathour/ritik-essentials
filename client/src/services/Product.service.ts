import toast from "react-hot-toast";
import { AxiosInstense } from "./AxiosInstance";
import {
  IPROD,
  IProdStatus,
  IProductFormData,
} from "../utils/Types/Product.types";
import axios, { Axios } from "axios";

export const ProductApi = {
  createProduct: async (url: string, formData: any) => {
    try {
      const { data } = await AxiosInstense.post(url, formData);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getProducts: async (url: string) => {
    try {
      const { data } = await AxiosInstense.get(url);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getcategories: async (url: string) => {
    try {
      const { data } = await AxiosInstense.get(url);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
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
      console.log(error);
      throw error;
    }
  },
  getProductByID: async (url: string) => {
    try {
      const { data } = await AxiosInstense.get(url);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getProductByCategory: async (url: string) => {
    try {
      const { data } = await AxiosInstense.get(url);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getBrands: async (url: string) => {
    try {
      const { data } = await AxiosInstense.get(url);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getProductsByVendor: async (url: string) => {
    try {
      const { data } = await AxiosInstense.get(url);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  deleteVendorProduct: async (prodId: string) => {
    try {
      const { data } = await AxiosInstense.delete(`/product/${prodId}`);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateProductStatus: async (productId: string, status: IProdStatus) => {
    try {
      const { data } = await AxiosInstense.patch(
        `/product/status/${productId}`,
        {
          status,
        }
      );
      toast.success(data?.message);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  updateProduct: async (product: IProductFormData, id: string) => {
    try {
      const { data } = await AxiosInstense.patch(`/product/${id}`, product);
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getVendorProductById: async (
    productId: string
  ): Promise<IProductFormData> => {
    try {
      const { data } = await AxiosInstense.get(`/product/${productId}`);
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  getWishlistProducts: async () => {
    try {
      const { data } = await AxiosInstense.get("/fav-prodcuts");
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  removeFromWishList: async (prodId: string) => {
    try {
      const { data } = await AxiosInstense.delete(`/fav-product/${prodId}`, {});
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  addToWishList: async (payload: IPROD) => {
    try {
      const { data } = await AxiosInstense.post(`/fav-product`, {
        productId: payload._id,
      });
      return data?.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
};
