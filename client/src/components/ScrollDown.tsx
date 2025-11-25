const ScrollDownArrow = ({ targetRef }: any) => {
  const handleScroll = () => {
    targetRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <button
      onClick={handleScroll}
      className="animate-bounce cursor-pointer"
      aria-label="Scroll to bottom"
    >
      <svg
        className="w-14 h-14 text-white drop-shadow-lg hover:text-gray-300 transition-colors duration-300"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
};

export default ScrollDownArrow;
