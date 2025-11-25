const ProductSkeleton = ({ style }: { style: string }) => {
  return (
    <div className="flex xl:justify-center items-center gap-4 overflow-hidden w-full flex-shrink-0 p-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={`${style} flex flex-col flex-shrink-0 justify-start animate-pulse bg-white rounded-2xl shadow-md p-4 w-full sm:w-[280px] md:w-[320px]`}
        >
          <div className="bg-gray-300 h-[80%] w-full rounded-lg" />
          <div className="mt-4 h-4 bg-gray-300 w-3/4 rounded" />
          <div className="mt-2 h-4 bg-gray-300 w-1/2 rounded" />
        </div>
      ))}
    </div>
  );
};
export default ProductSkeleton;
