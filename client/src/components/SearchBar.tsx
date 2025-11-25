const SearchBar = () => {
  return (
    <>
      <form
        className={`hidden px-[10px] w-[380px] py-[2px] rounded border 
        border-[#c4c4c4] lg:flex justify-between items-center gap-1.5
         hover:bg-gray-800 transition-all`}
      >
        <label htmlFor="search" className="text-center text-[#febd2f] mt-1">
          <i className="fas fa-search text-[#febd2f]"></i>
        </label>
        <input
          id="search"
          type="seacrh"
          placeholder="Search Product..."
          className="text-white outline-0 h-[35px] w-full text-sm"
        />
      </form>
    </>
  );
};
export default SearchBar;
