import React from "react";
import { Button } from "../ui/Button";
import { IProduct } from "../../utils/Types/Product.types";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { OptimizedImage } from "../ui/OptimizedImage";
interface ProductProp {
  product: IProduct;
  isButton: boolean;
}
const ProductCard: React.FC<ProductProp> = ({ product, isButton }) => {
  return (
    <>
      <div
        className=" w-full sm:w-[280px] md:w-[320px] flex-shrink-0 text-center relative rounded-xl p-2 md:p-4 
      border border-[#c4c4c4] flex flex-col gap-2 cursor-pointer"
      >
        <div className="absolute top-2 left-2 bg-[#febd2f] text-white z-10 text-center rounded-full py-1 px-2 capitalize">
          <span className="text-[14px] font-normal">best Deals</span>
        </div>
        <Link to={`/products/${product._id}`}>
          <div className="w-full h-[300px] group">
            <OptimizedImage
              src="../assets/oats.avif"
              alt={product?.name}
              lowQualitySrc="../assets/oats.avif"
            />
          </div>
        </Link>
        <div className="w-full">
          <div className="flex justify-between">
            <h3 className="text-[16px]">
              {product.name?.slice(0, 20) + "..."}
            </h3>
            <span className="text-[#febd2f] text-xl sm:text-2xl font-bold">
              ₹{product.price}
            </span>
          </div>
          {product?.rating && product?.rating?.count > 0 && (
            <Rating rating={{ ...product?.rating }} />
          )}
        </div>
        <Button variant="dark" className="sm:w-full w-[200px]" type="button">
          Add to Cart
        </Button>
      </div>
    </>
  );
};
export default ProductCard;
