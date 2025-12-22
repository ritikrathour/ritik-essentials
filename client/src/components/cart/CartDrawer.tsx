import { X, Truck } from "lucide-react";
import { Button } from "../ui/Button";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import useOverlayManager from "../../hooks/useOverLay";
import CartItemSkeleton from "../SkeletonUI/CartItemsSkeleton";
import EmptyCart from "./EmptyCard";
import { CloseCartDrawer } from "../../redux-store/CartSlice";
import { ICart } from "../../utils/Types/Cart.types";
import { useCart } from "../../hooks/useCart";
import { CartApi } from "../../services/Cart.serveice";
import ErrorUI from "../ErrorsUI/ErrorUI";
import { useMemo } from "react";
interface ICartDrawerOpenProps {
  cartDrawerProps: {
    isCartDrawerOpen: boolean;
    Cart: ICart;
    isLoading: boolean;
  };
}
const CartDrawer: React.FC<ICartDrawerOpenProps> = ({ cartDrawerProps }) => {
  const dispatch = useDispatch();
  // prevent scrolling
  useOverlayManager(cartDrawerProps.isCartDrawerOpen, CloseCartDrawer);
  const { clearCart, error, isError, refetch } = useCart();

  // const { clearCart,isUpdating } = useCart();
  const subTotal = cartDrawerProps.Cart.totalPrice;
  const FREE_SHIPPING_THRESHOLD = 500;
  const shippingStatus = useMemo(() => {
    const amountNeeded = FREE_SHIPPING_THRESHOLD - subTotal;
    const isEligible = subTotal >= FREE_SHIPPING_THRESHOLD;
    const progress = Math.min((subTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    return { amountNeeded, isEligible, progress };
  }, [subTotal, FREE_SHIPPING_THRESHOLD]);
  // handleClear cart
  const handleClearCart = async () => {
    clearCart();
    await CartApi.clearCart();
  };

  return (
    <>
      <div
        onClick={() => dispatch(CloseCartDrawer())}
        className={`${
          !cartDrawerProps.isCartDrawerOpen ? "invisible" : "visible"
        } min-h-screen flex items-center justify-center fixed inset-0 bg-[rgba(0,0,0,.2)] z-50`}
      />
      {/* Shopping Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-white shadow-2xl transform transition-transform duration-200 ${
          cartDrawerProps.isCartDrawerOpen
            ? "translate-x-0"
            : "translate-x-full"
        } z-50 flex flex-col`}
      >
        {/* Header */}
        <div className="bg-[#173334] text-white p-2 sm:p-3 flex items-center justify-between shadow-md">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={() => dispatch(CloseCartDrawer())}
            className="hover:bg-[#1e4243] p-2 rounded-lg transition cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>
        <div className="items-end self-end flex px-2">
          <button
            onClick={() => handleClearCart()}
            type="button"
            className="text-sm cursor-pointer hover:text-red-400 duration-150 hover:underline disabled:opacity-80 py-1 disabled:cursor-not-allowed disabled:"
            disabled={
              cartDrawerProps?.Cart?.items &&
              cartDrawerProps?.Cart?.items.length === 0
            }
          >
            Clear Cart
          </button>
        </div>
        {/* Free Shipping Banner */}
        <div className="bg-white border-b border-[#c4c4c4] p-2 sm:p-3">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              {/* Text with smooth transition */}
              <div className="relative h-6 overflow-hidden">
                <div
                  className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                    shippingStatus.isEligible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 -translate-y-full"
                  }`}
                >
                  <p className="text-sm font-semibold text-green-700">
                    Congrats! You are eligible for FREE Shipping
                  </p>
                </div>

                <div
                  className={`absolute inset-0 transition-all duration-300 ease-in-out ${
                    !shippingStatus.isEligible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-full"
                  }`}
                >
                  <p className="text-sm font-semibold text-gray-800 ">
                    Congrats! Add{" "}
                    <span className="text-orange-600 w-[60px] inline-block">
                      ₹{shippingStatus.amountNeeded.toFixed(2)}
                    </span>{" "}
                    more for{" "}
                    <span className="text-green-600">FREE Shipping</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-[#febd2f] p-2 rounded-full">
              <Truck size={24} className="text-[#173334]" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 bg-gray-200 h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#febd2f] h-full transition-all duration-500"
              style={{ width: `${shippingStatus.progress}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-3 space-y-4">
          {cartDrawerProps.isLoading ? (
            <CartItemSkeleton />
          ) : isError ? (
            <ErrorUI error={error} onRetry={refetch} />
          ) : cartDrawerProps.Cart?.items?.length > 0 ? (
            cartDrawerProps.Cart?.items.map((item) => (
              <CartItem item={item} key={item?._id} />
            ))
          ) : (
            <EmptyCart />
          )}
        </div>
        {/* cart total  */}
        {cartDrawerProps.Cart?.items &&
          cartDrawerProps?.Cart?.items?.length > 0 && (
            <div className="flex justify-between items-center px-2 md:px-4">
              <div className="flex justify-between gap-2 items-center mb-2">
                <span className="text-sm font-semibold text-[#173334]">
                  Total Item
                </span>
                <span className="text-sm font-semibold text-[#173334]">
                  {cartDrawerProps?.Cart?.totalItems}
                </span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <span className="text-sm font-semibold text-[#173334]">
                  Subtotal
                </span>
                <span className="text-sm font-bold text-[#173334]  w-[58px] inline-block">
                  ₹{subTotal?.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        {/* Checkout Buttons */}
        <div className="px-4 py-2 border-t border-[#c4c4c4]  bg-gray-50">
          <div className="flex gap-3">
            <Link className="flex-1" to="/cart">
              <Button
                onClick={() => dispatch(CloseCartDrawer())}
                type="button"
                variant="dark"
                className="w-full! py-3"
              >
                View Cart
              </Button>
            </Link>
            <Button
              type="button"
              variant="primary"
              className="flex-1 py-3"
              disabled={
                cartDrawerProps.Cart?.items &&
                cartDrawerProps?.Cart?.items?.length < 1
              }
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
