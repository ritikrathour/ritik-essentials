import { ChevronDown } from "lucide-react";
import React from "react";
import FilterChildProduct from "./FilterChildProduct";
interface IProductFilterItem {
  filter: {
    id: string;
    title: string;
    children?: {
      id: string;
      title: string;
    }[];
  };
}
const ProductFilterItem: React.FC<IProductFilterItem> = ({ filter }) => {
  return (
    <div key={filter?.id} className="border-t pt-4">
      <button className="flex items-center justify-between w-full text-sm font-semibold">
        <span>{filter?.title}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
};
export default ProductFilterItem;
