import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ErrorUI from "../ErrorsUI/ErrorUI";
import CardSkeleton from "../SkeletonUI/CardSkeleton";
import { Button } from "../ui/Button";
import NoOrders from "../NoDataUI/NoOrders";
import TrackOrder from "../TrackOrder";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-store/Store";
import {
  closeRatingPopup,
  openRatingPopup,
  openTrackOrderPopup,
} from "../../redux-store/UISlice";
import RateProductPopup from "../popups/RateProductPopup";
import { useState } from "react";

interface IOrder {
  _id: string;
  name: any;
  items: any;
  createdAt: string;
  status: string;
  totalAmount: number;
}
const Orders = () => {
  const { isTrackOrderOpen, isRatingPopupOpen } = useSelector(
    (state: RootState) => state.ui,
  );
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();
  const { orders, error, isError, refetch, isLoading } =
    useAuth().orders("/orders?limit=4");
  if (isLoading) {
    return <CardSkeleton />;
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center h-full">
        <ErrorUI error={error} onRetry={refetch} />
      </div>
    );
  }
  if (orders?.orders?.length < 1) {
    return <NoOrders />;
  }
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {isTrackOrderOpen && (
        <TrackOrder
          orderId={orders?.orders[0] && orders?.orders[0]?.orderNumber}
          currentStatus={orders?.orders[0] && orders?.orders[0]?.status}
          createdAt={orders?.orders[0] && orders?.orders[0]?.createdAt}
        />
      )}
      {isRatingPopupOpen && (
        <RateProductPopup
          isOpen={isRatingPopupOpen}
          onClose={closeRatingPopup}
          productId={productId}
          productName={
            orders?.orders[0] && orders?.orders[0]?.items[0]?.product?.name
          }
        />
      )}
      <div className="space-y-4">
        {orders?.orders.map((order: IOrder) => {
          return (
            <div
              key={order?._id}
              className="bg-white rounded-lg shadow-sm border border-[#c4c4c4] p-3 md:p-6"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Link to="/orders" className="h-[220px]">
                  <img
                    src={"../public/assets/cola.avif"}
                    alt={order.items[0] && order.items[0]?.product?.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    {order.items[0] && order.items[0]?.product?.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">
                    Order Date: {order.createdAt}
                  </p>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "In Transit"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-lg font-bold">
                      ₹{order.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {orders?.orders?.length > 4 && (
          <Link to="/orders" className="text-center block">
            <Button variant="secondary" type="button" className="w-1/6">
              See More
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};
export default Orders;
