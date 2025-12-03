import { ChevronRight, Plus } from "lucide-react";
import Input from "../Input";
import React, { ReactNode, useEffect, useRef, useState } from "react";
interface IProps {
  value: string;
  onchange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}
const SelectCategory: React.FC<IProps> = ({ value, onchange, options }) => {
  const [category, setCategory] = useState("");
  const [showDropdown, SetShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => {
    SetShowDropdown((prev) => !prev);
  };
  let ifNotInCategory = false;
  //   handleSelect
  const handleSelect = (value: string) => {
    setCategory(value);
    SetShowDropdown(false);
  };
  //   handle search category
  const handleSearchCategory = () => {};
  // Close dropdown when clicking outside
  useEffect(() => {
    const clickOutSide = (e: MouseEvent) => {
      if (
        containerRef?.current &&
        !containerRef?.current.contains(e.target as Node)
      ) {
        SetShowDropdown(false);
      }
    };
    document.addEventListener("click", clickOutSide);
    return () => {
      document.removeEventListener("click", clickOutSide);
    };
  }, []);
  return (
    <div
      className="flex items-center justify-center relative "
      ref={containerRef}
    >
      <Input
        label="Category"
        name="category"
        type="text"
        onchange={(e) => setCategory(e.target.value)}
        required
        placeholder="Choose & search a category..."
        value={category}
        icon={<ChevronRight />}
        iconPosition="right"
        onfocus={() => handleFocus()}
      />
      {showDropdown && (
        <div className="z-50 absolute flex flex-col gap-1.5 top-full max-w-[500px] min-w-[300px] md:min-w-[450px] bg-white p-2 rounded-md mt-2 border border-[#c4c4c4]">
          <ul className="flex flex-col max-h-[200px] overflow-y-scroll  ">
            {options?.map((option) => {
              return (
                <li
                  key={option}
                  onClick={() => handleSelect(option)}
                  className="hover:bg-amber-100 p-1 rounded-sm transition-all duration-150 text-sm"
                >
                  {option}
                </li>
              );
            })}
          </ul>
          {ifNotInCategory && (
            <button className="mt-2 border-t border-[#c4c4c4] text-blue-700 flex items-center text-sm hover:bg-blue-100 w-full h-full py-2 rounded-sm transition-all duration-200 cursor-pointer">
              <Plus size={20} /> Create "Hello"
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default SelectCategory;
