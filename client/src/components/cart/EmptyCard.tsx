import { ShoppingBag, ShoppingCart } from "lucide-react";
import React from "react";
import { Button } from "../ui/Button";
import { Link } from "react-router-dom";
import { CloseCartDrawer } from "../../redux-store/CartSlice";
import { useDispatch } from "react-redux";

type EmptyCartProps = {
  onContinueShopping?: () => void;
  onViewOrders?: () => void;
  className?: string;
};

const EmptyCart: React.FC<EmptyCartProps> = ({
  onContinueShopping,
  onViewOrders,
  className = "",
}) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`w-full max-w-xl mx-auto flex flex-col items-center justify-center py-2 text-center ${className}`}
      role="region"
      aria-label="Empty cart"
    >
      {/* Illustration */}
      <div className="rounded-lg p-2 shadow-sm flex items-center justify-center bg-[#febd2f] w-16 h-12">
        <ShoppingCart />
      </div>

      {/* Headline */}
      <h3 className="mt-4 text-xl sm:text-2xl font-semibold text-gray-800">
        Your cart is empty.
      </h3>

      {/* Description */}
      <p className="mt-2 text-[14px] text-gray-500 max-w-md">
        Looks like you haven’t added anything to your cart yet. Start exploring
        products and add them to your cart — I’ll keep them safe here.
      </p>

      {/* CTAs */}
      <div className="mt-6 flex gap-3">
        <Link to="/products" onClick={() => dispatch(CloseCartDrawer())}>
          <Button type="button" className="rounded-full! text-sm">
            Continue shopping
          </Button>
        </Link>
        <Link to="/orders" onClick={() => dispatch(CloseCartDrawer())}>
          <Button
            type="button"
            variant="outline"
            className="rounded-full! text-sm flex-1"
          >
            View orders
          </Button>
        </Link>
      </div>

      {/* Helpful suggestions */}
      <div className="mt-8 w-full">
        <h4 className="text-sm font-medium text-gray-600 mb-3">
          Popular categories
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-center">
          {["Snacks", "Beverages", "Groceries", "Household"].map((c) => (
            <Link
              to={`/products?category=${c}`}
              key={c}
              onClick={() => dispatch(CloseCartDrawer())}
            >
              <Button
                type="button"
                variant="outline"
                className="text-sm w-full"
                onClick={() => {
                  /* optional: navigate to category */
                }}
                aria-label={`Shop ${c}`}
              >
                {c}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Small note */}
      <p className="mt-6 text-xs text-gray-400">
        Tip: Add items to the cart from product pages for a faster checkout.
      </p>
    </div>
  );
};

export default EmptyCart;
