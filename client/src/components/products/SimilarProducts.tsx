import { useProduct } from "../../hooks/useProduct";
import ErrorUI from "../ErrorsUI/ErrorUI";
import ProductSkeleton from "../SkeletonUI/ProductSkeleton";
import Title from "../Title";
import ProductBestCard from "./ProductBestCard";

const SimilarProducts = ({ category }: { category: string }) => {
  const { products, error, isError, isLoading, refetch } =
    useProduct().getProduct(
      "category-prod",
      `/products?category=${category}&limit=4`
    );
  if (isLoading) {
    return <ProductSkeleton style="h-[455px]" />;
  }
  if (isError) {
    return <ErrorUI error={error} onRetry={refetch} />;
  }

  return (
    <>
      <Title text="Similar Products" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 justify-between items-center">
        {products?.result?.data?.map((prod: any) => {
          return (
            <ProductBestCard isButton={false} product={prod} key={prod?._id} />
          );
        })}
      </div>
    </>
  );
};
export default SimilarProducts;
