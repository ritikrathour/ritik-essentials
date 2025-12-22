import { useDispatch } from "react-redux";
import { openCartDrawer } from "../../redux-store/CartSlice";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../hooks/useCart";
import { memo } from "react";

const ShoppingCartCompo = () => {
  const dispatch = useDispatch();
  const { Cart } = useCart();
  return (
    <button
      onClick={() => dispatch(openCartDrawer())}
      className="bg-gray-900 text-[#febd2f] relative py-2 px-4 rounded shadow-lg hover:bg-gray-800 transition z-40"
    >
      <ShoppingCart size={18} />
      {Cart?.totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-semibold">
          {Cart?.totalItems}
        </span>
      )}
    </button>
  );
};
export default memo(ShoppingCartCompo);
