const CardSkeleton = () => {
  return Array.from({ length: 4 }).map((_, i) => {
    return (
      <div
        key={i}
        className="${style} w-full  max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-4 mb-5 animate-pulse"
      >
        <div className="flex items-center gap-6">
          {/* Image Skeleton */}
          <div className="w-28 h-28 bg-gray-300 rounded-md flex shrink-0" />

          {/* Content Skeleton */}
          <div className="flex-1 space-y-3">
            <div className="h-5 w-3/4 bg-gray-300 rounded" />{" "}
            {/* Product name */}
            <div className="h-4 w-1/3 bg-gray-300 rounded" /> {/* Order date */}
            <div className="flex items-center gap-3">
              <div className="h-6 w-full sm:w-20 bg-gray-300 rounded-full" />{" "}
              {/* Status */}
              <div className="h-6 w-16 bg-gray-300 rounded hidden sm:block" />{" "}
              {/* Price */}
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="md:flex flex-col gap-3 hidden ">
            <div className="h-10 w-32 bg-gray-300 rounded-md" />
            <div className="h-10 w-32 bg-gray-300 rounded-md" />
          </div>
        </div>
      </div>
    );
  });
};

export default CardSkeleton;
