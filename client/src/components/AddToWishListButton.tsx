import { useSelector } from "react-redux";
import { useWishList } from "../hooks/useWishList";
import { RootState } from "../redux-store/Store";
import { IPROD } from "../utils/Types/Product.types";
import {
  addToWishListLocal,
  removeFromWishListLocal,
} from "../redux-store/WishListSlice";
import { Heart } from "lucide-react";
import { useState } from "react";
interface ProductProps {
  product: IPROD;
  className?: string;
}
const AddToWishListButton: React.FC<ProductProps> = ({
  product,
  className,
}) => {
  const {
    addTowishList,
    isAddingToWishList,
    removeToWishList,
    isRemovingToWishList,
    isAuthenticated,
  } = useWishList();
  const { wishList } = useSelector((state: RootState) => state.whisList);
  const [isFill, setIsFill] = useState(false);
  // Inside your component
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();

    // 1. Check if the product is already in the wishlist
    const isItemInWishlist = wishList?.some(
      (item: any) => (item?.product?._id || item?._id) === product?._id,
    );
    if (isItemInWishlist) {
      // 2. Remove logic
      if (isAuthenticated) {
        removeToWishList(product._id); // API call for auth users
      } else {
        removeFromWishListLocal({ prodId: product?._id }); // Local state/storage for guests
      }
    } else {
      // 3. Add logic
      if (isAuthenticated) {
        addTowishList(product); // API call
      } else {
        addToWishListLocal(product); // Local state/storage
      }
    }
  };

  return (
    <>
      <button
        type="button"
        disabled={isAddingToWishList || isRemovingToWishList}
        onClick={(e) => handleToggleWishlist(e)}
        className={`absolute ${className} right-2 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-transform cursor-pointer`}
      >
        <Heart
          onClick={() => setIsFill((prev) => !prev)}
          className={`w-5 h-5 
                 ${
                   isFill ||
                   wishList?.find(
                     (item: any) => item?.product?._id === product?._id,
                   )
                     ? "fill-red-500 text-red-500"
                     : "text-gray-400"
                 }  
              `}
        />
      </button>
    </>
  );
};
export default AddToWishListButton;
