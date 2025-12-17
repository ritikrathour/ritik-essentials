import { Heart } from "lucide-react";
import { IProduct } from "../../utils/Types/Product.types";
import React from "react";
import { OptimizedImage } from "../ui/OptimizedImage";
import { Link } from "react-router-dom";
import { Button } from "../ui/Button";
import Rating from "../Rating";
import { useDispatch } from "react-redux";
import { addToCartLocal } from "../../redux-store/CartSlice";
import AddToCartButton from "../ui/AddToCartButton";
interface ProductProps {
  product: IProduct;
  isButton: boolean;
}
const ProductBestCard: React.FC<ProductProps> = ({ product, isButton }) => {
  const dispatch = useDispatch();
  // handleAddToCart
  const handleAddToCart = () => {
    dispatch(
      addToCartLocal({
        product,
        productId: product._id.toString(),
        quantity: 1,
      })
    );
  };
  return (
    <div>
      <div className="relative bg-white sm:w-[280px] md:w-[320px] h-full flex flex-col justify-between rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group border border-[#c4c4c4]">
        <Link
          to={`/products/${product?._id}`}
          className=" w-full h-[300px] block"
        >
          <OptimizedImage
            className="group-hover:scale-105 transition-transform duration-300"
            alt={product?.name}
            src={"../assets/cookies.png"}
            // (product?.images && product?.images[0])
          />
          <button
            //   onClick={() => toggleFavorite(product.id)}
            onClick={(e) => e.preventDefault()}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5`}
              //  ${
              //           favorites.has(product.id)
              //             ? "fill-red-500 text-red-500"
              //             : "text-gray-400"
              //         }
            />
          </button>
          {product.sponsored && (
            <div className="absolute top-2 left-2 px-2 py-1 bg-gray-100 text-xs font-medium rounded">
              Sponsored
            </div>
          )}
          {product.badge && (
            <div
              className={`absolute bottom-2 left-2 px-2 py-1 text-xs font-medium rounded ${
                product.badge === "Hot Deal"
                  ? "bg-green-100 text-green-700"
                  : product.badge === "Only few left"
                  ? "bg-red-100 text-red-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {product.badge}
            </div>
          )}
        </Link>
        <div className="p-3">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium text-gray-900">{product.brand}</h3>
            {product.assured && (
              <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium">
                ✓ Assured
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.name}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl font-bold">₹{product.price}</span>
              <span className="text-sm text-gray-500 line-through">
                ₹445
                {/* {product.originalPrice} */}
              </span>
              <span className="text-sm text-green-600 font-medium">
                {/* {product.discount} */}
                35% off
              </span>
            </div>
            {product?.rating && product?.rating?.count > 0 && (
              <Rating rating={{ ...product?.rating }} />
            )}
          </div>

          {isButton && <AddToCartButton product={product} />}
        </div>
      </div>
    </div>
  );
};

export default ProductBestCard;
