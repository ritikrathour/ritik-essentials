import { useSelector } from "react-redux";
import { useWishList } from "../hooks/useWishList";
import { RootState } from "../redux-store/Store";
import { IPROD } from "../utils/Types/Product.types";
import { removeFromWishListLocal } from "../redux-store/WishListSlice";
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
  } = useWishList();
  const { wishList, isAuthenticate } = useSelector(
    (state: RootState) => state.whisList,
  );
  const [isFill, setIsFill] = useState(false);
  return (
    <>
      <button
        type="button"
        disabled={isAddingToWishList || isRemovingToWishList}
        onClick={(e) => {
          e.preventDefault();
          wishList?.find((item: any) => item?.product?._id === product?._id)
            ? isAuthenticate
              ? removeToWishList(product._id)
              : removeFromWishListLocal({ prodId: product?._id })
            : addTowishList(product);
        }}
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
