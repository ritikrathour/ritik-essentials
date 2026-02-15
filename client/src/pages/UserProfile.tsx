import React, { lazy, Suspense, useState } from "react";
import {
  Package,
  CreditCard,
  Bell,
  Settings,
  ChevronRight,
} from "lucide-react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import { RootState } from "../redux-store/Store";
const Setting = lazy(
  () => import("../components/customerProfileCompo/Setting"),
);
const Orders = lazy(() => import("../components/customerProfileCompo/Orders"));

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("orders");
  const { user: data } = useSelector((state: RootState) => state.user);

  const menuItems = [
    { icon: Package, label: "My Orders", value: "orders" },
    {
      icon: CreditCard,
      label: "Payment Methods",
      value: "payments",
    },
    { icon: Bell, label: "Notifications", value: "notifications" },
    {
      icon: Settings,
      label: "Account Settings",
      value: "settings",
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
                    alt={data?.email}
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold capitalize">
                    {data?.name}
                  </h2>
                  <p className="text-sm text-gray-500">{data?.email}</p>
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Member Since</span>
                  <span className="font-medium">
                    {data?.createdAt?.slice(0, 10)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Loyalty Points</span>
                  <span className="font-medium text-[#febd2f]">🤩😍</span>
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
                <Orders />
              </Suspense>
            )}

            {activeTab === "settings" && (
              <Suspense fallback={<Loader style="h-full" />}>
                <Setting data={data} />
              </Suspense>
            )}

            {!["orders", "addresses", "wishlist", "settings"].includes(
              activeTab,
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
