import { Link } from "react-router-dom";
import { Button } from "../ui/Button";

const AdProduct = () => {
  return (
    <>
      <div className="relative w-full max-w-full mx-auto h-full sm:h-[400px] rounded-2xl overflow-hidden shadow-2xl ad-bg">
        {/* Background with gradient overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center ad-bg-image transition-all duration-500"
          style={{
            transitionTimingFunction: "ease",
            backgroundSize: "contain",
            backgroundImage:
              "linear-gradient(to right, #173334 , transparent ), url('./assets/kirana.png')",
          }}
        ></div>
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between h-full p-6 sm:p-8 text-white">
          {/* Title + description */}
          <div>
            <h1 className="text-4xl font-extrabold text-[#febd2f] ">
              Fresh Groceries, Fast Delivery
            </h1>
            <p className="mt-3 text-sm sm:text-[16px] text-gray-200 max-w-lg">
              Grocery refers to the everyday food and household items people buy
              regularly to meet their basic needs, such as grains, dairy
              products, snacks, beverages, and cleaning supplies. It plays an
              essential role in daily life by ensuring that families and
              individuals have access to fresh and packaged foods for
              nourishment, cooking, and convenience. supports healthy eating
              habits, and keeps households well-stocked with necessary supplies
              for day-to-day living.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2 md:gap-4 mt-6">
            <Link to="/products">
              <Button type="button" variant="secondary">
                <i className="fas fa-shopping-basket"></i> Shop Now
              </Button>
            </Link>
            <Button type="button" variant="glass">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AdProduct;
