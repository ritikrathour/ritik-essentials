const AdSkeleton = ({ className }: any) => {
  console.log(className, "nsdkjfad");

  return (
    <>
      <div
        className={`animate-pulse bg-gray-300 shadow-md drop-shadow-2xl h-[450px] ${className}`}
      >
        <div className="bg-gray-300 h-[80%] w-[80%] rounded-lg" />
      </div>
    </>
  );
};
export default AdSkeleton;
