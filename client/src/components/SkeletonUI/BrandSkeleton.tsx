const BrandSkeleton = ({ style }: { style: string }) => {
  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="flex justify-start md:justify-center items-center flex-shrink-0 overflow-hidden w-full gap-4">
          {Array.from({ length: 8 }).map((_, i) => {
            return (
              <div
                key={i}
                className="w-[140px] h-[140px] rounded-full flex flex-shrink-0 border shadow-md border-[#c4c4c4] animate-pulse bg-gray-200"
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default BrandSkeleton;
