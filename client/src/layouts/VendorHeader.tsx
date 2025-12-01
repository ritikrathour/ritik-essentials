import { lazy, Suspense, useState } from "react";
import { Bell, ChevronDown, Menu, X, Plus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import MobileMenuOpen from "./MobileLayouts/MobileMenu";
import { useSelector } from "react-redux";
import { RootState } from "../redux-store/Store";
import { Button } from "../components/ui/Button";
const ProfileDropDown = lazy(() => import("../components/ProfileDropDown"));

const VendorHeader = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showDropDownProfile, setShowDropDownProfile] =
    useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const navItems = [
    { name: "Dashboard", icon: "📊" },
    { name: "My Products", icon: "📦" },
    { name: "Orders", icon: "📋" },
    { name: "Analytics", icon: "📈" },
    { name: "Payments", icon: "💰" },
    { name: "Reviews", icon: "⭐" },
    { name: "Settings", icon: "⚙️" },
  ];

  return (
    <div className="w-full">
      {/* Top Header */}
      <div className="sm:px-2 flex items-center justify-between">
        {/* Left Side - Logo and Badge */}
        <div className="flex items-center gap-1">
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-white hover:bg-opacity-10 rounded transition-colors"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>

          <div>
            {/* logo */}
            <Link to="/" className="sm:text-[16px] text-white text-[14px] ">
              Ritik's <span className="text-[#febd2f]">Essentials</span>
            </Link>
            <p className="text-yellow-300 text-[10px] sm:text-xs italic font-medium">
              Vendor Dashboard
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1 sm:gap-3 relative">
          {/* Notification Bell */}
          {user?.user?.email && (
            <>
              <Link
                to=""
                className="bg-gray-900 block text-[#febd2f] relative py-2 px-4 rounded shadow-lg hover:bg-gray-800 transition z-40"
              >
                <Bell size={20} />
                {5 > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-semibold">
                    {5}
                  </span>
                )}
              </Link>
              <Link
                to=""
                className="hidden bg-gray-900 sm:block text-[#febd2f] relative py-2 px-4 rounded shadow-lg hover:bg-gray-800 transition z-40"
              >
                <ShoppingCart size={20} />
                {5 > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-semibold">
                    {5}
                  </span>
                )}
              </Link>
            </>
          )}
          {/* Vendor Profile */}
          <button
            onClick={() => setShowDropDownProfile((prev) => !prev)}
            className="flex items-center gap-2 sm:gap-3 hover:bg-opacity-10 px-2 sm:px-3 py-1.5 sm:py-2 rounded transition-colors"
          >
            {user?.loading ? (
              <div className="w-[35px] h-[35px] bg-gray-400 rounded-full animate-pulse"></div>
            ) : user?.user?.email ? (
              <>
                <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
                  <img
                    className=" object-cover border"
                    src={"./assets/girl.png"}
                    alt={user?.user?.email}
                  />
                </div>

                <div className="hidden sm:block text-left">
                  <p className="text-white text-sm font-semibold capitalize">
                    {user?.user?.name}
                  </p>
                  <p className="text-white text-xs opacity-80">
                    {user?.user?.shopName
                      ? "Verified Vendor"
                      : "Complete Your Shop"}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-white hidden sm:block" />
              </>
            ) : (
              <Link
                to="/login"
                className="text-[#febd2f] px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-700 bg-gray-900"
              >
                <i className="fas text-[14px] fa-user"></i>
              </Link>
            )}
          </button>
          {showDropDownProfile && (
            <Suspense>
              <ProfileDropDown
                user={user.user}
                state={setShowDropDownProfile}
                className="top-13 right-2"
              />
            </Suspense>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <MobileMenuOpen
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          navItems={navItems}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}

      {/* Desktop Navigation Bar */}
      <nav className="hidden lg:block">
        <div className="mx-auto flex items-center justify-between">
          <ul className="flex items-center gap-6 xl:gap-8 overflow-x-auto ">
            {navItems.map((item) => (
              <Link to={item.name} key={item.name}>
                <li key={item.name}>
                  <button
                    onClick={() => setActiveTab(item.name)}
                    className={`flex items-center gap-2 py-4 text-sm font-medium hover:text-[#febd2f] transition-colors whitespace-nowrap ${
                      activeTab === item.name
                        ? " font-semibold text-[#febd2f]"
                        : "border-transparent text-white"
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                </li>
              </Link>
            ))}
          </ul>

          {/* Create Product Button */}
          <Button type="button" variant="glass">
            <Plus className="w-5 h-5" />
            <span>Create Product</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Floating Action Button */}
      <button className="lg:hidden fixed right-4 top-20 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-all hover:shadow-xl z-40">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};

export default VendorHeader;
