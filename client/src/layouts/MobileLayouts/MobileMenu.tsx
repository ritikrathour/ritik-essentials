import { Plus } from "lucide-react";
import React from "react";
import useOverlayManager from "../../hooks/useOverLay";
import { OverlayBackdrop } from "../../components/ui/OverlayBackdrop";
import { Button } from "../../components/ui/Button";
import { Link } from "react-router-dom";
interface INavItems {
  name: string;
  icon: string;
  url: string;
}
interface MobileMenuOpenProps {
  navItems: INavItems[];
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: String;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}
const MobileMenu: React.FC<MobileMenuOpenProps> = ({
  navItems,
  setMobileMenuOpen,
  activeTab,
  setActiveTab,
  mobileMenuOpen,
}) => {
  // prevent scrolling
  const { closeOnOutsideClick } = useOverlayManager(mobileMenuOpen, close);
  return (
    <OverlayBackdrop
      isOpen={mobileMenuOpen}
      onClose={setMobileMenuOpen}
      closeOnClick={closeOnOutsideClick}
    >
      <div className="lg:hidden border-t border-[#1e4243] bg-[#173334] w-full -mt-16">
        <div className="mx-auto py-3 px-2">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link to={item.url} key={item.name}>
                <li>
                  <button
                    onClick={() => {
                      setActiveTab(item.name);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center hover:text-[#febd2f] gap-3 px-4 py-2 rounded transition-colors ${
                      activeTab === item.name
                        ? "bg-opacity-20 font-semibold text-[#febd2f]"
                        : "text-white"
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span className="text-sm">{item.name}</span>
                  </button>
                </li>
              </Link>
            ))}
          </ul>
          <Link to="/create-product">
            <Button
              onClick={() => setMobileMenuOpen(false)}
              type="button"
              variant="glass"
              className="w-full"
            >
              <Plus className="w-5 h-5" />
              <span>Create Product</span>
            </Button>
          </Link>
        </div>
      </div>
    </OverlayBackdrop>
  );
};
export default MobileMenu;
