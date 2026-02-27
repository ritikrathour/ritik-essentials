import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersKey } from "../../TanstackQuery/Querykeys";
import { OrdersApi } from "../../services/orders.service";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-store/Store";
import { OrderStatus } from "../../utils/Types/Order.types";
import toast from "react-hot-toast";

export const useOrders = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const qClient = useQueryClient();
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: ordersKey.vendorOrders(user?._id),
    queryFn: () => OrdersApi.vendorOrders(),
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const orderStatusMutation = useMutation({
    mutationFn: (payload: { orderNumber: string; status: OrderStatus }) =>
      OrdersApi.updateOrderStatus(payload.orderNumber, payload.status),
    onMutate: (payload) => {
      return payload;
    },
    onSuccess: () => {
      toast.success("Order status Updated!");
      qClient.invalidateQueries({
        queryKey: ordersKey.vendorOrders(user?._id),
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return {
    orders: data,
    ordersLoading: isLoading,
    ordersIsError: isError,
    ordersError: error,
    ordersRefetch: refetch,
    updateOrderStatus: orderStatusMutation.mutate,
    updateOrderStatusIsPending: orderStatusMutation.isPending,
  };
};
