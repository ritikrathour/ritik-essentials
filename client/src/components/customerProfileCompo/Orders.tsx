import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ErrorUI from "../ErrorsUI/ErrorUI";
import CardSkeleton from "../SkeletonUI/CardSkeleton";
import { Button } from "../ui/Button";

interface IOrder {
  id: string;
  name: any;
  date: string;
  status: string;
  price: number;
}
const Orders = ({ orders }: any) => {
  const {
    orders: order,
    error,
    isError,
    refetch,
    isLoading,
  } = useAuth().orders("/my-orders?limit=4");
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
  // if (order?.length < 1) {
  //   return "";
  // }
  return (
    <>
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <div className="space-y-4">
        {orders.map((order: IOrder) => (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow-sm border border-[#c4c4c4] p-3 md:p-6"
          >
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <div className="h-[250px]">
                <img
                  src={"../public/assets/cola.avif"}
                  alt={order.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{order.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Order Date: {order.date}
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
                  <span className="text-lg font-bold">₹{order.price}</span>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <Button type="button" className="w-[230px]">
                  Track Order
                </Button>
                {order.status === "Delivered" && (
                  <Button variant="secondary" type="button">
                    Rate Product
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
        <Link to="/orders" className="text-center block">
          <Button variant="secondary" type="button" className="w-1/6">
            See More
          </Button>
        </Link>
      </div>
    </>
  );
};
export default Orders;
