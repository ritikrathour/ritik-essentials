import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { openCartDrawer } from "../../redux-store/CartSlice";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../hooks/useCart";

const ShoppingCartCompo = () => {
  const dispatch = useDispatch();
  const { Cart } = useCart();
  return (
    <Link
      to=""
      onClick={() => dispatch(openCartDrawer())}
      className="hidden bg-gray-900 sm:block text-[#febd2f] relative py-2 px-4 rounded shadow-lg hover:bg-gray-800 transition z-40"
    >
      <ShoppingCart size={20} />
      {Cart.totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-semibold">
          {Cart.totalItems}
        </span>
      )}
    </Link>
  );
};
export default ShoppingCartCompo;
