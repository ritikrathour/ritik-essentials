import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cartkeys } from "../TanstackQuery/Querykeys";
import { CartApi } from "../services/Cart.serveice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux-store/Store";
import {
  IAddToCartPayload,
  ICart,
  IUpdateCartItemPayload,
} from "../utils/Types/Cart.types";
import {
  addToCartLocal,
  clearCartLocal,
  removeCartItemLocal,
  setCart,
  updateCartItemLocal,
} from "../redux-store/CartSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const qClient = useQueryClient();
  const { Cart, error, isAuthenticate, isCartDrawerOpen, isLoading } =
    useSelector((state: RootState) => state.cart);
  useQuery({
    queryKey: Cartkeys.cart,
    queryFn: () => CartApi.getCart("/cart"),
    enabled: isAuthenticate,
    select: (data: ICart) => dispatch(setCart(data)),
  });
  const addMutation = useMutation({
    mutationFn: (payload: IAddToCartPayload) =>
      isAuthenticate ? CartApi.addToCart(payload) : Promise.resolve(null),
    onMutate: (payload) => dispatch(addToCartLocal(payload)),
    onSuccess: (data) => {
      if (data) {
        dispatch(setCart(data));
        qClient.invalidateQueries({ queryKey: Cartkeys.cart });
      }
    },
  });
  const updateCartItemMutation = useMutation({
    mutationFn: (payload: IUpdateCartItemPayload) =>
      isAuthenticate ? CartApi.updateCartItem(payload) : Promise.resolve(null),
    onMutate: (payload) => dispatch(updateCartItemLocal(payload)),
    onSuccess: (data) => {
      if (data) {
        dispatch(setCart(data));
        qClient.invalidateQueries({ queryKey: Cartkeys.cart });
      }
    },
  });
  const removeCartItemMutation = useMutation({
    mutationFn: (payload: { itemId: string }) =>
      isAuthenticate
        ? CartApi.removeItemFromCart(payload)
        : Promise.resolve(null),
    onMutate: (payload) => dispatch(removeCartItemLocal(payload)),
    onSuccess: (data) => {
      if (data) {
        dispatch(setCart(data));
        qClient.invalidateQueries({ queryKey: Cartkeys.cart });
      }
    },
  });

  return {
    isLoading,
    isCartDrawerOpen,
    Cart,
    isAuthenticate,
    error,
    addTocart: addMutation.mutate,
    isAddingToCart: addMutation.isPending,
    updateCartItem: updateCartItemMutation.mutate,
    isUpdating: updateCartItemMutation.isPending,
    removeCartItem: removeCartItemMutation.mutate,
    isRemoving: removeCartItemMutation.isPending,
    clearCart: () => dispatch(clearCartLocal()),
  };
};
