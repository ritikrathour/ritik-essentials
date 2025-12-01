import { Heart, LogOut, MapPin, Moon, Package, Settings } from "lucide-react";
import React, { memo } from "react";
import { IUser } from "../utils/Types/Auth.types";
import { Link } from "react-router-dom";

const ProfileDropDown = ({
  state,
  user,
  className,
}: {
  state: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser | null;
  className?: string;
}) => {
  const menuItems = [
    {
      icon: Package,
      label: "Orders",
      value: "orders",
      url: "/profile",
    },
    {
      icon: Heart,
      label: "Wishlist",
      value: "wishlist",
      badge: "12",
      url: "/wishlist",
    },
  ];
  return (
    <>
      <div
        className={`${className} absolute mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-50`}
      >
        <Link
          to={`${
            user?.role !== "customer"
              ? `profile/${user?._id}`
              : `vendor-profile/${user?._id}`
          }`}
        >
          <div
            className="flex justify-between items-center px-4"
            onClick={() => state(false)}
          >
            <div className="py-3 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900 capitalize">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <div className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer overflow-hidden rounded-full">
              <img
                className=" object-cover border rounded-full"
                src={"./assets/girl.png"}
                alt={user?.email}
              />
            </div>
          </div>
        </Link>
        <div className="py-2">
          {user?.role === "customer" ? (
            menuItems.map((item) => (
              <Link
                to={item?.url}
                key={item.value}
                onClick={() => state(false)}
                className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 text-gray-700 transition"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))
          ) : (
            <Link
              to={"item?.url"}
              onClick={() => state(false)}
              className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-50 text-gray-700 transition"
            >
              <div className="flex items-center space-x-3">
                <Package className="w-4 h-4" />
                <span className="text-sm">Setup your Shop</span>
              </div>
            </Link>
          )}
        </div>

        <div className="border-t border-gray-200 py-2">
          <Link
            to={"/vendor-profile"}
            onClick={() => state(false)}
            className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 text-gray-700 transition"
          >
            <Settings className="w-4 h-4" />
            <span className="text-sm">Account Settings</span>
          </Link>
          <button className="w-full flex items-center space-x-3 px-4 py-2 hover:bg-red-50 text-red-600 transition">
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default memo(ProfileDropDown);
