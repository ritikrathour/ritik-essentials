import { Fragment } from "react/jsx-runtime";

const CartItemSkeleton = () => {
  return Array.from({ length: 3 }).map((item, index) => {
    return (
      <Fragment key={index}>
        <div
          key={index}
          className="bg-white rounded-lg border border-[#c4c4c4] p-4 animate-pulse relative"
        >
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-gray-200 rounded-lg" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
              <div className="h-3 bg-gray-200 rounded w-1/4 mb-3" />
              <div className="h-6 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
          <div className="h-6 bg-gray-200 rounded w-6 mb-2 absolute top-4 right-4"></div>
        </div>
      </Fragment>
    );
  });
};

export default CartItemSkeleton;
