import { memo } from "react";
import { useProduct } from "../../hooks/useProduct";

const CategoryNavigation = () => {
  //  get category
  const { categories, error, isError, isLoading, refetch } =
    useProduct().getCategories("/categories");
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
