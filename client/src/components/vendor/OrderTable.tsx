import {
  AlertCircle,
  CheckCircle,
  Clock,
  Download,
  Eye,
  Filter,
  Truck,
  XCircle,
} from "lucide-react";
import { handleSelectedOrder } from "../../redux-store/UISlice";
import { useDispatch } from "react-redux";
import ErrorUI from "../ErrorsUI/ErrorUI";
import Loader from "../Loader";
import { useOrders } from "../../hooks/VendorHooks/useOrders";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const getStatusColor = (status: string) => {
    const colors = {
      PLACED: "bg-yellow-50 text-yellow-700 border-yellow-200",
      CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
      SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
      DELIVERED: "bg-green-50 text-green-700 border-green-200",
      CANCELLED: "bg-red-50 text-red-700 border-red-200",
      OUT_FOR_DELIVERY: "bg-orange-50 text-orange-700 border-orange-200",
    };
    return colors[status as keyof typeof colors] || "bg-gray-50 text-gray-700";
  };
  const getStatusIcon = (status: string) => {
    const icons = {
      PLACED: Clock,
      CONFIRMED: CheckCircle,
      SHIPPED: Truck,
      DELIVERED: CheckCircle,
      CANCELLED: XCircle,
      OUT_FOR_DELIVERY: AlertCircle,
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return <Icon className="w-4 h-4" />;
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const { orders, ordersError, ordersIsError, ordersLoading, ordersRefetch } =
    useOrders();
  if (ordersIsError) {
    return <ErrorUI error={ordersError} onRetry={ordersRefetch} />;
  }
  if (ordersLoading) {
    return <Loader />;
  }
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders &&
              orders[0]?.data?.map((order: any) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-blue-600">
                      {order.orderNumber}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">
                      {order.customer.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">
                      {order?.items[0]?.productName}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {order?.items[0]?.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">
                      ₹{order?.items[0]?.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                        order?.orderStatus,
                      )}`}
                    >
                      {getStatusIcon(order?.orderStatus)}
                      {order?.orderStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">
                      {formatDate(order?.createdAt)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => dispatch(handleSelectedOrder(order))}
                      className="text-blue-600 hover:text-blue-900 font-medium flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {orders && orders[0]?.data?.length === 0 && (
          <h1 className="flex justify-center w-full text-sm font-light mt-2">
            You don't have any orders right now!
          </h1>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;
