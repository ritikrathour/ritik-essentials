import { memo } from "react";
import { useProduct } from "../../hooks/useProduct";
import CategoryNavigationSkeleton from "../SkeletonUI/CategoryNavigationSkeleton";

const CategoryNavigation = () => {
  //  get category
  const { categories, isError, isLoading } =
    useProduct().getCategories("/categories");
  if (isError) {
    return;
  }
  if (isLoading) {
    return <CategoryNavigationSkeleton />;
  }
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center gap-6 py-3 overflow-x-auto">
        {categories?.category?.map((item: any) => (
          <button
            key={item?.name}
            className="whitespace-nowrap text-sm font-medium text-gray-700 hover:text-[#febd2f] transition"
          >
            {item?.name}
          </button>
        ))}
      </div>
    </div>
  );
};
export default memo(CategoryNavigation);
