import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Cartkeys } from "../TanstackQuery/Querykeys";
import { CartApi } from "../services/Cart.serveice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux-store/Store";
import { IAddToCartPayload, ICart } from "../utils/Types/Cart.types";
import { addToCartLocal, setCart } from "../redux-store/CartSlice";

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
  return {
    isLoading,
    isCartDrawerOpen,
    Cart,
    isAuthenticate,
    error,
    addTocart: addMutation.mutate,
  };
};
