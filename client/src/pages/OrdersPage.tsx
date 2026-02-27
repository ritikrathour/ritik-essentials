import { OrderCard } from "../components/Orders/OrderCard";
import { IOrder } from "../utils/Types/Order.types";
import { ordersKey } from "../TanstackQuery/Querykeys";
import { OrdersApi } from "../services/orders.service";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store/Store";
import { useQuery } from "@tanstack/react-query";
import ErrorUI from "../components/ErrorsUI/ErrorUI";

export const OrdersPage = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const { data, error, isError, isLoading, refetch } = useQuery({
    queryKey: ordersKey.orders,
    queryFn: () => OrdersApi.orders(),
    retry: 1,
    enabled: currentUser ? true : false,
    refetchOnWindowFocus: false,
  });
  if (isLoading) {
    return <div className="text-center py-10">Loading orders...</div>;
  }
  if (isError) {
    return <ErrorUI error={error} onRetry={refetch} />;
  }

  if (!data?.orders.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {data?.orders &&
        data?.orders?.map((order: IOrder) => (
          <OrderCard key={order._id} order={order} refetch={refetch} />
        ))}
    </div>
  );
};
