// import { useQuery } from "@tanstack/react-query";
// import { ordersKey } from "../TanstackQuery/Querykeys";
// import { OrdersApi } from "../services/orders.service";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux-store/Store";
// import ErrorUI from "../components/ErrorsUI/ErrorUI";
// import { OrderCard } from "../components/Orders/OrderCard";
// import RateProductPopup from "../components/popups/RateProductPopup";
//
// export const OrdersPage = () => {
//   const currentUser = useSelector((state: RootState) => state.user.user);
//   const {
//     data: orders,
//     error,
//     isError,
//     isLoading,
//     refetch,
//   } = useQuery({
//     queryKey: ordersKey.orders,
//     queryFn: () => OrdersApi.orders(),
//     retry: 1,
//     enabled: currentUser ? true : false,
//     refetchOnWindowFocus: false,
//   });
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-96">
//         <div className="animate-spin ,rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
//       </div>
//     );
//   }
//
//   if (isError) {
//     return <ErrorUI error={error} onRetry={refetch} />;
//   }
//
//   if (!orders?.orders.length) {
//     return (
//       <div className="flex flex-col items-center justify-center h-96 text-center">
//         <h2 className="text-xl font-semibold text-gray-800">No Orders Yet</h2>
//         <p className="text-gray-500 mt-2">
//           Looks like you haven't placed any orders.
//         </p>
//       </div>
//     );
//   }
//
//   return (
//     <div className="max-w-5xl mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
//       <div className="space-y-6">
//         {orders?.orders.map((order: any) => {
//           return <OrderCard key={order._id} order={order} />;
//         })}
//         {/* <RateProductPopup
//           isOpen={isRatingPopupOpen}
//           onClose={closeRatingPopup}
//           productId={order._id}
//           productName={orderṣ.items[0]?.product.name}
//         /> */}
//       </div>
//     </div>
//   );
// };

import { useState } from "react";
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
