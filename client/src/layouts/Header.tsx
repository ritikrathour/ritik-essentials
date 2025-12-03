import { Search, ShoppingCart } from "lucide-react";
import { lazy, Suspense, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { openCartDrawer, ShowHeaderMenu } from "../redux-store/UISlice";
import { RootState } from "../redux-store/Store";
const ProfileDropDown = lazy(
  () => import("../components/popups/ProfileDropDown")
);

const Header = () => {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [showDropDownProfile, setShowDropDownProfile] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  // handle show serach bar
  const handleShowSearchBar = () => {
    setShowSearchBar((prev) => !prev);
  };
  // handleDropDown
  const handleDropDown = () => {
    setShowDropDownProfile((prev) => !prev);
  };
  const user = useSelector((state: RootState) => state.user);
  const { headerMenu } = useSelector((state: RootState) => state.ui);

  return (
    <>
      <nav className="flex justify-between items-center h-full relative">
        {/* logo */}
        <Link to="/" className="sm:text-[16px] text-white text-[14px] ">
          Ritik's <span className="text-[#febd2f]">Essentials</span>
        </Link>
        {/* search bar  */}
        <form
          className={`${
            showSearchBar ? "translate-y-9" : "-translate-y-16"
          } lg:translate-y-0 absolute bg-[#173334] px-[10px] lg:relative w-full z-20 lg:w-[380px] py-[2px] rounded border 
        border-[#c4c4c4] flex justify-between items-center gap-1.5
         hover:bg-gray-800 transition-all`}
        >
          <label htmlFor="search" className="text-center text-[#febd2f] mt-1">
            <Search size={20} />
          </label>
          <input
            id="search"
            type="seacrh"
            placeholder="Search Product..."
            className="text-white outline-0 h-[35px] w-full text-sm"
          />
        </form>
        {/* navigation */}
        <div className="flex items-center justify-center gap-1.5">
          {/* nav links  */}
          <ul
            className={`
              ${headerMenu ? "translate-y-8" : "-translate-y-24"}
              lg:translate-y-0 absolute left-0 bg-[#173334] border lg:border-none px-[10px] rounded-[5px] transition-all w-full z-50 py-[2px]  lg:flex lg:relative lg:w-full items-center gap-2 text-white text-[14px] mr-1.5`}
          >
            <button
              type="button"
              className="lg:hidden text-xl cursor-pointer w-[20px] h-[20px] flex items-center justify-center rounded-[2px] hover:bg-white text-white hover:text-[#febd2f] transition-all absolute top-1 right-1 mt-1 mr-1"
              onClick={() => dispatch(ShowHeaderMenu())}
            >
              <i className="fas fa-times"></i>
            </button>
            <li className="hover:text-[#febd2f] rounded-[4px] cursor-pointer  transition-all text-[14px]">
              <Link className="w-full" to="/otp-verify">
                Orders
              </Link>
            </li>

            <li className="hover:text-[#febd2f] rounded-[4px] cursor-pointer  transition-all text-[14px]">
              <Link className="w-full" to="support">
                Support
              </Link>
            </li>
          </ul>
          <div className="relative cursor-pointer">
            {user?.user?.email && (
              <Link
                to=""
                onClick={() => dispatch(openCartDrawer())}
                className="bg-gray-900 block text-[#febd2f] px-2 py-1 sm:py-2 sm:px-4 rounded shadow-lg hover:bg-gray-800 transition z-40"
              >
                <ShoppingCart size={20} />
                {5 > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs font-semibold">
                    {5}
                  </span>
                )}
              </Link>
            )}
          </div>
          <div>
            {user?.loading ? (
              <div className="w-[35px] h-[35px] bg-gray-400 rounded-full animate-pulse"></div>
            ) : user?.user?.email ? (
              <div className="relative">
                <div
                  onClick={() => handleDropDown()}
                  className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer overflow-hidden rounded-full"
                >
                  <img
                    className=" object-cover border rounded-full"
                    src={"./assets/girl.png"}
                    alt={user?.user?.email}
                  />
                </div>
                {showDropDownProfile && (
                  <Suspense>
                    <ProfileDropDown
                      user={user?.user}
                      state={setShowDropDownProfile}
                      className="-left-40"
                    />
                  </Suspense>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-[#febd2f] px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-700 bg-gray-900"
              >
                <i className="fas text-[14px] fa-user"></i>
              </Link>
            )}
          </div>
          <div className="lg:hidden" onClick={() => handleShowSearchBar()}>
            <span className="px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-700 bg-gray-900">
              <i className={`fas text-[#febd2f] text-[14px] fa-search`}></i>
            </span>
          </div>
          <div className="lg:hidden" onClick={() => dispatch(ShowHeaderMenu())}>
            <span className="px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-700 bg-gray-900">
              <i className={`fas text-[#febd2f] text-[14px] fa-bars`}></i>
            </span>
          </div>
        </div>
      </nav>
      <p className="text-center text-[#febd2f] text-[12px]">
        {sessionStorage.getItem("register_message")}
      </p>
    </>
  );
};
export default Header;

{
  /* <span className="toolTip absolute text-[10px] leading-[15px] top-[-5px] z-10 shadow right-[10px] text-black inline-block w-[15px] h-[15px] text-center bg-[#febd2f] rounded-full">
              {0}
            </span>
            <Link
              to="/cart"
              className="text-[#febd2f] px-2 py-1 sm:px-4 sm:py-2 rounded hover:bg-gray-700 bg-gray-900"
            >
              <i className="fas text-[14px] fa-shopping-cart"></i>
            </Link> */
}
