import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import Input from "../Input";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { useProduct } from "../../hooks/useProduct";
interface IProps {
  value: string;
  onchange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}
const SelectCategory: React.FC<IProps> = ({ value, onchange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, SetShowDropdown] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [deboucedValue, setDebouncedValue] = useState("");
  const { categories, isLoading } = useProduct().getCategories("/categories");
  // debounced value
  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 500);
    return () => clearTimeout(timerId);
  });

  // console.log(newOptions);
  const handleFocus = () => {
    SetShowDropdown((prev) => !prev);
  };
  //   handleSelect
  const handleSelect = (value: string) => {
    setSearchTerm(value);
    SetShowDropdown(false);
  };
  //   filter the categories
  const filteredCategories = useMemo(() => {
    if (!searchTerm.trim()) {
      return categories?.category;
    }
    return categories?.category?.filter((category: any) => {
      return category?.name
        .toLowerCase()
        .includes(deboucedValue?.toLowerCase());
    });
  }, [deboucedValue, categories?.category]);
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
  // handleCreateCategory
  const handleCreateCategory = () => {};
  return (
    <div
      className="flex items-center justify-center relative "
      ref={containerRef}
    >
      <Input
        label="Category"
        name="category"
        type="text"
        onchange={(e) => setSearchTerm(e.target.value)}
        required
        placeholder="Choose & search a category..."
        value={searchTerm}
        icon={showDropdown ? <ChevronDown /> : <ChevronRight />}
        iconPosition="right"
        onfocus={() => handleFocus()}
      />
      {showDropdown && (
        <div className="z-50 absolute flex flex-col gap-1.5 top-full w-full bg-white p-2 rounded-md mt-2 border border-[#c4c4c4]">
          <ul className="flex flex-col max-h-[200px] overflow-y-scroll  ">
            {isLoading ? (
              "Loading categories..."
            ) : filteredCategories?.length > 0 ? (
              filteredCategories?.map((option: any) => {
                return (
                  <li
                    key={option?.name}
                    onClick={() => handleSelect(option?.name)}
                    className="hover:bg-yellow-100 p-1 rounded-sm transition-all duration-150 text-sm"
                  >
                    {option?.name}
                  </li>
                );
              })
            ) : (
              <h3 className="py-2 text-center text-gray-500">
                No categories found
              </h3>
            )}
          </ul>
          {filteredCategories?.length === 0 && (
            <button
              onClick={() => handleCreateCategory()}
              className="mt-2 border-t border-[#c4c4c4] text-blue-700 flex items-center text-sm hover:bg-blue-100 w-full h-full py-2 rounded-sm transition-all duration-200 cursor-pointer"
            >
              <Plus size={20} /> Create "Hello"
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default memo(SelectCategory);
