import { Fragment } from "react/jsx-runtime";

const CartItemSkeleton = () => {
  return Array.from({ length: 3 }).map((item, index) => {
    return (
      <Fragment key={index}>
        <div className="w-full border border-[#c4c4c4] rounded-xl p-4 flex justify-between gap-4 animate-pulse">
          {/* Image box */}
          <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>

          <div className="flex-1 space-y-3">
            {/* Title */}
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-4 bg-gray-300 rounded w-10"></div>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <div className="h-4 bg-gray-300 rounded w-16"></div>
              <div className="h-4 bg-gray-300 rounded w-14"></div>
              <div className="h-4 bg-gray-300 rounded w-20"></div>
            </div>

            {/* Color/Material */}
            <div className="h-4 bg-gray-300 rounded w-32"></div>

            {/* Quantity controls */}
            <div className="flex items-center justify-between mt-2">
              <div className="h-5 w-5 bg-gray-300 rounded"></div>

              <div className="flex items-center gap-3">
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
                <div className="h-4 w-6 bg-gray-300 rounded"></div>
                <div className="h-6 w-6 bg-gray-300 rounded"></div>
              </div>

              <div className="h-5 w-5 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  });
};

export default CartItemSkeleton;
