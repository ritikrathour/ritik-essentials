import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ProductApi } from "../services/Product.service";
import { productKeys } from "../TanstackQuery/Querykeys";
import {
  IProdStatus,
  IProduct,
  IProductFormData,
} from "../utils/Types/Product.types";
type updateStatus = {
  productId: string;
  status: IProdStatus;
};

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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: productKeys.Categories() });
      },
    });
    return { data, isError, error, isPending, createCategory };
  };
  const getVendorProducts = (url: string, vendor: boolean) => {
    const { data, error, isError, isLoading, refetch } = useQuery({
      queryKey: productKeys.vendorProds(),
      queryFn: () => ProductApi.getProductsByVendor(url),
      retry: vendor,
      enabled: true,
      refetchOnWindowFocus: false,
    });
    return { data, error, isError, isLoading, refetch };
  };
  const deleteVendorProduct = () => {
    const queryClient = useQueryClient();
    const { mutate, isPending, isError, error } = useMutation({
      mutationFn: (prodId: string) => ProductApi.deleteVendorProduct(prodId),
      onSuccess: (_, productId) => {
        // 🔄 Remove deleted product from cache instantly
        queryClient.setQueryData(productKeys.vendorProds(), (oldData: any) => {
          if (!oldData?.result?.data) return oldData;
          return {
            ...oldData,
            result: {
              ...oldData.result,
              data: oldData?.result?.data?.filter(
                (p: any) => p?._id !== productId
              ),
            },
          };
        });
      },
      onError: (error) => {
        console.log("Delete product failed", error);
      },
    });
    return { mutate, isPending, isError, error };
  };
  const updateProductStatus = () => {
    const queryClient = useQueryClient();
    const { data, mutate, isPending, error } = useMutation({
      mutationFn: ({ productId, status }: updateStatus) =>
        ProductApi.updateProductStatus(productId, status),
      onMutate: async ({ productId, status }) => {
        await queryClient.cancelQueries({
          queryKey: productKeys.vendorProds(),
        });
        const previousData = queryClient.getQueryData(
          productKeys.vendorProds()
        );
        // 🔥 Optimistic update
        queryClient.setQueryData(productKeys.vendorProds(), (oldData: any) => {
          if (!oldData?.result?.data) return oldData;
          return {
            ...oldData,
            result: {
              ...oldData?.result,
              data: oldData?.result?.data?.map((p: any) =>
                p?._id === productId ? { ...p, status } : p
              ),
            },
          };
        });
        return previousData;
      },
      retry: 0,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: productKeys.vendorProds() });
      },
      onError: (_err, _vars, context) => {
        console.log(_err);
        // 🔄 Rollback on failure
        // if (context?.previousData) {
        //   queryClient.setQueryData(
        //     productKeys.vendorProds(),
        //     context.previousData
        //   );
        // }
      },
    });
    return { data, mutate, isPending, error };
  };
  const updateProduct = (id: string) => {
    const queryClient = useQueryClient();
    const { data, error, isError, isPending, mutate } = useMutation({
      mutationFn: (productData: IProductFormData) =>
        ProductApi.updateProduct(productData, id),
      onMutate: async (data) => {
        await queryClient.cancelQueries({
          queryKey: productKeys.all,
        });
        const previousData = queryClient.getQueryData(productKeys.all);
        // 🔥 Optimistic update
        queryClient.setQueryData(productKeys.all, (oldData: any) => {
          if (!oldData?.result?.data) return oldData;
          return {
            ...oldData,
            result: {
              ...oldData?.result,
              data: oldData?.result?.data?.map((p: any) => {
                return p?._id === id ? { ...p, data } : p;
              }),
            },
          };
        });
        return previousData;
      },
      retry: 0,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: productKeys.all });
      },
      onError: (error) => {
        console.log(error);
      },
    });
    return { data, error, isError, isPending, mutate };
  };
  const getVendorProduct = (productId: string) => {
    const {
      data: vendorProduct,
      error,
      isError,
      isLoading,
      refetch,
    } = useQuery<IProductFormData>({
      queryKey: productKeys.vendorProductById(productId),
      queryFn: () => ProductApi.getVendorProductById(productId),
      retry: 1,
      enabled: true,
      refetchOnWindowFocus: false,
    });
    return { vendorProduct, error, isError, isLoading, refetch };
  };

  return {
    getProduct,
    getCategories,
    getProductById,
    getBrands,
    CreateCategory,
    getVendorProducts,
    deleteVendorProduct,
    getVendorProduct,
    updateProductStatus,
    updateProduct,
  };
};
