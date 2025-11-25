import { memo } from "react";
import ProductSkeleton from "../SkeletonUI/ProductSkeleton";
import ErrorUI from "../ErrorsUI/ErrorUI";
import { useProduct } from "../../hooks/useProduct";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import ProductBestCard from "./ProductBestCard";

const ProductCarausel = ({ url, QKey }: { url: string; QKey: string }) => {
  // products api call
  let { products, error, isError, isLoading, refetch } =
    useProduct().getProduct(QKey, url);

  if (isLoading) {
    return <ProductSkeleton style="h-[455px]" />;
  }
  if (isError) {
    return <ErrorUI error={error} onRetry={refetch} />;
  }
  return (
    <>
      <div className="relative w-full mx-auto ">
        <div
          className={`flex gap-4 items-center transition-transform ease-in-out duration-500 overflow-scroll`}
        >
          {products?.result?.data?.map((prod: any) => {
            return (
              <ProductBestCard isButton={true} product={prod} key={prod?._id} />
            );
          })}
        </div>

        <div className="flex justify-center mt-5">
          <Link to="/products">
            <Button
              variant="primary"
              type="button"
              className="text-[14px]! px-4"
            >
              Shop More Products
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
};
export default memo(ProductCarausel);
{
  /* Navigation Buttons
        <Button
          onClick={() => handleSlidePrev()}
          type="button"
          variant="secondary"
          className="absolute!  hover:bg-gray-600! top-1/2 md:w-[40px] md:h-[40px] left-0 transform -translate-y-1/2! rounded-full!"
        >
          <ChevronLeft />
        </Button>
        <Button
          onClick={() => handleSlideNext()}
          type="button"
          variant="secondary"
          className="absolute!  hover:bg-gray-600! top-1/2 w-[40px] h-[40px] right-0 transform -translate-y-1/2 rounded-full!"
        >
          <ChevronRight />
        </Button> */
}
