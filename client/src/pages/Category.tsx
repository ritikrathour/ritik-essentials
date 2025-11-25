import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { productKeys } from "../TanstackQuery/Querykeys";
import { ProductApi } from "../services/Product.service";

const Category = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("category");
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: productKeys.category(),
    queryFn: () => ProductApi.getProducts(`products?category=${query}`),
    enabled: true,
    retry: 1,
    refetchOnWindowFocus: false,
  });
  console.log(data);

  return <></>;
};
export default Category;
