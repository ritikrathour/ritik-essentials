import { useEffect, useState } from "react";
import { sliderData } from "../../utils/constant";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { OptimizedImage } from "../ui/OptimizedImage";
import { useProduct } from "../../hooks/useProduct";
import ErrorUI from "../ErrorsUI/ErrorUI";
import Loader from "../Loader";
import { IPROD } from "../../utils/Types/Product.types";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  let { products, error, isError, isLoading, refetch } =
    useProduct().getProduct("bestDeals", "products");
  useEffect(() => {
    let id = setInterval(() => {
      setCurrentIndex((prev) => {
        return prev === products?.result?.data?.length - 1 ? 0 : prev + 1;
      });
    }, 5000);
    return () => clearInterval(id);
  }, [currentIndex]);

  if (isError) {
    return <ErrorUI error={error} onRetry={refetch} />;
  }
  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {products?.result &&
        products?.result?.data?.map((slide: IPROD, i: number) => {
          return (
            <div
              key={slide?._id}
              className={`tran flex items-center justify-between absolute top-0 md:top-30 left-0 w-full ease-in-out transition-all md:h-[300px] ${
                currentIndex === i ? "opacity-100" : "opacity-0 invisible"
              } `}
            >
              <div className="flex flex-col gap-4 bg-[#febd2f]">
                <p className="bg-white p-1 w-[150px] text-center rounded-full text-[14px] ">
                  Daily Discount
                </p>
                <h1 className="text-3xl md:text-4xl font-bold">
                  {slide?.name}
                </h1>
                <p className="text-[12px] md:w-[400px] font-semibold text-[#173334c2]">
                  {slide?.description}
                </p>
                <Link to={`/products?category=${slide.category}`}>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-[200px]"
                  >
                    <i className="fas fa-grid"></i>
                    Show Products
                    <i className="fas fa-chevron-right"></i>
                  </Button>
                </Link>
              </div>
              <div
                className={`lg:w-[600px] relative hidden md:block h-[300px]  
                `}
              >
                <OptimizedImage
                  src={(slide.images && slide.images[0].image) || ""}
                  alt={slide?.name}
                  lowQualitySrc={slide?.image}
                  className="rounded-xl"
                />
                <div className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#febd2f] to-[rgba(255,255,255,0)]"></div>
              </div>
            </div>
          );
        })}
    </>
  );
};
export default Slider;
