import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProductApi } from "../services/Product.service";
import { productKeys } from "../TanstackQuery/Querykeys";

export const useProduct = () => {
  const getProduct = (QKey: string, url: string) => {
    const {
      data: products,
      isLoading,
      error,
      isError,
      refetch,
    } = useQuery({
      queryKey: [...productKeys.all, QKey],
      queryFn: () => ProductApi.getProducts(url),
      retry: 1,
      refetchOnWindowFocus: false,
    });
    return { products, isLoading, error, isError, refetch };
  };
  const getCategories = (url: string) => {
    const {
      data: categories,
      isError,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: productKeys.popularCategory(),
      queryFn: () => ProductApi.getcategories(url),
      retry: 1,
      enabled: true,
      refetchOnWindowFocus: false,
    });
    return {
      categories,
      isError,
      error,
      isLoading,
      refetch,
    };
  };
  const getProductById = (id: any, url: string) => {
    const {
      data: products,
      error,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: productKeys.productId(id),
      queryFn: () => ProductApi.getProductByID(url),
      retry: 1,
      enabled: true,
      refetchOnWindowFocus: false,
    });
    return { products, error, isError, isLoading, refetch };
  };
  const getBrands = (url: string) => {
    const {
      data: brands,
      isError,
      isLoading,
      error,
      refetch,
    } = useQuery({
      queryKey: productKeys.brands(),
      queryFn: () => ProductApi.getBrands(url),
      enabled: true,
      refetchOnWindowFocus: false,
      retry: 1,
    });
    return { brands, isLoading, isError, error, refetch };
  };
  const CreateCategory = () => {
    const queryClient = useQueryClient();
    const {
      data,
      isError,
      error,
      isPending,
      mutate: createCategory,
    } = useMutation({
      mutationFn: (payload: string) => ProductApi.createCategory(payload),
      retry: 0,
      onSuccess: (data) => {
        console.log(data, "data y");

        queryClient.invalidateQueries({ queryKey: productKeys.Categories() });
      },
    });
    return { data, isError, error, isPending, createCategory };
  };
  return {
    getProduct,
    getCategories,
    getProductById,
    getBrands,
    CreateCategory,
  };
};
