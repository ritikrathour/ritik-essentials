import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ProductApi } from "../services/Product.service";
import { productKeys } from "../TanstackQuery/Querykeys";
import { IProdStatus } from "../utils/Types/Product.types";
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
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: productKeys.Categories() });
      },
    });
    return { data, isError, error, isPending, createCategory };
  };
  const getVendorProduct = (url: string, vendor: boolean) => {
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
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: productKeys.vendorProds() });
      },
      onError: (_err, _vars, context) => {
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
  return {
    getProduct,
    getCategories,
    getProductById,
    getBrands,
    CreateCategory,
    getVendorProduct,
    deleteVendorProduct,
    updateProductStatus,
  };
};
