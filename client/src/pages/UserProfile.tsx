import React, { lazy, Suspense, useState } from "react";
import {
  Package,
  MapPin,
  Heart,
  CreditCard,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
const Setting = lazy(
  () => import("../components/customerProfileCompo/Setting")
);
const Addresse = lazy(
  () => import("../components/customerProfileCompo/Addresse")
);
const Orders = lazy(() => import("../components/customerProfileCompo/Orders"));
const WishlistCompo = lazy(
  () => import("../components/customerProfileCompo/WishListComp")
);

interface Order {
  id: string;
  name: string;
  image: string;
  date: string;
  status: string;
  price: number;
}

interface Address {
  id: string;
  type: string;
  name: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { user: data } = useSelector((state: any) => state.user);

  const orders: Order[] = [
    {
      id: "1",
      name: "Wireless Headphones - Premium Sound",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop",
      date: "Oct 15, 2025",
      status: "Delivered",
      price: 2999,
    },
    {
      id: "2",
      name: "Running Shoes - Sport Edition",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop",
      date: "Oct 20, 2025",
      status: "In Transit",
      price: 4599,
    },
    {
      id: "3",
      name: "Smart Watch - Fitness Tracker",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop",
      date: "Oct 25, 2025",
      status: "Processing",
      price: 8999,
    },
  ];

  const addresses: Address[] = [
    {
      id: "1",
      type: "Home",
      name: "John Doe",
      address: "123 Main Street, Apartment 4B, New York, NY 10001",
      phone: "+1 234 567 8900",
      isDefault: true,
    },
    {
      id: "2",
      type: "Work",
      name: "John Doe",
      address: "456 Business Ave, Suite 200, New York, NY 10002",
      phone: "+1 234 567 8900",
      isDefault: false,
    },
  ];

  const menuItems = [
    { icon: Package, label: "My Orders", value: "orders", badge: "3" },
    { icon: Heart, label: "Wishlist", value: "wishlist", badge: "12" },
    { icon: MapPin, label: "Addresses", value: "addresses", badge: null },
    {
      icon: CreditCard,
      label: "Payment Methods",
      value: "payments",
      badge: null,
    },
    { icon: Bell, label: "Notifications", value: "notifications", badge: "5" },
    {
      icon: Settings,
      label: "Account Settings",
      value: "settings",
      badge: null,
    },
  ];

  return (
    <section className="md:px-10 px-2 h-full ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-[50px] h-[50px] flex items-center justify-center cursor-pointer overflow-hidden rounded-full">
                  <img
                    className=" object-cover border rounded-full"
                    src={"./assets/girl.png"}
                    alt={data?.data?.email}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold capitalize">
                    {data?.data?.name}
                  </h2>
                  <p className="text-sm text-gray-500">{data?.data?.email}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">
                    {data?.data?.createdAt?.slice(0, 10)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Loyalty Points</span>
                  <span className="font-medium text-[#febd2f]">1,250</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              {menuItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setActiveTab(item.value)}
                  className={`w-full flex items-center justify-between px-6 py-4 transition ${
                    activeTab === item.value
                      ? "border-l-4 bg-[#febd2f]"
                      : "hover:bg-[#d79e2b22] text-[#173334]"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {item.badge && (
                      <span className="bg-[#173334] text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "orders" && (
              <Suspense fallback={<Loader style="h-full" />}>
                <Orders orders={orders} />
              </Suspense>
            )}

            {activeTab === "wishlist" && (
              <Suspense fallback={<Loader style="h-full" />}>
                <WishlistCompo />
              </Suspense>
            )}

            {activeTab === "addresses" && (
              <Suspense fallback={<Loader style="h-full" />}>
                <Addresse address={addresses} />
              </Suspense>
            )}

            {activeTab === "settings" && (
              <Suspense fallback={<Loader style="h-full" />}>
                <Setting data={data} />
              </Suspense>
            )}

            {!["orders", "addresses", "wishlist", "settings"].includes(
              activeTab
            ) && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-gray-400 mb-4">
                  <Package className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Coming Soon</h3>
                <p className="text-gray-600">
                  This section is under development
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
