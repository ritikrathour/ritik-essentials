import React, { useMemo, useState } from "react";
import { Menu } from "lucide-react";
import CategoryNavigation from "../components/products/CategoryNavigation";
import ProductBestCard from "../components/products/ProductBestCard";
import Pagination from "../components/Pagination";
import { useProduct } from "../hooks/useProduct";
import { useLocation } from "react-router-dom";
import FilterAccordion from "../components/products/FilterAccordian";
import Loader from "../components/Loader";
import ErrorUI from "../components/ErrorsUI/ErrorUI";
interface PriceRange {
  min: number;
  max: number;
}
interface FilterState {
  availability: string[];
  productTypes: string[];
  brands: string[];
  priceRange: PriceRange;
  sortBy: any;
}
const Products = () => {
  const location = useLocation();
  const [paginationPage, setPaginationPage] = useState<number>(1);
  // get products
  const { products, isLoading, error, isError, refetch, isFetching } =
    useProduct().getProduct(
      location.search ? location.search : `products ${paginationPage}`,
      `/products${location.search}?limit=${5}&page=${paginationPage}`,
    );
  const [filters, setFilters] = useState<FilterState>({
    availability: [],
    productTypes: [],
    brands: [],
    priceRange: { min: 0, max: 1000 },
    sortBy: "price-asc",
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  // decoded name
  let productCategoryName =
    decodeURIComponent(location.search).split("=")[1] || "All Products";
  // calculate text
  let total = products?.result && products?.result?.pagination?.total;
  let page = products?.result && products?.result?.pagination?.page;
  let limit = products?.result && products?.result?.pagination?.limit;
  let start = total === 0 ? 0 : (page - 1) * limit + 1;
  let end =
    total === 0
      ? 0
      : start + products?.result && products?.result?.data?.length * page;
  // filtered products
  const filteredProducts = useMemo(() => {
    let list = [...(products?.result?.data ?? [])];
    // CATEGORY FILTER
    if (filters.productTypes?.length > 0) {
      list = list.filter((p) => filters.productTypes.includes(p.category));
    }
    // Brand filter
    if (filters.brands.length > 0) {
      list = list.filter((p) => filters.brands.includes(p.brand));
    }
    // AVAILABILITY FILTER
    if (filters.availability[0] === "in-stock") {
      list = list.filter((p: any) => p.stock > 0);
    }
    // PRICE FILTER
    list = list.filter(
      (p) =>
        p?.price >= filters?.priceRange?.min &&
        p?.price <= filters?.priceRange?.max,
    );

    // SORTING
    if (filters.sortBy === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    }

    if (filters.sortBy === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    }
    if (filters.sortBy === "name-asc") {
      list.sort((a, b) => a?.name.localeCompare(b?.name));
    }

    if (filters.sortBy === "newest") {
      list.sort(
        (a, b) =>
          new Date(b?.createdAt).getTime() - new Date(a?.createdAt).getTime(),
      );
    }
    return list;
  }, [products, filters]);
  const resetFilters = () => {
    setFilters({
      availability: [],
      productTypes: [],
      brands: [],
      priceRange: { min: 0, max: 1000 },
      sortBy: "price-asc",
    });
  };
  return (
    <section className="md:px-10 px-2 min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm overflow-scroll">
        <CategoryNavigation />
      </nav>

      <div className="py-6">
        <div className="flex gap-2 p-2">
          <FilterAccordion
            filters={filters}
            setFilters={setFilters}
            mobileFiltersOpen={mobileFiltersOpen}
            setMobileFiltersOpen={setMobileFiltersOpen}
          />
          {/* Main Content */}
          <main className="flex-1">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-2 md:p-4 mb-4">
              <div className="flex items-center justify-between flex-wrap gap-4 ">
                <div>
                  <h1 className="text-xl font-bold capitalize">
                    {productCategoryName}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {isFetching
                      ? "Updating Products.."
                      : total === 0
                        ? "No Products found"
                        : `Showing ${start} - ${end} products of ${total} products`}
                  </p>
                </div>

                <div className="flex justify-between items-center gap-2">
                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="lg:hidden flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Menu className="w-4 h-4" />
                    Filters
                  </button>
                  <div className="flex items-center gap-2 text-sm flex-wrap border border-[#c4c4c4] p-1.5 rounded-md w-[180px]">
                    <span className="font-medium">Sort By</span>
                    <select
                      name="sort-by"
                      id=""
                      className="outline-0"
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          sortBy: e.target.value,
                        }))
                      }
                    >
                      <option value="price-asc">Price Low</option>
                      <option value="price-htl">Price High</option>
                      <option value="newest-fisrt">Newest First</option>
                      <option value="name-asc">Name A - Z</option>
                      <option value="name-desc">Name Z - A</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {/* Products Grid */}
            <div>
              {isError ? (
                <ErrorUI error={error} onRetry={refetch} />
              ) : isLoading ? (
                <Loader style="h-[300px]" />
              ) : filteredProducts?.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm md:p-12">
                  <div className="max-w-md mx-auto text-center">
                    {/* Empty State Icon */}
                    <div className="mb-6">
                      <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Empty State Message */}
                    <h3 className="text-2xl font-bold text-gray-800 mb-3">
                      No Products Found
                    </h3>
                    <p className="text-gray-500 mb-8 leading-relaxed">
                      We couldn't find any products matching your current
                      filters. Try adjusting your search criteria or clear all
                      filters to see more products.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={resetFilters}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors font-medium shadow-sm"
                      >
                        Clear All Filters
                      </button>
                      <button
                        // onClick={() => setSearchInput('')}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                      >
                        Clear Search
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-2">
                  {filteredProducts.map((product: any) => (
                    <React.Fragment key={product?._id}>
                      <ProductBestCard product={product} isButton={false} />
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
            {/* Pagination */}
            {total < 20 && (
              <Pagination
                pages={products?.result && products?.result?.pagination?.pages}
                page={paginationPage}
                setPage={setPaginationPage}
              />
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default Products;
