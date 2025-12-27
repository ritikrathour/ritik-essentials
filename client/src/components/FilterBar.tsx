import { useProduct } from "../hooks/useProduct";
import Input from "./Input";
import { Plus, Search } from "lucide-react";
import { Button } from "./ui/Button";
import { ICategory } from "../utils/Types/Product.types";
import { Link } from "react-router-dom";
export const FilterBar = ({ filters, onFilterChange }: any) => {
  const { categories: data } = useProduct().getCategories("/categories");
  return (
    <div className="bg-white rounded-lg shadow p-2 mb-6 border border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Input
          name="Search"
          type="text"
          onchange={(e) =>
            onFilterChange({ ...filters, search: e.target.value })
          }
          required
          placeholder="Search..."
          value={filters?.search}
          icon={<Search />}
          iconPosition="right"
        />

        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={(e) =>
            onFilterChange({ ...filters, status: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-1 outline-[black]"
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="out_of_stock">Out of Stock</option>
        </select>

        <select
          id="categories"
          name="categories"
          value={filters.category}
          onChange={(e) =>
            onFilterChange({ ...filters, category: e.target.value })
          }
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-1 outline-[black]"
        >
          <option value="all">All Categories</option>
          {data?.category &&
            data?.category?.map((cat: ICategory) => (
              <option key={cat?.name} value={cat?.name}>
                {cat?.name}
              </option>
            ))}
        </select>

        <Link to="/create-product">
          <Button type="button" variant="primary" className="w-full h-full">
            <Plus className="w-5 h-5" />
            Add Product
          </Button>
        </Link>
      </div>
    </div>
  );
};
