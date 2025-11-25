import { Link } from "react-router-dom";
import SocialLink from "../components/SocialLink";
import {
  CreditCard,
  Facebook,
  HandMetalIcon,
  Landmark,
  Linkedin,
  MousePointerBanIcon,
  Play,
  Twitter,
  Wallet,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <>
      <div className="md:px-10 p-2 flex flex-col md:flex-row justify-between gap-2 text-white px-4">
        <div className="md:w-1/2 w-full">
          {/* logo */}
          <Link to="/" className="sm:text-[20px] text-white text-[18px] ">
            Ritik's <span className="text-[#febd2f]">Essentials</span>
          </Link>
          <p className="w-[300px] my-4 text-gray-300">
            Your one-stop destination for quality products at amazing price.
          </p>
          <h2 className="capitalize text-2xl">need help?</h2>
          <p className="text-sm text-gray-300">
            Visit our
            <a className="hover:underline" href="">
              Customer Support
            </a>
          </p>
          <p className="text-sm text-gray-300">for assistance or call us at</p>
          <p className="text-gray-300">012 3456 789</p>
          <div className="flex items-center gap-2 mt-4">
            {
              // <>
              //
              //   <SocialLink to="facebook" icon="facebook" />
              //   <SocialLink to="linkedin" icon="linkedin" />
              //   <SocialLink to="twitter" icon="twitter" />
              //   <SocialLink to="youtube" icon="youtube" />
              // </>
              <>
                <SocialLink
                  to="facebook"
                  icon={<Facebook size={20} color="white" />}
                />
                <SocialLink
                  to="kedin"
                  icon={<Linkedin size={20} color="white" />}
                />
                <SocialLink
                  to="twitter"
                  icon={<Twitter size={20} color="white" />}
                />
                <SocialLink
                  to="youtube"
                  icon={<Youtube size={20} color="white" />}
                />
              </>
            }
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-between lg:grid-cols-3 gap-4 md:w-1/2 w-full">
          <div>
            <h1 className="text-xl">Quick Links</h1>
            <ul className="mt-4 flex flex-col gap-2">
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Faq</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">About</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Contact</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Support</a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-xl">Menu</h1>
            <ul className="mt-4 flex flex-col gap-2">
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Home</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">My Orders</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Contact</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Personal Care</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Food</a>
              </li>
            </ul>
          </div>
          <div>
            <h1 className="text-xl">Categories</h1>
            <ul className="mt-4 flex flex-col gap-2">
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Cookies</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Bekary</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Dairy & Eggs</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Soft Drinks</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Cleaning Supplies</a>
              </li>
              <li className="text-sm text-gray-400 hover:text-white transition-all">
                <a href="">Buscuits & Snacks</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ul className="flex gap-4 flex-wrap items-center justify-center mt-4 py-5 border-t text-white">
        <li>
          <a className="underline text-sm" href="">
            Shipping & Returns
          </a>
        </li>
        <li>
          <a className="underline text-sm" href="">
            Terms & Conditions
          </a>
        </li>
        <li>
          <a className="underline text-sm" href="">
            Shipping & Returns
          </a>
        </li>
      </ul>
      <p className="text-white text-center">
        We accept the following payment methods
      </p>
      <div className="flex gap-4 text-[#173334] justify-center items-center my-4">
        <div className="w-[30px] h-[30px] hover:translate-y-[-10px] transition-all duration-300 bg-[#febd2f] text-center   flex items-center justify-center rounded-[4px]">
          <Landmark />
        </div>
        <div className="w-[30px] h-[30px] hover:translate-y-[-10px] transition-all duration-300 bg-[#febd2f] text-center flex items-center justify-center rounded-[4px]">
          <CreditCard />
        </div>
        <div className="w-[30px] h-[30px] hover:translate-y-[-10px] transition-all duration-300 bg-[#febd2f] text-center flex items-center justify-center rounded-[4px]">
          <Wallet />
        </div>
        <div className="w-[30px] h-[30px] hover:translate-y-[-10px] transition-all duration-300 bg-[#febd2f] text-center flex items-center justify-center rounded-[4px]">
          <Play />
        </div>
        <div className="w-[30px] h-[30px] hover:translate-y-[-10px] transition-all duration-300 bg-[#febd2f] text-center flex items-center justify-center rounded-[4px]">
          <MousePointerBanIcon />
        </div>
      </div>
      <p className="text-white text-center">Made with Lots of 💦 and 💝</p>
    </>
  );
};
export default Footer;
