import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ length }: any) => {
  return (
    <div className="mt-8 flex items-center justify-center gap-2">
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
        <ChevronLeft />
      </button>
      {[1, 2, 3].map((page) => (
        <button
          key={page}
          className={`w-10 h-10 rounded-lg ${
            page === 1
              ? "bg-blue-600 text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {page}
        </button>
      ))}
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
        <ChevronRight />
      </button>
    </div>
  );
};
export default Pagination;
