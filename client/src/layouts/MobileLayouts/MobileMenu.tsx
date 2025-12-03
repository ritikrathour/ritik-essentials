import { Plus } from "lucide-react";
import React from "react";
import useOverlayManager from "../../hooks/useOverLay";
import { OverlayBackdrop } from "../../components/ui/OverlayBackdrop";
interface INavItems {
  name: string;
  icon: string;
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
      <div className="lg:hidden border-t border-[#1e4243] bg-[#173334] w-full">
        <div className="mx-auto py-3">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.name}>
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
            ))}
          </ul>
          <button className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded font-semibold text-sm flex items-center justify-center gap-2 transition-all">
            <Plus className="w-5 h-5" />
            <span>Create Product</span>
          </button>
        </div>
      </div>
    </OverlayBackdrop>
  );
};
export default MobileMenu;
