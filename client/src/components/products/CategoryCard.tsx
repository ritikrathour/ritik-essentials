import { memo } from "react";
import { Link } from "react-router-dom";
import { OptimizedImage } from "../ui/OptimizedImage";

const CategoryCard = ({ name, image }: { name: string; image: string }) => {
  return (
    <Link to={`/products?category=${name}`}>
      <div className="border border-[#c4c4c4] h-[400px] flex flex-col gap-5 items-center justify-center p-4">
        <div className="w-[186px] h-[256px] relative">
          <OptimizedImage
            src="../assets/cola.avif"
            alt={name}
            lowQualitySrc="../assets/cola.avif"
          />
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-[#feefd2] w-[250px] h-[250px] rounded-full -z-10"></div>
        </div>
        <p className="text-[18px] leading-[1px] text-center font-semibold">
          {name}
        </p>
      </div>
    </Link>
  );
};
export default memo(CategoryCard);
