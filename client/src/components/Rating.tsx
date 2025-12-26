import { Star } from "lucide-react";
import React from "react";

const Rating: React.FC<any> = ({ rating }) => {
  return (
    <>
      <div className="flex items-center space-x-1 ">
        <div className="flex ">
          <Star className="w-4 h-4 fill-[#febd2f] text-[#febd2f]" />
        </div>
        <span className="text-sm font-medium">{rating?.average}</span>
        <span className="text-sm text-gray-500">({rating?.count})</span>
      </div>
    </>
  );
};
export default Rating;
