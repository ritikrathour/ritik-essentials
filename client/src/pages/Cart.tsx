import React, { useState, useMemo, useCallback } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Tag,
} from "lucide-react";
import { OptimizedImage } from "../components/ui/OptimizedImage";
import Rating from "../components/Rating";
import { useCart } from "../hooks/useCart";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

interface PromoCode {
  code: string;
  discount: number;
}

const VALID_PROMO_CODES: PromoCode[] = [
  { code: "SAVE10", discount: 0.1 },
  { code: "SAVE20", discount: 0.2 },
];

const SHIPPING_THRESHOLD = 500;
const SHIPPING_COST = 21;

const CartPage: React.FC = () => {
  const { Cart, updateCartItem, removeCartItem, isRemoving, isUpdating } =
    useCart();

  const [promoCode, setPromoCode] = useState<string>("");
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState<string>("");

  const applyPromoCode = () => {
    const promo = VALID_PROMO_CODES.find(
      (p) => p.code.toLowerCase() === promoCode.toLowerCase()
    );

    if (promo) {
      setAppliedPromo(promo);
      setPromoError("");
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError("");
  };

  const { subtotal, discount, shipping, total } = useMemo(() => {
    const subtotal = Cart.totalPrice;
    const discount = appliedPromo ? subtotal * appliedPromo.discount : 0;
    const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
    const total = subtotal - discount + shipping;

    return { subtotal, discount, shipping, total };
  }, [Cart.items, appliedPromo]);

  if (Cart.items.length === 0) {
    return (
      <div className="min-h-[90vh] bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">Add some items to get started</p>
          <Link to="/products">
            <Button type="button" variant="primary" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="md:px-10 px-2 w-full">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-2.5">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {Cart?.items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row gap-4"
              >
                <Link to={`/products/${item?.productId}`}>
                  <OptimizedImage
                    alt={item.name}
                    src={item.image}
                    className="sm:w-[200px]! h-[200px]! sm:h-[150px]! rounded-md"
                  />
                </Link>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <Rating average={100} count={20} />
                    </div>
                    <button
                      onClick={() => removeCartItem({ itemId: item?._id })}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      disabled={isRemoving}
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-2">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() =>
                          updateCartItem({
                            quantity: item.quantity - 1,
                            cartItemId: item._id,
                            productId: item.productId,
                          })
                        }
                        className="w-8! h-8! rounded-full!"
                        disabled={isUpdating || item.quantity - 1 < 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        type="button"
                        onClick={() =>
                          updateCartItem({
                            quantity: item.quantity + 1,
                            cartItemId: item._id,
                            productId: item.productId,
                          })
                        }
                        disabled={isUpdating}
                        className="w-8! h-8! rounded-full!"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">
                        ₹{(item.price * item.quantity)?.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        ₹{item.price?.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => {
                      setPromoCode(e.target.value);
                      setPromoError("");
                    }}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Tag className="w-4 h-4" />
                    Apply
                  </button>
                </div>
                {promoError && (
                  <p className="text-sm text-red-500 mt-1">{promoError}</p>
                )}
                {appliedPromo && (
                  <div className="mt-2 flex items-center justify-between bg-green-50 text-green-700 px-3 py-2 rounded text-sm">
                    <span>Code "{appliedPromo.code}" applied!</span>
                    <button
                      onClick={removePromoCode}
                      className="text-green-600 hover:text-green-800"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{subtotal?.toFixed(2)}</span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-green-600">
                    <span className=" w-[58px] inline-block">
                      Discount ({appliedPromo.discount * 100}%)
                    </span>
                    <span className="w-[58px] inline-block">
                      -₹{discount?.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    <span className="w-[58px] inline-block">
                      ₹{shipping?.toFixed(2)}
                    </span>
                  )}
                </div>

                {subtotal < SHIPPING_THRESHOLD && (
                  <p className="text-xs text-gray-500">
                    Add ₹{(SHIPPING_THRESHOLD - subtotal)?.toFixed(2)} more for
                    free shipping
                  </p>
                )}
              </div>

              <div className="flex justify-between text-lg font-semibold text-gray-900 mb-6">
                <span>Total</span>
                <span className="w-[58px] inline-block">
                  ₹{total?.toFixed(2)}
                </span>
              </div>
              <Link to="/" className="w-full mt-2 block">
                <Button type="button" variant="primary" className="w-full">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/products" className="w-full mt-2 block">
                <Button type="button" variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
