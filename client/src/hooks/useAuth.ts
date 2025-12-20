import { useQuery } from "@tanstack/react-query";
import { AuthApi } from "../services/authApi.serveice";
import { userKeys } from "../TanstackQuery/Querykeys";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux-store/Store";
import { setUser } from "../redux-store/User.slice";
import { useEffect } from "react";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = (enabled: boolean) => {
    const { data, isLoading, error, isSuccess } = useQuery({
      queryKey: userKeys.all,
      queryFn: () => AuthApi.currentUser(),
      enabled,
      refetchOnWindowFocus: false,
    });
    useEffect(() => {
      dispatch(setUser(data));
    }, [data]);
    return { data, isLoading, error, isSuccess };
  };
  const orders = (url: string) => {
    const {
      data: orders,
      error,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: userKeys.orders(),
      queryFn: () => AuthApi.userOrders(url),
      enabled: true,
      refetchOnWindowFocus: false,
      retry: 1,
    });
    return { orders, error, isError, isLoading, refetch };
  };
  return { currentUser, orders };
};
