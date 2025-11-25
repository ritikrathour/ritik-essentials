import { Heart, LogOut, MapPin, Moon, Package, Settings } from "lucide-react";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProfileDropDown = ({
  state,
}: {
  state: React.Dispatch<React.SetStateAction<boolean>>;
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
  const { user: data } = useSelector((state: any) => state.user);

  return (
    <>
      <div className="absolute -left-40 mt-2 w-64 bg-white rounded-lg shadow-xl overflow-hidden z-50">
        <Link to={"/profile"}>
          <div
            className="flex justify-between items-center px-4"
            onClick={() => state(false)}
          >
            <div className="py-3 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900 capitalize">
                {data?.data?.name}
              </p>
              <p className="text-xs text-gray-500">{data?.data?.email}</p>
            </div>
            <div className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer overflow-hidden rounded-full">
              <img
                className=" object-cover border rounded-full"
                src={"./assets/girl.png"}
                alt={data?.data?.email}
              />
            </div>
          </div>
        </Link>
        <div className="py-2">
          {menuItems.map((item) => (
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
              {/* {item.badge && (
                <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )} */}
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-200 py-2">
          <Link
            to={"/profile"}
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
