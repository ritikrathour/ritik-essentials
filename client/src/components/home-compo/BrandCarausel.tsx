import { Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import ErrorUI from "../ErrorsUI/ErrorUI";
import BrandSkeleton from "../SkeletonUI/BrandSkeleton";

const BrandCarausel = () => {
  // Predefined Tailwind gradient combinations
  const gradients = [
    "bg-gradient-to-br from-purple-400 via-pink-500 to-red-500",
    "bg-gradient-to-br from-blue-400 via-cyan-500 to-teal-500",
    "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500",
    "bg-gradient-to-br from-green-400 via-emerald-500 to-teal-500",
    "bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500",
    "bg-gradient-to-br from-rose-400 via-fuchsia-500 to-purple-500",
    "bg-gradient-to-br from-amber-400 via-orange-500 to-pink-500",
    "bg-gradient-to-br from-lime-400 via-green-500 to-emerald-500",
    "bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500",
    "bg-gradient-to-br from-violet-400 via-purple-500 to-indigo-500",
    "bg-gradient-to-br from-pink-400 via-rose-500 to-orange-500",
    "bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500",
  ];
  const { brands, error, isError, isLoading, refetch } =
    useProduct().getBrands("/brands");
  if (isLoading) {
    return <BrandSkeleton style="" />;
  }
  if (isError) {
    return <ErrorUI error={error} onRetry={refetch} />;
  }
  return (
    <>
      <div className="flex items-center gap-3 w-full overflow-scroll">
        {brands?.map((brand: any) => {
          let random = Math.floor(Math.random() * gradients?.length);
          return (
            <Link key={brand?.brand} to={`/products?brand=${brand?.brand}`}>
              <div className="flex justify-start flex-shrink-0">
                <div
                  className={`w-[150px] h-[150px] rounded-full ${gradients[random]} shadow-md border border-[#c4c4c4] text-center leading-[150px]`}
                >
                  <span className="capitalize text-white">{brand?.brand}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default BrandCarausel;
