import {
  ChevronLeft,
  ChevronRight,
  HeartIcon,
  Minus,
  Plus,
} from "lucide-react";
import { lazy, memo, useCallback, useMemo, useState } from "react";
import { Button } from "../components/ui/Button";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import Loader from "../components/Loader";
import ErrorUI from "../components/ErrorsUI/ErrorUI";
import Rating from "../components/Rating";
import { useQuery } from "@tanstack/react-query";
import { productKeys } from "../TanstackQuery/Querykeys";
import { ProductApi } from "../services/Product.service";
import { UseFavProduct } from "../hooks/useFavProduct";
import { AxiosInstense } from "../services/AxiosInstance";
import ProductDetailsAccordion from "../components/products/ProductAcordianDetails";
import { LazySection } from "../components/LazySection";
import { OptimizedImage } from "../components/ui/OptimizedImage";
import AddToCartButton from "../components/ui/AddToCartButton";
const RatingsAndReviews = lazy(
  () => import("../components/products/RatingsAndReviews")
);
const SimilarProducts = lazy(
  () => import("../components/products/SimilarProducts")
);

const ProductDetails = () => {
  const [isFav, setIsFav] = useState<boolean>(false);
  const { id } = useParams();
  const handleAddToWishList = async (productId: string) => {
    setIsFav((prev) => !prev);
    const res = await AxiosInstense.post("/fav-product", { id });
  };
  const [imageIndex, setImageIndex] = useState<number>(0);

  const { products, error, isError, isLoading, refetch } =
    useProduct().getProductById(id, `/product/${id}`);
  // handleClickPrev
  const handleClickPrev = useCallback(() => {
    if (imageIndex === 0) return;
    setImageIndex((prev) => prev - 1);
  }, [imageIndex]);
  // handleClickNext
  const handleClickNext = useCallback(() => {
    if (imageIndex === products?.images.length) return;
    setImageIndex((prev) => prev + 1);
  }, [imageIndex]);
  if (isLoading) {
    return <Loader style="h-screen" />;
  }
  if (isError) {
    return <ErrorUI error={error} onRetry={refetch} />;
  }
  return (
    <>
      <section className="md:px-10 px-2 w-full">
        <div className="flex justify-end items-center w-full py-2">
          {/* add to wishlist */}
          <button
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleAddToWishList(products?._id)}
          >
            <p className="font-light">Add to wishlist</p>
            <HeartIcon
              fill={isFav ? "red" : "transparent"}
              className={`${
                isFav && "text-red-600"
              } cursor-pointer hover:text-red-600 transition-all duration-200 ease-in-out`}
            />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center gap-2 h-full">
          {/* text    */}
          <div className="order-2 md:order-1">
            <p className="font-semibold text-[14px]">{products?.brand}</p>
            <h2 className="my-2 font-bold text-[20px] capitalize font-serif">
              {products?.name}
            </h2>
            <p
              className="font-semibold text-[14px]"
              style={{ letterSpacing: "1px" }}
            >
              {products?.category}
            </p>
            <div className="my-2">
              <p className="text-[14px] font-light">Quantity:</p>
              <div className="px-2 border mt-0.5 w-[100px] flex items-center justify-center rounded-xl h-[40px]">
                <button className="cursor-pointer">
                  <Minus size={16} />
                </button>
                <input
                  className="w-full outline-0 border-0 text-center"
                  type="number"
                  name=""
                  id=""
                />
                <button className="cursor-pointer">
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <div className="flex gap-3.5">
              <h3 className="text-2xl font-extrabold">₹{products?.price}</h3>
              <h4 className="line-through">₹225.00</h4>
            </div>
            <div className="flex gap-3 items-center mt-4">
              <AddToCartButton product={products}></AddToCartButton>
              {/* Add to Cart <ChevronRight /> */}
              <Button
                variant="dark"
                type="button"
                className="w-[150px] flex-1  "
              >
                Buy it now
              </Button>
            </div>
          </div>
          {/* images   */}
          <div className="border border-[#c4c4c4] p-2 order-1 rounded-md md:order-2">
            <div className="h-[300px] m-auto rounded">
              <OptimizedImage
                src={
                  (products?.images && products?.images[imageIndex]) ||
                  "../public/assets/cola.avif"
                }
                alt={imageIndex.toString()}
                objectFit="contain"
              />
            </div>
            <div className="flex items-center flex-wrap justify-center mt-4 gap-4">
              <div className="flex justify-start items-center gap-2 w-[250px] overflow-scroll">
                {products?.images?.length > 1 &&
                  products?.images.map((image: string, index: number) => {
                    return (
                      <div
                        onClick={() => setImageIndex(index)}
                        key={index}
                        className={`${
                          imageIndex === index && "border-black"
                        } w-[150px] h-[50px] rounded-md cursor-pointer border-2 border-[#c4c4c4] hover:border-black transition-all duration-200 ease-in-out flex justify-center items-center`}
                      >
                        <OptimizedImage
                          src={image}
                          alt={image}
                          className="w-[50px]! object-cover h-[40px] rounded-md"
                        />
                      </div>
                    );
                  })}
              </div>
              {products?.images?.length > 1 && (
                <div className="flex gap-2">
                  <Button
                    disabled={imageIndex === 0}
                    onClick={() => handleClickPrev()}
                    type="button"
                    className={`w-[40px] h-[40px]`}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    disabled={imageIndex === products?.images?.length - 1}
                    onClick={() => handleClickNext()}
                    type="button"
                    className="w-[40px] h-[40px] cursor-pointer rounded-full bg-yellow-500 flex justify-center items-center"
                  >
                    <ChevronRight />
                  </Button>
                </div>
              )}
            </div>
          </div>
          {/* description and product details   */}
          <div className="flex flex-col gap-1 order-3">
            <div className="flex justify-start md:justify-end">
              <Rating rating={{ ...products?.rating }} />
            </div>
            <h2 className="text-start md:text-end text-[20px] font-semibold">
              Description:
            </h2>
            <p className="text-start md:text-end text-[14px] leading-5">
              {products?.description}
            </p>
            <h2 className="text-start md:text-end text-[20px] font-semibold">
              About product
            </h2>
            <div className="text-start md:text-end">
              <h5 className="font-semibold text-[14px]">
                SKU:<span className="font-light pl-0.5">{products?.sku}</span>
              </h5>
            </div>
            <div className="text-start md:text-end">
              <h5 className="font-semibold text-[14px]">
                Category:
                <span className="font- pl-0.5">{products?.category}</span>
              </h5>
            </div>
          </div>
        </div>
      </section>
      {/* product details  */}
      <section className="md:px-10 p-2">
        <ProductDetailsAccordion details={products} />
      </section>
      {/* RatingsAndReviews */}
      <section className="md:px-10 p-2">
        <LazySection>
          <RatingsAndReviews />
        </LazySection>
      </section>
      {/* similar product */}
      <section className="md:px-10 p-2">
        <LazySection>
          <SimilarProducts category={{ ...products?.category }} />
        </LazySection>
      </section>
    </>
  );
};

export default memo(ProductDetails);
