import { ChevronLeft, ChevronRight } from "lucide-react";
interface IPaginationProps {
  pages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
const Pagination = ({ pages, page, setPage }: IPaginationProps) => {
  const handleClick = (index: number) => {
    setPage(index);
  };
  // handlePrev
  const handlePrev = () => {
    setPage((prev) => prev - 1);
  };
  // handleNext
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => handlePrev()}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft />
      </button>
      {Array.from({ length: pages }).map((_, index) => (
        <button
          onClick={() => handleClick(index + 1)}
          key={index}
          className={`w-10 h-10 rounded-lg ${
            page === index + 1
              ? "bg-blue-600 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={page === pages}
        onClick={() => handleNext()}
        className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        <ChevronRight />
      </button>
    </div>
  );
};
export default Pagination;
