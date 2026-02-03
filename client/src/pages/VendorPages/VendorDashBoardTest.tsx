import React, { useState, useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {
  store,
  persistor,
  useAppDispatch,
  useAppSelector,
} from "./redux/store";
import {
  QueryProvider,
  useDashboardMetrics,
  useDashboardCharts,
  useProducts,
} from "./hooks/useQuery";
import {
  TrendingUp,
  TrendingDown,
  Package,
  ShoppingCart,
  DollarSign,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Search,
  Bell,
  Settings,
  ChevronDown,
  BarChart3,
  FileText,
  Boxes,
  Activity,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Filter,
  Download,
  Plus,
  RefreshCw,
  PiIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { selectUser, selectIsAuthenticated } from "./redux/slices/authSlice";

// ============================================================================
// TYPES
// ============================================================================

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  trend: "up" | "down";
  color: string;
  isLoading?: boolean;
}

interface StatusBadgeProps {
  status: string;
  variant: "order" | "product";
}

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * Loading Skeleton Component
 */
const LoadingSkeleton: React.FC<{ className?: string }> = ({
  className = "",
}) => <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>;

/**
 * Metric Card Component with Loading State
 */
const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  trend,
  color,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <LoadingSkeleton className="h-4 w-24" />
            <LoadingSkeleton className="h-8 w-32" />
            <LoadingSkeleton className="h-4 w-28" />
          </div>
          <LoadingSkeleton className="h-12 w-12 rounded-lg" />
        </div>
      </div>
    );
  }

  const isPositive = trend === "up";

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <ArrowUpRight className="w-4 h-4 text-green-600" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-red-600" />
            )}
            <span
              className={`text-sm font-semibold ${
                isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  );
};

/**
 * Status Badge Component
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, variant }) => {
  const orderConfig: Record<
    string,
    { color: string; icon: any; label: string }
  > = {
    pending: {
      color: "bg-yellow-100 text-yellow-800",
      icon: Clock,
      label: "Pending",
    },
    confirmed: {
      color: "bg-blue-100 text-blue-800",
      icon: CheckCircle2,
      label: "Confirmed",
    },
    processing: {
      color: "bg-blue-100 text-blue-800",
      icon: Activity,
      label: "Processing",
    },
    shipped: {
      color: "bg-purple-100 text-purple-800",
      icon: Package,
      label: "Shipped",
    },
    delivered: {
      color: "bg-green-100 text-green-800",
      icon: CheckCircle2,
      label: "Delivered",
    },
    cancelled: {
      color: "bg-red-100 text-red-800",
      icon: XCircle,
      label: "Cancelled",
    },
  };

  const productConfig: Record<string, { color: string; label: string }> = {
    active: { color: "bg-green-100 text-green-800", label: "Active" },
    "low-stock": { color: "bg-orange-100 text-orange-800", label: "Low Stock" },
    "out-of-stock": { color: "bg-red-100 text-red-800", label: "Out of Stock" },
    draft: { color: "bg-gray-100 text-gray-800", label: "Draft" },
  };

  const config =
    variant === "order" ? orderConfig[status] : productConfig[status];

  if (!config) return null;

  const Icon = variant === "order" ? config : null;

  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${config.color}`}
    >
      {Icon && <PiIcon className="w-3 h-3" />}
      {config.label}
    </span>
  );
};

/**
 * Error Display Component
 */
const ErrorDisplay: React.FC<{ message: string; onRetry?: () => void }> = ({
  message,
  onRetry,
}) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between">
    <div className="flex items-center gap-3">
      <AlertCircle className="w-5 h-5 text-red-600" />
      <p className="text-sm text-red-800">{message}</p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================

const VendorDashboardContent: React.FC = () => {
  // Redux state
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // Local state
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [searchQuery, setSearchQuery] = useState("");
  const [productFilters, setProductFilters] = useState({
    page: 1,
    limit: 5,
    sortBy: "sales",
    sortOrder: "desc" as const,
  });

  // TanStack Query hooks
  const {
    data: metricsData,
    isLoading: metricsLoading,
    error: metricsError,
    refetch: refetchMetrics,
  } = useDashboardMetrics(selectedPeriod);

  const {
    data: chartsData,
    isLoading: chartsLoading,
    error: chartsError,
  } = useDashboardCharts(selectedPeriod);

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useProducts(productFilters);

  // Auto-refresh metrics every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refetchMetrics();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetchMetrics]);

  // Memoized values
  const topProducts = useMemo(() => {
    return productsData?.data?.slice(0, 5) || [];
  }, [productsData]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Please log in
          </h2>
          <p className="text-gray-600">
            You need to be authenticated to access the dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">
                    VendorHub Pro
                  </h1>
                  <p className="text-xs text-gray-500">Enterprise Dashboard</p>
                </div>
              </div>

              <nav className="hidden md:flex items-center gap-6">
                {[
                  "Overview",
                  "Products",
                  "Orders",
                  "Analytics",
                  "Inventory",
                ].map((item) => (
                  <button
                    key={item}
                    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
                />
              </div>

              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-200">
                <div className="w-9 h-9 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {user?.firstName?.charAt(0) || "V"}
                  {user?.lastName?.charAt(0) || "K"}
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.firstName || "Vendor"} {user?.lastName || "Store"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.role || "Premium Seller"}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-8 py-6 max-w-[1600px] mx-auto">
        {/* Period Selector */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">
              Dashboard Overview
            </h2>
            <p className="text-sm text-gray-600">
              Track your store performance and manage operations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refetchMetrics()}
              className="p-2 hover:bg-white rounded-lg transition-colors border border-gray-200"
              title="Refresh data"
            >
              <RefreshCw className="w-4 h-4 text-gray-600" />
            </button>

            <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm border border-gray-200">
              {["24h", "7d", "30d", "90d", "1y"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedPeriod === period
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {metricsError && (
          <div className="mb-6">
            <ErrorDisplay
              message={
                (metricsError as any).message || "Failed to load metrics"
              }
              onRetry={() => refetchMetrics()}
            />
          </div>
        )}

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Revenue"
            value={
              metricsData?.revenue.current.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
              }) || "₹0"
            }
            change={metricsData?.revenue.changePercentage || 0}
            trend={metricsData?.revenue.trend || "up"}
            icon={<DollarSign className="w-6 h-6 text-white" />}
            color="bg-gradient-to-br from-green-500 to-emerald-600"
            isLoading={metricsLoading}
          />
          <MetricCard
            title="Total Orders"
            value={metricsData?.orders.current.toLocaleString() || "0"}
            change={metricsData?.orders.changePercentage || 0}
            trend={metricsData?.orders.trend || "up"}
            icon={<ShoppingCart className="w-6 h-6 text-white" />}
            color="bg-gradient-to-br from-blue-500 to-indigo-600"
            isLoading={metricsLoading}
          />
          <MetricCard
            title="Active Products"
            value={metricsData?.products.current.toLocaleString() || "0"}
            change={metricsData?.products.changePercentage || 0}
            trend={metricsData?.products.trend || "up"}
            icon={<Package className="w-6 h-6 text-white" />}
            color="bg-gradient-to-br from-purple-500 to-pink-600"
            isLoading={metricsLoading}
          />
          <MetricCard
            title="Total Customers"
            value={metricsData?.customers.current.toLocaleString() || "0"}
            change={metricsData?.customers.changePercentage || 0}
            trend={metricsData?.customers.trend || "up"}
            icon={<Users className="w-6 h-6 text-white" />}
            color="bg-gradient-to-br from-orange-500 to-red-600"
            isLoading={metricsLoading}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Revenue Analytics
                </h3>
                <p className="text-sm text-gray-500">
                  Performance trends over time
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Filter className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>

            {chartsLoading ? (
              <LoadingSkeleton className="h-80 w-full" />
            ) : chartsData?.revenueChart ? (
              <ResponsiveContainer width="100%" height={320}>
                <AreaChart data={chartsData.revenueChart}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    stroke="#9ca3af"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                No chart data available
              </div>
            )}
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  Sales by Category
                </h3>
                <p className="text-sm text-gray-500">Distribution</p>
              </div>
            </div>

            {chartsLoading ? (
              <LoadingSkeleton className="h-80 w-full" />
            ) : chartsData?.categoryChart ? (
              <>
                <ResponsiveContainer width="100%" height={240}>
                  <PieChart>
                    <Pie
                      data={chartsData.categoryChart}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartsData.categoryChart.map(
                        (entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ),
                      )}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {chartsData.categoryChart.map((category: any) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                        <span className="text-gray-700">{category.name}</span>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {category.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="h-80 flex items-center justify-center text-gray-500">
                No category data available
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            {
              icon: Plus,
              label: "Add Product",
              color: "from-blue-500 to-blue-600",
            },
            {
              icon: FileText,
              label: "Generate Report",
              color: "from-green-500 to-green-600",
            },
            {
              icon: Boxes,
              label: "Manage Inventory",
              color: "from-purple-500 to-purple-600",
            },
            {
              icon: BarChart3,
              label: "View Analytics",
              color: "from-orange-500 to-orange-600",
            },
          ].map((action, index) => (
            <button
              key={index}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group"
            >
              <div
                className={`p-3 rounded-lg bg-gradient-to-br ${action.color} group-hover:scale-110 transition-transform`}
              >
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

// ============================================================================
// APP WRAPPER WITH PROVIDERS
// ============================================================================

const VendorDashboardApp: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <QueryProvider>
          <VendorDashboardContent />
        </QueryProvider>
      </PersistGate>
    </Provider>
  );
};

export default VendorDashboardApp;
