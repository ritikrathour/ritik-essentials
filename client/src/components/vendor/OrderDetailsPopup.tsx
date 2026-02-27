import { useDispatch } from "react-redux";
import { handleUnSelectedOrder } from "../../redux-store/UISlice";
import { XCircle } from "lucide-react";
import { STATUS_CONFIG } from "../../utils/constant";
import { Button } from "../ui/Button";
import { OrderStatus } from "../../utils/Types/Order.types";
import { useState } from "react";
import { useOrders } from "../../hooks/VendorHooks/useOrders";

const OrderDetailsPopup = ({ orders }: any) => {
  const [activeButton, setActiveButton] = useState(orders.orderStatus);
  const { updateOrderStatus, updateOrderStatusIsPending } = useOrders();
  const dispatch = useDispatch();
  const handleStatusUpdate = (status: OrderStatus) => {
    setActiveButton(status);
    updateOrderStatus({ status, orderNumber: orders.orderNumber });
  };
  return (
    <>
      <div className="fixed inset-0 bg-[rgba(0,0,0,.5)]  flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Order Details
              </h2>
              <button
                onClick={() => dispatch(handleUnSelectedOrder())}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Number</p>
                <p className="font-medium text-gray-900">
                  {orders?.orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <p className="font-medium text-gray-900">
                  {new Date(orders?.createdAt)?.toDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Customer Name</p>
                <p className="font-medium text-gray-900">
                  {orders?.customer?.name}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-medium text-gray-900">
                  {orders?.customer?.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                <p className="font-medium text-gray-900">
                  {!orders?.paymentStatus ? "Pending" : "Paid"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Status</p>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium 
                     ${STATUS_CONFIG[orders.orderStatus]?.color}
                    `}
                >
                  {STATUS_CONFIG[orders.orderStatus]?.label}
                </span>
              </div>
            </div>
            {/* Order Items */}
            <div>
              <p className="text-sm text-gray-600 mb-3">Order Items</p>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                        Product
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                        Qty
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                        Price
                      </th>
                      <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders?.items?.map((item: any, i: number) => {
                      return (
                        <tr key={i}>
                          <td className="px-4 py-3 text-sm text-gray-900 capitalize">
                            {item.productName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">
                            ₹{item.price?.toFixed()}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                            ₹{item.price * item.quantity}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td
                        colSpan={4}
                        className="px-4 py-3 text-sm font-medium text-gray-900 text-right"
                      >
                        Total Amount:
                      </td>
                      <td className="px-4 py-3 text-sm font-bold text-gray-900 text-right">
                        ₹{orders.vendorTotalAmount}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Status Update */}
            <div>
              <p className="text-sm text-gray-600 mb-3">Update Status</p>
              <div className="flex gap-2">
                {Object.entries(STATUS_CONFIG).map(([status, config]: any) => {
                  return (
                    <Button
                      type="button"
                      key={status}
                      onClick={() => handleStatusUpdate(status)}
                      disabled={
                        activeButton === status || updateOrderStatusIsPending
                      }
                      className={` transition text-nowrap text-sm ${
                        activeButton === status &&
                        "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      {config.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetailsPopup;
