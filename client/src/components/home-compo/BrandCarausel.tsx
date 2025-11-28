import { Link } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import ErrorUI from "../ErrorsUI/ErrorUI";
import BrandSkeleton from "../SkeletonUI/BrandSkeleton";
import { OptimizedImage } from "../ui/OptimizedImage";

const BrandCarausel = () => {
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
          return (
            <Link key={brand?.brand} to={`brands/${brand?.brand}`}>
              <div className="flex justify-start flex-shrink-0">
                <div className="w-[150px] h-[150px] rounded-full shadow-md border-4 border-[#c4c4c4]">
                  <OptimizedImage
                    src="../assets/girl.png"
                    alt="#c4c4c4"
                    className="rounded-full"
                  />
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
