import React, { useMemo, lazy } from "react";
import { Package, ShoppingCart, DollarSign, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DashBoardHeader } from "../../components/vendor/DashBoardHeader";
import { useQuery } from "@tanstack/react-query";
import { vendorDashboard } from "../../TanstackQuery/Querykeys";
import { VendorProductsApi } from "../../services/VendorApi.service";
import { LazySection } from "../../components/LazySection";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-store/Store";
import OrderDetailsPopup from "../../components/vendor/OrderDetailsPopup";
import Card from "../../components/SkeletonUI/CardSkeleton";
import MetricCard from "../../components/vendor/MetricCard";
import ErrorUI from "../../components/ErrorsUI/ErrorUI";
const OrdersTable = lazy(() => import("../../components/vendor/OrderTable"));
// ==================== TYPES ====================

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  product: string;
  quantity: number;
  amount: number;
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
  date: string;
  paymentStatus: "paid" | "pending" | "failed";
}

interface PerformanceMetric {
  label: string;
  value: string;
  change: number;
  isPositive: boolean;
}

// ==================== MOCK DATA ====================
const generateSalesData = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return months.map((month) => ({
    month,
    sales: Math.floor(Math.random() * 500000) + 300000,
    orders: Math.floor(Math.random() * 1000) + 500,
    revenue: Math.floor(Math.random() * 600000) + 400000,
  }));
};

// ==================== MAIN COMPONENT ====================
const VendorDashboard: React.FC = () => {
  const salesData = useMemo(() => generateSalesData(), []);
  const { selectedOrder } = useSelector((state: RootState) => state.ui);
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: vendorDashboard.dashboard,
    queryFn: () => VendorProductsApi.getVendorDashboard(),
    retry: 0,
    refetchOnWindowFocus: false,
  });
  const metrics: (PerformanceMetric & {
    icon: React.ReactNode;
    color: string;
  })[] = [
    {
      label: data && data[0]?.label,
      value: data && data[0]?.value,
      change: 12.5,
      isPositive: true,
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      color: "bg-green-50",
    },
    {
      label: data && data[1]?.label,
      value: data && data[1]?.value,
      change: 8.2,
      isPositive: true,
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      label: data && data[3]?.label,
      value: data && data[3]?.value,
      change: 3.1,
      isPositive: false,
      icon: <Package className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50",
    },
    {
      label: data && data[2]?.label,
      value: data && data[2]?.value,
      change: 15.3,
      isPositive: true,
      icon: <Users className="w-6 h-6 text-orange-600" />,
      color: "bg-orange-50",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex-1 flex flex-col">
        <DashBoardHeader />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {isError ? (
                <ErrorUI error={error} onRetry={refetch} />
              ) : isLoading ? (
                <Card />
              ) : (
                metrics.map((metric: any, idx: number) => (
                  <MetricCard key={idx} {...metric} />
                ))
              )}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Sales Overview
                  </h3>
                  <select className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg">
                    <option>Last 12 months</option>
                    <option>Last 6 months</option>
                    <option>Last 3 months</option>
                  </select>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#9ca3af"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                      formatter={(value: number) =>
                        `₹${value.toLocaleString()}`
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  Order Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      stroke="#9ca3af"
                      style={{ fontSize: "12px" }}
                    />
                    <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="orders"
                      fill="#10b981"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Orders Table */}
            <LazySection>
              <OrdersTable />
            </LazySection>
          </div>
        </main>
      </div>
      {/* Order Detail Modal */}
      {selectedOrder && (
        <LazySection>
          <OrderDetailsPopup orders={selectedOrder} />
        </LazySection>
      )}
    </div>
  );
};

export default VendorDashboard;
