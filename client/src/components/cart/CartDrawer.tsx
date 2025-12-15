import { useState } from "react";
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
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "All Type Bell Pepper",
      price: 350.0,
      quantity: 2,
      color: "Red",
      image: "🫑",
    },
    {
      id: 2,
      name: "Crunchy Healthy & Tasty Cookies",
      price: 500.0,
      quantity: 1,
      material: "Choco",
      image: "🍪",
    },
  ]);
  // const { Cart, isCartDrawerOpen, isLoading } = useCart();
  const FREE_SHIPPING_THRESHOLD = 1000;
  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };
  const subtotal = calculateSubtotal();
  const shippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );
  const isEligibleForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  const updateQuantity = (id: any, delta: any) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: any) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
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
        <div className="bg-[#173334] text-white p-2 sm:p-4 flex items-center justify-between  shadow-md">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            onClick={() => dispatch(CloseCartDrawer())}
            className="hover:bg-[#1e4243] p-2 rounded-lg transition cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {/* Free Shipping Banner */}
        <div className="bg-white border-b border-[#c4c4c4] p-2 sm:p-4">
          <div className="flex items-start gap-3">
            <p className="text-[#173334] flex-1">
              <span className="font-bold">Congrats!</span>{" "}
              {isEligibleForFreeShipping ? (
                <span>
                  You are eligible for{" "}
                  <span className="font-bold">FREE Shipping</span>
                </span>
              ) : (
                <span>
                  Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more
                  for <span className="font-bold">FREE Shipping</span>
                </span>
              )}
            </p>
            <div className="bg-[#febd2f] p-2 rounded-full">
              <Truck size={24} className="text-[#173334]" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 bg-gray-200 h-1 rounded-full overflow-hidden">
            <div
              className="bg-[#febd2f] h-full transition-all duration-500"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4">
          {cartDrawerProps.isLoading ? (
            <CartItemSkeleton />
          ) : cartDrawerProps.Cart?.items?.length > 0 ? (
            cartDrawerProps.Cart?.items.map((item: any) => (
              <CartItem
                item={item}
                key={item?.id}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />
            ))
          ) : (
            <EmptyCart />
          )}
        </div>
        {/* cart total  */}
        {cartDrawerProps.Cart?.items?.length > 0 && (
          <div className="flex justify-between items-center px-2 md:px-4">
            <div className="flex justify-between gap-2 items-center mb-2">
              <span className="text-sm font-semibold text-[#173334]">
                Total Item
              </span>
              <span className="text-sm font-semibold text-[#173334]">
                {totalItems}
              </span>
            </div>
            <div className="flex justify-between items-center gap-2">
              <span className="text-sm font-semibold text-[#173334]">
                Subtotal
              </span>
              <span className="text-sm font-bold text-[#173334]">
                ₹{subtotal.toFixed(2)}
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
              disabled={cartDrawerProps.Cart?.items?.length < 1}
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
