import { useQuery } from "@tanstack/react-query";
import { productKeys } from "../TanstackQuery/Querykeys";
import { ProductApi } from "../services/Product.service";

export const UseFavProduct = () => {
  const createFavProduct = async (url: string, productId: string) => {
    const {
      data: favProduct,
      isLoading,
      isError,
      error,
      refetch,
    } = useQuery({
      queryKey: productKeys.favProduct(),
      queryFn: () => ProductApi.createFavProduct("/fav-product", productId),
      retry: 1,
      enabled: true,
      refetchOnWindowFocus: false,
    });
    return { favProduct, error, isError, isLoading, refetch };
  };
  return { createFavProduct };
};
