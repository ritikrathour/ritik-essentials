const CategoryNavigationSkeleton = () => {
  let tabs = Array.from({ length: 20 }).fill("");
  return (
    <>
      <div className="px-4 flex gap-2 py-1 w-full overflow-scroll">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="w-20 py-3 rounded-full bg-gray-300 flex flex-shrink-0 animate-pulse duration-75 text-nowrap"
          ></div>
        ))}
      </div>
    </>
  );
};
export default CategoryNavigationSkeleton;
