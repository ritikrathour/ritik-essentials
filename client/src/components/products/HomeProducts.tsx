import Card from "../home-compo/Card";
import { memo } from "react";
import ProductSkeleton from "../SkeletonUI/ProductSkeleton";
import ErrorUI from "../ErrorsUI/ErrorUI";
import { useProduct } from "../../hooks/useProduct";

const HomeProducts = () => {
  const { products, error, isError, isLoading, refetch } =
    useProduct().getProduct("", `products?limit=4`);
  if (isLoading) {
    return <ProductSkeleton style="h-[250px]" />;
  }
  if (isError) {
    return <ErrorUI error={error} onRetry={refetch} />;
  }
  interface ICategory {
    images: string;
    _id: string;
    name: string;
    description: string;
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-between md:items-center  shadow-slate-400">
        {products?.result?.data?.map((item: ICategory) => {
          return (
            <Card
              image="/assets/kirana.png"
              key={item._id}
              title={item.name}
              description={item.description}
              btnText="Shop Now"
              style="h-[250px] w-full md:w-[300px] shadow shadow-slate-400"
              icon={<i className="fas fa-shopping-cart" />}
              to={`products?category=${item.name}`}
            />
          );
        })}
      </div>
    </>
  );
};
export default memo(HomeProducts);
