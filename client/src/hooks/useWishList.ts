import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productKeys } from "../TanstackQuery/Querykeys";
import { ProductApi } from "../services/Product.service";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishListLocal,
  removeFromWishListLocal,
  setWhisList,
} from "../redux-store/WishListSlice";
import { RootState } from "../redux-store/Store";
export const useWishList = () => {
  const { isAuthenticate, wishList, totalItems } = useSelector(
    (state: RootState) => state.whisList,
  );
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const addToWishListMutation = useMutation({
    mutationKey: productKeys.favProduct(),
    mutationFn: (payload: any) =>
      isAuthenticate
        ? ProductApi.addToWishList(payload)
        : Promise.resolve(null),
    onMutate: (data) => {
      return dispatch(addToWishListLocal(data));
    },
    onSuccess: (data) => {
      if (data) {
        dispatch(
          setWhisList({
            isAuthenticate: isAuthenticate,
            wishList: [...wishList, data?.product],
            totalItems: totalItems + 1,
          }),
        );
        queryClient.invalidateQueries({ queryKey: productKeys.favProduct() });
      }
    },
  });
  const removeToWishListMutaion = useMutation({
    mutationKey: productKeys.favProduct(),
    mutationFn: (prodId: string) =>
      isAuthenticate
        ? ProductApi.removeFromWishList(prodId)
        : Promise.resolve(null),
    onMutate: (prodId) => dispatch(removeFromWishListLocal({ prodId })),
    onSuccess: (data) => {
      console.log("hello");

      if (data) {
        queryClient.invalidateQueries({ queryKey: productKeys.favProduct() });
      }
    },
  });
  return {
    addTowishList: addToWishListMutation.mutate,
    isAddingToWishList: addToWishListMutation.isPending,
    isAddToWishListError: addToWishListMutation.error,
    removeToWishList: removeToWishListMutaion.mutate,
    isRemovingToWishList: addToWishListMutation.isPending,
    isRemovingToWishListError: addToWishListMutation.error,
    isAuthenticate,
    wishList,
    totalItems,
  };
};
