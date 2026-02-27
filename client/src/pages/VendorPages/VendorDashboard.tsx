import React, { useMemo, lazy } from "react";
import {
  Package,
  ShoppingCart,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Users,
  XCircle,
} from "lucide-react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-store/Store";
import { handleUnSelectedOrder } from "../../redux-store/UISlice";
import { STATUS_CONFIG } from "../../utils/constant";
import OrderDetailsPopup from "../../components/vendor/OrderDetailsPopup";
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

const mockOrders: Order[] = [
  {
    id: "1",
    orderId: "ORD-2024-001",
    customerName: "Rahul Sharma",
    product: "Samsung Galaxy M34",
    quantity: 1,
    amount: 18999,
    status: "delivered",
    date: "2024-12-08",
    paymentStatus: "paid",
  },
  {
    id: "2",
    orderId: "ORD-2024-002",
    customerName: "Priya Patel",
    product: "Boat Airdopes 131",
    quantity: 2,
    amount: 2998,
    status: "shipped",
    date: "2024-12-08",
    paymentStatus: "paid",
  },
  {
    id: "3",
    orderId: "ORD-2024-003",
    customerName: "Amit Kumar",
    product: "Noise ColorFit Pro 4",
    quantity: 1,
    amount: 2499,
    status: "confirmed",
    date: "2024-12-07",
    paymentStatus: "paid",
  },
  {
    id: "4",
    orderId: "ORD-2024-004",
    customerName: "Sneha Reddy",
    product: "Mi Power Bank 3i",
    quantity: 3,
    amount: 3597,
    status: "pending",
    date: "2024-12-07",
    paymentStatus: "pending",
  },
  {
    id: "5",
    orderId: "ORD-2024-005",
    customerName: "Vikram Singh",
    product: "Fire-Boltt Phoenix Smart Watch",
    quantity: 1,
    amount: 1299,
    status: "cancelled",
    date: "2024-12-06",
    paymentStatus: "failed",
  },
];

const MetricCard: React.FC<
  PerformanceMetric & { icon: React.ReactNode; color: string }
> = ({ label, value, change, isPositive, icon, color }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      <div
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          isPositive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
        }`}
      >
        {isPositive ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )}
        {Math.abs(change)}%
      </div>
    </div>
    <p className="text-sm text-gray-600 mb-1">{label}</p>
    <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
  </div>
);

// const OrdersTable = () => {
//   const getStatusColor = (status: string) => {
//     const colors = {
//       PLACED: "bg-yellow-50 text-yellow-700 border-yellow-200",
//       CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
//       SHIPPED: "bg-purple-50 text-purple-700 border-purple-200",
//       DELIVERED: "bg-green-50 text-green-700 border-green-200",
//       CANCELLED: "bg-red-50 text-red-700 border-red-200",
//       OUT_FOR_DELIVERY: "bg-orange-50 text-orange-700 border-orange-200",
//     };
//     return colors[status as keyof typeof colors] || "bg-gray-50 text-gray-700";
//   };
//
//   const getStatusIcon = (status: string) => {
//     const icons = {
//       PLACED: Clock,
//       CONFIRMED: CheckCircle,
//       SHIPPED: Truck,
//       DELIVERED: CheckCircle,
//       CANCELLED: XCircle,
//       OUT_FOR_DELIVERY: AlertTriangle,
//     };
//     const Icon = icons[status as keyof typeof icons] || Clock;
//     return <Icon className="w-4 h-4" />;
//   };
//   const { data, isError, error, isLoading, refetch } = useQuery({
//     queryKey: ordersKey.vendorOrders("venderId"),
//     queryFn: () => OrdersApi.vendorOrders(),
//     retry: 1,
//     refetchOnWindowFocus: false,
//   });
//   return (
//     <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//       <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
//         <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
//         <div className="flex gap-2">
//           <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Filter className="w-4 h-4" />
//             Filter
//           </button>
//           <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
//             <Download className="w-4 h-4" />
//             Export
//           </button>
//         </div>
//       </div>
//
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Order ID
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Customer
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Product
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Qty
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Amount
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Status
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
//                 Date
//               </th>
//
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {data &&
//               data[0]?.data?.map((order: any) => (
//                 <tr
//                   key={order._id}
//                   className="hover:bg-gray-50 transition-colors"
//                 >
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="text-sm font-medium text-blue-600">
//                       {order.orderNumber}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="text-sm text-gray-900">
//                       {order.customer.name}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4">
//                     <span className="text-sm text-gray-900">
//                       {order?.items[0]?.productName}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="text-sm text-gray-900">
//                       {order?.items[0]?.quantity}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="text-sm font-medium text-gray-900">
//                       ₹{order?.items[0]?.price}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span
//                       className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(
//                         order?.orderStatus,
//                       )}`}
//                     >
//                       {getStatusIcon(order?.orderStatus)}
//                       {order?.orderStatus}
//                     </span>
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     <span className="text-sm text-gray-500">
//                       {order?.createdAt}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };
// ==================== MAIN COMPONENT ====================
const VendorDashboard: React.FC = () => {
  const salesData = useMemo(() => generateSalesData(), []);
  const dispatch = useDispatch();
  const { selectedOrder } = useSelector((state: RootState) => state.ui);
  const { data, isError, error, isLoading, refetch } = useQuery({
    queryKey: vendorDashboard.dashboard,
    queryFn: () => VendorProductsApi.getVendorDashboard(),
    retry: 0,
    refetchOnWindowFocus: false,
  });
  // console.log(data);

  const metrics: (PerformanceMetric & {
    icon: React.ReactNode;
    color: string;
  })[] = [
    {
      label: "Total Revenue",
      value: "₹45,23,890",
      change: 12.5,
      isPositive: true,
      icon: <DollarSign className="w-6 h-6 text-green-600" />,
      color: "bg-green-50",
    },
    {
      label: "Total Orders",
      value: "3,456",
      change: 8.2,
      isPositive: true,
      icon: <ShoppingCart className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50",
    },
    {
      label: "Active Products",
      value: "234",
      change: 3.1,
      isPositive: false,
      icon: <Package className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50",
    },
    {
      label: "Active Customers",
      value: "12,890",
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
              {metrics.map((metric: any, idx: number) => (
                <MetricCard key={idx} {...metric} />
              ))}
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
