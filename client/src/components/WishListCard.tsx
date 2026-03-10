import React from "react";
import { IPROD, IProduct } from "../utils/Types/Product.types";
import Rating from "./Rating";
import { Button } from "./ui/Button";
import { Link } from "react-router-dom";
import AddToCartButton from "./ui/AddToCartButton";
import { OptimizedImage } from "./ui/OptimizedImage";
interface IItem {
  product: IProduct;
  user?: any;
  onRemove: (prodId: string) => void;
  state: {
    isPending: boolean;
    removeError: any;
  };
}
const WishlistCard: React.FC<IItem> = ({ product, onRemove, state }) => {
  return (
    <div className="bg-white shadow-sm border border-[#c4c4c4] rounded-xl overflow-hidden flex flex-col">
      <Link
        to={`/product-details/${product?._id}`}
        className="w-full h-52 block"
      >
        <OptimizedImage
          className="object-cover"
          alt={(product?.images && product?.images[0].alt) || product?.name}
          src={(product?.images && product?.images[0].image) || ""}
        />
      </Link>
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1 capitalize">
            {product?.name}
          </h2>
          <p className="text-gray-600 mb-2 line-clamp-2">
            {product?.description}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-xl font-bold text-gray-900">₹{product?.price}</p>
            <Rating rating={product?.rating} />
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <Button
            type="button"
            disabled={state.isPending}
            onClick={() => onRemove(product?._id as string)}
            variant="danger"
            className="w-1/2 bg-red-100! text-red-600! font-medium! hover:bg-red-200! "
          >
            Remove
          </Button>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
