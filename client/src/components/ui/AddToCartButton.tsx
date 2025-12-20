import { useState } from "react";
import { IProduct } from "../../utils/Types/Product.types";
import { useCart } from "../../hooks/useCart";
import { Button } from "./Button";

const AddToCartButton: React.FC<{ product: IProduct }> = ({ product }) => {
  const { addTocart, isAddingToCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  let cartItemPayload = {
    productId: product._id.toString(),
    quantity: 1,
    price: product.price,
    name: product.name,
    imageUrl: product.image || "image url add karo",
  };
  const handleAdd = () => {
    addTocart(cartItemPayload);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1000);
  };

  return (
    <Button
      type="button"
      onClick={handleAdd}
      disabled={isAddingToCart || product.stock === 0}
      className={`${showSuccess && "bg-green-600! text-white!"} w-full`}
    >
      {isAddingToCart ? (
        <>
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Adding...
        </>
      ) : showSuccess ? (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          Added!
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Add to Cart
        </>
      )}
    </Button>
  );
};
export default AddToCartButton;
