import React, { useState, useMemo, useCallback } from "react";
import { Filter, Download } from "lucide-react";
import { useOrders } from "../../hooks/VendorHooks/useOrders";
import OrderDetailsPopup from "../../components/vendor/OrderDetailsPopup";
import OrdersTable from "../../components/vendor/OrderTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-store/Store";
import ErrorUI from "../../components/ErrorsUI/ErrorUI";
import Loader from "../../components/Loader";
import { OrderStatus } from "../../utils/Types/Order.types";
import { Button } from "../../components/ui/Button";

const VendorOrderPage: React.FC = () => {
  const { orders, ordersError, ordersIsError, ordersLoading, ordersRefetch } =
    useOrders();
  const { selectedOrder } = useSelector((state: RootState) => state.ui);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Memoized filtered orders
  const filteredOrders = useMemo(() => {
    return (
      orders &&
      orders[0]?.data
        ?.filter((order: any) => {
          const matchesStatus =
            statusFilter === "all" || order.orderStatus === statusFilter;
          return matchesStatus;
        })
        .sort(
          (a: any, b: any) =>
            new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
        )
    );
  }, [orders && orders[0]?.data, statusFilter]);

  const totalPages = Math.ceil(filteredOrders?.length / itemsPerPage) + 10;
  // Order statistics
  const stats = useMemo(() => {
    return {
      total: orders && orders[0]?.data?.length,
      placed:
        orders &&
        orders[0]?.data.filter((o: any) => o.orderStatus === "PLACED").length,
      cancelled:
        orders &&
        orders[0]?.data?.filter((o: any) => o.orderStatus === "CANCELLED")
          .length,
      delivered:
        orders &&
        orders[0]?.data?.filter((o: any) => o.orderStatus === "DELIVERED")
          .length,
      revenue:
        orders &&
        orders[0]?.data?.reduce(
          (sum: number, o: any) => sum + o.vendorTotalAmount,
          0,
        ),
    };
  }, [orders && orders[0]?.data]);

  const handleExport = useCallback(() => {
    // In real app, this would generate and download a CSV/Excel file
    console.log("Exporting orders...");
  }, []);
  if (ordersIsError) {
    return <ErrorUI error={ordersError} onRetry={ordersRefetch} />;
  }
  if (ordersLoading) {
    return <Loader />;
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Order Management
          </h1>
          <p className="text-gray-600">Manage and track all your orders</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-1">Placed</p>
            <p className="text-2xl font-bold text-yellow-600">{stats.placed}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-1">Cancelled</p>
            <p className="text-2xl font-bold text-blue-600">
              {stats.cancelled}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-1">Delivered</p>
            <p className="text-2xl font-bold text-purple-600">
              {stats.delivered}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-2xl font-bold text-green-600">
              ₹{stats.revenue}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              {/* <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(e.target.value as OrderStatus | "all")
                  }
                  className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div> */}
              <select
                id="status"
                name="status"
                // value={filters.status}
                // onChange={(e) =>
                //   onFilterChange({ ...filters, status: e.target.value })
                // }
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-1 outline-[black]"
              >
                <option value="all">All Status</option>
                <option value="PLACED">Placed</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <Button type="button" onClick={handleExport}>
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <OrdersTable />
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of{" "}
                {filteredOrders.length} orders
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded ${
                        currentPage === page
                          ? "bg-blue-600 text-white border-blue-600"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && <OrderDetailsPopup orders={selectedOrder} />}
    </div>
  );
};

export default VendorOrderPage;
