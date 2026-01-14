import WishlistCard from "../components/WishListCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "../TanstackQuery/Querykeys";
import { ProductApi } from "../services/Product.service";
import Loader from "../components/Loader";
import ErrorUI from "../components/ErrorsUI/ErrorUI";
import { useEffect } from "react";
import { initializeWishList, setWhisList } from "../redux-store/WishListSlice";
import { useAuth } from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux-store/Store";
import { useWishList } from "../hooks/useWishList";
const Wishlist = () => {
  const { data: currentUser } = useAuth().currentUser(true);
  const { removeToWishList, isRemovingToWishList, isRemovingToWishListError } =
    useWishList();
  const dispatch = useDispatch();
  // get wish list from store
  const { wishList, totalItems } = useSelector(
    (state: RootState) => state.whisList
  );
  // get wishList from api
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: productKeys.favProduct(),
    queryFn: () => ProductApi.getWishlistProducts(),
    retry: 1,
    enabled: currentUser ? true : false,
    refetchOnWindowFocus: false,
  });
  // get the wishList if user not authenticate
  useEffect(() => {
    if (!currentUser) {
      dispatch(initializeWishList(false));
    }
  }, [currentUser]);
  // store the wishList data in the redux store
  useEffect(() => {
    if (data) {
      dispatch(
        setWhisList({
          totalItems: data?.pagination?.total,
          isAuthenticate: currentUser ? true : false,
          wishList: data?.data,
        })
      );
    }
  }, [data]);
  // removeFromWishlist
  const removeFromWishlist = (prodId: string) => {
    if (currentUser) {
      removeToWishList(prodId);
    }
  };
  if (isError) {
    return <ErrorUI error={error} onRetry={refetch} />;
  }
  if (isLoading) {
    return <Loader style="h-screen " />;
  }
  return (
    <section className="md:px-10 h-full min-h-screen bg-gray-50 px-2 ">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        My Wishlist ❤️
      </h1>

      {totalItems !== 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishList?.map((item: any) => {
            return (
              <WishlistCard
                key={item?.product?._id || item?._id}
                product={item?.product || item}
                onRemove={removeFromWishlist}
                state={{
                  isPending: isRemovingToWishList,
                  removeError: isRemovingToWishListError,
                }}
              />
            );
          })}
        </div>
      ) : (
        <p className="text-lg text-center">Your wishlist is empty 😔</p>
      )}
    </section>
  );
};

export default Wishlist;
