const Card = () => {
  return Array.from({ length: 4 }).map((_, i) => {
    return (
      <div
        key={i}
        className="${style} w-full  max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-2 md:p-4 mb-5 animate-pulse"
      >
        <div className="flex items-center gap-6">
          <div className="w-28 h-28 bg-gray-300 rounded-md flex shrink-0" />
        </div>
      </div>
    );
  });
};

export default Card;
