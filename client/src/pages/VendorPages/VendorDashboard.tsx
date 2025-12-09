import React, { useState, useMemo } from "react";
import {
  Home,
  Package,
  ShoppingCart,
  TrendingUp,
  Settings,
  HelpCircle,
  Bell,
  Search,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Filter,
  Download,
  Calendar,
  DollarSign,
  Users,
  Star,
  AlertTriangle,
  CheckCircle,
  Clock,
  Box,
  Truck,
  XCircle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// ==================== TYPES ====================
interface OrderStatus {
  pending: number;
  confirmed: number;
  shipped: number;
  delivered: number;
  cancelled: number;
  returned: number;
}

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

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sold: number;
  rating: number;
  reviews: number;
  image: string;
  status: "active" | "inactive";
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

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Samsung Galaxy M34 5G",
    category: "Mobile",
    price: 18999,
    stock: 45,
    sold: 234,
    rating: 4.3,
    reviews: 1289,
    image: "📱",
    status: "active",
  },
  {
    id: "2",
    name: "Boat Airdopes 131",
    category: "Audio",
    price: 1499,
    stock: 120,
    sold: 567,
    rating: 4.1,
    reviews: 2341,
    image: "🎧",
    status: "active",
  },
  {
    id: "3",
    name: "Noise ColorFit Pro 4",
    category: "Wearables",
    price: 2499,
    stock: 8,
    sold: 423,
    rating: 4.4,
    reviews: 987,
    image: "⌚",
    status: "active",
  },
  {
    id: "4",
    name: "Mi Power Bank 3i",
    category: "Accessories",
    price: 1199,
    stock: 0,
    sold: 891,
    rating: 4.5,
    reviews: 3421,
    image: "🔋",
    status: "inactive",
  },
  {
    id: "5",
    name: "Fire-Boltt Phoenix Smart Watch",
    category: "Wearables",
    price: 1299,
    stock: 67,
    sold: 298,
    rating: 3.9,
    reviews: 456,
    image: "⌚",
    status: "active",
  },
];

// ==================== COMPONENTS ====================
const Sidebar: React.FC<{
  activeTab: string;
  setActiveTab: (tab: string) => void;
}> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "orders", label: "Orders", icon: ShoppingCart, badge: "12" },
    { id: "products", label: "Products", icon: Package },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-blue-600">Flipkart</h1>
        <p className="text-xs text-gray-500 mt-1">Seller Hub</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id
                ? "bg-blue-50 text-blue-600 font-medium"
                : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </div>
            {item.badge && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
            VS
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              Vendor Store
            </p>
            <p className="text-xs text-gray-500">Premium Seller</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const Header: React.FC = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders, products, customers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <span className="text-sm font-medium">Help Center</span>
        </button>
      </div>
    </div>
  </header>
);

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

const OrdersTable: React.FC<{ orders: Order[] }> = ({ orders }) => {
  const getStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      confirmed: "bg-blue-50 text-blue-700 border-blue-200",
      shipped: "bg-purple-50 text-purple-700 border-purple-200",
      delivered: "bg-green-50 text-green-700 border-green-200",
      cancelled: "bg-red-50 text-red-700 border-red-200",
      returned: "bg-orange-50 text-orange-700 border-orange-200",
    };
    return colors[status as keyof typeof colors] || "bg-gray-50 text-gray-700";
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      confirmed: CheckCircle,
      shipped: Truck,
      delivered: CheckCircle,
      cancelled: XCircle,
      returned: AlertTriangle,
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return <Icon className="w-4 h-4" />;
  };

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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-blue-600">
                    {order.orderId}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {order.customerName}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-900">{order.product}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {order.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm font-medium text-gray-900">
                    ₹{order.amount.toLocaleString()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{order.date}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-blue-600 hover:text-blue-800">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const ProductsGrid: React.FC<{ products: Product[] }> = ({ products }) => (
  <div className="bg-white rounded-lg border border-gray-200">
    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
      <h2 className="text-lg font-semibold text-gray-900">Products</h2>
      <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        <Plus className="w-4 h-4" />
        Add Product
      </button>
    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Product
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Stock
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Sold
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Rating
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{product.image}</div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-600">
                  {product.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm font-medium text-gray-900">
                  ₹{product.price.toLocaleString()}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`text-sm font-medium ${
                    product.stock === 0
                      ? "text-red-600"
                      : product.stock < 20
                      ? "text-yellow-600"
                      : "text-gray-900"
                  }`}
                >
                  {product.stock}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-sm text-gray-900">{product.sold}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-900">
                    {product.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex gap-2">
                  <button className="p-1.5 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ==================== MAIN COMPONENT ====================
const VendorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const salesData = useMemo(() => generateSalesData(), []);

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
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          {activeTab === "dashboard" && (
            <div className="space-y-6">
              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric, idx) => (
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
              <OrdersTable orders={mockOrders} />
            </div>
          )}

          {activeTab === "products" && <ProductsGrid products={mockProducts} />}

          {activeTab === "orders" && <OrdersTable orders={mockOrders} />}

          {activeTab === "analytics" && (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Analytics Dashboard
              </h3>
              <p className="text-gray-600">
                Detailed analytics and insights coming soon
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default VendorDashboard;
