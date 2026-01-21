import CategoryCard from "./CategoryCard";
import ErrorUI from "../ErrorsUI/ErrorUI";
import { useProduct } from "../../hooks/useProduct";
import ProductSkeleton from "../SkeletonUI/ProductSkeleton";
import { memo } from "react";

const PopularCategories = () => {
  const { categories, error, isError, isLoading, refetch } =
    useProduct().getCategories("/categories");
  if (isLoading) {
    return <ProductSkeleton style="h-[400px]" />;
  }
  if (isError) {
    return <ErrorUI error={error} onRetry={refetch} />;
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories?.category?.slice(0, 12)?.map((category: any) => {
          return (
            <CategoryCard
              key={category?.name}
              name={category?.name}
              image={category?.image}
            />
          );
        })}
      </div>
    </>
  );
};
export default memo(PopularCategories);
